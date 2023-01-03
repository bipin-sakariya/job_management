import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Container, Header } from "../../components";
import CustomJobListComponent from "../../components/CustomJobListComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { strings } from "../../languages/localizedStrings";
import { jobList } from "../../redux/slices/AdminSlice/jobListSlice";
import { colors } from "../../styles/Colors";
import fonts from "../../styles/Fonts";
import FontSizes from "../../styles/FontSizes";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { GroupParams } from "../TransferJobScreen";
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

interface jobListParams {
    page?: number,
    search?: string
}

const JobDuplicateListScreen = () => {
    const navigation = useCustomNavigation('JobDuplicateListScreen');
    const { jobListData } = useAppSelector(state => state.jobList);
    const dispatch = useAppDispatch();
    const isFocused = useIsFocused();

    const [page, setPage] = useState(1);
    const [isIndex, setIsIndex] = useState(0);
    const [finalJobList, setFinalJobList] = useState<GroupParams[]>([]);

    useEffect(() => {
        jobListApiCall(page);
    }, [navigation, isFocused])

    const jobListApiCall = (page: number) => {
        let params: jobListParams = {
            page: page,
            search: ''
        }
        dispatch(jobList(params)).unwrap().then((res) => {
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity onPress={() => { setSelected(item, index) }} style={styles.jobMainView}>
                <View style={{ marginLeft: wp(3.5) }}>
                    <View style={globalStyles.roundView}>
                        <View style={[styles.roundFillView, { backgroundColor: item.selected ? colors.dark_blue3_color : colors.white_5, }]} />
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

    useEffect(() => {
        const findData: GroupParams[] = jobListData.results?.map((i) => {
            return {
                ...i,
                selected: false,
            }
        })
        setFinalJobList(findData)
    }, [jobListData])

    const setSelected = (item: JobDataProps, index: number) => {
        let emptyJobList: Array<any> = [];

        finalJobList?.map((data) => {
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
        setFinalJobList(emptyJobList)
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.backArrowStyle} />
                        <Text style={globalStyles.headerTitle}>{strings.duplicate}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity onPress={() => { }} style={{ marginRight: wp(3) }}>
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.navigate('DuplicateScreen', { params: isIndex }) }}>
                            <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18 }}>{strings.done}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container>
                <FlatList
                    data={finalJobList}
                    renderItem={renderItem}
                />
            </Container>
        </View>
    )
}

export default JobDuplicateListScreen;