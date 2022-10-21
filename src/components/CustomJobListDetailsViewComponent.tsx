import { I18nManager, Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'

interface CustomeJobListDetailsViewComponentProps {
    item: any
}

const CustomeJobListDetailsViewComponent = (props: CustomeJobListDetailsViewComponentProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity {...props} style={[styles.jobContainerStyle, styles.dropDownShadowStyle, { backgroundColor: props.item.author ? colors.white_color : colors.white_color }]}>
            <Image source={ImagesPath.placeholder_img} style={styles.jobImageStyle} />
            <View style={{ flex: 1 }}>
                <View style={styles.jobTitleContainer}>
                    <Text style={[styles.titleTxt, globalStyles.rtlStyle]}>{props.item.title}</Text>
                    <View style={[globalStyles.rowView, { direction: I18nManager.isRTL ? 'ltr' : 'rtl' }]}>
                        <Image source={ImagesPath.map_pin_dark_line_icon} style={{ width: wp(5), height: wp(5), resizeMode: 'contain' }} />
                        <Text style={[styles.distanceTxt, globalStyles.rtlStyle]}>{props.item.km}</Text>
                    </View>
                </View>
                {
                    props.item.author ?
                        <>
                            <Text style={[styles.descriptionTxt, { writingDirection: "ltr", textAlign: 'left' }]}>{props.item.jobstatus}</Text>
                            <Text style={[styles.descriptionTxt, { writingDirection: "ltr", textAlign: 'left' }]}>{props.item.author}</Text>
                        </> :
                        <Text style={[styles.descriptionTxt, globalStyles.rtlStyle]}>{props.item.description}</Text>
                }
            </View>
        </TouchableOpacity>
    )
}

export default CustomeJobListDetailsViewComponent

const styles = StyleSheet.create({
    jobContainerStyle: {
        ...globalStyles.rowView,
        backgroundColor: '#D9D9D9',
        paddingHorizontal: wp(3.5),
        paddingVertical: wp(2.5),
        borderRadius: 8,
        marginBottom: wp(4)
    },
    jobImageStyle: {
        height: wp(18),
        width: wp(18),
        resizeMode: 'contain'
    },
    jobTitleContainer: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        paddingLeft: wp(2.5),
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.dark_blue1_color
    },
    distanceTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue3_color
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue2_color
    },
    dropDownShadowStyle: {
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOpacity: 5,
        shadowRadius: 6,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    }
})