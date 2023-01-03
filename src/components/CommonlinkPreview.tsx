import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '../styles/Colors'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { JobDataProps } from '../types/commanTypes'

interface CommonlinkPreviewProps {
    containerStyle?: ViewStyle,
    job: JobDataProps,
    onPress?: () => void
}

const CommonlinkPreview = (props: CommonlinkPreviewProps) => {

    return (
        <Pressable onPress={props.onPress} style={[globalStyles.rowView, styles.containerStyle, props.containerStyle]}>
            <Image source={{ uri: 'https://dummyimage.com/600x400/000/fff' }} style={styles.renderMinimizedImageStyle} />
            <View style={{ flex: 1, paddingLeft: wp(2) }}>
                <View style={[globalStyles.rowView, globalStyles.rtlDirection, { flex: 1, justifyContent: 'space-between' }]}>
                    <Text numberOfLines={1} style={[styles.jobTitleTxt]}>{props.job.name}</Text>
                    <View style={[globalStyles.rowView, styles.pinImageViewStyle]}>
                        <Image source={ImagesPath.map_pin_dark_line_icon} style={styles.pinImageStyle} />
                        <Text numberOfLines={1} style={styles.jobDistanceTxt}>{props.job.distance} away</Text>
                    </View>
                </View>
                <Text numberOfLines={2} style={[styles.jobDetailsTxt]}>{props.job.descriprion}</Text>
            </View>
        </Pressable>
    )
}

export default CommonlinkPreview

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: colors.light_blue_color_1,
        padding: wp(2),
        borderRadius: wp(2)
    },
    renderMinimizedImageStyle: {
        height: wp(19),
        width: wp(19),
        borderRadius: wp(2)
    },
    jobTitleTxt: {
        maxWidth: '50%',
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color
    },
    pinImageViewStyle: {
        width: "40%",
        justifyContent: 'flex-end'
    },
    pinImageStyle: {
        height: wp(4),
        width: wp(4),
        resizeMode: 'contain'
    },
    jobDistanceTxt: {
        ...globalStyles.rtlDirection,
        marginHorizontal: wp(0.5),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#7F7F7F'
    },
    jobDetailsTxt: {
        ...globalStyles.rtlStyle,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_gray_color,
        width: "100%",
    },
})