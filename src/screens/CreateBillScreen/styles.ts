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
    commonTxt: {
        marginHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.light_brown
    },
    dashedView: {
        borderColor: colors.light_brown,
        borderWidth: wp(0.3),
        borderRadius: wp(2),
        borderStyle: 'dashed',
        paddingVertical: wp(8),
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        marginVertical: wp(2)
    },
    dashedTxt: {
        marginHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
    imageStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    iconStyle: {
        width: wp(8),
        height: wp(8),
        resizeMode: 'contain'
    }
})