import { Image, ImageProps, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../styles/Colors'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'

interface CustomBlackButtonProps {
    title: string,
    onPress?: () => void,
    image?: ImageSourcePropType,
    buttonStyle?: ViewStyle,
    imageStyle?: ImageStyle,
    textStyle?: TextStyle
}

const CustomBlackButton = ({ title, onPress, image, buttonStyle, imageStyle, textStyle }: CustomBlackButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[globalStyles.rowView, styles.blackBtnStyle, buttonStyle]}>
            <Image source={image} style={[imageStyle, styles.imageView]} />
            <Text style={[styles.btnTextStyle, textStyle,]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomBlackButton

const styles = StyleSheet.create({
    blackBtnStyle: {
        backgroundColor: colors.black,
        justifyContent: 'center',
        width: wp(50),
        alignSelf: "center",
        paddingVertical: wp(2),
        borderRadius: wp(1),
        marginVertical: wp(5)
    },
    btnTextStyle: {
        color: colors.white,
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        marginHorizontal: wp(2)
    },
    imageView: {
        width: wp(8),
        height: wp(8),
        resizeMode: 'contain'
    },
})