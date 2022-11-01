import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    jobListMainView: {
        paddingVertical: wp(3),
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
        borderWidth: wp(0.3),
        borderRadius: wp(3),
        borderColor: colors.text_input_border_color,
        marginVertical: wp(2)
    },
    roundView: {
        height: wp(6),
        width: wp(6),
        borderRadius: wp(6),
        borderColor: colors.brown,
        borderWidth: wp(0.4),
        alignItems: 'center',
        justifyContent: "center"
    },
    jobNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.black
    },
    roundFillView: {
        height: wp(5.5),
        width: wp(5.5),
        borderRadius: wp(5),
        borderColor: colors.white_5,
        borderWidth: wp(0.5),
    },
    textInputStyle: {
        height: wp(20),
        marginTop: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.3),
        borderRadius: wp(2),
        padding: wp(2),
    },
    textInputFontStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.doc_bg_color_dark_gray
    },
    modalView: {
        width: wp(85),
        height: wp(70),
        backgroundColor: colors.white_5,
        borderRadius: wp(3),
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: wp(6),
        marginVertical: wp(10),
    },
    modalTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black,
        textAlign: "center"
    },
})