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
        color: '#404040'
    },
    jobDetailHeaderView: {
        justifyContent: "space-between",
        marginVertical: wp(1),
        width: '100%'
    },
    pinImageViewStyle: {
        width: "50%",
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
        top: 0,
        padding: wp(2)
    },
    closeBtnStyle: {
        width: wp(3.5),
        height: wp(3.5),
        resizeMode: "contain"
    },
})