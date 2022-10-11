import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';

const UsersScreen = () => {
    const navigation = useNavigation();
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
                <View style={globalStyles.rowView}>
                    <Image source={ImagesPath.group_icon} style={styles.folderIcon} />
                    <Text style={styles.subTitleTxt}>Added Users</Text>
                </View>
                <FlatList
                    data={[{}, {}, {}, {}, {}]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[globalStyles.rowView, { justifyContent: 'space-between', marginBottom: wp(2.5) }]}>
                                <View style={globalStyles.rowView}>
                                    <Image source={ImagesPath.placeholder_img} style={{ height: wp(14), width: wp(14), resizeMode: 'contain' }} />
                                    <View style={{ paddingHorizontal: wp(2) }}>
                                        <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18 }}>Stanley Lamb</Text>
                                        <Text style={{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>Role of User</Text>
                                    </View>
                                </View>
                                <View style={globalStyles.rowView}>
                                    <Text style={{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10 }}>12 May 2022</Text>
                                    <Image source={ImagesPath.menu_dots__icon} style={{ height: wp(10), width: wp(10), resizeMode: 'contain' }} />
                                </View>
                            </View>
                        )
                    }}
                />
            </Container>
        </View>
    )
}

export default UsersScreen;
