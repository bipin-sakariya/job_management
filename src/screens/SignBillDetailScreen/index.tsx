import { Alert, Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomModal, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
import { styles } from './style';
import { RootRouteProps } from '../../types/RootStackTypes';
import { useRoute } from '@react-navigation/native';
import * as yup from "yup";
import { useFormik } from 'formik';
import { colors } from '../../styles/Colors';

const SignBillDetailScreen = () => {
    const navigation = useCustomNavigation('SignBillDetailScreen');
    const [count, setCount] = useState(0)
    const route = useRoute<RootRouteProps<'CreateBillSectionScreen'>>();
    const [isModelVisible, setIsModelVisible] = useState(false)

    let { type } = route.params
    const data = [
        { label: strings.meters, value: 'Meters' },
        { label: strings.units, value: 'Units' },
        { label: strings.SQM, value: 'SQM' },
        { label: strings.tons, value: 'Tons' },
        { label: strings.CBM, value: 'CBM' },
    ];

    const CreateGroupValidationSchema = yup.object().shape({
        name: yup.string()
            .required(type == "material" ? strings.Billname_required : strings.Signname_required),
        ration_qunt: yup.string()
            .required(type == "material" ? strings.Jumpingration_required : strings.Quantity_required),
    });
    const Increment = () => {
        setCount(count + 1)
    }
    const Decrement = () => {
        if (count == 0) {
            setCount(0)
        }
        else {
            setCount(count - 1)
        }
    }
    const { values, errors, touched, handleSubmit, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                name: '',
                ration_qunt: '',

            },
            validationSchema: CreateGroupValidationSchema,
            onSubmit: values => {
                Alert.alert(strings.CreateGroup)
            }
        })
    return (
        <View style={globalStyles.container}>
            <Header
                headerLeftStyle={{
                    width: "50%",
                    paddingLeft: wp(3)
                }}
                headerLeftComponent={
                    <TouchableOpacity style={[globalStyles.rowView]} onPress={() => navigation.goBack()}>
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.MarkThere}</Text>
                    </TouchableOpacity>
                } />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomModal visible={isModelVisible} onRequestClose={() => { setIsModelVisible(false) }} children={
                    <View style={styles.modalView}>
                        <Image source={ImagesPath.check_icon_circle} style={[globalStyles.modalImageStyle]} />
                        <Text style={styles.modalTxt}>{strings.ClosejobModalText}</Text>
                        <View style={[globalStyles.rowView, { justifyContent: "space-around", width: '100%' }]}>
                            <CustomBlackButton textStyle={styles.noBtnTxt} onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%", backgroundColor: colors.light_blue_color }} title={strings.Partial} />
                            <CustomBlackButton onPress={() => { setIsModelVisible(false) }} buttonStyle={{ width: "45%" }} title={strings.close} />
                        </View>
                    </View>
                } />
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.auto_fill_detail}
                    image={ImagesPath.receipt_icon} />
                {type == 'sign' &&
                    <Image
                        source={ImagesPath.arrow_icon}
                        resizeMode={'contain'}
                        style={styles.arrowIconStyle}
                    />}
                <CustomTextInput
                    title={strings.There}
                    container={{ marginVertical: wp(4) }}
                    placeholder={'סימן שם'}
                    onChangeText={(text) => { }}
                />
                {/* type counting  */}
                <View style={{}}>
                    <DropDownComponent
                        title={strings.typeCounting}
                        data={data}
                        image={ImagesPath.down_white_arrow}
                        labelField="label"
                        valueField="value"
                        onChange={(item) => setFieldValue('name', item)}
                        value={values.name}
                        placeholder={strings.choose}
                        container={{ marginBottom: wp(5) }}
                    />
                </View>

                {/* measurement */}
                <View style={[styles.textInputContainer, globalStyles.rtlDirection]}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{type == 'sign' ? strings.quantity : strings.measurement}</Text>
                    </View>
                    <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.btnContainerStyle]}>
                        <TouchableOpacity onPress={() => Increment()}>
                            <Image source={ImagesPath.plus} resizeMode={'contain'} style={styles.btnIconStyle} />
                        </TouchableOpacity>
                        <Text style={{ width: wp(10), textAlign: 'center' }}>{count}</Text>
                        <TouchableOpacity onPress={() => Decrement()}>
                            <Image source={ImagesPath.minus} resizeMode={'contain'} style={styles.btnIconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomBlackButton
                    onPress={() => {
                        setIsModelVisible(true)
                    }}
                    title={strings.AddDetail}
                />
            </Container>
        </View>
    )
}

export default SignBillDetailScreen