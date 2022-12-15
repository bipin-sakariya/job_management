import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import { globalStyles } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    messageTxt: {
        ...globalStyles.rtlStyle,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: '#444444'
    },
    composermainview: {
        alignItems: "center",
        flexDirection: 'row',
        flex: 1,
    },
    chatDateTxtStyle: {
        ...globalStyles.rtlStyle,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_gray,
    },
    inputToolBarMainViewStyle: {
        flex: 1,
        backgroundColor: colors.light_blue_color,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        borderRadius: wp(2),
        minHeight: wp(12)
    },
    inputToolBarTextInputStyle: {
        ...globalStyles.rtlStyle,
        textAlign: "right",
        flex: 1,
        backgroundColor: colors.light_blue_color,
        marginHorizontal: wp(1.5),
        fontSize: FontSizes.EXTRA_SMALL_12,
        fontFamily: fonts.FONT_POP_MEDIUM,
        color: colors.dark_blue3_color
    },
    linkImageStyle: {
        width: wp(5),
        height: wp(5),
        resizeMode: 'contain'
    },
    bottomImageStyle: { width: wp(12), height: wp(12) },
    bottomViewStyle: {
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: 'row',
        backgroundColor: colors.white_color,
        height: wp('50%'),
        width: '104%',
        borderTopLeftRadius: wp(5),
        borderTopRightRadius: wp(5),
        alignSelf: 'center',
    },
    cameraViewStyle: { flex: 1 },
    jobTitleTxt: {
        maxWidth: '50%',
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
    },
    jobDetailHeaderView: {
        justifyContent: "space-between",
        marginVertical: wp(1),
        width: '100%'
    },
    pinImageViewStyle: {
        width: "40%",
        justifyContent: 'flex-end'
    },
    pinImageStyle: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain'
    },
    jobDistanceTxt: {
        marginHorizontal: wp(0.5),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#7F7F7F'
    },
    jobDetailsTxt: {
        ...globalStyles.rtlStyle,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: '#808080',
        width: "100%",
        textAlign: "right",
    },
    closeButtonView: {
        position: "absolute",
        zIndex: 1,
        right: 0,
        top: wp(-1),
        backgroundColor: colors.white_color,
        borderRadius: wp(5),
        padding: wp(0.5)
    },
    closeBtnStyle: {
        width: wp(3.5),
        height: wp(3.5),
        resizeMode: "contain"
    },
    closeIcon: {
        height: wp(6),
        width: wp(6),
        alignSelf: 'flex-end',
        resizeMode: "contain",
        tintColor: colors.black
    },
    closeImageBtnStyle: {
        position: 'absolute',
        top: wp(10),
        left: wp(5),
        zIndex: 10,
    },
    imageStyle: {
        height: wp(20),
        width: wp(20),
        resizeMode: 'contain',
        borderRadius: wp(2),
        marginLeft: wp(2)
    },
    jobDetailsMainView: {
        flex: 1,
        marginHorizontal: wp(2)
    },
    jobDetailsViewStyle: {
        height: wp(25),
        width: wp(70),
        borderRadius: wp(3)
    },
    remainAttachmentViewStyle: {
        flex: 1,
        backgroundColor: colors.white_color,
        width: wp(42),
        paddingVertical: wp(3.5),
        borderRadius: wp(2),
        alignItems: 'center',
        marginTop: wp(2),
        marginLeft: wp(1)
    },
    remainTxtStyle: {
        ...globalStyles.rtlStyle,
        fontSize: FontSizes.EXTRA_SMALL_12,
        fontFamily: fonts.FONT_POP_MEDIUM,
    },
    sendBtnStyle: {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain',
        top: 0,
        marginVertical: wp(1),
    },
    renderImageMainStyle: {
        width: wp(66.5),
        height: wp(66.5),
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: colors.white_color,
        borderRadius: wp(2),
        marginTop: wp(2)
    },
    renderImageStyle: {
        height: wp(31),
        width: wp(31),
        backgroundColor: colors.white_color,
        margin: wp(1),
        borderRadius: wp(2),
        resizeMode: 'cover'
    },
    remainImageViewStyle: {
        height: wp(31),
        width: wp(31),
        margin: wp(1),
        backgroundColor: colors.light_blue_color,
        borderRadius: wp(2),
        justifyContent: "center",
        alignItems: 'center'
    },
    singleImageViewStyle: {
        maxWidth: wp(66.5),
        maxHeight: wp(66.5),
        margin: wp(1)
    },
    singleImageStyle: {
        width: wp(66.5),
        height: wp(66.5),
        margin: wp(1),
        backgroundColor: colors.white_color,
        borderRadius: wp(2),
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    mainViewStyle: {
        flex: 1,
        marginHorizontal: wp(2),
        marginTop: wp(12)
    },
    chatFooterMainView: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },
    jobDetailsMainViewStyle: {
        backgroundColor: colors.white_color,
        height: wp(25),
        borderRadius: wp(3),
        margin: wp(2),
        marginBottom: wp(5)
    },
    jobCloseBtnStyle: {
        position: "absolute",
        zIndex: 1,
        right: 0,
        backgroundColor: colors.white_color,
        borderRadius: wp(5),
        padding: wp(0.5)
    },
    linkContainerStyle: {
        backgroundColor: colors.light_blue_color,
        borderRadius: wp(3),
        height: wp(30),
        justifyContent: 'center'
    },
    linkMetadataContainerStyle: {
        direction: 'ltr',
        backgroundColor: colors.white_color,
        borderRadius: wp(2),
        alignItems: 'center',
        marginBottom: wp(10),
        padding: wp(2),
        width: '115%',
        alignSelf: 'center'
    },
    linkMetadataTextContainerStyle: {
        alignSelf: 'center',
        height: wp(20),
        justifyContent: 'space-between',
        paddingBottom: wp(2),
        paddingHorizontal: wp(2)
    },
    linkTextContainerStyle: {
        backgroundColor: colors.light_blue_color_1,
        marginHorizontal: wp(2),
        marginTop: wp(2),
        marginBottom: 0,
        padding: wp(2),
        borderRadius: wp(2),
        width: wp(70)
    },
    renderMinimizedImageStyle: {
        height: wp(19),
        width: wp(19),
        borderRadius: wp(2)
    },
    footerImageMainViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        padding: wp(1)
    },
    footerImageStyle: {
        height: wp(20),
        width: wp(20),
        resizeMode: 'cover',
        marginHorizontal: wp(0.5),
        borderRadius: wp(2)
    },
    footerImageViewStyle: {
        width: wp(20),
        height: wp(20),
        marginHorizontal: wp(1),
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.white_color,
        borderRadius: wp(2)
    },
    footerDocMainViewStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignSelf: 'center',
        padding: wp(1)
    },
    footerDocStyle: {
        height: wp(20),
        width: wp(20),
        backgroundColor: colors.light_gray,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: wp(2),
        marginHorizontal: wp(0.5)
    },
    footerDocViewStyle: {
        width: wp(20),
        height: wp(20),
        marginHorizontal: wp(1),
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: colors.white_color,
        borderRadius: wp(2)
    },
    footerTextContainerStyle: {
        backgroundColor: colors.light_blue_color_1,
        marginHorizontal: wp(2),
        marginVertical: wp(2),
        marginBottom: wp(5),
        padding: wp(2),
        borderRadius: wp(2)
    },
    footerMetadataTextStyle: {
        alignSelf: 'center',
        height: wp(20),
        justifyContent: 'space-between',
        paddingBottom: wp(2),
        paddingHorizontal: wp(2)
    },
    inputTextToolBarContainerStyle: {
        flex: 1,
        paddingVertical: wp(1),
        height: wp(14)
    },
    backgroundVideo: {
        height: wp(60),
        width: '100%',
        backgroundColor: colors.white_color,
        borderRadius: wp(3),
    },
})