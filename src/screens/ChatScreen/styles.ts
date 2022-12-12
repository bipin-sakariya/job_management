import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    messageTxt: {
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.chat_right_Txt
    },
    composermainview: {
        alignItems: "center",
        flexDirection: 'row',
        flex: 1,
    },
})