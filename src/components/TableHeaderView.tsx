import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'
import { strings } from '../languages/localizedStrings'

interface TableHeaderViewProps {
    type?: string
}
const TableHeaderView = ({ type }: TableHeaderViewProps) => {
    return (
        <>
            <View style={[globalStyles.rowView, styles.listHeaderView, { justifyContent: 'space-around' }]}>
                <Text style={[styles.commonScammedTxt, { width: wp(15) }]}>{strings.Srno}</Text>
                <Text style={[styles.commonScammedTxt, { width: wp(32) }]}>{strings.Name}</Text>
                <Text style={[styles.commonScammedTxt, { width: wp(11) }]}>{strings.QTY}</Text>
                <Text style={[styles.commonScammedTxt, { width: wp(10) }]}>{strings.Unit}</Text>
            </View>
            <View style={[styles.sammedSepratorLine, { marginHorizontal: type == 'form' ? wp(3) : wp(1) }]} />
        </>
    )
}

export default TableHeaderView

const styles = StyleSheet.create({
    listHeaderView: {
        marginVertical: wp(1),
        paddingTop: wp(1)
    },
    commonScammedTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue1_color,
        ...globalStyles.rtlStyle
    },
    sammedSepratorLine: {
        height: wp(0.2),
        backgroundColor: colors.text_input_border_color,
        marginVertical: wp(2),
    },
})