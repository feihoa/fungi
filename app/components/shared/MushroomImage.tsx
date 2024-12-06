import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { IsEdible } from '../../../assets/fungs/fungs';

type MushroomImageProps = {
  isEdible: IsEdible;
  image: any;
};

const { width } = Dimensions.get('window');

const MushroomImage: React.FC<MushroomImageProps> = ({ isEdible, image }) => {
  return (
    <>
      {isEdible === 0 ? (
        <FontAwesome5 style={styles.icon} name="smile" size={24} color="green" />
      ) : isEdible === 1 ? (
        <FontAwesome6 style={styles.icon} name="face-meh-blank" size={24} color="black" />
      ) : (
        <MaterialCommunityIcons
          style={styles.icon}
          name="emoticon-dead-outline"
          size={24}
          color="red"
        />
      )}

      <Image source={image} style={styles.image} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: (width - 100) / 2,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 15,
  },
});

export default MushroomImage;
