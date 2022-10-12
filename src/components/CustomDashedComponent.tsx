import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { colors } from '../styles/Colors'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
interface CustomDashedComponentProps {
    title: string
    image: ImageSourcePropType
    onPress: () => void
    viewStyle?: ViewStyle
    imageStyle?: ImageStyle
    textStyle?: TextStyle
}
const CustomDashedComponent = ({ title, image, onPress, viewStyle, imageStyle, textStyle }: CustomDashedComponentProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.dashedView, viewStyle]}>
            <Image source={image} style={[globalStyles.headerIcon, imageStyle]} />
            <Text style={[styles.dashedTxt, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomDashedComponent

const styles = StyleSheet.create({
    dashedView: {
        borderColor: colors.light_brown,
        borderWidth: wp(0.3),
        borderRadius: wp(2),
        borderStyle: 'dashed',
        paddingVertical: wp(8),
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        marginVertical: wp(2)
    },
    dashedTxt: {
        marginHorizontal: wp(2),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.light_brown
    },
})