import { StyleSheet } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';

export const styles = StyleSheet.create({
    topView: {
        height: hp(20),
        backgroundColor: '#B3B3B3'
    },
    userPlaceholderStyle: {
        height: wp(24),
        width: wp(24),
        borderRadius: wp(12),
        resizeMode: 'contain',
        position: "absolute",
        bottom: wp(-12),
        alignSelf: 'center'
    },
    userNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        top: wp(15),
        textAlign: 'center',
        color: '#333333'
    }
})