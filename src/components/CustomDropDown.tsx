import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
    Text,
    Dimensions,
    Image,
    ImageProps,
    Platform
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ReactNativeModal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import fonts from '../styles/Fonts';
import FontSizes from '../styles/FontSizes';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/Colors';

const { height: deviceHeight } = Dimensions.get('window');

interface DropdownItem {
    title: string;
    imageSource?: ImageProps['source']
    onPress: () => void;
}

interface ComponentProps {
    dropdownData?: DropdownItem[];
    isVisible: boolean;
    setIsVisible: (prev_state: boolean) => void;
    modalStyle?: ViewStyle;
    componentRef: any;
}

const RenderDropdownItem = (dropdownItem: DropdownItem) => {
    return (
        <TouchableOpacity style={globalStyles.rowView} onPress={dropdownItem.onPress}>
            {dropdownItem.imageSource && <Image source={dropdownItem.imageSource} style={styles.imageStyle} />}
            <Text style={[styles.textStyle, globalStyles.rtlStyle]}>{dropdownItem.title}</Text>
        </TouchableOpacity>
    );
};

const CustomDropdown = ({
    dropdownData,
    isVisible,
    setIsVisible,
    modalStyle,
    componentRef,
}: ComponentProps) => {
    const [offsetData, setOffsetData] = useState({
        horizontal: 0,
        vertical: 0,
        modalHeight: 0,
    });
    const { bottom: safeAreaBottom } = useSafeAreaInsets();

    useEffect(() => {
        if (isVisible) {
            componentRef?.current?.measure(
                (
                    x: number,
                    y: number,
                    width: number,
                    height: number,
                    horizontalOffset: number,
                    verticalOffset: number,
                ) => {
                    setOffsetData({
                        ...offsetData,
                        horizontal: horizontalOffset,
                        vertical: verticalOffset,
                    });
                },
            );
        }
    }, [isVisible]);

    const modalPositionHandler = (): number => {
        const { modalHeight, vertical } = offsetData;
        if (vertical + modalHeight + hp(10) > deviceHeight) {
            return deviceHeight - modalHeight;
        } else {
            return Platform.OS == 'android' ? vertical - hp(4) : vertical + hp(1);
        }
    };

    if (!offsetData.horizontal && !offsetData.vertical) {
        return null;
    }

    return (
        <ReactNativeModal
            onLayout={e =>
                setOffsetData({
                    ...offsetData,
                    modalHeight: e.nativeEvent.layout.height,
                })
            }
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={[
                styles.modalStyle,
                {
                    top: modalPositionHandler(),
                },
                modalStyle,
            ]}
            isVisible={isVisible}
            backdropOpacity={0}
            onBackdropPress={() => {
                setIsVisible(false);
            }}>
            <View style={styles.container}>
                <FlatList
                    data={dropdownData}
                    renderItem={({ item }) => <RenderDropdownItem {...item} />}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ReactNativeModal>
    );
};

export default CustomDropdown;

const styles = StyleSheet.create({
    modalStyle: { position: 'absolute', right: wp(3.5) },
    container: {
        backgroundColor: colors.white_color,
        borderRadius: 5,
        paddingHorizontal: wp(5),
        paddingVertical: wp(3.5),
        shadowColor: Platform.OS == 'ios' ? "rgba(0, 0, 0, 0.09)" : "rgba(0, 0, 0, 0.4)",
        shadowOpacity: 5,
        shadowRadius: 10,
        shadowOffset: { height: 0, width: 0 },
        elevation: 5
    },
    textStyle: {
        color: colors.dark_blue1_color,
        fontFamily: fonts.FONT_POP_REGULAR,
        fontSize: FontSizes.REGULAR_18
    },
    separator: {
        height: hp(2),
    },
    imageStyle: {
        height: wp(5),
        width: wp(5),
        resizeMode: 'contain',
        marginRight: wp(1),
    }
});
