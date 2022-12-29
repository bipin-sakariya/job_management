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
import FontSizes from '../../styles/FontSizes'
import { RootRouteProps } from '../../types/RootStackTypes'
import { useRoute } from '@react-navigation/native'
import RouteScreen from '../RouteScreen'

const BillCreateScreen = () => {
    const navigation = useCustomNavigation('BillCreateScreen');
    const route = useRoute<RootRouteProps<'BillCreateScreen'>>();

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
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.billSection}</Text>
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent disabled title={strings.createMaterialBillSection} image={ImagesPath.receipt_icon} />
                <CustomDashedComponent
                    image={ImagesPath.add_icon}
                    viewStyle={{ paddingVertical: wp(8) }}
                    imageStyle={styles.iconStyle}
                    textStyle={{ fontSize: FontSizes.EXTRA_LARGE_24 }}
                    onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: "material", screenName: route.params.screenName }) }}
                    title={strings.createMaterialBill} />
                <CustomSubTitleWithImageComponent disabled viewStyle={{ marginTop: wp(2) }} title={strings.createSignBillsection} image={ImagesPath.receipt_icon} />
                <CustomDashedComponent
                    image={ImagesPath.add_icon}
                    viewStyle={{ paddingVertical: wp(8) }}
                    imageStyle={styles.iconStyle}
                    textStyle={{ fontSize: FontSizes.EXTRA_LARGE_24 }}
                    onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: "sign", screenName: route.params.screenName }) }}
                    title={strings.createSignBill} />
            </Container>
        </View>
    )
}

export default BillCreateScreen

