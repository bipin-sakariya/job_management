import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    buttonView: {
        width: '100%',
        position: 'absolute',
        bottom: wp(2),
        borderRadius: wp(1)
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
    }
})