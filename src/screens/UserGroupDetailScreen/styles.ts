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
    }
})