import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../types/RootStackTypes';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomTextInput, DropDownComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import CustomDropdown from '../../components/CustomDropDown';
import { strings } from '../../languages/localizedStrings';
interface DropdownProps {
    label: string,
    value: string
}

const BillSectionScreen = () => {
    const navigation = useCustomNavigation('BillSectionScreen')
    const route = useRoute<RootRouteProps<'BillSectionScreen'>>();
    let params = route.params

    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: '' })
    const menuRef = useRef(null);
    const onPress = () => {
        console.log("onPress")
    }

    const optionData = [
        { title: strings.Remove, onPress: onPress, imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEdit(true)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.BillName}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.threeDotMenuIcon} />
                    </TouchableOpacity>
                }
                headerLeftStyle={{
                    width: wp("50%"),
                    paddingLeft: wp(3)
                }}
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView>
                    {params.type == "sign" &&
                        <Image source={params.imageUrl ? params.imageUrl : ImagesPath.add_photo} style={styles.addPhotoStyle} />
                    }
                    <CustomTextInput
                        title={strings.Name}
                        container={{ marginVertical: wp(5) }}
                        value={params.name}
                        editable={isEdit}
                        onChangeText={(text) => { }}
                    />
                    {
                        params.type == "sign" &&
                        <CustomTextInput
                            title={strings.Quantity}
                            container={{ marginBottom: wp(5) }}
                            value={params.quantity}
                            editable={isEdit}
                            onChange={(text) => { }}
                        />
                    }
                    <DropDownComponent
                        title={strings.TypeCounting}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setCountingValue(item)}
                        value={countingValue.value}
                        placeholder={'Select'}
                        container={{ marginBottom: wp(5) }}
                    />
                    {
                        params.type != "sign" &&
                        <CustomTextInput
                            title={strings.JumpingRation}
                            container={{ marginBottom: wp(5) }}
                            value={params.ration}
                            editable={isEdit}
                            onChange={(text) => { }}
                        />
                    }

                </ScrollView>
            </Container>
            <CustomDropdown
                componentRef={menuRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
                modalStyle={{ right: 0 }}
            />
        </View>
    )
}

export default BillSectionScreen