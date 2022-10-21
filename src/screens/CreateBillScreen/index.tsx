import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Container, Header } from '../../components'
import { globalStyles } from '../../styles/globalStyles'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../../styles/Colors'
import CustomSubTitleWithImageComponent from '../../components/CustomSubTitleWithImageComponent'
import CustomDashedComponent from '../../components/CustomDashedComponent'
import { strings } from '../../languages/localizedStrings'

const BillCreateScreen = () => {
    const navigation = useCustomNavigation('BillCreateScreen');
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.BillSection}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent disabled title={strings.CreateMaterialBillSection} image={ImagesPath.receipt_icon} />
                <CustomDashedComponent
                    image={ImagesPath.add_icon}
                    viewStyle={{ paddingVertical: wp(8) }}
                    onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: "material" }) }}
                    title={strings.CreateMaterialBill} />
                <CustomSubTitleWithImageComponent disabled viewStyle={{ marginTop: wp(2) }} title={strings.CreateSignBillsection} image={ImagesPath.receipt_icon} />
                <CustomDashedComponent
                    image={ImagesPath.add_icon}
                    viewStyle={{ paddingVertical: wp(8) }}
                    onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: "sign" }) }}
                    title={strings.CreateSignBill} />
            </Container>
        </View>
    )
}

export default BillCreateScreen

