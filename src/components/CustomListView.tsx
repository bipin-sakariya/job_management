import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import { colors } from '../styles/Colors';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import moment from 'moment';
import CustomDropdown from './CustomDropDown';
import { strings } from '../languages/localizedStrings';
import useCustomNavigation from '../hooks/useCustomNavigation';
import { billData, billDelete } from '../redux/slices/AdminSlice/billListSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import { FormData, formDelete } from '../redux/slices/AdminSlice/formListSlice';

interface CustomeListViewProps {
    item: Partial<billData> & Partial<FormData>,
    onPress: () => void
    material?: boolean,
    isFrom?: boolean
}

const CustomListView = ({ item, onPress, material, isFrom }: CustomeListViewProps) => {
    const imageRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const navigation = useCustomNavigation('BillListScreen');
    const dispatch = useAppDispatch()

    let data = {
        id: item.id,
        iamgeUrl: item.image,
        title: item.name,
        date: item.created_at,
    }

    const optionData = [
        {
            title: strings.Remove, onPress: () => {
                if (item.id) {
                    if (isFrom) {
                        //form data
                        dispatch(formDelete(item.id))
                        setVisible(false)
                    } else {
                        //billdata
                        dispatch(billDelete(item.id)).unwrap()
                        setVisible(false)
                    }
                }
            }, imageSource: ImagesPath.bin_icon
        },
        {
            title: strings.Edit, onPress: () => {
                if (isFrom) {
                    let params = {
                        id: data.id,
                        type: material ? 'material' : 'sign',
                        isEdit: true
                    }
                    setVisible(false)
                    navigation.navigate("FormDetailsScreen", params)
                    setVisible(false)
                    // navigation.navigate("BillSectionScreen",)
                } else {
                    let params = {
                        id: data.id,
                        type: material ? 'material' : 'sign',
                        isEdit: true
                    }
                    setVisible(false)
                    navigation.navigate("BillSectionScreen", params)
                }
            },
            imageSource: ImagesPath.edit_icon
        }
    ]

    return (
        <>
            <TouchableOpacity onPress={onPress} style={[globalStyles.rowView, styles.listMainView, styles.dropDownShadowStyle]}>
                <View style={globalStyles.rowView}>
                    {
                        data.iamgeUrl && !material &&
                        <Image source={data.iamgeUrl ? { uri: data.iamgeUrl } : ImagesPath.image_white_border} style={[styles.imageView, { backgroundColor: data.iamgeUrl ? colors.white_color : colors.gray_7, }]} />
                    }
                    <Text numberOfLines={1} style={[styles.titleTxt, globalStyles.rtlStyle, { marginLeft: wp(2), width: wp(32) }]}>
                        {data.title}
                    </Text>
                </View>
                <View style={globalStyles.rowView}>
                    <Text numberOfLines={1} style={[styles.dateTxt, globalStyles.rtlStyle, { width: wp(22) }]}>{moment(data.date).format('YYYY MMM DD')}</Text>
                    <TouchableOpacity ref={imageRef} onPress={() => setVisible(true)}>
                        <Image style={styles.menuImageStyle} source={ImagesPath.menu_dots_icon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <CustomDropdown
                componentRef={imageRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
            />
        </>
    )
}

export default CustomListView

const styles = StyleSheet.create({
    dropDownShadowStyle: {
        shadowColor: Platform.OS == "ios" ? "rgba(0, 0, 0, 0.06)" : "rgba(0, 0, 0, 0.6)",
        shadowOpacity: 5,
        shadowRadius: 8,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    },
    listMainView: {
        justifyContent: "space-between",
        paddingVertical: wp(5),
        backgroundColor: colors.white_color,
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        marginHorizontal: wp(1)
    },
    imageView: {
        height: wp(10),
        width: wp(10),
        borderRadius: wp(1)
    },
    titleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        marginHorizontal: wp(2),
        color: colors.dark_blue1_color
    },
    dateTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.EXTRA_SMALL_12,
        color: colors.dark_blue2_color,
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