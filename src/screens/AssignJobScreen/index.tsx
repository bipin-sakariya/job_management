import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Container, Header } from "../../components";
import CustomJobListComponent from "../../components/CustomJobListComponent";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { strings } from "../../languages/localizedStrings";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";

interface JobDataProps {
    id: number,
    title: string,
    description: string,
    km: string,
    date: string,
    button: string,
    selected: boolean,
    status?: string
}

const AssignJobScreen = () => {

    const navigation = useCustomNavigation('JobDuplicateListScreen');

    const JobData: JobDataProps[] = [
        { id: 1, title: 'Job Title1', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 2, title: 'Job Title2', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 3, title: 'Job Title3', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },
        { id: 4, title: 'Job Title4', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },
        { id: 5, title: 'Job Title5', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 6, title: 'Job Title6', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },

    ]


    const renderItem = ({ item, index }: any) => {
        { console.log(item.status) }
        return (
            <TouchableOpacity style={styles.jobMainView}>

                <CustomJobListComponent
                    item={item}
                    listStyle={{ flex: 1, }}
                    textStyle={{ flex: 1 }}
                    onPress={() => { }} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView, { width: wp(60) }]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.All_Assign_job}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => { }} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={JobData}
                    renderItem={renderItem}
                />
            </Container>
        </View>
    )
}

export default AssignJobScreen