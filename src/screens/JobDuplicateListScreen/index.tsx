import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Container, CustomActivityIndicator, Header } from "../../components";
import CustomJobListComponent from "../../components/CustomJobListComponent";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useCustomNavigation from "../../hooks/useCustomNavigation";
import { strings } from "../../languages/localizedStrings";
import { GroupData } from "../../redux/slices/AdminSlice/groupListSlice";
import { JobDetailsData, jobList } from "../../redux/slices/AdminSlice/jobListSlice";
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
    page: number,
    search?: string
}

const JobDuplicateListScreen = () => {

    const navigation = useCustomNavigation('JobDuplicateListScreen');
    const dispatch = useAppDispatch()
    const isFocused = useIsFocused()

    const [jobListApiPage, setJobListApiPage] = useState(1)
    const [isIndex, setIsIndex] = useState(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [onEndReachedLoader, setOnEndReachedLoader] = useState<boolean>(false)
    const [selectedJobDetails, setSelectedJobDetails] = useState<JobDetailsData | null>(null)

    const { jobListData, isLoading: jobListApiCallLoading } = useAppSelector(state => state.jobList)

    useEffect(() => {
        setIsLoading(true)
        jobListApiCall(1)
    }, [])

    useEffect(() => {
        if (jobListData?.results?.length != 0 && !Object.keys(selectedJobDetails ?? {}).length) {
            setSelectedJobDetails(jobListData.results[0])
        }
    }, [jobListData])



    const jobListApiCall = (page?: number) => {
        let params: jobListParams = {
            page: page ?? jobListApiPage,
            search: ''
        }
        dispatch(jobList(params)).unwrap().then((res) => {
            setJobListApiPage(params.page + 1)
            setOnEndReachedLoader(false)
            setIsLoading(false)
        }).catch((error) => {
            setOnEndReachedLoader(false)
            setIsLoading(false)
        })
    }

    const renderItem = ({ item, index }: { item: JobDetailsData, index: number }) => {
        const isSelctedJob = selectedJobDetails && selectedJobDetails.id == item.id ? true : false
        return (
            <TouchableOpacity onPress={() => { setSelectedJobDetails(item) }} style={styles.jobMainView}>
                <View style={{ marginLeft: wp(3.5) }}>
                    <View style={globalStyles.roundView}>
                        <View style={[styles.roundFillView, { backgroundColor: isSelctedJob ? colors.dark_blue3_color : colors.white_5, }]} />
                    </View>
                </View>
                <CustomJobListComponent
                    item={item}
                    listStyle={{ flex: 1 }}
                    textStyle={{ flex: 1 }}
                    onPress={() => setSelectedJobDetails(item)} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
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
                        <TouchableOpacity onPress={() => { navigation.navigate('DuplicateScreen', { jobDetails: selectedJobDetails ?? undefined }) }}>
                            <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18 }}>{strings.done}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container>
                <FlatList
                    data={jobListData?.results}
                    renderItem={renderItem}
                    onEndReached={() => {
                        if (jobListData.next != null && !jobListApiCallLoading) {
                            setOnEndReachedLoader(true)
                            jobListApiCall()
                        }
                    }}
                    onEndReachedThreshold={0.01}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => (
                        <>
                            {onEndReachedLoader && <ActivityIndicator />}
                        </>
                    )}
                />
            </Container>
        </View>
    )
}

export default JobDuplicateListScreen;