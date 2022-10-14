import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { Children, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/Colors';

interface CustomCarouselImageAndVideoProps {
    result: any
    viewStyle?: ViewStyle
    videoStyle?: any
    children?: any
}

const CustomCarouselImageAndVideo = (props: CustomCarouselImageAndVideoProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const renderItem = ({ item, index }: any) => {
        return (
            <View style={[styles.imageMainView, props.viewStyle]}>
                {item.mediaType == "image"
                    ?
                    <Image source={{ uri: item.imgUrl }} resizeMode={'contain'} onError={() => { }} style={[globalStyles.container, styles.imageView]} />
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
})