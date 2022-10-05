import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackTypes';
import DrawerStack from './DrawerStack';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'DrawerScreens'}>
                <Stack.Screen name={'DrawerScreens'} component={DrawerStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
