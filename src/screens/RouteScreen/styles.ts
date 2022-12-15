import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    textInputStyle: {
        paddingVertical: wp(3),
        paddingHorizontal: wp(2),
        marginBottom: wp(3),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.4),
        borderRadius: wp(2),
        color: colors.dark_blue3_color,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        textAlign: "right"
    },
    boxShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOpacity: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5,
        width: '100%',
        position: 'absolute',
        bottom: wp(5)
    },
    mapdirectionIcon: {
        height: wp(22),
        width: wp(10),
        resizeMode: "contain",
        marginVertical: wp(4),
        marginHorizontal: wp(2)
    },
    closeIconContainer: {
        backgroundColor: colors.black,
        borderRadius: wp(8),
        height: wp(8),
        width: wp(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(2),
    },
    closeIcon: {
        tintColor: 'white',
        height: wp(6),
        width: wp(6)
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: wp(3),
    }
})