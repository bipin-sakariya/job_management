import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    recentallyView: {
        backgroundColor: colors.white_color,
        height: Platform.OS == "ios" ? hp(27.5) : hp(34.5),
        padding: wp(4),
        borderRadius: wp(3),
        marginHorizontal: wp(2),
        marginVertical: wp(2)
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
        color: '#404040',
        maxWidth: wp(35)
    },
    desTxt: {
        maxWidth: wp(50),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.black
    },
    containerShadow: {
        shadowColor: Platform.OS == "ios" ? "rgba(0, 0, 0, 0.05)" : "rgba(0, 0, 0, 0.2)",
        shadowOpacity: 5,
        shadowRadius: 20,
        shadowOffset: { height: 0, width: 0 },
        elevation: 10
    },
    jobListViewStyle: { marginHorizontal: wp(1), flex: 1, paddingBottom: wp(3) },
    dottedViewStyle: { marginHorizontal: wp(4), marginVertical: wp(3), paddingVertical: wp(5.5) },
    dottedTxtStyle: { fontSize: FontSizes.EXTRA_LARGE_24, color: colors.dark_blue2_color },
    dottedImageStyle: { width: wp(8), height: wp(8), resizeMode: 'contain', tintColor: colors.dark_blue2_color },
    recentJobListViewStyle: { height: Platform.OS == "ios" ? hp("32%") : hp("40%"), backgroundColor: colors.white_color, paddingVertical: wp(3) }
})
