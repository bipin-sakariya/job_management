import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from './Colors'
import fonts from './Fonts'
import FontSizes from './FontSizes'

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.app_bg
    },
    headerIcon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    headerTitle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.black
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})