import { Image, Text, View } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, DropDownComponent, Header } from '../../components';
import useCustomNavigation from '../../hooks/useCustomNavigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
import { styles } from './style';

const SignBillDetailScreen = () => {
    const navigation = useCustomNavigation('SignBillDetailScreen');
    const [count, setCount] = useState(0)

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
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.auto_fill_detail}
                    image={ImagesPath.receipt_icon} />
                <Image
                    source={ImagesPath.arrow_icon}
                    resizeMode={'contain'}
                    style={styles.arrowIconStyle}
                />
                <CustomTextInput
                    title={strings.There}
                    container={{ marginVertical: wp(4) }}
                    placeholder={'???????? ????'}
                    onChangeText={(text) => { }}
                />
                <View style={[styles.textInputContainer, globalStyles.rtlDirection]}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{strings.Quantity}</Text>
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
                <CustomTextInput
                    title={strings.TypeCounting}
                    container={{ marginVertical: wp(4) }}
                    placeholder={'Unit'}
                    onChangeText={(text) => { }}
                />
                <CustomBlackButton
                    onPress={() => {

                    }}
                    title={strings.AddDetail}
                />
            </Container>
        </View>
    )
}

export default SignBillDetailScreen