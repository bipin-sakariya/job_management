import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { colors } from '../styles/Colors';

const InboxListComponent = ({ item }: any) => {
    const navigation = useCustomNavigation('IndoxScreen');

    return (
        <TouchableOpacity onPress={() => { navigation.navigate("ChatScreen") }} style={styles.itemContainer}>
            <Image source={ImagesPath.placeholder_img} style={styles.imageStyle} />
            <View style={styles.txtContainer}>
                <View>
                    <Text style={styles.titleTxt}>{item.title}</Text>
                    <Text style={styles.descriptionTxt}>{item.description}</Text>
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
        marginBottom: wp(4)
    },
    imageStyle: {
        height: wp(18),
        width: wp(18),
        resizeMode: 'contain'
    },
    txtContainer: {
        flex: 1,
        ...globalStyles.rowView,
        justifyContent: 'space-between'
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        paddingHorizontal: wp(2.5)
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        paddingHorizontal: wp(2.5)
    },
    counterView: {
        backgroundColor: colors.white_7,
        borderRadius: wp(3.75),
        width: wp(7.5),
        height: wp(7.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_10,
        paddingHorizontal: wp(2.5),
        paddingVertical: wp(2)
    }
})