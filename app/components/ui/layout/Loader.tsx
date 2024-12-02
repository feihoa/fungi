import { AppConstants } from '@/app.constants';
import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';

const Loader: FC = () => {
  return (
    <ActivityIndicator
      color={AppConstants.primary}
      size="large"
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    />
  );
};

export default Loader;
