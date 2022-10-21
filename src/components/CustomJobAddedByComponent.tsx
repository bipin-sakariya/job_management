import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../styles/Colors'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
interface CustomJobAddedByComponentProps {
    image?: ImageSourcePropType,
    userName?: string,
    role?: string,
    date?: string
}
const CustomJobAddedByComponent = ({ image, userName, role, date }: CustomJobAddedByComponentProps) => {
    return (
        <View style={[globalStyles.rowView, styles.jobView]}>
            <View style={[globalStyles.rowView, globalStyles.spaceAroundView]}>
                <View style={styles.jobImageView}>
                    <Image source={image} style={styles.jobImage} />
                </View>
                <View style={styles.jobDetailsView}>
                    <Text style={[styles.fieldTxt, globalStyles.rtlStyle, { textAlign: 'left' }]} numberOfLines={1}>{userName}</Text>
                    <Text style={[styles.roleTxt, globalStyles.rtlStyle, { textAlign: 'left' }]} numberOfLines={1}>{role}</Text>
                </View>
            </View>
            <Text style={[styles.dateTxt, globalStyles.rtlStyle, { textAlign: 'left' }]} numberOfLines={2}>{`Job added on\n ${date}`}</Text>
        </View>
    )
}

export default CustomJobAddedByComponent

const styles = StyleSheet.create({
    jobView: {
        paddingVertical: wp(2),
        justifyContent: "space-between"
    },
    jobImageView: {
        height: wp(10),
        width: wp(10),
        backgroundColor: colors.doc_bg_color_dark_gray,
        borderRadius: wp(2),
        justifyContent: "center",
        alignItems: "center"
    },
    jobDetailsView: {
        marginHorizontal: wp(2),
    },
    jobImage: {
        height: wp(7),
        width: wp(7),
        resizeMode: 'contain'
    },
    fieldTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color,
        maxWidth: wp(50)
    },
    roleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.dark_blue2_color
    },
    dateTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue2_color,
        maxWidth: wp(40)
    },

})