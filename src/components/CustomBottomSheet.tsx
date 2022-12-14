import { FlatList, I18nManager, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { strings } from '../languages/localizedStrings';

export interface ListDataProps {
    id: number,
    title: string,
    selected: boolean
}

interface CustomBottomSheetProps {
    data: ListDataProps[],
    onSelectedTab: (item: ListDataProps) => void
}

const CustomBottomSheet = React.forwardRef((props: CustomBottomSheetProps & RBSheetProps, ref: any) => {
    const [data, setData] = useState(props.data)

    const onSelectes = (selected: number) => {
        let mainData = [...data]
        let finalData = mainData.map((item, index) => {
            if (index == selected) {
                return {
                    ...item, selected: item.selected ? false : true
                }
            } else {
                return {
                    ...item, selected: false
                }
            }
        })
        let selectedItem = finalData.filter((i) => i.selected == true)
        props.onSelectedTab(selectedItem[0])
        setData(finalData)
    }

    return (
        <RBSheet
            ref={ref}
            closeOnDragDown={true}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={300}
            customStyles={{
                container: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25
                },
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#9E9E9E"
                }
            }}>
            <View style={{ flex: 1 }}>
                <View style={{
                    ...globalStyles.rowView, borderColor: colors.text_input_border_color,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: wp(4),
                    paddingHorizontal: wp(2.5),
                    marginHorizontal: wp(5)
                }}>
                    <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    <TextInput
                        style={[styles.textInputStyle, { textAlign: I18nManager.isRTL ? 'right' : 'left' }]}
                        placeholder={strings.SearchHere}
                        placeholderTextColor={'#666666'}
                    />
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        console.log("???? ~ file: CustomBottomSheet.tsx ~ line 83 ~ CustomBottomSheet ~ item", item)
                        return (
                            <TouchableOpacity onPress={() => onSelectes(index)} style={styles.itemContainer}>
                                <Text style={styles.itemTitleTxt}>{item.title}</Text>
                                <Image source={item.selected ? ImagesPath.check_icon : ImagesPath.unCheck_icon} style={styles.checkIcon} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
        </RBSheet>
    )
})

export default CustomBottomSheet;

const styles = StyleSheet.create({
    itemContainer: {
        ...globalStyles.rowView,
        justifyContent: 'space-between',
        marginHorizontal: wp(5),
        marginBottom: wp(4),
        paddingVertical: wp(2.5),
        paddingHorizontal: wp(2.5),
        borderColor: colors.text_input_border_color,
        borderWidth: 1,
        borderRadius: 10
    },
    itemTitleTxt: {
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.SEMI_LARGE_20,
        color: colors.black
    },
    checkIcon: {
        height: wp(8),
        width: wp(8),
        resizeMode: 'contain'
    },
    textInputStyle: {
        height: 55,
        flex: 1,
        paddingHorizontal: wp(2.5),
        fontFamily: fonts.FONT_POP_MEDIUM,
        fontSize: FontSizes.MEDIUM_16,
        color: '#666666'
    }
})