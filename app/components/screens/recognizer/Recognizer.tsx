import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import Loader from '@/components/shared/Loader';
import * as FileSystem from 'expo-file-system';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import { useSQLiteContext } from 'expo-sqlite';
import * as tf from '@tensorflow/tfjs';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import CameraOverlay from '@/components/shared/CameraOverlay';
import SearchButton from '@/components/shared/SearchButton';
import { Prediction } from '../types';
import CameraHandler from './components/CameraHandler';

type CameraScreenProps = NativeStackScreenProps<RootStackParamList, 'Recognizer'> & {
  model: any;
};

const Recognizer: React.FC<CameraScreenProps> = ({ navigation, model }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [load, setLoad] = useState<boolean>(false);
  const cameraRef = useRef(null);
  const db = useSQLiteContext();

  const saveImageToAppFolder = async (uri: string) => {
    if (!FileSystem.documentDirectory) return null;
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
    setLoad(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await handleSave(result.assets[0].uri);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.error('Ошибка выбора изображения:', error);
      Alert.alert('Ошибка', 'Не удалось открыть галерею');
      setLoad(false);
    }
  };

  const makePredictions = async (img: any) => {
    try {
      const predictions = model.predict(img);
      return predictions;
    } catch (error) {
      console.error('Ошибка при предсказании:', error);
      throw error;
    }
  };

  const getPredictions = async (uri: string) => {
    const resizedImage = await manipulateAsync(uri, [{ resize: { width: 224, height: 224 } }], {
      compress: 0.7,
      format: SaveFormat.JPEG,
    });

    const img64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const imgBuffer = tf.util.encodeString(img64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    let imgTensor = decodeJpeg(raw);
    const scalar = tf.scalar(255);
    const tensorScaled = imgTensor.div(scalar);
    const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);

    return await makePredictions(img);
  };

  const handleSave = async (uri: string) => {
    if (!uri) return;
    try {
      const savedImageUri = await saveImageToAppFolder(uri);
      if (savedImageUri) {
        const tensor = await getPredictions(savedImageUri);
        const predictionsAll: number[][] = await tensor.arraySync();
        const probabilities = predictionsAll[0];

        const predictions: Prediction[] = probabilities.map((probability, id) => ({
          id,
          probability: +(probability * 100).toFixed(),
        }));

        let topPredictions = predictions
          .filter(pr => pr.probability !== 0)
          .sort((a, b) => b.probability - a.probability)
          .slice(0, 3);

        await saveImageWithPredictions(savedImageUri, topPredictions);
      }
    } catch (error) {
      console.error('Ошибка при обработке изображения:', error);
      Alert.alert('Ошибка', 'Не удалось обработать изображение');
    }
  };

  const saveImageWithPredictions = async (path: string, predictions: Prediction[]) => {
    try {
      const statement = await db.prepareAsync(
        'INSERT INTO fungi (path, predictions) VALUES (?, ?)'
      );
      const result = await statement.executeAsync([path, JSON.stringify(predictions)]);
      const newId = result.lastInsertRowId;

      if (newId) {
        console.log('Изображение и предсказания сохранены с ID:', newId);
        navigation.navigate('MushroomCard', { id: newId });
        setLoad(false);
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
      setLoad(true);
      await handleSave(photo.uri);
    }
  };

  return (
    permission && (
      <CameraHandler requestPermission={requestPermission} permissionStatus={permission}>
        <View style={styles.cameraContainer}>
          {!load && (
            <>
              <CameraView style={styles.cameraView} ref={cameraRef}>
                <CameraOverlay />
                <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
                  <AntDesign name="picture" size={32} color="white" />
                </TouchableOpacity>
              </CameraView>
              <View style={styles.buttonsView}>
                <Text style={styles.tip}>Поместите гриб в центре кадра</Text>
                <SearchButton onPress={takePicture} />
              </View>
            </>
          )}
          {load && <Loader />}
        </View>
      </CameraHandler>
    )
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
  },
  cameraView: {
    height: '75%',
  },
  buttonsView: {
    height: '23%',
    display: 'flex',
    alignItems: 'center',
  },
  galleryButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    padding: 10,
    backgroundColor: 'rgba(150, 255, 200, 0.3)',
    borderRadius: 30,
  },
  tip: {
    marginTop: 10,
    fontSize: 22,
    textAlign: 'center',
    width: '100%',
    lineHeight: 26,
    color: 'white',
    fontFamily: 'ComicSansRegular',
  },
});

export default Recognizer;
