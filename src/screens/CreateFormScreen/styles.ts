import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    billSectionTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
    },
    titleContainer: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue1_color
    },
    dropdown: {
        height: 50,
        backgroundColor: 'transparent',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    modalStyle: {
        right: wp(0)
    },
    container: {
        backgroundColor: colors.gray_1,
        borderRadius: 5,
        paddingHorizontal: wp(5),
        paddingVertical: wp(3.5),
        shadowColor: Platform.OS == 'ios' ? "rgba(0, 0, 0, 0.09)" : "rgba(0, 0, 0, 0.4)",
        shadowOpacity: 5,
        shadowRadius: 10,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    },
    textStyle: {
        color: colors.dark_blue1_color,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.REGULAR_18
    },
    separator: {
        height: hp(1),
    },
})