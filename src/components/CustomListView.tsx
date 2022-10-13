import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../styles/globalStyles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { ImagesPath } from '../utils/ImagePaths'
import { colors } from '../styles/Colors'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'

interface CustomeListViewProps {
    item: any,
    onPress: () => void
}

const CustomListView = ({ item, onPress }: CustomeListViewProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[globalStyles.rowView, styles.listMainView]}>
            <View style={globalStyles.rowView}>
                {
                    item.iamgeUrl &&
                    <View style={[globalStyles.centerView, styles.imageView]}>
                        <Image source={ImagesPath.image_white_border} style={styles.iamgeStyle} />
                    </View>
                }
                <Text style={[styles.titleTxt, { marginHorizontal: wp(2) }]}>
                    {item.title}
                </Text>
            </View>
            <View style={globalStyles.rowView}>
                <Text style={styles.dateTxt}>{item.date}</Text>
                <TouchableOpacity>
                    <Image style={styles.menuImageStyle} source={ImagesPath.menu_dots_icon} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default CustomListView

const styles = StyleSheet.create({
    listMainView: {
        justifyContent: "space-between",
        paddingVertical: wp(5),
        backgroundColor: colors.white_4,
        borderRadius: wp(2),
        paddingHorizontal: wp(5)
    },
    imageView: {
        height: wp(10),
        width: wp(10),
        backgroundColor: colors.gray_7,
        borderRadius: wp(1)
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        marginHorizontal: wp(2),
        color: colors.gray_8
    },
    dateTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        marginHorizontal: wp(2),
        color: colors.gray_8
    },
    iamgeStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: "contain"
    },
    menuImageStyle: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain'
    },
})