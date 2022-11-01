import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { Children, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/Colors';
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from 'react-native-modal';
import { ImagesPath } from '../utils/ImagePaths';

interface CustomCarouselImageAndVideoProps {
    result: any
    viewStyle?: ViewStyle
    videoStyle?: any
    children?: any
}

const CustomCarouselImageAndVideo = (props: CustomCarouselImageAndVideoProps) => {
    console.log(props)
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const [visible, setIsVisible] = useState<boolean>(false);
    const [imageLink, setImageLink] = useState([{ uri: '' }])
    const renderItem = ({ item, index }: any) => {
        return (
            <View style={[styles.imageMainView, props.viewStyle]}>
                {item.mediaType == "image"
                    ?
                    <TouchableOpacity
                        onPress={() => {
                            setIsVisible(true)
                        }}
                        style={[globalStyles.container, styles.imageView]}>
                        <Image source={{ uri: item.imgUrl }} resizeMode={'contain'} onError={() => { }} style={[globalStyles.container, styles.imageView]} />
                    </TouchableOpacity>
                    :
                    <Video
                        source={{ uri: item.imgUrl }}
                        onBuffer={(data: any) => {
                            console.log({ data: data });
                        }}
                        onError={(err: any) => {
                            console.log({ err: err });
                        }}
                        paused={!(index == activeSlide)}
                        resizeMode={'cover'}
                        repeat={true}
                        style={[styles.backgroundVideo, props.videoStyle]}
                    />
                }
                <Modal isVisible={visible} style={{ margin: 0 }}>
                    <>
                        <TouchableOpacity
                            onPress={()=> setIsVisible(false)}
                            style={styles.closeBtnStyle}>
                            <Image source={ImagesPath.cross_icon} style={styles.closeIcon} />
                        </TouchableOpacity>
                        <ImageViewer
                            imageUrls={[{ url: item.imgUrl, }]}
                            renderIndicator={() => <></>}
                        />
                    </>
                </Modal>
            </View>
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
                // autoplay
                onSnapToItem={(index: number) => setActiveSlide(index)}
            />
            <Pagination
                dotsLength={props.result.length}
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

export default CustomCarouselImageAndVideo

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
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: wp(-5),
        alignSelf: "center",
    },
    closeIcon: {
        height: wp(6),
        width: wp(6),
        resizeMode: "contain",
        tintColor: colors.white
    },
    closeBtnStyle: {
        position: 'absolute',
        top: wp(10),
        right: wp(5),
        zIndex: 10
    }
})