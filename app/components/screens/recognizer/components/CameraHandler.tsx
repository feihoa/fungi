import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import MainButton from '@/components/shared/MainButton';
import { PermissionResponse } from 'expo-camera';

interface CameraHandlerProps {
  children: React.ReactNode;
  requestPermission: () => Promise<PermissionResponse>;
  permissionStatus:
    | PermissionResponse
    | { canAskAgain: false; expires: string | number; granted: false; status: 'denied' };
}

const CameraHandler: React.FC<CameraHandlerProps> = ({
  children,
  requestPermission,
  permissionStatus,
}) => {
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    const checkPermissions = () => {
      if (permissionStatus.granted) {
        setCameraPermission(true);
        setPermissionError(null);
      } else if (!permissionStatus.canAskAgain) {
        setCameraPermission(false);
        setPermissionError('Доступ к камере запрещен. Перейдите в настройки, чтобы включить его.');
      } else {
        setCameraPermission(false);
        setPermissionError('Необходимо предоставить разрешение для доступа к камере.');
      }
    };

    checkPermissions();
  }, [permissionStatus]);

  const handleRequestPermission = async () => {
    try {
      const newStatus = await requestPermission();
      if (newStatus.granted) {
        setCameraPermission(true);
        setPermissionError(null);
      } else if (!newStatus.canAskAgain) {
        setCameraPermission(false);
        setPermissionError('Доступ к камере запрещен. Перейдите в настройки, чтобы включить его.');
      } else {
        setCameraPermission(false);
        setPermissionError('Необходимо предоставить разрешение для доступа к камере.');
      }
    } catch (error) {
      console.error('Ошибка при запросе разрешения:', error);
      setPermissionError('Произошла ошибка при запросе доступа.');
    }
  };

  if (cameraPermission === null) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.permissionText}>Проверка доступ к камере</Text>
      </View>
    );
  }

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Ошибка', 'Не удалось открыть настройки. Попробуйте вручную.');
    });
  };

  if (!cameraPermission) {
    return (
      <View style={styles.centeredView}>
        {permissionError && <Text style={styles.permissionErrorText}>{permissionError}</Text>}
        <MainButton
          onPress={permissionStatus.canAskAgain ? handleRequestPermission : openAppSettings}
          text={permissionStatus.canAskAgain ? 'Предоставить доступ' : 'Открыть настройки'}
        />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionErrorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'ComicSansRegular',
  },
  permissionText: {
    fontSize: 22,
    width: '80%',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'ComicSansRegular',
  },
});

export default CameraHandler;
