import { FlatList, I18nManager, Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../styles/globalStyles'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'

// We can chanage data type as per the component use in future.
interface DataTypes {
    name: string
    selected: boolean
}

interface DropDownComponentProps {
    title?: string,
    container?: ViewStyle
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    data: DataTypes[]
}

const MultileSelectDropDown = (props: DropDownComponentProps) => {
    const [list, setList] = useState(props.data)
    const [searchTxt, setSearchTxt] = useState('');
    const [searchData, setSearchData] = useState<DataTypes[]>([])

    const removeSelectedItem = (removeItem: any) => {
        const newList = list.map((_listItem) => {
            if (removeItem.name === _listItem.name) {
                return {
                    ..._listItem,
                    selected: false
                }
            }
            return _listItem
        })
        setList(newList)
    }

    const itemSelection = (selectedItem: DataTypes) => {
        let listOfItem = [...list]
        const index = list.findIndex((i) => i.name == selectedItem.name)
        console.log({ index })
        if (index >= 0) {
            listOfItem[index].selected = listOfItem[index].selected ? false : true
        }
        setList(listOfItem)
    }

    const tempSelectedItem = list.filter((_item) => _item.selected);

    return (
        <>
            <View style={[styles.textInputContainer, props.container]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{props.title}</Text>
                </View>
                <TouchableOpacity activeOpacity={1} style={[globalStyles.rowView, {}]} onPress={() => props.setIsVisible(!props.isVisible)}>
                    {tempSelectedItem.length !== 0 ?
                        <View style={[globalStyles.rowView, { flexWrap: 'wrap', paddingHorizontal: wp(2.5), paddingVertical: wp(1.5), width: '90%' }]}>
                            {tempSelectedItem.map((item, index) => (
                                <View style={styles.itemContainer}>
                                    <Text style={styles.selectedTxtStyle}>{item.name}</Text>
                                    <TouchableOpacity onPress={() => removeSelectedItem(item)}>
                                        <Image source={ImagesPath.cross_icon} style={styles.closeIcon} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View> :
                        <View style={{ height: 45, width: '90%' }}></View>
                    }
                    <Image source={ImagesPath.left_arrow_icon} style={[globalStyles.backArrowStyle, { transform: [{ rotate: props.isVisible ? '270deg' : '90deg' }] }]} />
                </TouchableOpacity>
            </View>
            {props.isVisible && <View style={[styles.modalContainer, {
                borderRightColor: colors.text_input_border_color,
                borderLeftColor: colors.text_input_border_color,
                borderBottomColor: colors.text_input_border_color,
                borderRightWidth: wp(0.5),
                borderLeftWidth: wp(0.5),
                borderBottomWidth: wp(0.5),
                borderRadius: wp(2),
            }]}>
                <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.textInputContainer, { paddingHorizontal: wp(2.5), marginBottom: wp(2.5) }]}>
                    <Image source={ImagesPath.search_icon} style={{ height: wp(6), width: wp(6), resizeMode: 'contain' }} />
                    <TextInput
                        style={[globalStyles.rtlStyle, { height: 40, marginHorizontal: wp(1.5), width: '90%', textAlign: I18nManager.isRTL ? 'right' : 'left', }]}
                        placeholder={'?????? ??????'}
                        value={searchTxt}
                        onChangeText={(txt) => {
                            const searchData = list.filter((i) => i.name.includes(txt))
                            setSearchData(searchData)
                            setSearchTxt(txt)
                        }}
                    />
                </View>
                <FlatList
                    style={{ maxHeight: wp(50) }}
                    showsVerticalScrollIndicator={false}
                    data={searchTxt ? searchData : list}
                    extraData={list}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => itemSelection(item)}
                            style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(2.5), paddingVertical: wp(3.5) }]}>
                            <Text style={styles.itemListTxt}>{item.name}</Text>
                            {item.selected ?
                                <Image source={ImagesPath.check_box_fill_icon} style={styles.checkBoxIcon} /> :
                                <Image source={ImagesPath.check_box_border_icon} style={styles.checkBoxIcon1} />
                            }
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: wp(0.1), backgroundColor: colors.text_input_border_color, marginHorizontal: wp(2.5) }} />}
                />
            </View>}
        </>
    )
}

export default MultileSelectDropDown;

const styles = StyleSheet.create({
    textInputContainer: {
        borderRadius: wp(2),
        borderColor: colors.text_input_border_color,
        borderWidth: wp(0.5),
    },
    titleContainer: {
        backgroundColor: colors.light_blue_color,
        borderTopLeftRadius: wp(1.5),
        borderTopRightRadius: wp(1.5)
    },
    titleTxtStyle: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        paddingVertical: wp(2),
        paddingHorizontal: wp(2.5),
        color: colors.dark_blue1_color
    },
    itemContainer: {
        ...globalStyles.rowView,
        paddingHorizontal: wp(2),
        backgroundColor: colors.gray_light_color,
        marginRight: wp(2.5),
        borderRadius: 5,
        marginBottom: wp(2.5)
    },
    selectedTxtStyle: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue1_color,
        paddingVertical: wp(1),
    },
    closeIcon: {
        height: wp(6),
        width: wp(6),
        marginLeft: wp(1.5)
    },
    modalContainer: {
        paddingHorizontal: wp(2),
        paddingVertical: wp(2.5),
    },
    itemListTxt: {
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.SMALL_14,
        color: colors.dark_blue2_color,
    },
    checkBoxIcon: {
        height: wp(6),
        width: wp(6)
    },
    checkBoxIcon1: {
        height: wp(5),
        width: wp(5)
    }
})