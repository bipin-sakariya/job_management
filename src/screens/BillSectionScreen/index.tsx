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
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { colors } from '../../styles/Colors';
interface DropdownProps {
    label: string,
    value: number
}

const BillSectionScreen = () => {
    const navigation = useCustomNavigation('BillSectionScreen')
    const route = useRoute<RootRouteProps<'BillSectionScreen'>>();
    let { type, name, ration, unit, imageUrl, quantity } = route.params

    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: 0 })
    const menuRef = useRef(null);

    const optionData = [
        { title: strings.Remove, onPress: () => deleteBill(), imageSource: ImagesPath.bin_icon },
        {
            title: strings.Edit, onPress: () => {
                setIsEdit(true)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const deleteBill = () => {
        //delete bill 
    }

    const data = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
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
                <KeyboardAvoidingScrollView scrollEventThrottle={16}>
                    {type == "sign" &&
                        <Image source={imageUrl ? imageUrl : ImagesPath.add_photo} style={styles.addPhotoStyle} />
                    }
                    <CustomTextInput
                        title={strings.Name}
                        container={{ marginVertical: wp(5) }}
                        value={name}
                        editable={false}
                        onChangeText={(text) => { }}
                    />
                    {
                        type == "sign" &&
                        <CustomTextInput
                            title={strings.Quantity}
                            container={{ marginBottom: wp(5) }}
                            value={quantity}
                            editable={false}
                            onChange={(text) => { }}
                        />
                    }
                    <DropDownComponent
                        title={strings.TypeCounting}
                        data={data}
                        disable={true}
                        image={ImagesPath.down_white_arrow}
                        imageStyle={{ tintColor: colors.white_color }}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setCountingValue(item)}
                        value={countingValue.value}
                        placeholder={strings.choose}
                        container={{ marginBottom: wp(5) }}
                    />
                    {
                        type != "sign" &&
                        <CustomTextInput
                            title={strings.JumpingRation}
                            container={{ marginBottom: wp(5) }}
                            value={ration}
                            editable={false}
                            onChange={(text) => { }}
                        />
                    }
                </KeyboardAvoidingScrollView>
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