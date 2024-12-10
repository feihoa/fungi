import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';

const Loader: FC = () => {
  return (
    <ActivityIndicator
      size="large"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      color='green'
    />
  );
};

export default Loader;
