
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../styles/Colors';
import { globalStyles } from '../../styles/globalStyles';

export const styles = StyleSheet.create({
    appLogo: {
        height: wp(30),
        width: wp(50),
        resizeMode: 'contain',
        marginLeft: wp(-6),
        marginTop: Platform.OS == "ios" ? wp(10) : wp(20)
    },
    titleTxt: {
        color: colors.dark_blue4_color,
        fontSize: FontSizes.EXTRA_LARGE_34,
        fontFamily: fonts.FONT_POP_REGULAR,
        width: wp(94),
        ...globalStyles.rtlStyle
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
        // marginVertical: wp(3),
        textAlign: 'right'
    },
    forgetPassViewStyle: {
        flex: 1,
        marginHorizontal: wp(8),
        marginVertical: wp(3),

    },
    forgetPassTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_LARGE_24,
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
        fontSize: Platform.OS == "ios" ? FontSizes.EXTRA_SMALL_12 : RFValue(13),
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