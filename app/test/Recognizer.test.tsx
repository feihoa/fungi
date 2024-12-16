import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Recognizer from './Recognizer';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import { Alert } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';

jest.mock('expo-camera', () => ({ CameraView: jest.fn() }));
jest.mock('expo-image-picker', () => ({ launchImageLibraryAsync: jest.fn() }));
jest.mock('@tensorflow/tfjs', () => ({ ready: jest.fn(), loadLayersModel: jest.fn() }));
jest.mock('expo-file-system', () => ({ copyAsync: jest.fn(), documentDirectory: 'mock/documents' }));
jest.mock('expo-image-manipulator', () => ({ manipulateAsync: jest.fn() }));
jest.mock('expo-sqlite', () => ({ SQLiteProvider: jest.fn() }));

const mockNavigation = { navigate: jest.fn() };

describe('Компонент Recognizer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('корректно отображает компонент Recognizer', () => {
    const { getByText } = render(
      <SQLiteProvider databaseName="fungi.db">
        <Recognizer navigation={mockNavigation} />
      </SQLiteProvider>
    );

    expect(getByText('Поместите гриб в центре кадра')).toBeTruthy();
  });

  it('открывает выбор изображения при нажатии на кнопку галереи', async () => {
    ImagePicker.launchImageLibraryAsync.mockResolvedValueOnce({ canceled: false, assets: [{ uri: 'mock-uri' }] });

    const { getByTestId } = render(
      <SQLiteProvider databaseName="fungi.db">
        <Recognizer navigation={mockNavigation} />
      </SQLiteProvider>
    );

    const galleryButton = getByTestId('gallery-button');
    fireEvent.press(galleryButton);

    await waitFor(() => {
      expect(ImagePicker.launchImageLibraryAsync).toHaveBeenCalled();
    });
  });

  it('обрабатывает загрузку модели TensorFlow', async () => {
    tf.ready.mockResolvedValueOnce();
    tf.loadLayersModel.mockResolvedValueOnce({ predict: jest.fn() });

    const { getByTestId } = render(
      <SQLiteProvider databaseName="fungi.db">
        <Recognizer navigation={mockNavigation} />
      </SQLiteProvider>
    );

    const takePictureButton = getByTestId('take-picture-button');
    fireEvent.press(takePictureButton);

    await waitFor(() => {
      expect(tf.ready).toHaveBeenCalled();
      expect(tf.loadLayersModel).toHaveBeenCalled();
    });
  });

  it('показывает ошибку при сбое обработки изображения', async () => {
    jest.spyOn(Alert, 'alert');

    const { getByTestId } = render(
      <SQLiteProvider databaseName="fungi.db">
        <Recognizer navigation={mockNavigation} />
      </SQLiteProvider>
    );

    const galleryButton = getByTestId('gallery-button');
    ImagePicker.launchImageLibraryAsync.mockRejectedValueOnce(new Error('Не удалось открыть галерею'));

    fireEvent.press(galleryButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Ошибка', 'Не удалось открыть галерею');
    });
  });

  it('корректно сохраняет предсказания в базу данных', async () => {
    const mockPrepare = jest.fn().mockResolvedValueOnce({
      executeAsync: jest.fn().mockResolvedValueOnce({ lastInsertRowId: 1 }),
    });
    SQLiteProvider.prepareAsync = mockPrepare;

    const { getByTestId } = render(
      <SQLiteProvider databaseName="fungi.db">
        <Recognizer navigation={mockNavigation} />
      </SQLiteProvider>
    );

    const takePictureButton = getByTestId('take-picture-button');
    fireEvent.press(takePictureButton);

    await waitFor(() => {
      expect(mockPrepare).toHaveBeenCalled();
      expect(mockNavigation.navigate).toHaveBeenCalledWith('MushroomCard', { id: 1 });
    });
  });
});
