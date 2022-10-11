import { StyleSheet, Text, TextInputProps, View, ViewStyle } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import FontSizes from '../styles/FontSizes';
import fonts from '../styles/Fonts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../styles/globalStyles';

interface CustomTextInputProps {
    title?: string,
    icon?: React.ReactElement,
    container?: ViewStyle
}

const CustomTextInput = (props: CustomTextInputProps & TextInputProps) => {
    return (
        <View style={[styles.textInputContainer, props.container]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleTxtStyle}>{props.title}</Text>
            </View>
            <View style={[globalStyles.rowView, { paddingHorizontal: wp(4) }]}>
                <TextInput
                    {...props}
                    style={[styles.textInputStyle, { width: props.icon ? '95%' : '100%' }]}
                />
                {props.icon}
            </View>
        </View>
    )
}

export default CustomTextInput;

const styles = StyleSheet.create({
    textInputContainer: {
        borderRadius: 10,
        borderColor: '#999999',
        borderWidth: 1,
    },
    titleContainer: {
        backgroundColor: '#BABABA',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        paddingVertical: wp(1.5),
        paddingHorizontal: wp(4)
    },
    textInputStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        width: '100%',
        height: 45,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
})