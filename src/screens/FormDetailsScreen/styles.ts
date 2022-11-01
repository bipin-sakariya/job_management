import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    billSectionTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    sammedView: {
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        marginVertical: wp(3),
        // paddingBottom: wp(2)
    },
    noNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black_1
    },
    sammedSepratorLine: {
        height: wp(0.2),
        backgroundColor: colors.white_3,
        marginVertical: wp(2),
        marginHorizontal: wp(3)
    },
    formHeaderView: {
        backgroundColor: colors.light_blue_color,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    }
})