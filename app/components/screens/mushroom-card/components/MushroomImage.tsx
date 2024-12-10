import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { IsEdible } from 'assets/fungs/fungs';
import IsEdibleIcon from '@/components/shared/IsEdibleIcon';

type MushroomImageProps = {
  isEdible: IsEdible;
  image: any;
};

const MushroomImage: React.FC<MushroomImageProps> = ({ isEdible, image }) => {
  return (
    <>
      <IsEdibleIcon style={styles.icon} isEdible={isEdible} size={24}></IsEdibleIcon>
      <Image source={image} style={styles.image} />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginRight: 10,
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

export default MushroomImage;
