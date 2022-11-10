import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { globalStyles } from '../../styles/globalStyles'
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components'
import useCustomNavigation from '../../hooks/useCustomNavigation'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ImagesPath } from '../../utils/ImagePaths'
import { styles } from './styles'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { DropdownProps } from '../../types/commanTypes'
import { strings } from '../../languages/localizedStrings'
import { colors } from '../../styles/Colors'
import { useFormik } from 'formik'
import * as yup from 'yup'
const CreateFormScreen = () => {
    const navigation = useCustomNavigation('CreateFormScreen');
    const [countingValue, setCountingValue] = useState<DropdownProps>({ label: '', value: 0 })
    const componentRef = useRef(null)
    const data = [
        { label: 'Item 1', value: 1 },
        { label: 'Item 2', value: 2 },
        { label: 'Item 3', value: 3 },
        { label: 'Item 4', value: 4 },
        { label: 'Item 5', value: 5 },
        { label: 'Item 6', value: 6 },
        { label: 'Item 7', value: 7 },
        { label: 'Item 8', value: 8 },
    ];

    const CreateFormValidationSchema = yup.object().shape({
        formName: yup
            .string()
            .required(strings.Fromname_required),
    });

    const createForm = (values: any) => {

    }

    const { values, errors, touched, handleSubmit, handleChange, } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                formName: '',
            },
            validationSchema: CreateFormValidationSchema,
            onSubmit: values => {
                createForm(values)
            }
        })
    // const [offsetData, setOffsetData] = useState({
    //     horizontal: 0,
    //     vertical: 0,
    //     modalHeight: 0,
    //     x: 0,
    //     y: 0,
    //     width: 0,
    //     height: 0
    // });
    // const onGet = () => {
    //     componentRef?.current?.measure(
    //         (
    //             x: number,
    //             y: number,
    //             width: number,
    //             height: number,
    //             horizontalOffset: number,
    //             verticalOffset: number,
    //         ) => {
    //             setOffsetData(prevOffsetData => {
    //                 return {
    //                     ...prevOffsetData,
    //                     horizontal: horizontalOffset,
    //                     vertical: verticalOffset,
    //                     height: height,
    //                     width: width,
    //                     x: x,
    //                     y: y
    //                 };
    //             });
    //         },
    //     );
    // }
    // useEffect(() => {
    //     console.log({ offsetData });

    // }, [offsetData])
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
                        <Text numberOfLines={1} style={[globalStyles.headerTitle, globalStyles.rtlStyle, { width: wp(50), }]}>{strings.CreateForm}</Text>
                    </TouchableOpacity>
                } />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent disabled viewStyle={{ marginTop: wp(2) }} title={strings.CreateForm} image={ImagesPath.receipt_icon} />
                <CustomTextInput
                    title={strings.formname}
                    container={{ marginVertical: wp(5) }}
                    value={strings.formname}
                    onChangeText={handleChange('formName')}
                />
                {touched?.formName && errors?.formName ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.formName}</Text> : null}
                {/* <View style={[styles.textInputContainer,]}>
                    <View style={styles.titleContainer}>
                        <Text numberOfLines={1} style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{"props.title"}</Text>
                    </View>
                    <View style={[globalStyles.rowView, { height: 40, backgroundColor: 'red', justifyContent: 'space-between' }]}>
                        <Text>sdfsd</Text>
                        <TouchableOpacity onPress={() => onGet()} style={{ backgroundColor: 'blue', marginHorizontal: wp(2) }}>
                            <Image source={ImagesPath.down_white_arrow} style={[globalStyles.headerIcon, { backgroundColor: 'green', }]} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View ref={componentRef} style={{ height: 40, width: 50, backgroundColor: 'red', position: 'absolute', top: 20 }}></View> */}
                <DropDownComponent
                    title={strings.AddBill}
                    data={data}
                    image={ImagesPath.down_white_arrow}
                    labelField="label"
                    valueField="value"
                    onChange={(item) => {

                        setCountingValue(item)
                    }}
                    value={countingValue.value}
                    placeholder={strings.choose}
                    container={{ marginBottom: wp(5) }}
                />
                {touched?.formName && errors?.formName ? <Text style={[globalStyles.rtlStyle, { bottom: wp(5), color: 'red' }]}>{errors?.formName}</Text> : null}

                <CustomBlackButton onPress={() => { }} title={strings.CreateForm} image={ImagesPath.plus_white_circle_icon} imageStyle={{ ...globalStyles.headerIcon, tintColor: colors.white_color }} />
            </Container>
        </View>
    )
}

export default CreateFormScreen