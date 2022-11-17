import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../styles/globalStyles'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'

interface CustomSwitchComponentProps {
    title?: string,
    container?: ViewStyle,
    value?: boolean,
    subTitle?: string
    onPress?: Dispatch<SetStateAction<boolean>>
}
const CustomSwitchComponent = (props: CustomSwitchComponentProps & TouchableOpacityProps) => {
    return (
        <View style={[styles.textInputContainer, props.container, globalStyles.rtlDirection]}>
            <View style={styles.titleContainer}>
                <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{props.title}</Text>
            </View>
            <View style={[globalStyles.rowView, styles.switchMainView]}>
                <Text style={[styles.textStyle, globalStyles.rtlStyle, { marginVertical: wp(2) }]}>{props.subTitle}</Text>
                <TouchableOpacity onPress={props.onPress} style={styles.switchView}>
                    <View style={[styles.switchRound, { alignSelf: props.value ? 'flex-start' : "flex-end" }]} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomSwitchComponent

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
        paddingHorizontal: wp(2.5)
    },
    textStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: colors.dark_blue2_color
    },
    switchMainView: {
        paddingHorizontal: wp(2.5),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    switchView: {
        backgroundColor: colors.white,
        height: wp(5),
        width: wp(9),
        justifyContent: 'center',
        paddingHorizontal: wp(1),
        borderColor: '#666666',
        borderWidth: wp(0.5),
        borderRadius: wp(5)
    },
    switchRound: {
        height: wp(3),
        width: wp(3),
        backgroundColor: colors.white,
        borderRadius: wp(3),
        borderWidth: wp(0.5),
    },
})