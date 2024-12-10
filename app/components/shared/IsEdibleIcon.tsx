import { IsEdible } from 'assets/fungs/fungs';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type IsEdibleIconProps = {
  isEdible: IsEdible;
  size: number;
  style?: Object;
};

const IsEdibleIcon: FC<IsEdibleIconProps> = ({ isEdible, size, style = {} }) => {
  return (
    <MaterialCommunityIcons
      style={[
        styles.icon,
        style,
        {
          backgroundColor:
            isEdible === 0
              ? 'rgba(102, 187, 106, 0.1)'
              : isEdible === 1
                ? 'rgba(255, 167, 38, 0.1)'
                : 'rgba(244, 67, 54, 0.1)',
        },
      ]}
      name="mushroom"
      size={size}
      color={isEdible === 0 ? 'green' : isEdible === 1 ? 'orange' : 'red'}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    zIndex: 1,
    borderRadius: 15,
    padding: 2,
  },
});

export default IsEdibleIcon;
