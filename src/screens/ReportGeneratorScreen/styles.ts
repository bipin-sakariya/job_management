import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    leftArrowIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
    },
    ReportTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    noteIconStyle: {
        width: wp(5),
        height: wp(5),
        resizeMode: "contain"
    },
    reportTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        marginHorizontal: wp(2),
        color: colors.light_brown
    },
    calenderHeaderStyle: {
        marginVertical: wp(2),
        textAlign: "center",
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: '#595959'
    },
    calendarArrowIcon: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
    },
    calenderStyle: {
        backgroundColor: "#F7F7F7",
        borderRadius: wp(2),
        marginVertical: wp(5)
    },
})