import { FlatList, I18nManager, Image, ImageSourcePropType, ImageStyle, KeyboardAvoidingView, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { globalStyles } from '../styles/globalStyles'
import { ImagesPath } from '../utils/ImagePaths'
import fonts from '../styles/Fonts'
import FontSizes from '../styles/FontSizes'
import { colors } from '../styles/Colors'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { inspectorListProps, roleList } from '../redux/slices/AdminSlice/userListSlice'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'

// We can chanage data type as per the component use in future.
interface DataTypes {
    user_name: string
    selected: boolean
    date_joined?: string
    email?: string
    id?: number
    is_active?: boolean
    phone?: string
    profile_image?: string,
    role?: { id: number, title: string }
}

interface DropDownComponentProps {
    title?: string
    container?: ViewStyle
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    data: DataTypes[]
    disabled?: boolean
    onCount?: (count: number) => void
    setSelectedMembers?: (data: DataTypes[]) => void
    // setData: Dispatch<SetStateAction<DataTypes[] | undefined>>
}

const MultileSelectDropDown = (props: DropDownComponentProps) => {
    const [list, setList] = useState(props.data)
    const [searchTxt, setSearchTxt] = useState('');
    const [searchData, setSearchData] = useState<DataTypes[]>([])
    const [select, setSelect] = useState({});
    const [isUser, setIsUser] = useState<inspectorListProps[] | undefined>()
    const [isMember, setIsMember] = useState([])
    const dispatch = useAppDispatch()
    const { groupDetails, isLoading } = useAppSelector(state => state.groupList)
    console.log({ data: props.data });


    useEffect(() => {
        let role = {
            role: ''
        }
        dispatch(roleList(role)).unwrap().then((res) => {
            console.log({ res });
            setIsUser(res.results)
            console.log("🚀 ~ file: DrawerStack.tsx ~ line 21 ~ dispatch ~ res", res)
        }).catch((error) => {
            console.log("🚀 ~ file: DrawerStack.tsx ~ line 20 ~ dispatch ~ error", error)
        })
    }, [props.data])


    // useEffect(() => {
    //     // const findData = isUser.map((i) => {
    //     //     return {
    //     //         ...i,
    //     //         selected: false
    //     //     }
    //     // })
    //     // isList(findData)

    // }, [isUser])

    console.log({ isUser })

    useEffect(() => {
        if (props.data.length != 0) {
            setList(props.data)
        }
    }, [props.data])


    const removeSelectedItem = (removeItem: any) => {
        const newList = list.map((_listItem) => {
            if (removeItem.user_name === _listItem.user_name) {
                return {
                    ..._listItem,
                    selected: false
                }
            }

            return _listItem
        })
        console.log({ newList });

        props.onCount && props.onCount(newList.filter(i => i.selected == true).length)
        props.setSelectedMembers && props.setSelectedMembers(newList.filter(i => i.selected))
        setList(newList)
    }

    const itemSelection = (selectedItem: DataTypes) => {
        let listOfItem = [...list]
        const index = list.findIndex((i) => i.user_name == selectedItem.user_name)
        if (index >= 0) {
            listOfItem[index].selected = listOfItem[index].selected ? false : true
        }
        props.onCount && props.onCount(listOfItem.filter(i => i.selected == true).length)
        props.setSelectedMembers && props.setSelectedMembers(listOfItem.filter(i => i.selected))
        setList(listOfItem)
    }

    const tempSelectedItem = list.filter((_item) => _item.selected);

    return (
        <>
            <View style={[styles.textInputContainer, props.container]}>
                <View style={styles.titleContainer}>
                    <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{props.title}</Text>
                </View>
                <TouchableOpacity disabled={props.disabled} activeOpacity={1} onPress={() => props.setIsVisible(!props.isVisible)}>
                    <View style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(2), paddingTop: wp(2) }]}>
                        <Text style={[globalStyles.rtlStyle, { fontSize: FontSizes.EXTRA_SMALL_12, color: colors.dark_blue2_color }]}>{`סך הכל ${tempSelectedItem.length} אנשים`}</Text>
                        {!props.disabled && <Image source={ImagesPath.left_arrow_icon} style={[globalStyles.backArrowStyle, { transform: [{ rotate: props.isVisible ? '270deg' : '90deg' }], marginRight: 0 }]} />}
                    </View>
                    {tempSelectedItem.length !== 0 ?
                        <View style={[globalStyles.rowView, {}]}>
                            <View style={[globalStyles.rowView, { flexWrap: 'wrap', paddingHorizontal: wp(2.5), paddingVertical: wp(1.5), width: '90%', }]}>
                                {tempSelectedItem.map((item, index) => (
                                    <View style={styles.itemContainer}>
                                        <Text style={styles.selectedTxtStyle}>{item.user_name}</Text>
                                        {!props.disabled && <TouchableOpacity onPress={() => removeSelectedItem(item)}>
                                            <Image source={ImagesPath.cross_icon} style={styles.closeIcon} />
                                        </TouchableOpacity>}
                                    </View>
                                ))}
                            </View>
                        </View> :
                        <View style={{ height: hp(1), width: '90%' }}></View>
                    }
                </TouchableOpacity>
            </View>
            {props.isVisible &&
                <View style={[styles.modalContainer, {
                    borderRightColor: colors.text_input_border_color,
                    borderLeftColor: colors.text_input_border_color,
                    borderBottomColor: colors.text_input_border_color,
                    borderRightWidth: wp(0.5),
                    borderLeftWidth: wp(0.5),
                    borderBottomWidth: wp(0.5),
                    borderRadius: wp(2),
                }]}>
                    <KeyboardAvoidingView behavior='padding'>

                        <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.textInputContainer, { paddingHorizontal: wp(2.5), marginBottom: wp(2.5) }]}>
                            <Image source={ImagesPath.search_icon} style={{ height: wp(6), width: wp(6), resizeMode: 'contain' }} />
                            <TextInput
                                style={[globalStyles.rtlStyle, { height: 40, marginHorizontal: wp(1.5), width: '90%', textAlign: I18nManager.isRTL ? 'right' : 'left', }]}
                                placeholder={'חפש כאן'}
                                value={searchTxt}
                                onChangeText={(txt) => {
                                    const searchData = props.data.filter((i) => i.user_name.includes(txt.toLowerCase()))
                                    setSearchData(searchData)
                                    setSearchTxt(txt)
                                }}
                            />
                        </View>
                    </KeyboardAvoidingView>

                    <FlatList
                        style={{ maxHeight: wp(50) }}
                        showsVerticalScrollIndicator={false}
                        data={searchTxt ? searchData : list}
                        extraData={list}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() => itemSelection(item)}
                                style={[globalStyles.rowView, { justifyContent: 'space-between', paddingHorizontal: wp(2.5), paddingVertical: wp(3.5) }]}>
                                <Text style={styles.itemListTxt}>{item.user_name}</Text>
                                {item.selected ?
                                    <Image source={ImagesPath.check_box_fill_icon} style={styles.checkBoxIcon} /> :
                                    <Image source={ImagesPath.check_box_border_icon} style={styles.checkBoxIcon1} />
                                }
                            </TouchableOpacity>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: wp(0.1), backgroundColor: colors.text_input_border_color, marginHorizontal: wp(2.5) }} />}
                    />
                </View>
            }
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