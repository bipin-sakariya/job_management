import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/Colors';
import Modal from 'react-native-modal';
import { ImagesPath } from '../utils/ImagePaths';
import CustomCarouselZoomImageViewer from './CustomCarouselZoomImageViewer';
import FastImage from 'react-native-fast-image';

interface ItemProps {
    id?: number
    image?: string | undefined
    mediaType?: string

}
interface CustomCarouselImageAndVideoProps {
    result: ItemProps[]
    viewStyle?: ViewStyle
    videoStyle?: ViewStyle
    children?: React.ReactNode
}

const CustomCarouselImageAndVideo = (props: CustomCarouselImageAndVideoProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [visible, setIsVisible] = useState<boolean>(false);

    const renderItem = ({ item, index }: { item: ItemProps, index: number }) => {
        const type = item?.image?.split('.').reverse()[0]
        return (
            <TouchableOpacity style={[styles.imageMainView, props.viewStyle]} onPress={() => setIsVisible(true)}>
                {(item.mediaType == 'image' || type == "jpeg" || type == "png" || type == "jpg")
                    ?
                    <View
                        style={[globalStyles.container, styles.imageView]}>
                        <FastImage source={{ uri: item.image }} resizeMode={'contain'} onError={() => { }} style={[globalStyles.container, styles.imageView]} />
                    </View>
                    : <View>
                        <Video
                            source={{ uri: item.image }}
                            paused={!(index == activeSlide)}
                            resizeMode={'cover'}
                            repeat={true}
                            style={[styles.backgroundVideo, props.videoStyle]}
                            onError={e => { console.log({ e }) }}
                        />
                    </View>

                }

                <Modal
                    isVisible={visible}
                    style={{ margin: 0, backgroundColor: colors.white }}>
                    <>
                        <TouchableOpacity
                            onPress={() => setIsVisible(false)}
                            style={styles.closeBtnStyle}>
                            <Image source={ImagesPath.cross_icon} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <CustomCarouselZoomImageViewer result={props.result} />
                    </>
                </Modal>

            </TouchableOpacity>

        )
    }
    return (
        <View style={{ marginTop: wp(5) }}>
            <Carousel
                data={props.result}
                sliderWidth={wp(90)}
                itemWidth={wp(100)}
                renderItem={renderItem}
                layout={'default'}
                onSnapToItem={(index: number) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={props?.result?.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationDots}
                dotStyle={styles.activeDotStyle}
                inactiveDotStyle={styles.inactiveDotStyle}
                inactiveDotOpacity={0.9}
                inactiveDotScale={0.6} />
            {
                props.children
            }
        </View>
    )
}

export default CustomCarouselImageAndVideo;

const styles = StyleSheet.create({
    backgroundVideo: {
        height: wp(50),
        width: '100%',
        backgroundColor: colors.doc_bg_color_light_gray,
        borderRadius: wp(3),
    },
    imageMainView: {
        backgroundColor: colors.doc_bg_color_light_gray,
        height: wp(50),
        borderRadius: wp(3),
    },
    imageView: {
        height: wp(50),
        borderRadius: wp(3),
        resizeMode: "cover"
    },
    activeDotStyle: {
        width: 15,
        height: 5,
        borderRadius: 5,
        marginHorizontal: -8,
        backgroundColor: colors.brown
    },
    inactiveDotStyle: {
        width: 10,
        height: 10,
        backgroundColor: colors.bottom_tab_bg,
    },
    paginationDots: {
        backgroundColor: colors.transparent,
        position: 'absolute',
        bottom: wp(-5),
        alignSelf: "center",
    },
    closeIcon: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain",
        tintColor: colors.black
    },
    closeBtnStyle: {
        position: 'absolute',
        top: wp(10),
        right: wp(5),
        zIndex: 10
    },
    modal: {
        justifyContent: 'center',
        borderRadius: 10,
    },
})