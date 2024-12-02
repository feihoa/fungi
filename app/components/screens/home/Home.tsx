import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import { AppConstants } from '@/app.constants';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={[styles.container, { backgroundColor: AppConstants.primary }]}>
      <Image
        source={require('../../../../assets/images/fungi.png')}
        style={[styles.image, { width, height: height * 0.4 }]} // Адаптивное изображение
        resizeMode="contain" // Изображение будет масштабироваться без обрезки
      />
      <Text style={styles.title}>Добро пожаловать в Fungi!</Text>
      <TouchableOpacity
        style={[styles.button, styles.recognizeButton]}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>Распознать гриб</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.historyButton]}
        onPress={() => navigation.navigate('MushroomHistory')}>
        <Text style={[styles.buttonText, styles.historyButtonText]}>История распознаваний</Text>
      </TouchableOpacity>
      <Text style={[styles.warningText]}>
        Fungi — это инструмент для распознавания грибов, который служит помощником в принятии
        решения, предлагая возможные варианты на основе отправленного вами изображения. Тем не
        менее, точность распознавания не гарантируется. Продолжая использовать данное приложение, вы
        соглашаетесь с тем, что его создатели не несут ответственности за любые последствия, которые
        могут возникнуть в результате использования рекомендаций.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    marginTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a0d08',
    marginBottom: 28,
    marginTop: 28,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  recognizeButton: {
    backgroundColor: '#4CAF50',
  },
  historyButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  historyButtonText: {
    color: '#4CAF50',
  },
  warningText: {
    position: 'absolute',
    bottom: 20,
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Home;
