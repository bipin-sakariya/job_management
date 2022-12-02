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

const JobDuplicateListScreen = () => {

    const navigation = useCustomNavigation('JobDuplicateListScreen');

    const JobData: JobDataProps[] = [
        { id: 1, title: 'Job Title1', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 2, title: 'Job Title2', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 3, title: 'Job Title3', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },
        { id: 4, title: 'Job Title4', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },
        { id: 5, title: 'Job Title5', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 6, title: 'Job Title6', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false, status: 'hjb' },
        { id: 7, title: 'Job Title7', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },
        { id: 8, title: 'Job Title8', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },
        { id: 9, title: 'Job Title9', description: 'Lorem Ipsum is simply dummy text of the printing...', km: '15 ק"מ משם', date: "16 may 2022", button: "לִפְתוֹחַ", selected: false },

    ]
    const [jobData, setJobData] = useState(JobData)
    const [isIndex, setIsIndex] = useState(0)

    const renderItem = ({ item, index }: any) => {
        { console.log(item.status) }
        return (
            <TouchableOpacity onPress={() => { setSelected(item, index) }} style={styles.jobMainView}>
                <View style={{ marginLeft: wp(3.5) }}>
                    <View style={styles.roundView} >
                        <View style={[styles.roundFillView, { backgroundColor: item.selected ? colors.brown : colors.white_5, }]} />
                    </View>
                </View>
                <CustomJobListComponent
                    item={item}
                    listStyle={{ flex: 1, }}
                    textStyle={{ flex: 1 }}
                    onPress={() => { setSelected(item, index) }} />
            </TouchableOpacity>
        )
    }

    const setSelected = (item: JobDataProps, index: number) => {
        let emptyJobList: Array<any> = []
        jobData.map((data) => {
            if (data.id == item.id) {
                emptyJobList.push({
                    ...data,
                    selected: !data.selected,

                })
                setIsIndex(item.id)
            } else {
                emptyJobList.push({
                    ...data,
                    selected: false
                })
            }
        })
        // navigation.navigate('DuplicateScreen')
        setJobData(emptyJobList)
    }
    console.log({ isIndex })
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{strings.Duplicate}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => { }} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('DuplicateScreen', { params: isIndex }) }}>
                            <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18 }}>{strings.Done}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={jobData}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </View>
    )
}

export default JobDuplicateListScreen