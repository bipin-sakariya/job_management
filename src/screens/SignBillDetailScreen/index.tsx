import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomActivityIndicator, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { ImagesPath } from '../../utils/ImagePaths';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
import { styles } from './style';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import * as yup from "yup";
import { useFormik } from 'formik';
import { colors } from '../../styles/Colors';
import { billUpdate } from '../../redux/slices/AdminSlice/billListSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { updateSelectedBilllDetials } from '../../redux/slices/AdminSlice/jobListSlice';

const SignBillDetailScreen = () => {
    const navigation = useCustomNavigation('SignBillDetailScreen');
    const route = useRoute<RootRouteProps<'SignBillDetailScreen'>>();
    const dispatch = useAppDispatch()

    let { type } = route.params
    let quantity = route.params.item.measurement
    let jumping_ration = route.params.item.jumping_ration

    const [count, setCount] = useState(type == 'Sign' ? quantity ?? 0 : jumping_ration ?? 0)
    const [isModelVisible, setIsModelVisible] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [valueUpdateBy, setValueUpdateBy] = useState<number>(type == 'Sign' ? 1 : jumping_ration == 0 ? 1 : jumping_ration ?? 1)

    const data = [
        { label: strings.meters, value: 'Meters' },
        { label: strings.units, value: 'Units' },
        { label: strings.SQM, value: 'SQM' },
        { label: strings.tons, value: 'Tons' },
        { label: strings.CBM, value: 'CBM' },
    ];

    const CreateGroupValidationSchema = yup.object().shape({
        name: yup.string()
            .required(type == "Material" ? strings.billNameRequired : strings.signNameRequired),
        ration_qunt: yup.string()
            .required(type == "Material" ? strings.jumpingRatioRequired : strings.quantityRequired),
    });

    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                name: route.params.item.name,
                ration_qunt: count ? count.toString() : 0
            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: values => {
                updateBill(values)
            }
        })

    const updateBill = (values: { name: string, ration_qunt: string }) => {
        setIsModelVisible(false)
        setIsLoading(true)
        console.log({ values, type, float: values.ration_qunt });
        let data = new FormData()
        // data.append('name', values.name)

        if (type == 'Material' && parseFloat(values.ration_qunt) != quantity) {
            data.append("jumping_ration", parseFloat(values.ration_qunt))
        }
        if (type == 'Sign' && parseFloat(values.ration_qunt) != jumping_ration) {
            data.append("measurement", parseFloat(values.ration_qunt))
        }

        let params = {
            data: data,
            id: route.params.item.id
        }
        dispatch(billUpdate(params)).unwrap().then((res) => {
            if (route?.params?.isCloseJob) {
                dispatch(updateSelectedBilllDetials({ ...res, type: route?.params?.type }))
                setIsLoading(false)
            }
            navigation.goBack()
        }).catch((e) => {
            setIsLoading(false)
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
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.markThere}</Text>
                    </TouchableOpacity>
                } />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalView}>
                        <Image source={ImagesPath.check_icon_circle} style={[globalStyles.modalImageStyle]} />
                        <Text style={styles.modalTxt}>{strings.closeJobModalText}</Text>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                            <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => handleSubmit()} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.partial} />
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%" }} title={strings.close} />
                        </View>
                    </View>
                } />
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.autoFillDetail}
                    image={ImagesPath.receipt_icon} />
                {type == 'Sign' &&
                    <Image
                        source={{ uri: route.params.item.image }}
                        resizeMode={'contain'}
                        style={styles.arrowIconStyle}
                    />}
                <CustomTextInput
                    editable={false}
                    title={strings.there}
                    container={{ marginVertical: wp(4) }}
                    placeholder={route.params.item.name}
                />

                {/* type counting  */}
                <View style={{}}>
                    <DropDownComponent
                        disable
                        title={strings.typeCounting}
                        data={data}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setFieldValue('name', item)}
                        value={route.params.item.type_counting}
                        placeholder={strings.choose}
                        container={{ marginBottom: wp(5) }}
                    />
                </View>

                {/* measurement */}
                <View style={[styles.textInputContainer, globalStyles.rtlDirection]}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{type == 'Sign' ? strings.quantity : strings.measurement}</Text>
                    </View>
                    <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.btnContainerStyle]}>
                        <TouchableOpacity onPress={() => setCount(count + valueUpdateBy)}>
                            <Image source={ImagesPath.plus} resizeMode={'contain'} style={styles.btnIconStyle} />
                        </TouchableOpacity>
                        <Text style={{ width: wp(10), textAlign: 'center', marginHorizontal: wp(2) }}>{count}</Text>
                        <TouchableOpacity onPress={() => count == 0 ? setCount(0) : setCount(count - valueUpdateBy)}>
                            <Image source={ImagesPath.minus} resizeMode={'contain'} style={styles.btnIconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomBlackButton
                    onPress={() => {
                        setIsModelVisible(true)
                    }}
                    title={strings.addDetail}
                />
            </Container>
        </View>
    )
}

export default SignBillDetailScreen