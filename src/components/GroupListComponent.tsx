import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { ImagesPath } from '../utils/ImagePaths';
import fonts from '../styles/Fonts';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import FontSizes from '../styles/FontSizes';
import CustomDropdown from './CustomDropDown';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { strings } from '../languages/localizedStrings';
import { colors } from '../styles/Colors';
import { convertDate } from '../utils/screenUtils';
import { useAppDispatch } from '../hooks/reduxHooks';

interface itemPropsType {
    id: number
    profile_image: string,
    user_name: string,
    email: string,
    phone: string,
    role: { id: number, title: string },
    date_joined: string
}

const GroupListComponent = ({ item }: { item: itemPropsType }) => {
    const navigation = useCustomNavigation('GroupListScreen')
    const imageRef = useRef(null);
    const dispatch = useAppDispatch()

    const [visible, setVisible] = useState(false);

    const deleteGroupData = () => {
        setVisible(false)
    }

    const optionData = [
        {
            title: strings.Remove,
            onPress: () => deleteGroupData(),
            imageSource: ImagesPath.bin_icon
        },
        {
            title: strings.Edit,
            onPress: () => {
                setVisible(false)
                // navigation.navigate("UserGroupProfileScreen", { type: type, userId: item.id, isEdit: true })
            },
            imageSource: ImagesPath.edit_icon
        }
    ]

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('GroupDetailScreen')
                }}
                style={globalStyles.rowView}>
                <Image source={item.profile_image ? { uri: item.profile_image } : ImagesPath.placeholder_img} style={styles.itemImgStyle} />
                <View style={{ paddingHorizontal: wp(2) }}>
                    <Text numberOfLines={1} style={[styles.itemTitle, globalStyles.rtlStyle]}>{item?.user_name ?? 'user'}</Text>
                    <Text numberOfLines={1} style={[styles.descriptionTxt, globalStyles.rtlStyle, { maxWidth: wp(40) }]}>{item.role?.title}</Text>
                </View>
            </TouchableOpacity>
            <View style={globalStyles.rowView}>
                <Text numberOfLines={1} style={[styles.descriptionTxt, globalStyles.rtlStyle, { width: wp(25), textAlign: 'right' }]}>{convertDate(item.date_joined)}</Text>
                <TouchableOpacity ref={imageRef} onPress={() => setVisible(true)}>
                    <Image source={ImagesPath.menu_dots_icon} style={styles.menuIconStyle} />
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

export default GroupListComponent;

const styles = StyleSheet.create({
    itemContainer: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
    },
    itemImgStyle: {
        height: wp(14),
        width: wp(14),
        resizeMode: 'contain',
        borderRadius: 10,
        backgroundColor: colors.gray_7
    },
    itemTitle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.REGULAR_18,
        color: colors.dark_blue2_color,
        width: wp(30)
    },
    descriptionTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue2_color,
    },
    menuIconStyle: {
        height: wp(10),
        width: wp(10),
        resizeMode: 'contain'
    }
})