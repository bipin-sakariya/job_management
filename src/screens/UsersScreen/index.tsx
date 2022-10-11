import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import UserListComponent from '../../components/UserListComponent';

const UsersScreen = () => {
    const navigation = useNavigation();
    const imageRef = useRef(null);
    const [visibale, setVisible] = useState(false);

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(40) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>Users</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Image source={ImagesPath.add_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <View style={styles.addUserContainer}>
                    <Image source={ImagesPath.add_icon} style={styles.addBtnStyle} />
                    <Text style={styles.addNewUserTxt}>ADD NEW USER</Text>
                </View>
                <View style={[globalStyles.rowView, { paddingVertical: wp(1.5) }]}>
                    <Image source={ImagesPath.group_icon} style={styles.folderIcon} />
                    <Text style={styles.subTitleTxt}>Added Users</Text>
                </View>
                <FlatList
                    data={[{}, {}, {}, {}, {}]}
                    renderItem={({ item, index }) => {
                        return (
                            <UserListComponent item={item} />
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </Container>
        </View>
    )
}

export default UsersScreen;
