import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { RootStackParamList } from '../types/RootStackTypes';
import DrawerStack from './DrawerStack';
import NotificationScreen from '../screens/NotificationScreen';
import AuthStack from './AuthStack';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import ReportGeneratorScreen from '../screens/ReportGeneratorScreen';
import BillListScreen from '../screens/BillScreen';
import BillCreateScreen from '../screens/CreateBillScreen';
import CreateBillSectionScreen from '../screens/CreateBillSectionScreen';
import BillSectionScreen from '../screens/BillSectionScreen';
import FormScreen from '../screens/FormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CreateFormScreen from '../screens/CreateFormScreen';
import FormDetailsScreen from '../screens/FormDetailsScreen';
import ChatScreen from '../screens/ChatScreen';
import TransferJobScreen from '../screens/TransferJobScreen';
import ReturnJobScreen from '../screens/ReturnJobScreen';
import DuplicateScreen from '../screens/DuplicateScreen';
import CloseJobScreen from '../screens/CloseJobScreen';
import JobDuplicateListScreen from '../screens/JobDuplicateListScreen';
import RouteScreen from '../screens/RouteScreen';
import RouteChooseLocationDetailScreen from '../screens/RouteChooseLocationDetailScreen';
import RouteMapViewScreen from '../screens/RouteMapViewScreen';
import CreateNewJobScreen from '../screens/CreateNewJobScreen';
import JobsScreen from '../screens/JobsScreen';
import ReturnAndAddJobHistoryScreen from '../screens/ReturnAndAddJobHistoryScreen';
import SelectFormScreen from '../screens/SelectFormScreen';
import FillFormScreen from '../screens/FillFormScreen';
import SignBillDetailScreen from '../screens/SignBillDetailScreen';
import { useAppSelector } from '../hooks/reduxHooks';
import AddNewJobScreen from '../screens/AddNewJobScreen';
import GroupListScreen from '../screens/GroupListScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import UserListScreen from '../screens/UserListScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import CreateJobMapScreen from '../screens/CreateJobMapScreen';
import { colors } from '../styles/Colors';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    const { userData } = useAppSelector(state => state.userDetails)

    const navTheme: Theme = {
        dark: false,
        colors: {
            background: colors.white,
            primary: colors.white,
            card: colors.white,
            text: colors.white,
            border: colors.white,
            notification: colors.white,
        },
    };

    return (
        <NavigationContainer theme={navTheme}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureDirection: 'horizontal-inverted',
                }}
                initialRouteName={userData ? 'DrawerScreens' : 'AuthStack'}>
                <Stack.Screen name={'AuthStack'} component={AuthStack} />
                <Stack.Screen name={'DrawerScreens'} component={DrawerStack} />
                <Stack.Screen name={'JobDuplicateListScreen'} component={JobDuplicateListScreen} />
                <Stack.Screen name={'NotificationScreen'} component={NotificationScreen} />
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
                <Stack.Screen name={'CreateFormScreen'} component={CreateFormScreen} />
                <Stack.Screen name={'FormDetailsScreen'} component={FormDetailsScreen} />
                <Stack.Screen name={'ChatScreen'} component={ChatScreen} />
                <Stack.Screen name={'TransferJobScreen'} component={TransferJobScreen} />
                <Stack.Screen name={'ReturnJobScreen'} component={ReturnJobScreen} />
                <Stack.Screen name={'DuplicateScreen'} component={DuplicateScreen} />
                <Stack.Screen name={'CloseJobScreen'} component={CloseJobScreen} />
                <Stack.Screen name={'RouteScreen'} component={RouteScreen} />
                <Stack.Screen name={'RouteMapViewScreen'} component={RouteMapViewScreen} />
                <Stack.Screen name={'RouteChooseLocationDetailScreen'} component={RouteChooseLocationDetailScreen} />
                <Stack.Screen name={'CreateNewJobScreen'} component={CreateNewJobScreen} />
                <Stack.Screen name={'JobsScreen'} component={JobsScreen} />
                <Stack.Screen name={'ReturnAndAddJobHistoryScreen'} component={ReturnAndAddJobHistoryScreen} />
                <Stack.Screen name={'SelectFormScreen'} component={SelectFormScreen} />
                <Stack.Screen name={'FillFormScreen'} component={FillFormScreen} />
                <Stack.Screen name={'SignBillDetailScreen'} component={SignBillDetailScreen} />
                <Stack.Screen name={'AddNewJobScreen'} component={AddNewJobScreen} />
                <Stack.Screen name={'GroupListScreen'} component={GroupListScreen} />
                <Stack.Screen name={'CreateGroupScreen'} component={CreateGroupScreen} />
                <Stack.Screen name={'GroupDetailScreen'} component={GroupDetailScreen} />
                <Stack.Screen name={'UserListScreen'} component={UserListScreen} />
                <Stack.Screen name={'CreateUserScreen'} component={CreateUserScreen} />
                <Stack.Screen name={'UserDetailScreen'} component={UserDetailScreen} />
                <Stack.Screen name={'CreateJobMapScreen'} component={CreateJobMapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
