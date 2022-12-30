import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { messageListProps } from '../screens/InboxScreen';
import { colors } from '../styles/Colors';

interface InboxListComponentProps {
    item: messageListProps,
    index: number,
    onPress: () => void
}

const InboxListComponent = ({ item, index, onPress }: InboxListComponentProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
            <Image source={item.imageurl ? { uri: item.imageurl } : ImagesPath.placeholder_img} style={styles.imageStyle} />
            <View style={styles.txtContainer}>
                <View>
                    <Text numberOfLines={1} style={styles.titleTxt}>{item.title}</Text>
                    <Text numberOfLines={1} style={styles.descriptionTxt}>{item.description}</Text>
                </View>
                {item.count && <View style={styles.counterView}>
                    <Text style={styles.counterTxt}>{item.count}</Text>
                </View>}
            </View>
        </TouchableOpacity>
    )
}

export default InboxListComponent;

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: wp(4),
        ...globalStyles.rowView,
    },
    imageStyle: {
        height: wp(13),
        width: wp(13),
        resizeMode: 'contain',
        borderRadius: wp(1.5),
    },
    txtContainer: {
        flex: 1,
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        marginHorizontal: wp(2)
    },
    titleTxt: {
        ...globalStyles.rtlStyle,
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.dark_blue1_color,
        maxWidth: "95%",
    },
    descriptionTxt: {
        ...globalStyles.rtlStyle,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue3_color,
        maxWidth: "95%",
    },
    counterView: {
        backgroundColor: colors.light_blue_color,
        borderRadius: wp(3.75),
        width: wp(6.5),
        height: wp(6.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: colors.primary_color,
        textAlign: 'center',
    }
})