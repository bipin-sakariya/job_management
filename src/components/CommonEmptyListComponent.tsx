import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CommonEmptyListComponentProps {
    viewStyle?: ViewStyle,
    TxtStyle?: TextStyle,
    Txt: string
}

const CommonEmptyListComponent = ({ viewStyle, TxtStyle, Txt }: CommonEmptyListComponentProps) => {
    return (
        <View style={[styles.mainViewStyle, viewStyle]} >
            <Text style={[globalStyles.rtlStyle, styles.notFoundTxt, TxtStyle]}>{Txt}</Text>
        </View>
    )
}

export default CommonEmptyListComponent;

const styles = StyleSheet.create({
    mainViewStyle: {
        height: wp(145),
        justifyContent: 'center',
        alignItems: 'center'
    },
    notFoundTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.REGULAR_18,
    },
})