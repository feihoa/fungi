import React, { FC } from 'react';
import { Text, Image, View, StyleSheet, GestureResponderEvent } from 'react-native';
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

const ListElement: FC<ListElementProps> = ({ onPress, onDeletePress, isEdible, path, name }) => {
  return (
    <View
      style={[
        styles.mushroomItemContainer,
        {
          borderColor: isEdible === 0 ? '#A5D6A7' : isEdible === 1 ? '#FFCC80' : '#EF9A9A',
        },
      ]}>
      <IsEdibleIcon style={styles.icon} isEdible={isEdible} size={48}></IsEdibleIcon>
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
    minWidth: '85%',
    borderWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: '#FAFAFA',
  },
  image: {
    width: 210,
    height: 210,
    marginBottom: 10,
    borderRadius: 100,
    borderColor: '#2b4531',
    borderWidth: 3,
  },
  predictionName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    paddingBottom: 10,
  },
  icon: {
    padding: 2,
    position: 'absolute',
    top: 5,
    left: 5,
  },
});

export default ListElement;
