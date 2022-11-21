import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../types/RootStackTypes';
import SignInScreen from '../screens/SignInScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'SignInScreen'}>
            <Stack.Screen name={'SignInScreen'} component={SignInScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
