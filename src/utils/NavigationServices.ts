import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef<NavigationProp<any>>();

export function navigate(name: string, params: object) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset(name: string) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: name }],
  });
}
