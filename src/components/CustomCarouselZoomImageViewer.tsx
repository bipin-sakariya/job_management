import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { colors } from '../styles/Colors';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ItemProps {
    id?: number
    image?: string
    mediaType?: string
}

interface CustomCarouselZoomImageViewerProps {
    result: ItemProps[]
    viewStyle?: ViewStyle
    videoStyle?: ViewStyle
    children?: React.ReactNode
}

const CustomCarouselZoomImageViewer = (props: CustomCarouselZoomImageViewerProps) => {
    const [activeSlide, setActiveSlide] = useState<number>(0)

    const renderItem = ({ item, index }: { item: ItemProps, index: number }) => {
        const type = item.image && item.image.split(/[#?]/)[0]?.split(".").pop()?.trim()
        console.log({ datatype: type, image: item.image })
        return (
            <>
                {
                    (type == "jpeg" || type == "png" || type == "jpg")
                        ?
                        <ImageViewer
                            imageUrls={[{ url: item.image }]}
                            renderIndicator={() => <></>}
                            backgroundColor={colors.transparent}
                        />
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
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
            </>
        )
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Carousel
                layout={'default'}
                data={props.result}
                sliderWidth={wp(100)}
                itemWidth={wp(100)}
                renderItem={renderItem}
                onSnapToItem={(index: number) => setActiveSlide(index)}
            />
        </View>
    )
}

export default CustomCarouselZoomImageViewer;

const styles = StyleSheet.create({
    backgroundVideo: {
        height: wp(60),
        width: '100%',
        backgroundColor: colors.doc_bg_color_light_gray,
        borderRadius: wp(3),
    }
})