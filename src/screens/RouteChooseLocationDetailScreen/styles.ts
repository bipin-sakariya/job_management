import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    textInputStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.gray_9,
        width: '87%'
    },
    commonTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black
    }
})
