import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackTypes';
import DrawerStack from './DrawerStack';
import RouteScreen from '../screens/RouteScreen';
import NotificationScreen from '../screens/NotificationScreen';

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
                <Stack.Screen name={'RouteScreen'} component={RouteScreen} />
                <Stack.Screen name={'NotificationScreen'} component={NotificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
