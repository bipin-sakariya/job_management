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
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
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
        color: colors.drak_light_brown
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
    },
    bottomTxtStyle: {
        paddingVertical: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
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
    mainDocView: {
        paddingVertical: wp(3),
        width: '100%',
        justifyContent: "space-between"
    },
    docStyle: {
        backgroundColor: colors.doc_bg_color_light_gray,
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: wp(2),
        borderRadius: wp(2),
    },
    docPdfViewStyle: {
        width: wp(10),
        height: wp(10),
        backgroundColor: colors.doc_bg_color_dark_gray,
        borderRadius: wp(2),
        marginLeft: wp(2)
    },
    docTypeTxt: {
        fontFamily: fonts.FONT_POP_BOLD,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.black_1
    },
    docFileNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.light_brown
    },
    docFileSizeTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.light_brown
    },
    fieldTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        color: '#5B5B5B'
    },
    roleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#8E8E8E'
    },
    dateTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.brown
    },
    jobView: {
        paddingVertical: wp(2),
        justifyContent: "space-between"
    },
    jobImageView: {
        height: wp(10),
        width: wp(10),
        backgroundColor: colors.doc_bg_color_dark_gray,
        borderRadius: wp(2),
        justifyContent: "center",
        alignItems: "center"
    },
    jobImage: {
        height: wp(7),
        width: wp(7),
    },
    jobDetailsView: {
        marginHorizontal: wp(2),
        width: wp(30)
    },
    backgroundVideo: {
        height: wp(50),
        width: '100%',
        backgroundColor: "green",
        borderRadius: wp(3),
    },
    imageMainView: {
        backgroundColor: "red",
        height: wp(50),
        borderRadius: wp(3),
        width: wp("94%")
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
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: wp(-5),
        alignSelf: "center",
    },
    bottomBtnView: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    },
})