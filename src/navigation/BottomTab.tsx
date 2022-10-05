import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { View, StyleSheet, Image, Text } from 'react-native';
import { BottomStackParamList } from '../types/RootStackTypes';
import MapScreen from '../screens/MapScreen';
import JobsScreen from '../screens/JobsScreen';
import IndoxScreen from '../screens/IndoxScreen';
import { ImagesPath } from '../utils/ImagePaths';
import { colors } from '../styles/Colors';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';

const Tab = createBottomTabNavigator<BottomStackParamList>();

const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.bottom_tab_bg,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: wp(28),
                    position: 'absolute',
                }
            }}
            initialRouteName={'JobsScreen'}>
            <Tab.Screen
                name={'MapScreen'}
                component={MapScreen}
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <Text
                            style={[styles.labelTxt, {
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM
                            }]}>
                            Map
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Image source={focused ? ImagesPath.map_pin_solid_icon : ImagesPath.map_pin_icon} style={styles.iconStyle} />
                        </View>
                    ),
                }} />
            <Tab.Screen
                name={'JobsScreen'}
                component={JobsScreen}
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <Text
                            style={[styles.labelTxt, {
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM
                            }]}>
                            Job
                        </Text>
                    ),
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.jobIconContainer, { backgroundColor: !focused ? colors.bottom_tab_btn_blur : colors.bottom_tab_btn }]}>
                            <Image source={focused ? ImagesPath.jobs_solid_icon : ImagesPath.jobs_icon} style={styles.iconStyle} />
                        </View>
                    ),
                }} />
            <Tab.Screen
                name={'IndoxScreen'}
                component={IndoxScreen}
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <Text
                            style={[styles.labelTxt, {
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM
                            }]}>
                            Inbox
                        </Text>
                    ),
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Image source={focused ? ImagesPath.chat_solid_icon : ImagesPath.chat_icon} style={styles.iconStyle} />
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}

export default BottomTab;

const styles = StyleSheet.create({
    jobIconContainer: {
        height: wp(20),
        width: wp(20),
        borderRadius: wp(10),
        backgroundColor: colors.bottom_tab_btn,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 6,
        shadowColor: "#0000001f",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconStyle: {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain'
    },
    labelTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.bottom_tab_title
    }
})