import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';

describe('Экран "Домой"', () => {
  const Stack = createNativeStackNavigator();

  const renderWithNavigation = (component) => {
    return render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={() => component} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  it('корректно отображается', () => {
    const { getByText } = renderWithNavigation(<Home navigation={{ navigate: jest.fn() }} />);

    expect(getByText('Добро пожаловать в Fungi!')).toBeTruthy();
    expect(
      getByText(
        'Fungi — это инструмент для распознавания грибов, который служит помощником в принятии решения, предлагая возможные варианты на основе отправленного вами изображения. Тем не менее, точность распознавания не гарантируется. Продолжая использовать данное приложение, вы соглашаетесь с тем, что его создатели не несут ответственности за любые последствия, которые могут возникнуть в результате использования рекомендаций'
      )
    ).toBeTruthy();
    expect(getByText('Распознать гриб')).toBeTruthy();
    expect(getByText('История распознаваний')).toBeTruthy();
  });

  it('переходит на экран Recognizer при нажатии на кнопку "Распознать гриб"', () => {
    const mockNavigate = jest.fn();
    const { getByText } = renderWithNavigation(<Home navigation={{ navigate: mockNavigate }} />);

    const recognizeButton = getByText('Распознать гриб');
    fireEvent.press(recognizeButton);

    expect(mockNavigate).toHaveBeenCalledWith('Recognizer');
  });

  it('переходит на экран MushroomHistory при нажатии на кнопку "История распознаваний"', () => {
    const mockNavigate = jest.fn();
    const { getByText } = renderWithNavigation(<Home navigation={{ navigate: mockNavigate }} />);

    const historyButton = getByText('История распознаваний');
    fireEvent.press(historyButton);

    expect(mockNavigate).toHaveBeenCalledWith('MushroomHistory');
  });
});
