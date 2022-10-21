import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'

interface TableHeaderViewProps {
    type?: string
}
const TableHeaderView = ({ type }: TableHeaderViewProps) => {
    return (
        <>
            <View style={[globalStyles.rowView, styles.listHeaderView, { paddingHorizontal: type == 'form' ? wp(5) : wp(2), }]}>
                <Text style={[styles.commonScammedTxt, { width: wp(15) }]}>Sr no.</Text>
                <Text style={[styles.commonScammedTxt, { width: wp(32) }]}>Name</Text>
                <Text style={[styles.commonScammedTxt, { width: wp(11) }]}>QTY</Text>
                <Text style={[styles.commonScammedTxt, { width: wp(10) }]}>Unit</Text>
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
        backgroundColor: colors.light_blue_color,
        marginVertical: wp(2),
    },
})