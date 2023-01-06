import { I18nManager, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import { globalStyles } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
    jobMainView: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    leftArrowIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
    },
    routeTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    selectBoxView: {
        height: wp(5),
        width: wp(5),
        justifyContent: "center",
        alignItems: "center",
        borderColor: colors.brown,
        borderWidth: 1.5,
    },
    rightIcon: {
        height: wp(3),
        width: wp(3),
        resizeMode: "contain",
    },
    roundFillView: {
        height: wp(5.5),
        width: wp(5.5),
        borderRadius: wp(5),
        borderColor: colors.white_5,
        borderWidth: wp(0.5),
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
})
