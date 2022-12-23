import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomSubTitleWithImageComponent, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { styles } from './styles';
import { strings } from '../../languages/localizedStrings';
import fonts from '../../styles/Fonts';
import FontSizes from '../../styles/FontSizes';
import { convertDate } from '../../utils/screenUtils';
import { FormDataTypes, formList } from '../../redux/slices/AdminSlice/formListSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useIsFocused } from '@react-navigation/native';
import { billData } from '../../redux/slices/AdminSlice/billListSlice';
import { selectedFormReducers } from '../../redux/slices/AdminSlice/jobListSlice';

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
    const [allForm, setAllForm] = useState<FormDataTypes[]>([])
    const [allFormList, setFormList] = useState<FormTypes[]>(allForm)

    const { formListData } = useAppSelector(state => state.formList)
    const { formData } = useAppSelector(state => state.jobList)

    useEffect(() => {
        if (isFoucs) {
            handleFormApi(page)
        }
        if (formListData) {
            formData && formData.map((product => {
                handleChange(product.id)
            }))
            // const form = allFormList.map((i) => {
            //     formData?.map((item) => {
            //         if (i.id == item.id) {
            //             return {
            //                 ...item
            //             }
            //         }

            //     })

            // })
            // console.log({ form })

        }
    }, [isFoucs])

    const handleFormApi = (page: number) => {
        let params = {
            page: page,
            search: ''
        }
        dispatch(formList(params)).unwrap().then((res) => {
            console.log("🚀 ~ file: index.tsx ~ line 92 ~ dispatch ~ res", res)
            setAllForm(res.results)
            setPage(page + 1)
        }).catch((error) => {
            console.log({ error });
        })
    }

    useEffect(() => {
        const findData: FormTypes[] = formListData.results.map((i: FormTypes) => {
            return {
                ...i,
                isChecked: false,
            }
        })
        setFormList(findData)
    }, [allForm])

    const handleChange = (id: number) => {
        let finalData = allFormList.map((product) => {
            if (id === product.id) {
                return {
                    ...product,
                    isChecked: !product.isChecked
                };
            }
            return product;
        });
        setFormList(finalData);
    }

    // const data = allFormList.map((i) => {
    //     formData?.map((item) => { 

    //     })
    //  })


    const selectForm = () => {
        const selectedData = allFormList.filter((_item) => _item.isChecked)
        dispatch(selectedFormReducers(selectedData))
        navigation.goBack()
    }

    const renderItem = ({ item }: { item: FormTypes }) => {
        return (
            <TouchableOpacity onPress={() => handleChange(item.id)} style={[globalStyles.rowView,]}>
                <Image source={item.isChecked ? ImagesPath.select_check_box : ImagesPath.check_box} style={styles.checkIcon} />
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
                            <Image source={ImagesPath.search_icon} style={[globalStyles.headerIcon,]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { selectForm() }}>
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
                    data={allFormList}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(2.5) }} />
                        )
                    }}
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

