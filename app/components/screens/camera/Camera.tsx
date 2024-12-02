import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import Loader from '@/components/shared/Loader';
import * as FileSystem from 'expo-file-system';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import { useSQLiteContext } from 'expo-sqlite';

type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;

const Camera: React.FC<CameraScreenProps> = ({ navigation }) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  const db = useSQLiteContext();

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraStatus = await requestPermission();
      setCameraPermission(cameraStatus.granted);
    };
    requestPermissions();
  }, [requestPermission]);

  if (cameraPermission === null) {
    return <View style={styles.centeredView} />;
  }

  if (!cameraPermission) {
    return (
      <View style={[styles.centeredView, styles.permissionContainer]}>
        <Text style={styles.permissionText}>Необходимо разрешение для доступа к камере</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Предоставить доступ</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const saveImageToAppFolder = async (uri: string) => {
    if (!FileSystem.documentDirectory) {
      return null;
    }
    const fileName = uri.split('/').pop();
    const newUri = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.copyAsync({ from: uri, to: newUri });
      return newUri;
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить изображение');
      console.error(error);
      return null;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      handleSave(result.assets[0].uri);
    }
  };

  const handleSave = async (uri: string) => {
    if (!uri) return;

    try {
      const savedImageUri = await saveImageToAppFolder(uri);

      if (savedImageUri) {
        setPhoto(savedImageUri);

        const predictions = [
          { id: 'Russula_foetens', probability: 80 },
          { id: 'Phallus_impudicus', probability: 15 },
          { id: 'Boletus_edulis', probability: 5 },
        ];

        await saveImageWithPredictions(savedImageUri, predictions);
      }
    } catch (error) {
      console.error('Ошибка при обработке изображения:', error);
      Alert.alert('Ошибка', 'Не удалось обработать изображение');
    }
  };

  const saveImageWithPredictions = async (path: string, predictions: any) => {
    try {
      const statement = await db.prepareAsync(
        'INSERT INTO fungi (path, predictions) VALUES (?, ?)'
      );
      const result = await statement.executeAsync([path, JSON.stringify(predictions)]);
      const newId = result.lastInsertRowId;

      if (newId) {
        console.log('Изображение и предсказания успешно сохранены с ID:', newId);
        navigation.navigate('MushroomCard', { id: newId });
        setPhoto(null);
      }
    } catch (error) {
      console.error('Ошибка при сохранении в базу:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await (cameraRef.current as any).takePictureAsync({
        quality: 1,
        skipProcessing: false,
        mute: true,
      });
      await handleSave(photo.uri);
    }
  };

  return (
    <View style={styles.cameraContainer}>
      {!photo && (
        <CameraView style={styles.cameraView} ref={cameraRef}>
          <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
            <AntDesign name="picture" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={takePicture}>
            <Text style={styles.saveButtonText}>Распознать</Text>
          </TouchableOpacity>
        </CameraView>
      )}
      {photo && <Loader />}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    backgroundColor: '#f0f0f0',
  },
  permissionText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraView: {
    flex: 1,
  },
  galleryButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
  },
  saveButton: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    width: '50%',
    transform: [{ translateX: -100 }],
    padding: 12,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
  saveButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Camera;
