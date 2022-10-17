import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Container, Header } from "../../components";
import CustomJobListComponent from "../../components/CustomJobListComponent";
import useCustomNavigation from "../../hooks/useCustomNavigation";
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
    selected: boolean
}

const JobDuplicateListScreen = () => {

    const navigation = useCustomNavigation('JobDuplicateListScreen');

    const JobData: JobDataProps[] = [
        { id: 1, title: 'Job Title1', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 2, title: 'Job Title2', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", selected: false },
        { id: 3, title: 'Job Title3', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer", selected: false },
        { id: 4, title: 'Job Title4', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 5, title: 'Job Title5', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 6, title: 'Job Title6', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 7, title: 'Job Title7', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 8, title: 'Job Title8', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Return", selected: false },
        { id: 9, title: 'Job Title9', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 km away', date: "16 may 2022", button: "Transfer", selected: false },
        { id: 10, title: 'Job Title10', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '20 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 11, title: 'Job Title11', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", selected: false },
        { id: 12, title: 'Job Title12', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '5 km away', date: "16 may 2022", button: "Open", selected: false },
    ]
    const [jobData, setJobData] = useState(JobData)

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={styles.jobMainView}>
                <TouchableOpacity onPress={() => { setSelected(item, index) }} style={[styles.selectBoxView, { backgroundColor: item.selected ? colors.brown : colors.white, }]}>
                    {item.selected && <Image source={ImagesPath.right_icon} style={styles.rightIcon} />}
                </TouchableOpacity>
                <CustomJobListComponent item={item} />
            </View>
        )
    }

    const setSelected = (item: JobDataProps, index: number) => {
        let emptyJobList: Array<any> = []
        jobData.map((data) => {
            if (data.id == item.id) {
                emptyJobList.push({
                    ...data,
                    selected: !data.selected
                })
            } else {
                emptyJobList.push(data)
            }
        })
        setJobData(emptyJobList)
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>Route</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => { }} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18 }}>Done</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container>
                <FlatList
                    data={jobData}
                    renderItem={renderItem}
                />
            </Container>
        </View>
    )
}

export default JobDuplicateListScreen