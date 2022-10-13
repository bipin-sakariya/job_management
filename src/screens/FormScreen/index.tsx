import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import CustomListView from '../../components/CustomListView'

const FormScreen = () => {
    const navigation = useCustomNavigation('FormScreen');
    const form = [
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Form Name',
            date: '12 May 2022',
        },
    ]
    const renderItem = ({ item, index }: any) => {
        return (
            <CustomListView item={item} onPress={() => {
                let params = {
                    name: item.title,
                    unit: 'unit',
                    ration: '15',
                    image: '',
                    quantity: '2',
                    type: 'sing',
                }
                navigation.navigate("FormDetailsScreen")
            }} />
        )
    }
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.JobTxt}>Form</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => { navigation.navigate("CreateFormScreen") }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <FlatList showsVerticalScrollIndicator={false} data={form}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                <Image source={ImagesPath.squre_note_icon} style={{ height: wp(5), width: wp(5) }} />
                                <Text style={styles.billListTxt}>Form List</Text>
                            </View>
                        )
                    }}
                    renderItem={renderItem} ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(3) }} />
                        )
                    }} />
            </Container>
        </View>
    )
}

export default FormScreen

