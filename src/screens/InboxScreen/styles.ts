import { I18nManager, StyleSheet } from 'react-native';
import React from 'react';
import fonts from '../../styles/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../styles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../../styles/globalStyles';

export const styles = StyleSheet.create({
    searchInputText: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: RFValue(15),
        color: colors.black,
        paddingHorizontal: wp(3),
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        writingDirection: I18nManager.getConstants().isRTL ? "rtl" : "ltr",
        padding: wp(2),
        flex: 1,
    },
    searchViewImage: {
        width: wp(5),
        height: wp(5),
    },
    searchInputView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        ...globalStyles.rtlDirection,
        backgroundColor: colors.white,
        borderRadius: wp(3),
        shadowColor: colors.gray_4,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.5,
        elevation: 0,
        paddingHorizontal: wp(3),
        width: wp(90),
        marginBottom: hp(2)
    },
})