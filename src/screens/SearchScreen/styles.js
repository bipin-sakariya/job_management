
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";

export const styles = StyleSheet.create({
    searchinputtext: {
        width: wp(80),
        zIndex: 99999999,
        // fontFamily: AppFonts.MONTSERRAT_MEDIUM,
        fontSize: RFValue(15),
        // marginLeft: wp(5),
        color: colors.black,
        height: wp(15),
        // backgroundColor: 'red',
        paddingHorizontal: wp(3)
    },
    searchviewimage: {
        width: wp(5),
        height: wp(5),

    },
    searchinputview: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: wp(12),

        color: colors.black
    },
    JobTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2),
    },
    billListTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        marginHorizontal: wp(2),
        color: colors.dark_blue2_color
    },
    noteIconStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain",
        tintColor: colors.dark_blue1_color
    },
    separator: {
        height: hp(1.4),
    },
})