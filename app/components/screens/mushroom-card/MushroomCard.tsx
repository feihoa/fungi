import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import Loader from '@/components/shared/Loader';
import fungiData from '../../../../assets/fungs/fungs';
import MushroomImage from './components/MushroomImage';
import { useSQLiteContext } from 'expo-sqlite';

type MushroomCardProps = NativeStackScreenProps<RootStackParamList, 'MushroomCard'>;

interface Prediction {
  id: number;
  probability: number;
}

const MushroomCard: React.FC<MushroomCardProps> = ({ route }) => {
  const { id } = route.params;

  const db = useSQLiteContext();

  const [mushroomPath, setMushroomPath] = useState<any>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const fetchMushroomData = async () => {
      try {
        const data: any = await db.getFirstAsync('SELECT * FROM fungi WHERE id = ?', id);

        if (data) {
          const predictionsData = JSON.parse(data.predictions);
          setMushroomPath(data.path);
          setPredictions(predictionsData);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchMushroomData();
  }, [id]);

  if (!mushroomPath) {
    return (
      <View style={styles.loaderContainer}>
        <Loader />
      </View>
    );
  }

  const renderPredictionItem = ({ item }: { item: Prediction }) => {
    const fungi = fungiData.find(fung => +fung.id === item.id);

    if (!fungi) return null;

    return (
      <View style={styles.predictionItem}>
        <MushroomImage isEdible={fungi.isEdible} image={fungi.image}></MushroomImage>
        <View style={styles.predictionTextContainer}>
          <Text style={styles.predictionTextName}>{`${fungi.name} (${item.probability}%)`}</Text>
          <Text style={styles.predictionText}>{`${fungi.description || 'Нет данных'}`}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: mushroomPath }} style={styles.mainImage} />
      <FlatList
        contentContainerStyle={styles.container}
        data={predictions}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderPredictionItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  mainImage: {
    width: '100%',
    height: '35%',
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  predictionTextContainer: {
    flex: 1,
    gap: 15,
    justifyContent: 'center',
  },
  predictionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  predictionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  predictionTextName: {
    fontSize: 18,
    fontWeight: 600,
    color: 'white',
    marginBottom: 4,
  },
});

export default MushroomCard;
