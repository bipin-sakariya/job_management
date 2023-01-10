import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
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
        fontSize: FontSizes.MEDIUM_16,
        marginHorizontal: wp(2),
        color: colors.light_brown
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
    vwDate: {
        borderWidth: 1,
        borderRadius: wp(2),
        padding: wp(2),
        marginBottom: hp(2),
        borderColor: colors.gray_border,
        flex: 1,
    },
    txtDate: {
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color,
        fontFamily: fonts.FONT_POP_REGULAR
    },
    boxShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 0.7,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
        width: '50%'
    },
    emptyTextStyle: {
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color,
        fontFamily: fonts.FONT_POP_REGULAR,
        alignSelf: 'center',
    },
})