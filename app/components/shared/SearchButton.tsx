import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type SearchButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

const SearchButton: FC<SearchButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="search" size={44} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b4d3b0',
    shadowColor: '#67efb2',
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 20,
    borderWidth: 2,
    borderColor: '#2b4531',
    margin: 20,
  },
});

export default SearchButton;
