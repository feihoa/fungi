import React, { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export enum CardButtonEnum {
  Delete = 'delete',
}

type CardButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  type?: CardButtonEnum;
};

const CardButton: FC<CardButtonProps> = ({ onPress, text, type }) => {
  return (
    <TouchableOpacity style={[styles.button, type ? styles[type] : {}]} onPress={onPress}>
      <Text style={styles.buttonText}>
        {type === CardButtonEnum.Delete && <AntDesign name="close" size={24} color="#E53935" />}
        {type !== CardButtonEnum.Delete && text}
      </Text>
    </TouchableOpacity>
  );
};

const styles: any = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#2b4531',
    backgroundColor: '#b4d3b0',
    borderWidth: 1,
    width: '80%',
  },
  buttonText: {
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    fontSize: 24,
  },
  [CardButtonEnum.Delete]: {
    width: 35,
    fontWeight: 700,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 3,
    right: 8,
    opacity: 0.8,
    borderWidth: 0,
  },
});

export default CardButton;
