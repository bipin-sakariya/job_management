import { useIsFocused, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Container, CustomActivityIndicator, Header, JobListComponent } from "../../components";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { strings } from "../../languages/localizedStrings";
import { getNotificatioList, NotificationObjectType } from "../../redux/slices/AdminSlice/notificationSlice";
import { globalStyles } from "../../styles/globalStyles";
import { ImagesPath } from "../../utils/ImagePaths";
import { styles } from "./styles";

const NotificationScreen = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const isFocus = useIsFocused()

    const [notificationApiPage, setNotificationApiPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOnReachEndApiLoading, setIsOnReachEndApiLoading] = useState<boolean>(false)

    const { notificationData, isLoading: notificationDataLoading } = useAppSelector(state => state.notificationList)

    useEffect(() => {
        if (isFocus) {
            setIsLoading(true)
            getNotificatioData()
        }
    }, [isFocus])


    const getNotificatioData = (page?: number) => {
        dispatch(getNotificatioList({ page: page ? page : notificationApiPage })).unwrap().then(() => {
            setNotificationApiPage((page ? page : notificationApiPage) + 1)
            setIsLoading(false)
            setIsOnReachEndApiLoading(false)
        }).catch(() => {
            setIsLoading(false)
            setIsOnReachEndApiLoading(false)
        })
    }


    return (
        <View style={globalStyles.container}>
            {isLoading && <CustomActivityIndicator />}
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => { navigation.goBack() }}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.notifications}</Text>
                    </TouchableOpacity>
                }
            />
            <Container>
                <FlatList
                    data={notificationData?.results}
                    renderItem={({ item, index }: { item: NotificationObjectType, index: number }) => {
                        const isDateVisible = index != 0 ? moment(notificationData?.results[index].created_at).format('ll') == moment(notificationData?.results[index - 1].created_at).format('ll') ? false : true : true
                        return (
                            <JobListComponent
                                item={item}
                                isNotification={true}
                                isDateVisible={isDateVisible}
                            />
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    // onRefresh={() => {

                    // }}
                    // refreshing={true}
                    onEndReached={() => {
                        if (notificationData.next && !isLoading) {
                            setIsOnReachEndApiLoading(true)
                            getNotificatioData()
                        }
                    }}
                    ListFooterComponent={() => (
                        <>
                            {isOnReachEndApiLoading && <ActivityIndicator />}
                        </>
                    )}
                    onEndReachedThreshold={0.01}
                />
            </Container>
        </View>
    )
}
export default NotificationScreen