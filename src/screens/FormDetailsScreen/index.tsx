import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomTextInput, Header } from '../../components'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { ImagesPath } from '../../utils/ImagePaths'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { styles } from './styles'
import CustomDropdown from '../../components/CustomDropDown'
import TableHeaderView from '../../components/TableHeaderView'
import TableDetailsComponent from '../../components/TableDetailsComponent'

const FormDetailsScreen = () => {
    const navigation = useCustomNavigation('FormDetailsScreen');
    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const menuRef = useRef(null);
    const FormData = [
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: 'dssdfsdfsf'
        },

        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },
        {
            srno: "01",
            name: "Asphalt Paint",
            qty: "1",
            unit: "15",
            parameter: "Meter",
            imageUrl: ''
        },

    ]
    const onPress = () => {
        console.log("onPress")
    }

    const optionData = [
        { title: 'Remove', onPress: onPress, imageSource: ImagesPath.bin_icon },
        {
            title: 'edit', onPress: () => {
                setIsEdit(true)
            }, imageSource: ImagesPath.edit_icon
        }
    ]

    const renderItem = ({ item, index }: any) => {
        return (
            <TableDetailsComponent type='form' item={item} />
        )
    }
    return (
        <View style={globalStyles.container}>
            <Header headerLeftComponent={
                <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                    <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                    <Text style={styles.billSectionTxt}>From Name</Text>
                </TouchableOpacity>
            }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.threeDotMenuIcon} />
                    </TouchableOpacity>
                }
                headerLeftStyle={{ width: wp("40%") }} />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomTextInput
                    title='Form Name'
                    container={{ marginVertical: wp(5) }}
                    value={'Form name 1'}
                    editable={isEdit}
                    onChange={(text) => { }}
                />
                <View style={[styles.sammedView, { flexShrink: 1 }]}>
                    <View style={styles.formHeaderView}>
                        <Text style={[styles.noNameTxt]}>Forms</Text>
                    </View>
                    <FlatList data={FormData} renderItem={renderItem}
                        ListHeaderComponent={() => {
                            return (
                                <TableHeaderView type={"form"} />
                            )
                        }}
                        ItemSeparatorComponent={() => <View style={styles.sammedSepratorLine} />}
                    />
                </View>
            </Container>
            <CustomDropdown
                componentRef={menuRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
                modalStyle={{ marginHorizontal: 0 }}
            />
        </View>
    )
}

export default FormDetailsScreen

