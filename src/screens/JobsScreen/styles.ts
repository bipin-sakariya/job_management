import { I18nManager, StyleSheet } from 'react-native';
import { colors } from '../../styles/Colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { globalStyles } from '../../styles/globalStyles';

export const styles = StyleSheet.create({
    jobTypeTxt: {
        fontSize: FontSizes.MEDIUM_16,
        fontFamily: fonts.FONT_POP_MEDIUM,
        paddingHorizontal: wp(1),
        color: colors.dark_blue1_color
    },
    downIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    searchinputtext: {
        width: wp(80),
        // zIndex: 99999999,
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: RFValue(15),
        // marginLeft: wp(5),
        color: colors.black,
        height: wp(15),
        // backgroundColor: 'red',
        paddingHorizontal: wp(3),
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        writingDirection: I18nManager.getConstants().isRTL ? "rtl" : "ltr",
    },
    searchviewimage: {
        width: wp(5),
        height: wp(5),

    },
    searchinputview: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        ...globalStyles.rtlDirection,
        // backgroundColor: 'red'
        // marginTop: wp(12),

        // color: colors.black
    },
})