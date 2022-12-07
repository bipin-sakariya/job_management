import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
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

interface formItemProps {
    id: number,
    title: string,
    date: string,
    isChecked: boolean
}

const SelectFormScreen = () => {
    const navigation = useCustomNavigation('SelectFormScreen');
    const [form, setForm] = useState([
        {
            id: 1,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 2,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 3,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 4,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 5,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 6,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 7,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },
        {
            id: 8,
            title: 'Form Name',
            date: '12 May 2022',
            isChecked: false
        },

    ])

    const handleChange = (id: number) => {
        let finalData = form.map((product) => {
            if (id === product.id) {
                return { ...product, isChecked: !product.isChecked };
            }
            return product;
        });
        setForm(finalData);
    }

    const renderItem = ({ item }: { item: formItemProps }) => {
        return (
            <TouchableOpacity onPress={() => handleChange(item.id)} style={[globalStyles.rowView,]}>
                <Image source={item.isChecked ? ImagesPath.select_check_box : ImagesPath.check_box} style={styles.checkIcon} />
                <View style={[globalStyles.rowView, styles.listMainView, styles.dropDownShadowStyle]}>
                    <View style={globalStyles.rowView}>
                        <Text style={[styles.titleTxt, globalStyles.rtlStyle, { marginLeft: wp(2) }]}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={globalStyles.rowView}>
                        <Text style={[styles.dateTxt, globalStyles.rtlStyle]}>{convertDate(item.date)}</Text>
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
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Text style={{ fontFamily: fonts.FONT_POP_MEDIUM, fontSize: FontSizes.REGULAR_18, marginHorizontal: wp(3) }}>{strings.Done}</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
            <Container style={{ paddingHorizontal: wp(4) }}>
                <CustomSubTitleWithImageComponent
                    disabled
                    title={strings.FormList}
                    image={ImagesPath.squre_note_icon}
                />
                <FlatList
                    data={form}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: wp(2.5) }} />
                        )
                    }} />
            </Container>
        </View>
    )
}

export default SelectFormScreen

