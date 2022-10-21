import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomDashedComponent, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
interface DropdownProps {
    label: string,
    value: string
}

const CreateBillSectionScreen = () => {
    const navigation = useCustomNavigation('CreateBillSectionScreen')
    const route = useRoute<RootRouteProps<'CreateBillSectionScreen'>>();
    let { type } = route.params
    console.log("🚀 ~ file: index.tsx ~ line 21 ~ CreateBillSectionScreen ~ type", type)
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: '' })
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
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(50) }]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.BillSection}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent disabled title='Prepare your Bill' image={ImagesPath.receipt_icon} />
                <CustomDashedComponent viewStyle={{ paddingVertical: wp(5) }} image={ImagesPath.add_icon} onPress={() => { }} title={strings.Addasignlogo} />
                <CustomTextInput
                    title={strings.Name}
                    container={{ marginVertical: wp(5) }}
                    placeholder='Enter name'
                />
                {
                    type == "material" ?
                        <>
                            < DropDownComponent
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
                            <CustomTextInput
                                title={strings.JumpingRation}
                                placeholder='Enter Jumping Ration'
                                container={{ marginBottom: wp(5) }}
                            />
                        </>
                        :
                        <>
                            <CustomTextInput
                                title={strings.Quantity}
                                placeholder='Enter Jumping Ration'
                                container={{ marginBottom: wp(5) }}
                            />
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
                        </>
                }
                <CustomBlackButton
                    title={strings.CreateBill}
                    image={ImagesPath.plus_white_circle_icon}
                    onPress={() => { }}
                />
            </Container>
        </View>
    )
}

export default CreateBillSectionScreen