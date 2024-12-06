import React, { FC, useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/navigation.types';
import fungiData from '../../../../assets/fungs/fungs';
import { useSQLiteContext } from 'expo-sqlite';
import MushroomImage from '@/components/shared/MushroomImage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppConstants } from '@/app.constants';

type MushroomHistoryProps = NativeStackScreenProps<RootStackParamList, 'MushroomHistory'>;

const MushroomHistory: FC<MushroomHistoryProps> = ({ navigation }) => {
  const db = useSQLiteContext();

  const [mushrooms, setMushrooms] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data: any = await db.getAllAsync('SELECT * FROM fungi');
        setMushrooms(data);
      } catch (error) {
        console.error('Ошибка при загрузке истории распознаваний:', error);
      }
    };

    fetchHistory();
  }, []);

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
      'Вы уверены, что хотите удалить эту запись?',
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

    return (
      <View style={styles.mushroomItemContainer}>
        <TouchableOpacity
          style={styles.mushroomItem}
          onPress={() => navigation.navigate('MushroomCard', { id: item.id })}>
          {fungi && (
            <>
              <MushroomImage isEdible={fungi.isEdible} image={{ uri: item.path }} />
              <Text style={styles.predictionName}>
                {fungi.name}
              </Text>
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
          <AntDesign name="delete" size={14} color="red" />
        </TouchableOpacity>
      </View>
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

  const groupedMushrooms = [];
  for (let i = 0; i < mushrooms.length; i += 2) {
    groupedMushrooms.push(mushrooms.slice(i, i + 2));
  }

  return (
    <View style={[styles.container, { backgroundColor: AppConstants.primary }]}>
      <Text style={styles.title}>История распознаваний</Text>
      {groupedMushrooms.length > 0 && (
        <FlatList
          data={groupedMushrooms}
          renderItem={renderMushroomRow}
          keyExtractor={(item, index) => `${index}`}
          showsVerticalScrollIndicator={false}
        />
      )}
      {!groupedMushrooms.length && <Text style={styles.noData}>Нет данных</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  noData: {
    textAlign: 'center',
    marginTop: '50%',
    fontSize: 26,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mushroomItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    paddingRight: 0,
    marginRight: 10,
    alignSelf: 'stretch',
  },
  mushroomItem: {
    flex: 1,
    alignItems: 'center',
  },
  predictionName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#f8d7da',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
});

export default MushroomHistory;
