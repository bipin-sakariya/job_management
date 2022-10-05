import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { globalStyles } from '../../styles/globalStyles';
import { Container, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';

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
                headerLeftComponent={
                    <Text style={globalStyles.headerTitle}>Inbox</Text>
                }
                headerRightComponent={
                    <TouchableOpacity style={{ marginRight: wp(3) }}>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container>
                <FlatList
                    contentContainerStyle={{ paddingBottom: wp(30) }}
                    data={data}
                    renderItem={({ item, index }) => (
                        <View style={{ paddingHorizontal: wp(4), ...globalStyles.rowView, marginBottom: wp(4) }}>
                            <Image source={ImagesPath.placeholder_img} style={{
                                height: wp(18),
                                width: wp(18),
                                resizeMode: 'contain'
                            }} />
                            <View style={{ flex: 1, ...globalStyles.rowView, justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.SEMI_LARGE_20, paddingHorizontal: wp(2.5) }}>{item.title}</Text>
                                    <Text style={{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_12, paddingHorizontal: wp(2.5) }}>{item.description}</Text>
                                </View>
                                {item.count && <View style={{ backgroundColor: '#E1E1E1', borderRadius: wp(3.75), width: wp(7.5), height: wp(7.5), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: fonts.FONT_POP_REGULAR, fontSize: FontSizes.EXTRA_SMALL_10, paddingHorizontal: wp(2.5), paddingVertical: wp(2) }}>{item.count}</Text>
                                </View>}
                            </View>

                        </View>
                    )}
                />
            </Container>
        </View>
    )
}

export default IndoxScreen;
