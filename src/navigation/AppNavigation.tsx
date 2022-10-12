import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackTypes';
import DrawerStack from './DrawerStack';
import RouteScreen from '../screens/RouteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AuthStack from './AuthStack';
import UsersGroupsScreen from '../screens/UsersGroupsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import ReportGeneratorScreen from '../screens/ReportGeneratorScreen';
import UserGroupDetailScreen from '../screens/UserGroupDetailScreen';
import BillListScreen from '../screens/BillScreen';
import BillCreateScreen from '../screens/CreateBillScreen';
import CreateBillSectionScreen from '../screens/CreateBillSectionScreen';
import BillSectionScreen from '../screens/BillSectionScreen';
import FormScreen from '../screens/FormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'DrawerScreens'}>
                <Stack.Screen name={'AuthStack'} component={AuthStack} />
                <Stack.Screen name={'DrawerScreens'} component={DrawerStack} />
                <Stack.Screen name={'RouteScreen'} component={RouteScreen} />
                <Stack.Screen name={'NotificationScreen'} component={NotificationScreen} />
                <Stack.Screen name={'UsersGroupsScreen'} component={UsersGroupsScreen} />
                <Stack.Screen name={'UserGroupDetailScreen'} component={UserGroupDetailScreen} />
                <Stack.Screen name={'JobDetailsScreen'} component={JobDetailsScreen} />
                <Stack.Screen name={'ReportGeneratorScreen'} component={ReportGeneratorScreen} />
                <Stack.Screen name={'BillListScreen'} component={BillListScreen} />
                <Stack.Screen name={'BillCreateScreen'} component={BillCreateScreen} />
                <Stack.Screen name={'CreateBillSectionScreen'} component={CreateBillSectionScreen} />
                <Stack.Screen name={'BillSectionScreen'} component={BillSectionScreen} />
                <Stack.Screen name={'FormScreen'} component={FormScreen} />
                <Stack.Screen name={'ProfileScreen'} component={ProfileScreen} />
                <Stack.Screen name={'ResetPasswordScreen'} component={ResetPasswordScreen} />
                <Stack.Screen name={'EditProfileScreen'} component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
