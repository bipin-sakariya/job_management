import React from 'react';
import { Image, Platform, StyleSheet, Text, TextInput, TextInputProps, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../styles/globalStyles';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import { ImagesPath } from '../utils/ImagePaths';

interface CustomTextInputWithImageProps {
    title: string | undefined,
    style?: TextStyle,
    container?: ViewStyle,
    mapStyle?: ViewStyle
    mainContainerStyle?: ViewStyle
    onpress?: () => void
}

const CustomTextInputWithImage = (props: CustomTextInputWithImageProps & TextInputProps & TouchableOpacityProps) => {

    return (
        <View style={[globalStyles.rowView, props.mainContainerStyle,]}>
            <View style={[styles.textInputContainer, props.container]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.titleTxtStyle, { textAlign: 'left' }]}>{props.title}</Text>
                </View>
                <View style={[globalStyles.rowView, styles.textInputViewStyle]}>
                    <TextInput
                        {...props}
                        style={[styles.textInputStyle, props.style, globalStyles.rtlStyle, { color: colors.dark_blue2_color, textAlign: "right" }]}
                    />
                </View>
            </View>
            <TouchableOpacity {...props} style={[styles.dashedStyle, props.mapStyle]}>
                <Image source={ImagesPath.map_pin_line_icon} style={styles.mapPinIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomTextInputWithImage;

const styles = StyleSheet.create({
    textInputViewStyle: {
        paddingHorizontal: wp(2.5),
        alignItems: "center",
        height: Platform.OS == "ios" ? wp(10) : wp(12.3)
    },
    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
        width: wp(70)
    },
    titleContainer: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(1.5),
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue1_color
    },
    textInputStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        width: '100%',
        borderBottomLeftRadius: wp(1.5),
        borderBottomRightRadius: wp(1.5),
        color: colors.light_brown
    },
    dashedStyle: {
        borderColor: colors.text_input_border_color,
        borderStyle: "dashed",
        borderWidth: wp(0.5),
        paddingHorizontal: wp(5),
        paddingVertical: Platform.OS == "ios" ? wp(4.5) : wp(6),
        borderRadius: wp(2),
        marginLeft: wp(3),
    },
    mapPinIcon: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain"
    },
})