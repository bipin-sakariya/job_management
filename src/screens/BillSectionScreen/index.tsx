import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { useRoute } from '@react-navigation/native';
import { RootRouteProps } from '../../types/RootStackTypes';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomTextInput, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import CustomDropdown from '../../components/CustomDropDown';

const BillSectionScreen = () => {
    const navigation = useCustomNavigation('BillSectionScreen')
    const route = useRoute<RootRouteProps<'BillSectionScreen'>>();
    let params = route.params

    const [visible, setVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [text, setText] = useState("")
    const menuRef = useRef(null);
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
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={styles.billSectionTxt}>Bill name</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity style={[globalStyles.rowView,]} ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={globalStyles.threeDotMenuIcon} />
                    </TouchableOpacity>
                }
                headerLeftStyle={{ width: wp("40%") }}
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView>
                    {params.type == "sing" &&
                        <Image source={params.imageUrl ? params.imageUrl : ImagesPath.add_photo} style={styles.addPhotoStyle} />
                    }
                    <CustomTextInput
                        title='Name'
                        container={{ marginVertical: wp(5) }}
                        value={params.name}
                        editable={isEdit}
                        onChangeText={(text) => { }}
                    />
                    {
                        params.type == "sing" &&
                        <CustomTextInput
                            title='Quantity'
                            container={{ marginBottom: wp(5) }}
                            value={params.quantity}
                            editable={isEdit}
                            onChange={(text) => { }}
                        />
                    }
                    <CustomTextInput
                        title='Type Counting'
                        container={{ marginBottom: wp(5) }}
                        value={params.unit}
                        editable={isEdit}
                        onChange={(text) => { }}
                    />
                    <CustomTextInput
                        title='Jumping Ration'
                        container={{ marginBottom: wp(5) }}
                        value={params.ration}
                        editable={isEdit}
                        onChange={(text) => { }}
                    />

                </ScrollView>
            </Container>
            <CustomDropdown
                componentRef={menuRef}
                dropdownData={optionData}
                isVisible={visible}
                setIsVisible={setVisible}
                modalStyle={{ right: 0 }}
            />
        </View>
    )
}

export default BillSectionScreen