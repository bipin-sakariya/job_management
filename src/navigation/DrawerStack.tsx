import { StyleSheet } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import { DrawerStackParamList } from '../types/RootStackTypes';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="BottomTabs">
            <Drawer.Screen name="BottomTabs" component={BottomTab} />
        </Drawer.Navigator>
    )
}

export default DrawerStack;

