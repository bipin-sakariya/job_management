import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    textInputStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue3_color,
        width: '87%'
    },
    commonTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color
    },
    mapPinImageStyle: {
        width: wp(7),
        height: wp(7),
        resizeMode: 'contain',
        marginHorizontal: wp(2)
    },
    TxtInputviewStyle: {
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.3),
        borderRadius: wp(3),
        paddingVertical: wp(3),
        marginVertical: wp(3)
    }
})
