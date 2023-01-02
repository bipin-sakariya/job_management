import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../styles/Colors';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { globalStyles } from '../styles/globalStyles';

interface CustomDetailsComponentprops {
    title: string,
    titleTxtStyle?: TextStyle,
    detailsContainerStyle?: ViewStyle,
    titleViewStyle?: ViewStyle,
    bottomViewStyle?: ViewStyle,
    bottomComponent?: React.ReactNode
}

const CustomDetailsComponent = ({ title, titleTxtStyle, detailsContainerStyle, bottomComponent, bottomViewStyle, titleViewStyle }: CustomDetailsComponentprops) => {
    return (
        <View style={[styles.detailsContainer, detailsContainerStyle]}>
            <View style={[styles.titleView, titleViewStyle]}>
                <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle, titleTxtStyle]}>{title}</Text>
            </View>
            <View style={[styles.bottomView, bottomViewStyle]}>
                {bottomComponent}
            </View>
        </View>
    )
}

export default CustomDetailsComponent

const styles = StyleSheet.create({
    titleTxt: {
        paddingVertical: wp(3),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue1_color,
        textAlign: 'left'
    },
    detailsContainer: {
        borderRadius: wp(2),
        borderWidth: wp(0.5),
        borderColor: colors.text_input_border_color
    },
    titleView: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5),
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: wp(2)
    },
    bottomView: {
        backgroundColor: colors.white,
        borderBottomLeftRadius: wp(1.5),
        borderBottomRightRadius: wp(1.5),
        justifyContent: "center",
        alignContent: "center",
        paddingHorizontal: wp(2)
    },
})

