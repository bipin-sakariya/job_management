import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../styles/globalStyles';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';

interface ButtonTypeProps {
    open: boolean
    close: boolean
}

interface ButtonTabProps {
    btnOneTitle: string,
    btnTwoTitle: string,
    btnOneStyle?: ViewStyle
    btnTwoStyle?: ViewStyle
    btnOneTxtStyle?: TextStyle
    btnTwoTxtStyle?: TextStyle
    setBtn: Dispatch<SetStateAction<ButtonTypeProps>>,
    btnValue?: ButtonTypeProps
}
const ButtonTab = ({ btnOneTitle, btnTwoTitle, btnOneStyle, btnTwoStyle, btnOneTxtStyle, btnTwoTxtStyle, btnValue, setBtn }: ButtonTabProps) => {

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => setBtn({ open: true, close: false })}
                style={[styles.btnStyle, btnOneStyle, {
                    backgroundColor: btnValue?.open ? colors.primary_color : colors.light_blue_color,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10
                }]}>
                <Text
                    style={[styles.btnTxtStyle, btnOneTxtStyle, {
                        fontFamily: btnValue?.open ? fonts.FONT_POP_MEDIUM : fonts.FONT_POP_REGULAR,
                        color: btnValue?.open ? colors.white_color : colors.dark_blue1_color,
                    }]}>{btnOneTitle}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setBtn({ open: false, close: true })}
                style={[styles.btnStyle, btnTwoStyle, {
                    backgroundColor: btnValue?.close ? colors.primary_color : colors.light_blue_color,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                }]}>
                <Text
                    style={[styles.btnTxtStyle, btnTwoTxtStyle, {
                        fontFamily: btnValue?.close ? fonts.FONT_POP_MEDIUM : fonts.FONT_POP_REGULAR,
                        color: btnValue?.close ? colors.white_color : colors.dark_blue1_color
                    }]}>{btnTwoTitle}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonTab

const styles = StyleSheet.create({
    buttonContainer: {
        width: wp(80),
        alignSelf: 'center',
        // backgroundColor: 'red',
        marginBottom: wp(2),
        ...globalStyles.rowView
    },
    btnStyle: {
        width: wp(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        paddingVertical: wp(2.5),
    }
})