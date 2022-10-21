import { StyleSheet } from 'react-native';
import { colors } from '../../styles/Colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontSizes from '../../styles/FontSizes';
import fonts from '../../styles/Fonts';

export const styles = StyleSheet.create({
    jobTypeTxt: {
        fontSize: FontSizes.MEDIUM_16,
        fontFamily: fonts.FONT_POP_MEDIUM,
        paddingHorizontal: wp(1),
        color: colors.dark_blue1_color
    },
    downIcon: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    }
})