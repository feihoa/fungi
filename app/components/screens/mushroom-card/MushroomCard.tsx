import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import Loader from '@/components/ui/layout/Loader';
import fungiData from '../../../../assets/fungs/fungs';
import MushroomImage from '@/components/shared/MushroomImage';
import { useSQLiteContext } from 'expo-sqlite';

type MushroomCardProps = NativeStackScreenProps<RootStackParamList, 'MushroomCard'>;

interface Prediction {
  id: string;
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
    const fungi = fungiData.find(fungi => fungi.id === item.id);

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
    <>
      <Image source={{ uri: mushroomPath }} style={styles.mainImage} />
      <FlatList
        contentContainerStyle={styles.container}
        data={predictions}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderPredictionItem}
        ListHeaderComponent={<Text style={styles.predictionsTitle}>Результаты распознавания:</Text>}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  mainImage: {
    width: '100%',
    height: '35%',
  },
  predictionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
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
    color: '#333',
    marginBottom: 10,
  },
  predictionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  predictionTextName: {
    fontSize: 18,
    fontWeight: 600,
    color: '#555',
    marginBottom: 4,
  },
});

export default MushroomCard;
