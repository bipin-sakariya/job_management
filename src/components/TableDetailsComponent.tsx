import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'

interface TableDetailsComponentProps {
    item: any,
    type: string
}

const TableDetailsComponent = ({ item, type }: TableDetailsComponentProps) => {
    return (
        <View style={[globalStyles.rowView, { paddingHorizontal: type == 'form' ? wp(5) : wp(2), paddingVertical: wp(1) }]}>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(15) }]}>{item.srno}</Text>
            <View style={[globalStyles.rowView, { width: wp(35) }]}>
                {
                    item.imageUrl &&
                    <View style={[globalStyles.centerView, styles.imageView]}>
                        <Image source={ImagesPath.image_white_border} style={styles.imageViewStyle} />
                    </View>
                }
                <Text numberOfLines={1} style={styles.commonScammedTxt}>{item.name}</Text>
            </View>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(10) }]}>{item.qty}</Text>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(10) }]}>{item.unit}</Text>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(12) }]}>{item.parameter}</Text>
        </View>
    )
}

export default TableDetailsComponent

const styles = StyleSheet.create({
    commonScammedTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.light_brown
    },
    imageViewStyle: {
        width: wp(3),
        height: wp(3),
        resizeMode: 'contain',
    },
    imageView: {
        width: wp(5),
        height: wp(5),
        backgroundColor: colors.gray_7,
        marginRight: wp(1),
        borderRadius: wp(1)
    },
})