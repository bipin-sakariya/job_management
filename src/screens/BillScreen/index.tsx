import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FlatList } from 'react-native-gesture-handler'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import CustomListView from '../../components/CustomListView'

const BillListScreen = () => {
    const navigation = useCustomNavigation('BillListScreen');
    const bills = [
        {
            iamgeUrl: 'dsdfsd',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: 'sdfsdf',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: 'sfsdf',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: 'sdfsf',
            title: 'Bill name',
            date: '12 May 2022',
        },

        {
            iamgeUrl: '',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Bill name',
            date: '12 May 2022',
        },

        {
            iamgeUrl: '',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Bill name',
            date: '12 May 2022',
        },
        {
            iamgeUrl: '',
            title: 'Bill name',
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
                navigation.navigate("BillSectionScreen", params)
            }} />
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.JobTxt}>Bills</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }} onPress={() => { navigation.navigate('BillCreateScreen') }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <FlatList showsVerticalScrollIndicator={false} data={bills}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                <Image source={ImagesPath.squre_note_icon} style={{ height: wp(5), width: wp(5) }} />
                                <Text style={styles.billListTxt}>Bill List</Text>
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

export default BillListScreen
