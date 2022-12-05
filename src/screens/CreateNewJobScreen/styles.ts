import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    modalInnerView: {
        width: wp(80),
        height: wp(50),
        backgroundColor: 'white',
        borderRadius: wp(3),
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: wp(2),
        marginVertical: wp(10),
        alignSelf: 'center'
        // borderColor: colors.text_input_border_color
    },
    bottomTxtStyle: {
        paddingVertical: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
})
