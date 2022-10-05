import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { globalStyles } from '../styles/globalStyles';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';

const ButtonTab = () => {
    const [btn, setBtn] = useState({
        open: true,
        close: false
    })

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={() => setBtn({ open: true, close: false })}
                style={[styles.btnStyle, {
                    backgroundColor: btn.open ? '#8C8C8C' : '#CCCCCC',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10
                }]}>
                <Text
                    style={[styles.btnTxtStyle, {
                        fontFamily: btn.open ? fonts.FONT_POP_MEDIUM : fonts.FONT_POP_REGULAR,
                        color: btn.open ? colors.white : colors.black,
                    }]}>Open</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setBtn({ open: false, close: true })}
                style={[styles.btnStyle, {
                    backgroundColor: btn.close ? '#8C8C8C' : '#CCCCCC',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                }]}>
                <Text
                    style={[styles.btnTxtStyle, {
                        fontFamily: btn.close ? fonts.FONT_POP_MEDIUM : fonts.FONT_POP_REGULAR,
                        color: btn.close ? colors.white : colors.black
                    }]}>Close</Text>
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