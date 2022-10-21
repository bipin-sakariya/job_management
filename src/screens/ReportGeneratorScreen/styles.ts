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
        color: colors.gray_6
    },
    calendarArrowIcon: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain',
    },
    calendarStyle: {
        backgroundColor: colors.calendar_Bg,
        borderRadius: wp(2),
        marginVertical: wp(5),
    },
    iconStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain"
    },
    genrateTxt: {
        textAlign: "center",
        marginHorizontal: wp(1),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color
    },
    JobsTxt: {
        textAlign: "center",
        marginHorizontal: wp(1),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue2_color
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color
    },
    commonTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue2_color
    },
    authorTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue1_color
    },
    sepratorLine: {
        height: wp(0.5),
        backgroundColor: colors.white_1,
        marginVertical: wp(1)
    },
    lineSeprator: {
        height: wp(4)
    },
    mainListView: {
        backgroundColor: colors.white_2,
        paddingHorizontal: wp(3),
        paddingVertical: wp(3),
        borderRadius: wp(2)
    },
    noNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black_1
    },
    sammedSepratorLine: {
        height: wp(0.2),
        backgroundColor: colors.text_input_border_color,
        marginVertical: wp(2),
        marginHorizontal: wp(1)
    },
    sammedView: {
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        padding: wp(2),
        marginVertical: wp(3)
    },
    commonScammedTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.light_brown
    },
    imageViewStyle: {
        width: wp(3),
        height: wp(3),
        resizeMode: 'contain',
    },
    imageView: {
        width: wp(5),
        height: wp(5),
        backgroundColor: colors.gray_7,
        marginRight: wp(1),
        borderRadius: wp(1)
    },
    listHeaderView: {
        height: wp(5),
        paddingHorizontal: wp(2),
        marginVertical: wp(1)
    },
})