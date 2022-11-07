
import { I18nManager, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../styles/Colors';

export const styles = StyleSheet.create({
    appLogo: {
        height: wp(30),
        width: wp(50),
        resizeMode: 'contain',
        marginLeft: wp(-6),
    },
    titleTxt: {
        color: '#19253A',
        fontSize: RFValue(34),
        fontFamily: fonts.FONT_POP_SEMI_BOLD,
        width: wp(94),
        writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'
    },
    iconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    forgetPassTxt: {
        color: colors.primary_color,
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        marginVertical: wp(3),
        textAlign: 'right'
    },
    forgetPassViewStyle: {
        flex: 1,
        marginHorizontal: wp(8),
        marginVertical: wp(3),

    },
    forgetPassTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.LARGE_22,
        color: colors.dark_blue1_color
    },
    enterEmailTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue2_color
    },
    sucessText: {
        marginVertical: wp(3),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue3_color,
    },
    imageStyle: {
        width: wp(25),
        height: wp(25),
        marginVertical: wp(3)
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    indicatorStyle: {
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "white",
        width: '100%',
        zIndex: 1
    }
})