import { Image, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Container, CustomBlackButton, CustomSubTitleWithImageComponent, CustomTextInput, Header } from '../../components';
import { ImagesPath } from '../../utils/ImagePaths';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { strings } from '../../languages/localizedStrings';
import { styles } from './style';

const FillFormScreen = () => {
    const [count, setCount] = useState(0)

    const Increment = () => {
        setCount(count + 0.5)
    }
    const Decrement = () => {
        if (count == 0) {
            setCount(0)
        }
        else {
            setCount(count - 0.5)
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
                    <TouchableOpacity style={[globalStyles.rowView]} >
                        <Image source={ImagesPath.left_arrow_icon} style={globalStyles.headerIcon} />
                        <Text style={globalStyles.headerTitle}>{strings.AsphaltColor}</Text>
                    </TouchableOpacity>
                } />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.auto_fill_detail}
                    image={ImagesPath.receipt_icon}
                />
                <CustomTextInput
                    title={strings.There}
                    container={{ marginVertical: wp(4) }}
                    value={'צבע אספלט'}
                    onChangeText={(text) => { }}
                />
                <CustomTextInput
                    title={strings.typeCounting}
                    container={{}}
                    value={'Meter'}
                    onChangeText={(text) => { }}
                />
                <View style={[styles.textInputContainer, globalStyles.rtlDirection]}>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.titleTxtStyle, globalStyles.rtlStyle]}>{strings.measurement}</Text>
                    </View>
                    <View style={[globalStyles.rowView, globalStyles.rtlDirection, styles.btnContainerStyle]}>
                        <TouchableOpacity onPress={() => Increment()}>
                            <Image source={ImagesPath.plus} resizeMode={'contain'} style={styles.btnIconStyle} />
                        </TouchableOpacity>
                        <Text style={{ width: wp(11), textAlign: 'center' }}>{count}</Text>
                        <TouchableOpacity onPress={() => Decrement()}>
                            <Image source={ImagesPath.minus} resizeMode={'contain'} style={styles.btnIconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <CustomBlackButton
                    onPress={() => {
                    }}
                    title={strings.AddDetail}
                />
            </Container>
        </View>
    )
}

export default FillFormScreen