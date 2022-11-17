import { StyleSheet } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/Colors';

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
        color: colors.dark_blue1_color,
        paddingRight: wp(1.5)
    },
    penIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    userNameContainer: {
        top: wp(14),
        alignItems: 'center'
    },
    roleTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue3_color,
        paddingVertical: wp(1)
    },
    btnContainer: {
        width: '80%',
        marginTop: hp(1.5)
    },
    btnTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color,
        paddingVertical: wp(2.5),
        paddingHorizontal: wp(2.5)
    },
    btnIconStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    logoutTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.white_color,
        paddingVertical: wp(2.5),
    },
    logoutBtnStyle: {
        ...globalStyles.rowView,
        alignSelf: 'center',
        position: 'absolute',
        bottom: wp(6),
        backgroundColor: colors.primary_color,
        borderRadius: 10,
        paddingHorizontal: wp(10)
    },
    logoutBtn: {
        height: wp(6),
        width: wp(6),
        marginRight: wp(1),
        resizeMode: 'contain'
    },
    drawerBackGroundColor: {
        height: hp(20),
        width: "100%",
        resizeMode: "cover"
    }
})