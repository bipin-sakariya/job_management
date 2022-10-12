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

const BillCreateScreen = () => {
    const navigation = useCustomNavigation('BillCreateScreen');
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
            <Container style={{ paddingHorizontal: wp(5) }}>
                <CustomSubTitleWithImageComponent title='Create Material bill section' image={ImagesPath.receipt_icon} />
                <TouchableOpacity onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: 'material' }) }} style={styles.dashedView}>
                    <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                    <Text style={styles.dashedTxt}>Create Material Bill</Text>
                </TouchableOpacity>
                <CustomSubTitleWithImageComponent title='Create Sign Bill section' image={ImagesPath.receipt_icon} />
                <TouchableOpacity onPress={() => { navigation.navigate('CreateBillSectionScreen', { type: 'sign' }) }} style={styles.dashedView}>
                    <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                    <Text style={styles.dashedTxt}>Create Sign Bill</Text>
                </TouchableOpacity>
            </Container>
        </View>
    )
}

export default BillCreateScreen

