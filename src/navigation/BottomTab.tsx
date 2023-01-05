import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { View, StyleSheet, Image, Text, Platform, Dimensions } from 'react-native';
import { BottomStackParamList } from '../types/RootStackTypes';
import MapScreen from '../screens/MapScreen';
import JobsScreen from '../screens/JobsScreen';
import IndoxScreen from '../screens/InboxScreen';
import { ImagesPath } from '../utils/ImagePaths';
import { colors } from '../styles/Colors';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { strings } from '../languages/localizedStrings';

const Tab = createBottomTabNavigator<BottomStackParamList>();
const { height } = Dimensions.get('screen');

const BottomTab = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
            }}
            initialRouteName={'JobsScreen'}>
            <Tab.Screen
                name={'MapScreen'}
                component={MapScreen}
                options={{
                    tabBarLabel: ({ color, focused }) => (
                        <Text
                            style={[styles.labelTxt, {
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM,
                                color: focused ? colors.primary_color : colors.light_blue_Txt_color
                            }]}>
                            {strings.map}
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
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM,
                                color: focused ? colors.primary_color : colors.light_blue_Txt_color
                            }]}>
                            {strings.job}
                        </Text>
                    ),
                    tabBarIcon: ({ color, focused }) => (
                        <View style={[styles.jobIconContainer, { backgroundColor: !focused ? colors.primary_color : colors.primary_color }]}>
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
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM,
                                color: focused ? colors.primary_color : colors.light_blue_Txt_color
                            }]}>
                            {strings.inbox}
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
        bottom: Platform.OS == 'android' ? height / 80 : height / 60,
        shadowColor: "#0000001f",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
        zIndex: 99,
    },
    iconStyle: {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain'
    },
    labelTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        bottom: Platform.OS == 'ios' ? 0 : 5
    },
    tabBarStyle: {
        backgroundColor: colors.white_color,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        height: Platform.OS == "ios" ? hp(14) : hp(12.5),
        shadowColor: colors.black,
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { height: 2.5, width: 0 },
        elevation: 8,
        borderTopWidth: 0,
    }
})