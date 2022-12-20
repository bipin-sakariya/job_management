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
    JobTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        marginHorizontal: wp(2),
        color: colors.black
    },
    infoCircle: {
        height: wp(8),
        width: wp(8),
        resizeMode: "contain"
    },
    jobTitle: {
        fontFamily: fonts.FONT_POP_SEMI_BOLD,
        fontSize: FontSizes.SEMI_LARGE_20,
        marginHorizontal: wp(2),
        color: colors.dark_blue1_color,
        maxWidth: wp(50)
    },
    statusBut: {
        backgroundColor: colors.status_btn,
        borderRadius: wp(1)
    },
    statusBtnTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        textAlign: "center",
        marginHorizontal: wp(2),
        marginVertical: wp(0.5),
        color: colors.white,
        maxWidth: wp(20)
    },
    bottomTxtStyle: {
        paddingVertical: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue2_color,
    },
    mapPinIcon: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain"
    },
    dashedStyle: {
        borderColor: colors.bottom_tab_bg,
        borderStyle: "dashed",
        borderWidth: wp(0.5),
        paddingHorizontal: wp(5),
        paddingVertical: wp(5),
        borderRadius: wp(2),
        marginLeft: wp(3),
        marginTop: wp(-0.5)
    },
    imageView: {
        height: wp(50),
        borderRadius: wp(3),
        resizeMode: "cover"
    },
    activeDotStyle: {
        width: 15,
        height: 5,
        borderRadius: 5,
        marginHorizontal: -8,
        backgroundColor: colors.brown
    },
    inactiveDotStyle: {
        width: 10,
        height: 10,
        backgroundColor: colors.bottom_tab_bg,
    },
    paginationDots: {
        backgroundColor: colors.transparent,
        position: 'absolute',
        bottom: wp(-5),
        alignSelf: "center",
    },
    bottomBtnView: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: colors.white_color,
    },
    modalInnerView: {
        width: wp(80),
        height: wp(50),
        backgroundColor: 'white',
        borderRadius: wp(3),
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: wp(2),
        marginVertical: wp(10),
    },
    jobReturnTxt: {
        marginHorizontal: wp(2),
        color: colors.dark_blue1_color,
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16
    },
    imageStyle: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    warningView: {
        backgroundColor: colors.light_blue_color,
        width: '100%',
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        paddingVertical: wp(4),
        marginBottom: wp(3)
    },
    reasonTxt: {
        color: colors.dark_blue3_color,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12
    },
    commonTxt: {
        color: colors.gray_8,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        marginVertical: wp(1),
        maxWidth: wp(95)
    },
    sammedView: {
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        marginBottom: wp(4)
        // paddingBottom: wp(2)
    },
    formHeaderView: {
        backgroundColor: colors.light_blue_color,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    noNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color
    },
    sammedSepratorLine: {
        height: wp(0.2),
        backgroundColor: colors.light_blue_color,
        marginVertical: wp(2),
        marginHorizontal: wp(3)
    },

    deleteBtnTxt: {
        backgroundColor: colors.white_5,
        borderColor: colors.black,
        borderWidth: wp(0.2),
        paddingHorizontal: wp(9),
        borderRadius: wp(2)
    }
})