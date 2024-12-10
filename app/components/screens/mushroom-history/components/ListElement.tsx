import React, { FC } from 'react';
import { Text, Image, View, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native';
import { IsEdible } from 'assets/fungs/fungs';
import CardButton, { CardButtonEnum } from './CardButton';
import IsEdibleIcon from '@/components/shared/IsEdibleIcon';

type ListElementProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  onDeletePress: ((event: GestureResponderEvent) => void) | undefined;
  isEdible: IsEdible;
  path: string;
  name: string;
};

const deviceWidth = Dimensions.get('window').width

const ListElement: FC<ListElementProps> = ({ onPress, onDeletePress, isEdible, path, name }) => {
  return (
    <View
      style={[
        styles.mushroomItemContainer,
        {
          borderColor: isEdible === 0 ? '#A5D6A7' : isEdible === 1 ? '#FFCC80' : '#EF9A9A',
        },
      ]}>
      <IsEdibleIcon style={styles.icon} isEdible={isEdible} size={28}></IsEdibleIcon>
      <CardButton onPress={onDeletePress} text="Удалить" type={CardButtonEnum.Delete}></CardButton>
      <Image source={{ uri: path }} style={styles.image} />
      <Text style={styles.predictionName}>{name}</Text>
      <CardButton onPress={onPress} text="Подробнее"></CardButton>
    </View>
  );
};

const styles = StyleSheet.create({
  mushroomItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 10,
    borderWidth: 2,
    backgroundColor: '#faf9e5',
    width: (deviceWidth - 40) / 2 - 10,
    marginBottom: 20,
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 10,
    borderRadius: 100,
    borderColor: '#2b4531',
    borderWidth: 3,
  },
  predictionName: {
    fontSize: 16,
    color: '#212121',
    textAlign: 'center',
    paddingBottom: 10,
    fontFamily: 'ComicSansBold',
  },
  icon: {
    padding: 2,
    position: 'absolute',
    top: 5,
    left: 5,
  },
});

export default ListElement;
