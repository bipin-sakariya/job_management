import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    bottomTxtStyle: {
        paddingVertical: wp(2),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue2_color,
    },
    modalInnerView: {
        width: wp(80),
        backgroundColor: 'white',
        borderRadius: wp(3),
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: wp(2),
        paddingVertical: wp(4),
        alignSelf: 'center'
    },
    modalDescriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black,
        paddingVertical: wp(4)
    }
})