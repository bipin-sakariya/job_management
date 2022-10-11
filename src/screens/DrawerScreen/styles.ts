import { StyleSheet } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { globalStyles } from '../../styles/globalStyles';

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
        color: '#333333',
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
        color: '#535353',
        paddingVertical: wp(1)
    },
    btnContainer: {
        width: '80%',
        marginTop: wp(6)
    },
    btnTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: '#535353',
        paddingVertical: wp(2.5),
        paddingLeft: wp(2.5)
    },
    btnIconStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    logoutTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: '#CCCCCC',
        paddingVertical: wp(2.5),
    },
    logoutBtnStyle: {
        ...globalStyles.rowView,
        alignSelf: 'center',
        position: 'absolute',
        bottom: wp(6),
        backgroundColor: '#262626',
        borderRadius: 10,
        paddingHorizontal: wp(10)
    },
    logoutBtn: {
        height: wp(6),
        width: wp(6),
        marginLeft: wp(2.5),
        resizeMode: 'contain'
    }
})