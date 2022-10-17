import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { DropdownProps } from '../../types/commanTypes'

const CreateFormScreen = () => {
    const navigation = useCustomNavigation('CreateFormScreen');
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
                        <Text style={styles.billSectionTxt}>Create Form</Text>
                    </TouchableOpacity>
                } />
            <Container style={{ paddingHorizontal: wp(5) }}>
                <CustomSubTitleWithImageComponent disabled viewStyle={{ marginTop: wp(2) }} title='Create Form' image={ImagesPath.receipt_icon} />
                <CustomTextInput
                    title='Form Name'
                    container={{ marginVertical: wp(5) }}
                    value={'Form name'}
                    onChangeText={(text) => { }}
                />
                <DropDownComponent
                    title='Add Bill'
                    data={data}
                    image={ImagesPath.down_white_arrow}
                    labelField="label"
                    valueField="value"
                    onChange={(item) => setCountingValue(item)}
                    value={countingValue.value}
                    placeholder={'Select'}
                    container={{ marginBottom: wp(5) }}
                />
                <CustomBlackButton title='Create Form' image={ImagesPath.plus_white_circle_icon} imageStyle={globalStyles.headerIcon} />
            </Container>
        </View>
    )
}

export default CreateFormScreen