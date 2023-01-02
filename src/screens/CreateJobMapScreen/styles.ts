import { Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({

    bottomContainer: {
        paddingVertical: wp(5),
        paddingHorizontal: wp(10),
    },
    addressTxt: {
        height: hp(4)
    }

})