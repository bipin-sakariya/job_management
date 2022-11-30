import { StyleSheet } from "react-native";
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
    sammedView: {
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
        borderRadius: wp(2),
        marginVertical: wp(3),
        // paddingBottom: wp(2)
    },
    noNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black_1
    },
    sammedSepratorLine: {
        height: wp(0.2),
        backgroundColor: colors.text_input_border_color,
        marginVertical: wp(2),
        marginHorizontal: wp(3)
    },
    formHeaderView: {
        backgroundColor: colors.light_blue_color,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2),
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    jobListMainView: {
        paddingVertical: wp(3),
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
        borderWidth: wp(0.3),
        borderRadius: wp(3),
        borderColor: colors.text_input_border_color
    },
    roundView: {
        height: wp(6),
        width: wp(6),
        borderRadius: wp(6),
        borderColor: colors.brown,
        borderWidth: wp(0.4),
        alignItems: 'center',
        justifyContent: "center"
    },
    jobNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
    roundFillView: {
        height: wp(5.5),
        width: wp(5.5),
        borderRadius: wp(5),
        borderColor: colors.white_5,
        borderWidth: wp(0.5),
    },
    modalView: {
        width: wp(85),
        height: wp(60),
        backgroundColor: 'white',
        borderRadius: wp(3),
        justifyContent: 'space-around',
        alignItems: "center",
        paddingHorizontal: wp(6),
        marginVertical: wp(10),
    },
    modalTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.black,
        textAlign: "center"
    },
    noBtnTxt: {
        color: colors.black,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16
    },
    addFormView: {
        alignItems: 'center',
        marginHorizontal: wp(2),
        marginVertical: wp(2),
        borderRadius: wp(1),
        justifyContent: "center",
        paddingVertical: wp(2),
        backgroundColor: colors.primary_color
    },
    checkView: {
        backgroundColor: colors.brown,
        width: wp(6),
        height: wp(6),
        borderRadius: wp(6),
        resizeMode: "contain",
    },
    roundBtnView: {
        height: wp(15),
        width: wp(15),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        left: wp(2),
    },
    roundImageStyle: {
        width: wp(15),
        height: wp(15),
        resizeMode: "contain"
    },
    addFormTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.white
    },
    bottomTxtStyle: {
        paddingVertical: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
    },
    itemListTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue2_color,
    },
    checkBoxIcon: {
        height: wp(6),
        width: wp(6)
    },
    checkBoxIcon1: {
        height: wp(5),
        width: wp(5)
    }
})
