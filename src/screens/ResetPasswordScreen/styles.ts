import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    iconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    }
})