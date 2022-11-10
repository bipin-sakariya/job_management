import { Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../styles/globalStyles'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

interface DropDownComponentProps {
    image?: ImageSourcePropType,
    imageStyle?: ImageStyle,
    title?: string,
    container?: ViewStyle
}

const DropDownComponent = (props: DropDownComponentProps & DropdownProps) => {
    return (
        <View style={[styles.textInputContainer, props.container]}>
            <View style={styles.titleContainer}>
                <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{props.title}</Text>
            </View>
            <Dropdown
                {...props}
                data={props.data}
                style={styles.conatinerStyle}
                placeholderStyle={[styles.placeHolderTxt, globalStyles.rtlStyle, props.placeholderStyle, { color: colors.dark_blue2_color }]}
                selectedTextStyle={[styles.placeHolderTxt, props.selectedTextStyle]}
                itemTextStyle={[styles.placeHolderTxt, props.itemTextStyle]}
                renderRightIcon={() => {
                    return (
                        <Image source={props.image} style={[globalStyles.headerIcon, { tintColor: colors.dark_blue1_color, ...props.imageStyle }]} />
                    )
                }}
            />
        </View>
    )
}

export default DropDownComponent;

const styles = StyleSheet.create({
    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
    },
    titleContainer: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue1_color
    },
    placeHolderTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color,
        ...globalStyles.rtlStyle
    },
    conatinerStyle: {
        height: 40,
        paddingHorizontal: wp(2)
    }
})