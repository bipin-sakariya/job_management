import { FlatList, Image, ListViewComponent, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import InboxListComponent from '../../components/InboxListComponent';
import { strings } from '../../languages/localizedStrings';
import { colors } from '../../styles/Colors';
export interface messageListProps {
    id: number,
    title: string,
    description: string,
    count: number | null,
    imageurl: string
}
const data: messageListProps[] = [
    { id: 1, title: 'P. תחזוקה', description: 'לורם איפסום הוא פשוט דמה', count: null, imageurl: '' },
    { id: 2, title: 'P. תחזוקה', description: 'לורם איפסום הוא פשוט דמה', count: 2, imageurl: '' },
    { id: 3, title: 'P. תחזוקה', description: 'לורם איפסום הוא פשוט דמה', count: null, imageurl: '' },
    { id: 4, title: 'אַספַלט', description: 'לורם איפסום הוא פשוט דמה', count: 2, imageurl: '' },
    { id: 5, title: 'פרויקט א', description: 'לורם איפסום הוא פשוט דמה', count: null, imageurl: '' },
    { id: 6, title: 'P. תחזוקה', description: 'לורם איפסום הוא פשוט דמה', count: 2, imageurl: '' },
    { id: 7, title: 'P. תחזוקה', description: 'לורם איפסום הוא פשוט דמה', count: null, imageurl: '' },
    { id: 8, title: 'P. תחזוקה', description: 'לורם איפסום הוא פשוט דמה', count: 2, imageurl: '' },
    { id: 9, title: 'אַספַלט', description: 'לורם איפסום הוא פשוט דמה', count: 2, imageurl: '' },
    { id: 10, title: 'פרויקט א', description: 'לורם איפסום הוא פשוט דמה', count: null, imageurl: '' },
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
                    <Text style={globalStyles.headerTitle}>{strings.message}</Text>
                }
                headerRightComponent={
                    <TouchableOpacity>
                        <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                    </TouchableOpacity>
                }
            />
            <Container>
                <FlatList
                    data={data}
                    renderItem={({ item, index }: { item: messageListProps, index: number }) => (
                        <InboxListComponent item={item} index={index} />
                    )}
                    contentContainerStyle={{ paddingBottom: wp(30) }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(5), backgroundColor: colors.white_color }} />
                        )
                    }}
                />
            </Container>
        </View>
    )
}

export default IndoxScreen;
