import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import fonts from '../styles/Fonts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontSizes from '../styles/FontSizes';
import CustomDropdown from './CustomDropDown';

const UserListComponent = ({ item }: any) => {
    const imageRef = useRef(null);
    const [visible, setVisible] = useState(false);

    const onPress = () => {
        console.log("Remove")
    }

    const optionData = [
        { title: 'Remove', onPress: onPress, imageSource: ImagesPath.bin_icon },
        { title: 'edit', onPress: onPress, imageSource: ImagesPath.edit_icon }
    ]

    return (
        <View style={styles.itemContainer}>
            <View style={globalStyles.rowView}>
                <Image source={ImagesPath.placeholder_img} style={styles.itemImgStyle} />
                <View style={{ paddingHorizontal: wp(2) }}>
                    <Text style={styles.itemTitle}>Stanley Lamb</Text>
                    <Text style={styles.descriptionTxt}>Role of User</Text>
                </View>
            </View>
            <View style={globalStyles.rowView}>
                <Text style={styles.descriptionTxt}>12 May 2022</Text>
                <TouchableOpacity ref={imageRef} onPress={() => setVisible(true)}>
                    <Image source={ImagesPath.menu_dots__icon} style={styles.menuIconStyle} />
                </TouchableOpacity>
            </View>
            <CustomDropdown
                componentRef={imageRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
            />
        </View>
    )
}

export default UserListComponent;

const styles = StyleSheet.create({
    itemContainer: {
        ...globalStyles.rowView, 
        justifyContent: 'space-between', 
    },
    itemImgStyle: {
        height: wp(14), 
        width: wp(14), 
        resizeMode: 'contain'
    },
    itemTitle: {
        fontFamily: fonts.FONT_POP_MEDIUM, 
        fontSize: FontSizes.REGULAR_18,
        color: '#404040'
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR, 
        fontSize: FontSizes.EXTRA_SMALL_10,
        color: '#727272'
    },
    menuIconStyle: {
        height: wp(10), 
        width: wp(10), 
        resizeMode: 'contain'
    }
})