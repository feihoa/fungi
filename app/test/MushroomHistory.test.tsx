import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import MushroomHistory from '../components/screens/mushroom-history/MushroomHistory';
import { useSQLiteContext } from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn(),
}));

jest.mock('expo-font', () => ({
  Font: {
    isLoaded: jest.fn().mockResolvedValue(true),
    loadAsync: jest.fn(),
  },
}));

jest.mock('@react-navigation/native-stack', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../../../../assets/fungs/fungs', () => [
  {
    id: 1,
    name: 'Fly Agaric',
    isEdible: false,
    image: 'fly_agaric_image.png',
    description: 'Highly poisonous mushroom.',
  },
  {
    id: 2,
    name: 'Chanterelle',
    isEdible: true,
    image: 'chanterelle_image.png',
    description: 'Delicious edible mushroom.',
  },
]);

jest.spyOn(Alert, 'alert');

const mockNavigation = {
  navigate: jest.fn(),
};

jest.mock('react-native/Libraries/Settings/Settings', () => ({
  SettingsManager: {
    settings: {
      AppleLocale: 'en_US',
      localeIdentifier: 'en_US',
    },
  },
}));

describe('MushroomHistory', () => {
  let mockDb;

  beforeEach(() => {
    mockDb = {
      getAllAsync: jest.fn(),
    };
    (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);
  });

  it('должен корректно отображать данные грибов', async () => {
    const mockData = [
      { id: 1, path: 'path/to/image1', predictions: JSON.stringify([{ id: 1, probability: 78 }]) },
      {
        id: 1,
        path: 'file:///data/user/0/host.exp.exponent/files/b67da9fd-4824-4b2a-be41-1280f1214594.jpg',
        predictions: JSON.stringify([
          { id: 1, probability: 99 },
          { id: 8, probability: 1 },
        ]),
      },
    ];

    mockDb.getAllAsync.mockResolvedValue(mockData);

    const { getByText } = render(
      <NavigationContainer>
        <MushroomHistory navigation={mockNavigation} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(mockDb.getAllAsync).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(getByText('Fly Agaric')).toBeTruthy();
      expect(getByText('Chanterelle')).toBeTruthy();
    });
  });

  it('должен отображать сообщение, если данных нет', async () => {
    mockDb.getAllAsync.mockResolvedValue([]);

    const { getByText } = render(
      <NavigationContainer>
        <MushroomHistory navigation={mockNavigation} />
      </NavigationContainer>
    );

    await waitFor(() => {
      expect(getByText('Нет данных')).toBeTruthy();
    });
  });

  it('должен удалять запись после подтверждения', async () => {
    const mockData = [{ id: 1, path: 'path/to/image1', predictions: JSON.stringify([{ id: 1, probability: 78 }]) }];
    mockDb.getAllAsync.mockResolvedValue(mockData);

    const { getByText, queryByText } = render(
      <NavigationContainer>
        <MushroomHistory navigation={mockNavigation} />
      </NavigationContainer>
    );

    await waitFor(() => expect(getByText('Mushroom A')).toBeTruthy());

    fireEvent.press(getByText('Удалить запись'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Удалить запись',
      'Вы уверены, что хотите удалить эту запись?',
      expect.any(Array),
      { cancelable: true }
    );

    const [, , { onPress }] = Alert.alert.mock.calls[0][2];
    onPress();

    await waitFor(() => {
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM fungi WHERE id = ?', [1]);
      expect(queryByText('Mushroom A')).toBeNull();
    });
  });

  it('должен обрабатывать ошибки при удалении записи', async () => {
    const mockData = [{ id: 1, path: 'path/to/image1', predictions: JSON.stringify([{ id: 1 }]) }];
    mockDb.getAllAsync.mockResolvedValue(mockData);
    mockDb.runAsync.mockRejectedValue(new Error('Test Error'));

    const { getByText } = render(
      <NavigationContainer>
        <MushroomHistory navigation={mockNavigation} />
      </NavigationContainer>
    );

    await waitFor(() => expect(getByText('Mushroom A')).toBeTruthy());

    fireEvent.press(getByText('Удалить запись'));

    const [, , { onPress }] = Alert.alert.mock.calls[0][2];
    onPress();

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Ошибка', 'Не удалось удалить запись');
    });
  });
});
