import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
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
    dashedTxt: {
        marginHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
    addPhotoStyle: {
        height: wp(24),
        width: wp(24),
        resizeMode: 'contain',
        marginVertical: wp(4),
        alignSelf: 'center'
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