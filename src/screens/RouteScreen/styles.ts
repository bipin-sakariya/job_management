import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    textInputStyle: {
        paddingVertical: wp(3),
        paddingHorizontal: wp(2),
        marginBottom: wp(3),
        borderColor: colors.gray_9,
        borderWidth: wp(0.4),
        borderRadius: wp(2),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16
    },
    boxShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
        width: '100%',
        position: 'absolute',
        bottom: wp(5)
    },
})