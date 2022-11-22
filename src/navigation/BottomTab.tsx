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
                tabBarStyle: {
                    backgroundColor: colors.white_color,
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: Platform.OS == "ios" ? hp(14) : hp(12),
                    position: 'absolute',
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowOpacity: 10,
                    shadowRadius: 10,
                    shadowOffset: { height: 0, width: 0 },
                    elevation: 5
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
                                fontFamily: focused ? fonts.FONT_POP_SEMI_BOLD : fonts.FONT_POP_MEDIUM,
                                color: focused ? colors.primary_color : colors.light_blue_Txt_color
                            }]}>
                            {strings.Map}
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
                            {strings.Job}
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
                            {strings.Inbox}
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
        height: wp(21.5),
        width: wp(21.5),
        borderRadius: wp(15),
        backgroundColor: colors.bottom_tab_btn,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: Platform.OS == 'android' ? height / wp(20) : height / wp(10),
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
    }
})