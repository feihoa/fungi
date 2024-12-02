import Home from '@/components/screens/home/Home';
import { IRouter } from './navigation.types';
import MushroomHistory from '@/components/screens/mushroom-history/MushroomHistory';
import MushroomCard from '@/components/screens/mushroom-card/MushroomCard';
import Camera from '@/components/screens/camera/Camera';

export const routes: IRouter[] = [
  {
    name: 'Home',
    component: Home,
    title: 'Главная',
  },
  {
    name: 'Camera',
    component: Camera,
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
