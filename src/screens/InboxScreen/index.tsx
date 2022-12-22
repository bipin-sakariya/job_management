import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import InboxListComponent from '../../components/InboxListComponent';

const data = [
    { title: 'P. Maintanence', description: 'Lorem Ipsum is simply dummy', count: null },
    { title: 'Paint / Signs', description: 'Lorem Ipsum is simply dummy', count: 2 },
    { title: 'Council', description: 'Lorem Ipsum is simply dummy', count: null },
    { title: 'Asphalt', description: 'Lorem Ipsum is simply dummy', count: 2 },
    { title: 'Project A', description: 'Lorem Ipsum is simply dummy', count: null },
    { title: 'Project B', description: 'Lorem Ipsum is simply dummy', count: 2 },
    { title: 'Project c', description: 'Lorem Ipsum is simply dummy', count: null },
    { title: 'Project d', description: 'Lorem Ipsum is simply dummy', count: 2 },
    { title: 'Project e', description: 'Lorem Ipsum is simply dummy', count: null },
    { title: 'Project f', description: 'Lorem Ipsum is simply dummy', count: 2 },
    { title: 'Project g', description: 'Lorem Ipsum is simply dummy', count: null },
]
const IndoxScreen = () => {
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: '50%',
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <Text style={globalStyles.headerTitle}>inbox</Text>
                }
                headerRightComponent={
                    <TouchableOpacity style={{ marginRight: wp(3) }}>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <InboxListComponent item={item} />
                    )}
                    contentContainerStyle={{ paddingBottom: wp(30) }}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </View>
    )
}

export default IndoxScreen;
