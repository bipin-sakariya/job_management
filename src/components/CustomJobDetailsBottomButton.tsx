import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { Colors } from 'react-native/Libraries/NewAppScreen'

interface CustomJobDetailsBottomButtonProps {
    buttonStyle?: ViewStyle,
    image?: ImageSourcePropType,
    imageStyle?: ImageStyle,
    viewStyle?: ViewStyle,
    buttonText?: string,
    buttonTextStyle?: ViewStyle,
    onPress?: () => void
}
const CustomJobDetailsBottomButton = ({ buttonStyle, image, imageStyle, buttonText, buttonTextStyle, onPress, viewStyle }: CustomJobDetailsBottomButtonProps) => {
    return (
        <View style={[styles.roundButtonStyle, buttonStyle]}>
            <TouchableOpacity style={[styles.roundViewStyle, viewStyle]} onPress={onPress}>
                <Image source={image} style={[styles.roundImageStyle, imageStyle]} />
            </TouchableOpacity>
            <Text style={[styles.roundTextStyle, buttonTextStyle]}>{buttonText}</Text>
        </View>
    )
}

export default CustomJobDetailsBottomButton

const styles = StyleSheet.create({
    roundButtonStyle: {
        alignItems: "center",
        justifyContent: "space-around"
    },
    roundViewStyle: {
        backgroundColor: "#E9E9E9",
        padding: wp(2),
        borderRadius: wp(10)
    },
    roundImageStyle: {
        width: wp(10),
        height: wp(10),
        resizeMode: 'contain',
        borderRadius: wp(10),
    },
    roundTextStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: Colors.black_1,
        marginVertical: wp(2)
    },
})