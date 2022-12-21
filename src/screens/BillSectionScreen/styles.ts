import { Platform, StyleSheet } from "react-native";
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
    addPhotoStyle: {
        height: wp(20),
        width: wp(20),
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    headerMenu: {
        height: wp(8.5),
        width: wp(4),
        resizeMode: 'cover',
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
    },

})