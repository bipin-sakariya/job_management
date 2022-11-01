import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    JobTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    billListTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        marginHorizontal: wp(2),
        color: colors.dark_blue2_color
    },
    noteIconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
        tintColor: colors.dark_blue1_color
    },
    listMainView: {
        justifyContent: 'space-between',
        paddingVertical: wp(5),
        backgroundColor: colors.white_color,
        borderRadius: wp(2),
        paddingHorizontal: wp(2),
        marginHorizontal: wp(2),
        width: wp(80)
    },
    imageView: {
        height: wp(10),
        width: wp(10),
        backgroundColor: colors.gray_7,
        borderRadius: wp(1)
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color
    },
    dateTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        marginHorizontal: wp(2),
        color: colors.dark_blue2_color
    },
    dropDownShadowStyle: {
        shadowColor: Platform.OS == "ios" ? "rgba(0, 0, 0, 0.06)" : "rgba(0, 0, 0, 0.6)",
        shadowOpacity: 5,
        shadowRadius: 8,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
    },
    checkIcon: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain',
    },
})