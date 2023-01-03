import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import { strings } from '../../languages/localizedStrings';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { convertDate } from '../../utils/screenUtils';
import { FormDataTypes, formList } from '../../redux/slices/AdminSlice/formListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useIsFocused } from '@react-navigation/native';
import { billData } from '../../redux/slices/AdminSlice/billListSlice';
import { selectedFormDetialsForCreateJobReducers } from '../../redux/slices/AdminSlice/jobListSlice';

interface FormTypes {
    id: number,
    bill: billData[],
    created_at: string,
    updated_at: string,
    name: string,
    is_sign?: boolean,
    isChecked?: boolean
}

const SelectFormScreen = () => {
    const navigation = useCustomNavigation('SelectFormScreen');
    const dispatch = useAppDispatch();
    const isFoucs = useIsFocused();

    const [page, setPage] = useState(1)
    const [selectedFormsDetails, setselectedFormsDetails] = useState<FormDataTypes[]>([])

    const { formListData } = useAppSelector(state => state.formList)
    const { selectedFormsDetailForJob } = useAppSelector(state => state.jobList)
    const { jobDetails } = useAppSelector(state => state.jobList)


    useEffect(() => {
        setselectedFormsDetails(selectedFormsDetailForJob?.selectedFormsDetails)
    }, [selectedFormsDetailForJob])


    const handleFormApi = (page: number) => {
        let params = {
            page: page,
            search: ''
        }
        dispatch(formList(params)).unwrap().then((res) => {
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    //Manage Selection of form data and form's bill data 
    const handleSelectionOfForms = (item: FormTypes) => {
        const checkAvailablityOfForm = selectedFormsDetails.find((formData) => formData.id === item.id)
        if (checkAvailablityOfForm) {
            setselectedFormsDetails(selectedFormsDetails.filter((forms) => forms.id !== item.id))
        } else {
            setselectedFormsDetails([...selectedFormsDetails, item])
        }
    }

    // created for manage selected form data state to redux
    const manageSelectedFormsDetials = () => {
        let selectedFormsBillList: billData[] = []
        let isSignBill: boolean | undefined = false
        selectedFormsDetails.map((formDetail) => {
            console.log({ IS_SIGN: formDetail.is_sign })
            isSignBill = !isSignBill ? formDetail.is_sign : true
            selectedFormsBillList.push(...formDetail.bill)
        })
        dispatch(selectedFormDetialsForCreateJobReducers({ isSignBill: isSignBill, selectedFormsBillList: selectedFormsBillList, selectedFormsDetails: selectedFormsDetails }))
        navigation.goBack()
    }

    const renderItem = ({ item }: { item: FormTypes }) => {
        const isSelected = selectedFormsDetails?.find((formDetails) => formDetails.id == item.id)
        return (
            <TouchableOpacity onPress={() => handleSelectionOfForms(item)} style={globalStyles.rowView}>
                <Image source={isSelected ? ImagesPath.select_check_box : ImagesPath.check_box} style={styles.checkIcon} />
                <View style={[globalStyles.rowView, styles.listMainView, styles.dropDownShadowStyle]}>
                    <View style={globalStyles.rowView}>
                        <Text style={[styles.titleTxt, globalStyles.rtlStyle, { marginLeft: wp(2) }]}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={globalStyles.rowView}>
                        <Text style={[styles.dateTxt, globalStyles.rtlStyle]}>{convertDate(item.created_at)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{ width: '50%', paddingLeft: wp(3) }}
                headerLeftComponent={
                    <TouchableOpacity style={globalStyles.rowView} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={[globalStyles.headerTitle, globalStyles.rtlStyle]}>{strings.form}</Text>
                    </TouchableOpacity>
                }
                headerRightComponent={
                    <View style={globalStyles.rowView}>
                        <TouchableOpacity >
                            <Image source={ImagesPath.search_icon} style={globalStyles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { manageSelectedFormsDetials() }}>
                            <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18, marginHorizontal: wp(3) }}>{strings.done}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.formList}
                    image={ImagesPath.squre_note_icon}
                />
                <FlatList
                    data={jobDetails.group_forms}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(2.5) }} />
                        )
                    }}
                    style={{ paddingTop: hp(1) }}
                    onEndReached={() => {
                        console.log("On reach call");
                        if (formListData?.next) {
                            handleFormApi(page)
                        }
                    }}
                />

            </Container>
        </View>
    )
}

export default SelectFormScreen

