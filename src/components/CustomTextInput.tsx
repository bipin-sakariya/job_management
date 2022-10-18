import { Platform, StyleSheet, Text, TextInputProps, View, ViewStyle } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/Colors';

interface CustomTextInputProps {
    title?: string,
    icon?: React.ReactElement,
    container?: ViewStyle,
    style?: TextInputProps['style']
}

const CustomTextInput = (props: CustomTextInputProps & TextInputProps) => {
    return (
        <View style={[styles.textInputContainer, props.container]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleTxtStyle}>{props.title}</Text>
            </View>
            <View style={[globalStyles.rowView, { paddingHorizontal: wp(2.5), alignItems: "center", height: Platform.OS == "ios" ? wp(10) : wp(12), }]}>
                <TextInput
                    {...props}
                    style={[styles.textInputStyle, props.style, { width: props.icon ? '94%' : '100%' }]}
                />
                {props.icon}
            </View>
        </View>
    )
}

export default CustomTextInput;

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
    textInputStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        width: '100%',
        // height: 40,
        borderBottomLeftRadius: wp(1.5),
        borderBottomRightRadius: wp(1.5),
        color: colors.light_brown
    }
})