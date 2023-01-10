import React, { ForwardedRef, useState } from 'react';
import { FlatList, I18nManager, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { colors } from '../styles/Colors';
import { globalStyles } from '../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../utils/ImagePaths';
import { strings } from '../languages/localizedStrings';
import { GroupParams } from '../screens/TransferJobScreen';
import { useEffect } from 'react';

export interface ListDataProps {
    id: number,
    title: string,
    selected: boolean
}

interface CustomBottomSheetProps {
    data: GroupParams[],
    onSelectedTab: (item: GroupParams) => void
    defaultSelected?: {
        id: number
        name: string
        selected: boolean
    }
}

const CustomBottomSheet = React.forwardRef((props: CustomBottomSheetProps & RBSheetProps, ref: ForwardedRef<RBSheet>) => {
    const [data, setData] = useState(props.data)

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const onSelectes = (finalIndex: number) => {
        let finalData = props.data.map((item, index) => {
            if (index == finalIndex) {
                return {
                    ...item, selected: true
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
            animationType={'slide'}
            closeOnDragDown={true}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={500}
            customStyles={{
                container: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    elevation: 10,
                },
                wrapper: {
                    backgroundColor: colors.transparent,
                    shadowColor: colors.black,
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    shadowOffset: { height: 0, width: 0 },
                },
                draggableIcon: {
                    backgroundColor: colors.gray_7,
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
                        placeholder={strings.searchHere}
                        placeholderTextColor={colors.light_brown}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        onChangeText={() => {

                        }}
                    />
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => onSelectes(index)} style={styles.itemContainer}>
                                <Text style={styles.itemTitleTxt}>{item.name}</Text>
                                <Image source={item.selected ? ImagesPath.check_icon : ImagesPath.unCheck_icon} style={styles.checkIcon} />
                            </TouchableOpacity>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
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
        color: colors.light_brown
    }
})