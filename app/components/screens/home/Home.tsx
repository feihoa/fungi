import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import MainButton from '@/components/shared/MainButton';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Добро пожаловать в Fungi!</Text>
      <Text style={[styles.warningText]}>
        Fungi — это инструмент для распознавания грибов, который служит помощником в принятии
        решения, предлагая возможные варианты на основе отправленного вами изображения. Тем не
        менее, точность распознавания не гарантируется. Продолжая использовать данное приложение, вы
        соглашаетесь с тем, что его создатели не несут ответственности за любые последствия, которые
        могут возникнуть в результате использования рекомендаций
      </Text>
      <MainButton
        onPress={() => navigation.navigate('Recognizer')}
        text="Распознать гриб"></MainButton>
      <MainButton
        onPress={() => navigation.navigate('MushroomHistory')}
        text="История распознаваний"
        small={true}></MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  image: {
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 5,
    marginBottom: '20%',
    marginTop: '65%',
    textAlign: 'center',
    fontFamily: 'ComicSansMS',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  warningText: {
    bottom: '6%',
    borderRadius: 4,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Home;
