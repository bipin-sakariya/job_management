import { StyleSheet } from 'react-native';
import React from 'react';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/Colors';

export const styles = StyleSheet.create({
    addUserContainer: {
        width: wp(92),
        alignSelf: 'center',
        ...globalStyles.centerView,
        borderRadius: 10,
        borderColor: colors.bottom_tab_bg,
        borderStyle: "dashed",
        borderWidth: wp(0.5),
        ...globalStyles.rowView,
        marginVertical: wp(2.5)
    },
    addBtnStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain',
        marginRight: wp(2.5)
    },
    addNewUserTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.LARGE_22,
        color: '#666666',
        paddingVertical: wp(5)
    },
    subTitleTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: '#666666',
        paddingHorizontal: wp(1.5)
    },
    folderIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    separator: {
        height: hp(1.4),
    },
    dashViewTxt: {
        color: colors.dark_blue1_color, 
        fontSize: FontSizes.EXTRA_LARGE_24
    },
    dashViewImg: {
        height: wp(10), 
        width: wp(10), 
        tintColor: colors.dark_blue1_color
    },
    dashView: {
        paddingVertical: wp(5), 
        borderColor: colors.gray_color
    }
})