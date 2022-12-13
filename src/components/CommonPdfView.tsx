import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../styles/Colors'
import FontSizes from '../styles/FontSizes'
import fonts from '../styles/Fonts'

interface CommonPdfViewProps {
    item: itemDetails
    mainView?: ViewStyle
    imageViewStyle?: ViewStyle
    detailsViewStyle?: ViewStyle
    docTxtStyle?: TextStyle
    titleTxtstyle?: TextStyle
    mbTxtstyle?: TextStyle,
    onPress?: () => void
}

interface itemDetails {
    id?: number
    path: string,
    type: string | undefined
    mb: number | null
    title: string | null
}
const CommonPdfView = (props: CommonPdfViewProps) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[globalStyles.rowView, styles.mainDocView, props.mainView]}>
            <View style={[globalStyles.centerView, styles.docPdfViewStyle, props.imageViewStyle]}>
                <Text style={[styles.docTypeTxt, props.docTxtStyle, {}]}>{props.item.type}</Text>
            </View>
            <View style={[props.detailsViewStyle, { marginHorizontal: wp(1), width: wp("27%") }]}>
                <Text numberOfLines={1} style={[styles.docFileNameTxt, globalStyles.rtlStyle, props.titleTxtstyle,]}>{props.item.title}</Text>
                <Text numberOfLines={1} style={[styles.docFileSizeTxt, globalStyles.rtlStyle, props.mbTxtstyle]}>{props.item.mb}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CommonPdfView

const styles = StyleSheet.create({
    mainDocView: {
        backgroundColor: colors.gray_light_color,
        marginHorizontal: wp(1),
        padding: wp(1),
        marginVertical: wp(2),
        borderRadius: wp(2),
        paddingVertical: wp(2)
    },
    docStyle: {
        backgroundColor: colors.doc_bg_color_light_gray,
        alignItems: "center",
        justifyContent: "space-around",
        paddingVertical: wp(2),
        borderRadius: wp(2),
    },
    docPdfViewStyle: {
        width: wp(10),
        height: wp(10),
        backgroundColor: colors.dark_blue1_color,
        borderRadius: wp(2),
        marginLeft: wp(1)
    },
    docTypeTxt: {
        fontFamily: fonts.FONT_POP_BOLD,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.white_color
    },
    docFileNameTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue1_color
    },
    docFileSizeTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_blue2_color
    },
})