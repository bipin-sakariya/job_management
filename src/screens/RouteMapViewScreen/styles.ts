import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    openButton: {
        height: wp(5),
        backgroundColor: colors.light_blue_color,
        borderRadius: wp(1),
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: wp(1.5),
        marginHorizontal: wp(1)
    },
    smallBut: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.primary_color
    },
    commonDarkTxt: {
        width: wp(45),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color
    },
    commonLightTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_blue2_color,
        textAlign: 'left'
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
        borderColor: colors.brown,
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
    },
    indexValue: {
        borderWidth: 1,
        padding: 2,
        paddingHorizontal: wp(1.5),
        borderColor: colors.gray_1,
        color: colors.gray_1,
    },
    jobListContainer: {
        paddingHorizontal: wp(3),
        bottom: 0,
        height: hp(50),
        position: 'absolute',
        elevation: 8,
        width: wp(100),
        backgroundColor: colors.white,
        borderTopLeftRadius: wp(8),
        borderTopRightRadius: wp(8),
        shadowRadius: 8,
        shadowColor: colors.black,
        shadowOpacity: 0.08,
        shadowOffset: {
            height: -8,
            width: 0,
        },
    },
    sourceIconStyle: {
        height: wp(6),
        width: wp(6),
        // backgroundColor: 'red',
    },
    dashedLine: {
        alignItems: "center",
        height: '82%',
        position: "absolute",
        top: 45,
        left: wp(3),
    },
    timeLineContainer: {
        marginTop: wp(5),
        marginRight: wp(3)
    }
})