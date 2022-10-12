import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { ImagesPath } from '../utils/ImagePaths'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'

interface CustomSubTitleWithImageComponentProps {
    title: string,
    titleStyle?: TextStyle,
    image?: ImageSourcePropType,
    imageStyle?: ImageStyle,
    viewStyle?: ViewStyle
}

const CustomSubTitleWithImageComponent = ({ title, titleStyle, image, imageStyle, viewStyle }: CustomSubTitleWithImageComponentProps) => {
    return (
        <View style={[globalStyles.rowView, viewStyle, { paddingVertical: wp(1.5) }]}>
            <Image source={image} style={[styles.imageStyle, imageStyle]} />
            <Text style={[styles.commonTxt, titleStyle]}>{title}</Text>
        </View>
    )
}

export default CustomSubTitleWithImageComponent

const styles = StyleSheet.create({
    imageStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain'
    },
    commonTxt: {
        marginHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.light_brown
    },
})