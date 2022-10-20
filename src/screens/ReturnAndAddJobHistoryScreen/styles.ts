import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    recentallyView: {
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        paddingHorizontal: wp(4),
        marginLeft: wp(5),
        borderRadius: wp(3),
        paddingVertical: wp(4)
    },
    imageViewStyle: {
        width: wp(50),
        backgroundColor: '#9E9E9E',
        height: wp(30),
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: wp(4),
        marginBottom: wp(2)
    },
    imageStyle: {
        width: wp(50),
        resizeMode: 'contain'
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.LARGE_22,
        color: '#404040'
    },
    desTxt: {
        maxWidth: wp(50),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.black
    }
})
