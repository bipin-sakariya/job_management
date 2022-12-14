import { InteractionManager, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';

interface TableDetailsComponentProps {
    item: any,
    type?: string,
    index: number
}

const TableDetailsComponent = ({ item, type, index }: TableDetailsComponentProps) => {
    return (

        <View style={[globalStyles.rowView, { paddingVertical: wp(1), justifyContent: 'space-around' }]}>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, globalStyles.rtlStyle, { width: wp(15) }]}>{index + 1}</Text>
            <View style={[globalStyles.rowView, { width: wp(35) }]}>
                {/* {
                    item.imageUrl &&
                    <View style={[globalStyles.centerView, styles.imageView]}>
                        <Image source={ImagesPath.image_white_border} style={styles.imageViewStyle} />
                    </View>
                } */}
                <Text numberOfLines={1} style={styles.commonScammedTxt}>{item.name}</Text>
            </View>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(10) }]}>{item.quantity}</Text>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(12) }]}>{item.type_counting
            }</Text>
        </View>
    )
}

export default TableDetailsComponent

const styles = StyleSheet.create({
    commonScammedTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue2_color,
        ...globalStyles.rtlStyle
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