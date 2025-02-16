import React, { FC, useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import fungiData from '../../../../assets/fungs/fungs';
import { useSQLiteContext } from 'expo-sqlite';
import { Mushroom } from '../types';
import ListElement from './components/ListElement';

type MushroomHistoryProps = NativeStackScreenProps<RootStackParamList, 'MushroomHistory'>;

const MushroomHistory: FC<MushroomHistoryProps> = ({ navigation }) => {
  const db = useSQLiteContext();

  const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
  const [groupedMushrooms, setGroupedMushrooms] = useState<Mushroom[][]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data: Mushroom[] = await db.getAllAsync('SELECT * FROM fungi ORDER BY dateTime');
        setMushrooms(data);
      } catch (error) {
        console.error('Ошибка при загрузке истории распознаваний:', error);
      }
    };

    fetchHistory();
  }, []);
  

  useEffect(() => {
    const grouped = [];
    for (let i = 0; i < mushrooms.length; i += 2) {
      grouped.push(mushrooms.slice(i, i + 2));
    }
    setGroupedMushrooms(grouped);
  }, [mushrooms]);

  const handleDelete = async (id: number) => {
    try {
      await db.runAsync('DELETE FROM fungi WHERE id = ?', [id]);

      setMushrooms(prevMushrooms => prevMushrooms.filter(mushroom => mushroom.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении записи:', error);
      Alert.alert('Ошибка', 'Не удалось удалить запись');
    }
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Удалить запись',
      'Вы уверены, что хотите удалить это изображение?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Удалить', style: 'destructive', onPress: () => handleDelete(id) },
      ],
      { cancelable: true }
    );
  };

  const renderMushroomItem = ({ item }: { item: any }) => {
    const predictionsData = JSON.parse(item.predictions);

    const firstPrediction = predictionsData[0];
    const fungi = fungiData.find(fungi => +fungi.id === firstPrediction.id);

    return fungi ? (
      <ListElement
        onPress={() => navigation.navigate('MushroomCard', { id: item.id })}
        onDeletePress={() => confirmDelete(item.id)}
        isEdible={fungi.isEdible}
        path={item.path}
        name={fungi.name}
      />
    ) : (
      <></>
    );
  };

  const renderMushroomRow = ({ item }: any) => {
    return (
      <View style={styles.rowContainer}>
        <FlatList
          data={item}
          renderItem={renderMushroomItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.rowContent}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      {groupedMushrooms.length > 0 ? (
        <FlatList
          data={groupedMushrooms}
          renderItem={renderMushroomRow}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noData}>Нет данных</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
  },
  noData: {
    textAlign: 'center',
    marginTop: '80%',
    fontSize: 26,
    color: 'white',
    fontFamily: 'ComicSansRegular',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rowContent: {
    display: 'flex',
    gap: 20,
  },
});

export default MushroomHistory;
