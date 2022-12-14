import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Container, Header, JobListComponent } from "../../components";
import { strings } from "../../languages/localizedStrings";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";

const NotificationScreen = () => {
    const navigation = useNavigation()
    const JobData = [
        {
            data: '16 May 2022',
            jobs: [
                { title: '9 Beit Hadfus', jobstatus: strings.jobAddedBy, author: '@Robert Kramer', km: '2m' },
                { title: '9 Beit Hadfus', jobstatus: strings.JobClosedby, author: '@Tiffany Rivas', km: '2m' },
                { title: '9 Beit Hadfus', jobstatus: strings.jobAddedBy, author: '@Robert Kramer', km: '2m' }
            ]
        },
        {
            data: '15 May 2022',
            jobs: [
                { title: '9 Beit Hadfus', jobstatus: strings.JobClosedby, author: '@Tiffany Rivas', km: '1d' },
                { title: '9 Beit Hadfus', jobstatus: strings.jobAddedBy, author: '@Robert Kramer', km: '1d' },
                { title: '9 Beit Hadfus', jobstatus: strings.JobClosedby, author: '@Tiffany Rivas', km: '1d' }
            ]
        },
        {
            data: '14 May 2022',
            jobs: [
                { title: '9 Beit Hadfus', jobstatus: strings.jobAddedBy, author: '@Robert Kramer', km: '2d' },
                { title: '9 Beit Hadfus', jobstatus: strings.JobClosedby, author: '@Tiffany Rivas', km: '2d' },
                { title: '9 Beit Hadfus', jobstatus: strings.jobAddedBy, author: '@Robert Kramer', km: '2d' }
            ]
        }
    ]
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.Notifications}</Text>
                    </TouchableOpacity>
                }
            />
            <Container>
                <FlatList
                    data={JobData}
                    renderItem={({ item, index }) => (
                        <JobListComponent item={item} index={index} />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </View>
    )
}
export default NotificationScreen