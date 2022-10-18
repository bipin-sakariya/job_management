import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
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
    },
    commonTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.MEDIUM_16,
        color: '#666666'
    },
    tagStyle: {
        paddingHorizontal: wp(2),
        paddingVertical: wp(2),
        marginBottom: wp(2),
        borderRadius: wp(1),
        marginRight: wp(2)
    },
    viewAllJobs: {
        justifyContent: "space-between",
        paddingHorizontal: wp(3),
        borderRadius: wp(2),
        paddingVertical: wp(3),
        backgroundColor: "#F5F5F5",
        marginBottom: wp(2)
    }
})