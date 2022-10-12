import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../styles/globalStyles'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'
interface ButtonTypeProps {
    label: string,
    value: string
}

interface DropDownComponentProps {
    data: any,
    labelField: string
    valueField: string,
    value: string,
    placeHolderTxt: string
    onChange: Dispatch<SetStateAction<ButtonTypeProps>>
    image?: ImageSourcePropType,
    imageStyle?: ImageStyle,
    placeHolderStyle?: TextStyle,
    style?: ViewStyle,
    containerStyle?: ViewStyle
    selectedTxtStyle?: TextStyle
    itemTxtStyle?: TextStyle
}

const DropDownComponent = ({ data, labelField, valueField, value, placeHolderTxt, onChange, image, imageStyle, placeHolderStyle, style, containerStyle, selectedTxtStyle, itemTxtStyle }: DropDownComponentProps) => {
    return (
        <Dropdown
            data={data}
            onChange={(data: any) => {
                onChange(data)
            }}
            placeholder={placeHolderTxt}
            placeholderStyle={[styles.placeHolderTxt, placeHolderStyle]}
            selectedTextStyle={[styles.placeHolderTxt, selectedTxtStyle]}
            itemTextStyle={[styles.placeHolderTxt, itemTxtStyle]}
            labelField={labelField}
            valueField={valueField}
            value={value}
            style={[style, { paddingVertical: wp(0.5) }]}
            containerStyle={[containerStyle, { marginVertical: wp(2) }]}
            renderRightIcon={() => {
                return (
                    <Image source={image} style={[globalStyles.headerIcon, imageStyle]} />
                )
            }}
        />
    )
}

export default DropDownComponent

const styles = StyleSheet.create({
    placeHolderTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.light_brown,
    }
})