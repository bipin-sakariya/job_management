import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import { globalStyles } from "../../styles/globalStyles";

export const styles = StyleSheet.create({
    profilePhoto: {
        height: wp(24),
        width: wp(24),
        resizeMode: 'contain',
        marginVertical: wp(4),
        alignSelf: 'center'
    },
    btnView: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        paddingVertical: wp(3),
        backgroundColor: colors.light_blue_color,
        paddingLeft: wp(2.5),
        borderRadius: wp(2),
        marginBottom: wp(5)
    },
    btnTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color,
        ...globalStyles.rtlStyle
    }
})