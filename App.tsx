import React from 'react';
import Navigation from '@/navigation/Navigation';
import { SQLiteProvider } from 'expo-sqlite';

async function initializeDatabase(db: { execAsync: (arg0: string) => any }) {
  try {
    await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS fungi (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            path TEXT NOT NULL,
            predictions TEXT NOT NULL
          );
      `);
  } catch (error) {
    console.log('Ошибка инициализации : ', error);
  }
}

export default function App() {
  return (
    <SQLiteProvider databaseName="fungi.db" onInit={initializeDatabase}>
      <Navigation />
    </SQLiteProvider>
  );
}
