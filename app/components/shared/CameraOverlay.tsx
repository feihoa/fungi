import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const CameraOverlay: FC = () => {
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.overlay}>
        <Circle cx="50%" cy="50%" r="150" stroke="#A4D3AE" strokeWidth="4" fill="transparent" />

        <Line x1="50%" y1="10%" x2="50%" y2="35%" stroke="white" strokeWidth="2" />
        <Line x1="50%" y1="65%" x2="50%" y2="90%" stroke="white" strokeWidth="2" />
        <Line x1="5%" y1="50%" x2="35%" y2="50%" stroke="white" strokeWidth="2" />
        <Line x1="65%" y1="50%" x2="95%" y2="50%" stroke="white" strokeWidth="2" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default CameraOverlay;
