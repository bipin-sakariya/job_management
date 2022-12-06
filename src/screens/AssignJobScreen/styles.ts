import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

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
})
