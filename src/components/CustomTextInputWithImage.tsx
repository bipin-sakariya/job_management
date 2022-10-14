import { Image, StyleSheet, Text, TextInput, TextInputProps, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../styles/globalStyles'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'
import { ImagesPath } from '../utils/ImagePaths'

interface CustomTextInputWithImageProps {
    title: string,
    style?: TextStyle,
    container?: ViewStyle,
    mapStyle?: ViewStyle
    mainContainerStyle?: ViewStyle
}
const CustomTextInputWithImage = (props: CustomTextInputWithImageProps & TextInputProps) => {
    return (
        <View style={[globalStyles.rowView, props.mainContainerStyle]}>
            <View style={[styles.textInputContainer, props.container]}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleTxtStyle}>{props.title}</Text>
                </View>
                <View style={[globalStyles.rowView, { paddingHorizontal: wp(2.5) }]}>
                    <TextInput
                        {...props}
                        style={[styles.textInputStyle, props.style]}
                    />
                </View>
            </View>
            <TouchableOpacity style={[styles.dashedStyle, props.mapStyle]}>
                <Image source={ImagesPath.map_pin_line_icon} style={styles.mapPinIcon} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomTextInputWithImage

const styles = StyleSheet.create({

    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.bottom_tab_bg,
        borderWidth: wp(0.5),
        width: wp(70)
    },
    titleContainer: {
        backgroundColor: colors.light_gray,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2.5)
    },
    textInputStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        width: '100%',
        height: 40,
        borderBottomLeftRadius: wp(1.5),
        borderBottomRightRadius: wp(1.5),
        color: colors.light_brown
    },
    dashedStyle: {
        borderColor: colors.bottom_tab_bg,
        borderStyle: "dashed",
        borderWidth: wp(0.5),
        paddingHorizontal: wp(5),
        paddingVertical: wp(5),
        borderRadius: wp(2),
        marginLeft: wp(3),
        marginTop: wp(-0.5)
    },
    mapPinIcon: {
        width: wp(10),
        height: wp(10),
        resizeMode: "contain"
    },
})