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
interface ButtonTypeProps {
    label: string,
    value: string
}

interface DropDownComponentProps {
    data: ButtonTypeProps[],
    image?: ImageSourcePropType,
    imageStyle?: ImageStyle,
    title?: string,
    container?: ViewStyle
}

const DropDownComponent = (props: DropDownComponentProps & DropdownProps) => {
    return (
        <View style={[styles.textInputContainer, props.container]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleTxtStyle}>{props.title}</Text>
            </View>
            <Dropdown
                {...props}
                data={props.data}
                style={styles.conatinerStyle}
                placeholderStyle={[styles.placeHolderTxt, props.placeholderStyle, { color: colors.light_gray }]}
                selectedTextStyle={[styles.placeHolderTxt, props.selectedTextStyle]}
                itemTextStyle={[styles.placeHolderTxt, props.itemTextStyle]}
                renderRightIcon={() => {
                    return (
                        <Image source={props.image} style={[globalStyles.headerIcon, props.imageStyle]} />
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
        borderColor: '#999999',
        borderWidth: wp(0.5),
    },
    titleContainer: {
        backgroundColor: '#BABABA',
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2.5)
    },
    placeHolderTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        color: colors.light_brown,
    },
    conatinerStyle: {
        height: 40,
        paddingHorizontal: wp(2)
    }
})