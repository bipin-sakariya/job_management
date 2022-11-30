import { Platform, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5)
    },
    titleContainer: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue1_color,
    },
    arrowIconStyle: {
        width: wp(18),
        height: wp(18),
        alignSelf: 'center',
        marginTop: wp(4)
    },
    btnContainerStyle: {
        paddingHorizontal: wp(2.5),
        alignItems: "center",
        height: Platform.OS == "ios" ? wp(10) : wp(12),
    },
    btnIconStyle: {
        width: wp(7),
        height: wp(7)
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
    },
    modalTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black,
        textAlign: "center"
    },
    noBtnTxt: {
        color: colors.black,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16
    },
}) 