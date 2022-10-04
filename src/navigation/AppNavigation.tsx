// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../screens/HomeScreen';
// import { RootStackParamList } from '../types/RootStackTypes';

// const Stack = createStackNavigator<RootStackParamList>();

// const AppNavigation = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator
//                 screenOptions={{
//                     headerShown: false
//                 }}
//                 initialRouteName={'HomeScreen'}>
//                 <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// };

// export default AppNavigation;

import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;

const styles = StyleSheet.create({})