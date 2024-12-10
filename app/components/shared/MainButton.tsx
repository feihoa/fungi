import React, { FC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Text, StyleSheet } from 'react-native';

type MainButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  text: string;
  small?: boolean;
};

const MainButton: FC<MainButtonProps> = ({ onPress, text, small }) => {
  return (
    <TouchableOpacity
      style={[styles.button, small ? styles.smallButton : styles.mainButton]}
      onPress={onPress}>
      <Text style={[styles.buttonText, { fontSize: small ? 16 : 26 }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#2b4531',
  },
  mainButton: {
    backgroundColor: '#b4d3b0',
    width: '70%',
    marginBottom: 30,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'ComicSansBold',
  },
  smallButton: {
    width: '60%',
    backgroundColor: '#faf9e5',
    borderWidth: 1,
  },
});

export default MainButton;
