import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { FC } from 'react';
import { routes } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type NavigationProps = {
  model: any;
};

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: 'transparent',
  },
};

const Navigation: FC<NavigationProps> = ({ model }) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {routes.map(route => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            options={{
              title: route.title,
              headerStyle: {
                backgroundColor: 'transparent',
              },
            }}>
            {props => <route.component {...props} model={model} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
