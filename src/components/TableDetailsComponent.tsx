import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import useCustomNavigation from '../hooks/useCustomNavigation';

interface TableDetailsComponentProps {
    item: any,
    type?: string,
    index: number,
    screenName?: string
}

const TableDetailsComponent = ({ item, type, index, screenName }: TableDetailsComponentProps) => {
    const navigation = useCustomNavigation('SignBillDetailScreen')

    const handleSubmit = () => {
        if (screenName) {
            if (item.type == 'Sign') {
                navigation.navigate('SignBillDetailScreen', { type: 'Sign', item: item })
            }
            else {
                navigation.navigate('SignBillDetailScreen', { type: 'Material', item: item })
            }
        }

    }

    return (

        <TouchableOpacity onPress={() => handleSubmit()} style={[globalStyles.rowView, { paddingVertical: wp(1), justifyContent: 'space-around' }]}>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, globalStyles.rtlStyle, { width: wp(15) }]}>{index + 1}</Text>
            <View style={[globalStyles.rowView, { width: wp(35) }]}>
                <Text numberOfLines={1} style={styles.commonScammedTxt}>{item.name}</Text>
            </View>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(10) }]}>{item.quantity}</Text>
            <Text numberOfLines={1} style={[styles.commonScammedTxt, { width: wp(12) }]}>{item.type_counting}</Text>
        </TouchableOpacity>
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