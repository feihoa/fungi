import Home from '@/components/screens/home/Home';
import { IRouter } from './navigation.types';
import MushroomHistory from '@/components/screens/mushroom-history/MushroomHistory';
import MushroomCard from '@/components/screens/mushroom-card/MushroomCard';
import Recognizer from '@/components/screens/recognizer/Recognizer';

export const routes: IRouter[] = [
  {
    name: 'Home',
    component: Home,
    title: 'Главная',
  },
  {
    name: 'Recognizer',
    component: Recognizer,
    title: 'Камера',
  },
  {
    name: 'MushroomHistory',
    component: MushroomHistory,
    title: 'История',
  },
  {
    name: 'MushroomCard',
    component: MushroomCard,
    title: 'Результат',
  },
];
