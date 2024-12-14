import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import MushroomCard from './MushroomCard';
import { useSQLiteContext } from 'expo-sqlite';

jest.mock('expo-sqlite', () => ({
  useSQLiteContext: jest.fn(),
}));

jest.mock('@/components/shared/Loader', () => {
  const { View } = require('react-native');
  return () => <View testID="Loader" />;
});

jest.mock('../../../../assets/fungs/fungs', () => [
  {
    id: 1,
    name: 'Мухомор',
    isEdible: false,
    image: 'fly_agaric_image.png',
    description: 'Очень ядовитый гриб.',
  },
  {
    id: 2,
    name: 'Лисичка',
    isEdible: true,
    image: 'chanterelle_image.png',
    description: 'Вкусный съедобный гриб.',
  },
]);

const mockDb = {
  getFirstAsync: jest.fn(),
};

describe('Компонент MushroomCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);
  });

  it('отображает Loader, когда данные загружаются', () => {
    const { getByTestId } = render(<MushroomCard route={{ params: { id: 1 } }} />);
    expect(getByTestId('Loader')).toBeTruthy();
  });

  it('корректно обрабатывает ошибки при сбое получения данных', async () => {
    mockDb.getFirstAsync.mockRejectedValue(new Error('Ошибка базы данных'));

    const { getByTestId } = render(<MushroomCard route={{ params: { id: 1 } }} />);

    await waitFor(() =>
      expect(mockDb.getFirstAsync).toHaveBeenCalledWith('SELECT * FROM fungi WHERE id = ?', 1)
    );

    expect(getByTestId('Loader')).toBeTruthy();
  });
});
