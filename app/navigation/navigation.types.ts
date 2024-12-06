import { ComponentType } from 'react';

export type RootStackParamList = {
  Home: undefined;
  Recognizer: undefined;
  MushroomHistory: undefined;
  MushroomCard: { id: number };
};

export interface IRouter {
  name: keyof RootStackParamList;
  component: React.ComponentType<any>;
  title: string;
}
