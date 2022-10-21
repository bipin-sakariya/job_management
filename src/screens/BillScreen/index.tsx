import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonTab, Container, Header } from '../../components'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { FlatList } from 'react-native-gesture-handler'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import CustomListView from '../../components/CustomListView'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'

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
    const [btn, setBtn] = useState({
        open: true,
        close: false
    })
    const renderItem = ({ item, index }: any) => {
        return (
            <CustomListView item={item} material={btn.open} onPress={() => {
                let params = {
                    name: item.title,
                    unit: 'unit',
                    ration: '15',
                    image: '',
                    quantity: '2',
                    type: 'material',
                }
                navigation.navigate("BillSectionScreen", params)
            }} />
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.Bills}</Text>
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
                <ButtonTab btnOneTitle={strings.accountmaterial} btnTwoTitle={strings.Signabill} setBtn={setBtn} btnValue={btn} />
                <FlatList showsVerticalScrollIndicator={false} data={bills}
                    ListHeaderComponent={() => {
                        return (
                            <View style={[globalStyles.rowView, { marginBottom: wp(4) }]}>
                                <Image source={ImagesPath.squre_note_icon} style={styles.noteIconStyle} />
                                <Text style={[styles.billListTxt, globalStyles.rtlStyle]}>{strings.BillList}</Text>
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
