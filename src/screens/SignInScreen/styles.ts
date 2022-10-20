
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    appLogo: {
        height: wp(30),
        width: wp(50),
        resizeMode: 'contain',
        marginLeft: wp(-6),
    },
    titleTxt: {
        fontSize: RFValue(34),
        fontFamily: fonts.FONT_POP_SEMI_BOLD,
        width: wp(94),
        // writingDirection: 'rtl'
    },
    iconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    }
})