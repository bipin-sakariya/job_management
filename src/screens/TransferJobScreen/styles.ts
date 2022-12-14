import { I18nManager, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import { globalStyles } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
    buttonView: {
        width: '100%',
        position: 'absolute',
        bottom: wp(2),
        borderRadius: wp(1)
    },
    modalView: {
        width: wp(85),
        height: wp(60),
        backgroundColor: 'white',
        borderRadius: wp(3),
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: wp(6),
        marginVertical: wp(10),
        alignSelf: 'center'
    },
    modalTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black,
        textAlign: "center"
    },
    noBtnTxt: {
        color: colors.primary_color,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16
    },
    searchinputtext: {
        width: wp(80),
        // zIndex: 99999999,
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: RFValue(15),
        // marginLeft: wp(5),
        color: colors.black,
        height: wp(15),
        // backgroundColor: 'red',
        paddingHorizontal: wp(3),
        textAlign: I18nManager.isRTL ? 'right' : 'left',
        writingDirection: I18nManager.getConstants().isRTL ? "rtl" : "ltr",
    },
    searchviewimage: {
        width: wp(5),
        height: wp(5),

    },
    searchinputview: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        ...globalStyles.rtlDirection,
        // backgroundColor: 'red'
        // marginTop: wp(12),

        // color: colors.black
    },
})