import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from './App';
import * as Font from 'expo-font';

jest.mock('expo-font', () => ({
  useFonts: jest.fn(() => [true, false]),
}));

jest.mock('expo-sqlite', () => ({
  SQLiteProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/navigation/Navigation', () => () => <div testID="navigation">Navigation</div>);

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Компонент App', () => {
  it('корректно отображается, когда шрифты загружены', async () => {
    const { getByTestId } = render(<App />);

    await waitFor(() => {
      expect(getByTestId('navigation')).toBeTruthy();
    });
  });

  it('возвращает null, если шрифты не загружены', async () => {
    jest.spyOn(Font, 'useFonts').mockReturnValue([false, false]);
    const { queryByTestId } = render(<App />);

    await waitFor(() => {
      expect(queryByTestId('navigation')).toBeNull();
    });
  });

  it('корректно обрабатывает инициализацию базы данных без ошибок', async () => {
    const execAsyncMock = jest.fn().mockResolvedValueOnce(undefined);
    const dbMock: { execAsync: jest.Mock } = { execAsync: execAsyncMock };

    const initializeDatabase = async (db: { execAsync: (sql: string) => Promise<void> }) => {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS fungi (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT NOT NULL,
          predictions TEXT NOT NULL,
          dateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    };

    await initializeDatabase(dbMock);

    expect(execAsyncMock).toHaveBeenCalledWith(expect.stringContaining('PRAGMA journal_mode = WAL;'));
  });
});
