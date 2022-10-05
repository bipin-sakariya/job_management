import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';

const InboxListComponent = ({ item, index }: any) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={ImagesPath.placeholder_img} style={{
                height: wp(18),
                width: wp(18),
                resizeMode: 'contain'
            }} />
            <View style={{ flex: 1, ...globalStyles.rowView, justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.SEMI_LARGE_20, paddingHorizontal: wp(2.5) }}>{item.title}</Text>
                    <Text style={{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_12, paddingHorizontal: wp(2.5) }}>{item.description}</Text>
                </View>
                {item.count && <View style={{ backgroundColor: '#E1E1E1', borderRadius: wp(3.75), width: wp(7.5), height: wp(7.5), justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10, paddingHorizontal: wp(2.5), paddingVertical: wp(2) }}>{item.count}</Text>
                </View>}
            </View>
        </View>
    )
}

export default InboxListComponent;

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: wp(4), 
        ...globalStyles.rowView, 
        marginBottom: wp(4)
    }
})