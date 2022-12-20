import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors } from '../styles/Colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';

interface StatusBtnProps {
    title?: string,
    txtStyle?: TextStyle
}

const CustomStatusBtn = (props: StatusBtnProps & TouchableOpacityProps) => {
    return (
        <TouchableOpacity {...props} style={[styles.btnStatus, props.style]}>
            <Text numberOfLines={1} style={[styles.statusBtnTxt, props.txtStyle]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default CustomStatusBtn;

const styles = StyleSheet.create({
    btnStatus: {
        backgroundColor: colors.light_blue_color,
        borderRadius: wp(1)
    },
    statusBtnTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        textAlign: "center",
        marginHorizontal: wp(2),
        marginVertical: wp(0.5),
        color: colors.primary_color,
        maxWidth: wp(20)
    },
})