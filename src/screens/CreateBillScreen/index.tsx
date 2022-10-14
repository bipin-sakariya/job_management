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
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.billSectionTxt}>{strings.BillSection}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(5) }}>
                <CustomSubTitleWithImageComponent title={strings.CreateMaterialBillSection} image={ImagesPath.receipt_icon} />
                <CustomDashedComponent
                    image={ImagesPath.add_icon}
                    onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: strings.material }) }}
                    title={strings.CreateMaterialBill} />
                <CustomSubTitleWithImageComponent viewStyle={{ marginTop: wp(2) }} title={strings.CreateSignBillsection} image={ImagesPath.receipt_icon} />
                <CustomDashedComponent
                    image={ImagesPath.add_icon}
                    onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: strings.sign }) }}
                    title={strings.CreateSignBill} />
            </Container>
        </View>
    )
}

export default BillCreateScreen

