import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useRef, useState } from 'react';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import { globalStyles } from '../../styles/globalStyles';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { DropdownProps } from '../../types/commanTypes';
import CustomDropdown from '../../components/CustomDropDown';

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

const UserGroupDetailScreen = () => {
    const navigation = useCustomNavigation('UserGroupDetailScreen');
    const route = useRoute<RootRouteProps<'UserGroupDetailScreen'>>();
    const { type } = route.params;

    const menuRef = useRef(null);
    const [role, setRole] = useState<DropdownProps>({ label: '', value: '' })
    const [permission, setPermission] = useState<DropdownProps>({ label: '', value: '' })
    const [visible, setVisible] = useState(false);

    const onPress = () => {
        console.log("Remove")
    }

    const optionData = [
        { title: 'Remove', onPress: onPress, imageSource: ImagesPath.bin_icon },
        { title: 'edit', onPress: onPress, imageSource: ImagesPath.edit_icon }
    ]

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{type == 'users' ? 'Add User' : 'Add Group'}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <TouchableOpacity ref={menuRef} onPress={() => setVisible(true)}>
                        <Image source={ImagesPath.menu_dots_icon} style={styles.headerMenu} />
                    </TouchableOpacity>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomSubTitleWithImageComponent
                        title={type == 'users' ? 'Fill from to create User' : 'Fill from to Create Group'}
                        image={ImagesPath.from_list_icon}
                    />
                    <Image source={ImagesPath.add_photo_icon} style={styles.addPhotoStyle} />
                    <CustomTextInput
                        title='User Name'
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    <CustomTextInput
                        title='Email'
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    <CustomTextInput
                        title='Contact no.'
                        container={{ marginBottom: wp(5) }}
                        value={'stanleylamb@gmail.com'}
                    />
                    <CustomTextInput
                        title='Password'
                        secureTextEntry
                        icon={<Image source={ImagesPath.close_eye_icon} style={styles.iconStyle} />}
                        container={{ marginBottom: wp(5) }}
                        value={'Stanley Lamb'}
                    />
                    <DropDownComponent
                        title='Role'
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setRole(item)}
                        value={role.value}
                        placeholder={'Select Role for User'}
                        container={{ marginBottom: wp(5) }}
                    />

                    <DropDownComponent
                        title='Permission'
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setPermission(item)}
                        value={permission.value}
                        placeholder={'Give Permission'}
                        container={{ marginBottom: wp(5) }}
                    />
                    <CustomBlackButton
                        title={type == 'users' ? 'Create User' : 'Create Group'}
                        image={ImagesPath.plus_white_circle_icon}
                        onPress={() => { }}
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

export default UserGroupDetailScreen;

