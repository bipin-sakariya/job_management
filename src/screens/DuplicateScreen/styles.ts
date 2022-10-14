import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    bottomTxtStyle: {
        paddingVertical: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
    dashedStyle: {
        borderColor: colors.bottom_tab_bg,
        borderStyle: "dashed",
        borderWidth: wp(0.5),
        paddingHorizontal: wp(3),
        paddingVertical: wp(5),
        borderRadius: wp(2),
        marginLeft: wp(3),
        marginTop: wp(-0.5)
    },
    mapPinIcon: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain"
    },
    duplicateFirstView: {
        backgroundColor: colors.gray_11,
        padding: wp(5),
        borderRadius: wp(2)
    }


})