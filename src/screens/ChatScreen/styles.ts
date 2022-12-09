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

    },
    inputToolBarTextInputStyle: {
        ...globalStyles.rtlStyle,
        textAlign: "right",
        flex: 1,
        backgroundColor: colors.light_blue_color,
        paddingHorizontal: wp(1.5),
        borderRadius: wp(1),
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
    cameraViewStyle: { flex: 1 }
})