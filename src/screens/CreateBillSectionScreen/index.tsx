import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomDetailsComponent, CustomSubTitleWithImageComponent, Header } from '../../components';
import { styles } from './styles';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { colors } from '../../styles/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import DropDownComponent from '../../components/DropDownComponent';

interface DropdownProps {
    label: string,
    value: string
}

const CreateBillSectionScreen = () => {
    const navigation = useCustomNavigation('CreateBillSectionScreen')
    const route = useRoute<RootRouteProps<'CreateBillSectionScreen'>>();
    let { type } = route.params
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
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.billSectionTxt}>Bill Section</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent title='Prepare your Bill' image={ImagesPath.receipt_icon} />
                <CustomDetailsComponent title='Name' detailsContainerStyle={{
                    marginVertical: wp(5)
                }} bottomComponent={
                    <TextInput
                        placeholder='Enter name'
                        style={{ paddingVertical: wp(2), fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.SMALL_14, color: colors.light_brown }}
                    />
                } />
                <CustomDetailsComponent title='Type Counting' bottomComponent={
                    <DropDownComponent data={data} image={ImagesPath.down_white_arrow} labelField="label" valueField="value" onChange={setCountingValue} value={countingValue.label} placeHolderTxt={'Select'} />
                    // <Dropdown
                    //     data={data}
                    //     onChange={(data) => {
                    //         setCountingValue(data.value)
                    //     }}
                    //     placeholder={'Select'}
                    //     placeholderStyle={styles.placeHolderTxt}
                    //     labelField="label"
                    //     valueField="value"
                    //     value={countingValue}
                    //     style={{ paddingVertical: wp(0.5) }}
                    //     containerStyle={{ marginVertical: wp(2) }}
                    //     renderRightIcon={() => {
                    //         return (
                    //             <Image source={ImagesPath.down_white_arrow} style={globalStyles.headerIcon} />
                    //         )
                    //     }}
                    // />
                } />
                <CustomDetailsComponent title='Jumping Ration' detailsContainerStyle={{
                    marginVertical: wp(5)
                }} bottomComponent={
                    <TextInput
                        placeholder='Enter Jumping Ration'
                        style={{ paddingVertical: wp(2), fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.SMALL_14, color: colors.light_brown }}
                    />
                } />
                <CustomBlackButton title='Create Bill' image={ImagesPath.plus_white_circle_icon} onPress={() => { }} />
            </Container>
        </View>
    )
}

export default CreateBillSectionScreen