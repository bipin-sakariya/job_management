import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    headerMenu: {
        height: wp(8.5),
        width: wp(4),
        resizeMode: 'cover',
    },
    iconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    addPhotoStyle: {
        height: wp(24),
        width: wp(24),
        resizeMode: 'contain',
        marginVertical: wp(4),
        alignSelf: 'center'
    },
    tagStyle: {
        paddingHorizontal: wp(2),
        paddingVertical: wp(2),
        marginBottom: wp(2),
        borderRadius: wp(1),
        marginRight: wp(2)
    },
    commonIconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
        tintColor: colors.dark_blue1_color
    },
    commonTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue2_color
    },
    cameraIconStyle: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain',
    },
    camreaBtnStyle: {
        alignSelf: 'center',
        position: 'absolute',
        right: wp(-3.5),
        bottom: wp(2.5)
    }
})