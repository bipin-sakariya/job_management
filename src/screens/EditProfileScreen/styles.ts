import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
    profilePhoto: {
        height: wp(24),
        width: wp(24),
        marginVertical: wp(4),
        alignSelf: 'center',
    },
}) 