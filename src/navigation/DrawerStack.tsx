import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './BottomTab';
import { DrawerStackParamList } from '../types/RootStackTypes';
import DrawerScreen from '../screens/DrawerScreen';
import { useAppDispatch } from '../hooks/reduxHooks';
import { useIsFocused } from '@react-navigation/native';
import { roleList, userInfo, userRoleList } from '../redux/slices/AdminSlice/userListSlice';

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerStack = () => {
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()
    useEffect(() => {
        dispatch(userRoleList("")).unwrap().then((res) => {
            console.log("🚀 ~ file: DrawerStack.tsx ~ line 21 ~ dispatch ~ res", res)
        }).catch((error) => {
            console.log("🚀 ~ file: DrawerStack.tsx ~ line 20 ~ dispatch ~ error", error)
        })



        dispatch(userInfo()).unwrap().then((res) => {
            console.log({ res: res });
            // dispatch(userDetailsReducer(res))
        }).catch((e) => {
            console.log({ error: e });
        })

    }, [isFocus])
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerType: 'front'
            }}
            initialRouteName="BottomTabs"
            drawerContent={props => <DrawerScreen {...props} />}>
            <Drawer.Screen name="BottomTabs" component={BottomTab} />
        </Drawer.Navigator>
    )
}

export default DrawerStack;

