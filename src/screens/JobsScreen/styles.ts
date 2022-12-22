import { I18nManager, StyleSheet } from 'react-native';
import { colors } from '../../styles/Colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    dateTxtStyle: {
        fontSize: FontSizes.MEDIUM_16,
        fontFamily: fonts.FONT_POP_REGULAR,
        paddingHorizontal: wp(2),
        color: colors.dark_blue2_color,
    },
})