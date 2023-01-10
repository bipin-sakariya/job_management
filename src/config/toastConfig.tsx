import React from 'react';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { colors } from '../styles/Colors';
// import {AppColors} from '../../styles/color';

const ToastConfig = () => {
  const toastConfig = {
    appToast: (props: BaseToastProps) => {
      return (
        <BaseToast
          {...props}
          style={{ borderLeftColor: colors.primary_color }}
        />
      );
    },
  };

  return <Toast config={toastConfig} />;
};

export default ToastConfig;
