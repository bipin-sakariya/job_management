import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    openButton: {
        height: wp(5),
        backgroundColor: colors.status_btn,
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp(1.5),
    },
    smallBut: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.white_5
    },
    commonDarkTxt: {
        width: wp(45),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14
    },
    commonLightTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#7C7C7C'
    },
    boxView: {
        height: wp(5),
        width: wp(5),
        backgroundColor: 'white',
        zIndex: 1,
        position: "absolute",
        left: wp(1.5),
        justifyContent: "center",
        alignItems: 'center',
        borderColor: '#737373',
        borderWidth: wp(0.3),
        marginVertical: wp(5)
    },
    mainTimeLineView: {
        flex: 1,
        marginLeft: wp(3),
        marginBottom: wp(2)
    },
    imageView: {
        backgroundColor: '#9F9F9F',
        width: wp(15),
        height: wp(15),
        borderRadius: wp(2),
    },
    imageStyle: {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain'
    },
    itemDetailsView: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
    itemAndBtnView: {
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: wp(3)
    },
    infoImageView: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
        marginRight: wp(1)
    },
    mapPinStyle: {
        height: wp(4.5),
        width: wp(4.5),
        resizeMode: 'contain'
    }
})