import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Video from 'react-native-video';
import { colors } from '../styles/Colors';
import ImageViewer from 'react-native-image-zoom-viewer';

interface ItemProps {
    id: number
    imgUrl: string
    mediaType: string

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
        return (
            <>
                {
                    item.mediaType == "image"
                        ?
                        <ImageViewer
                            imageUrls={[{ url: item.imgUrl, }]}
                            renderIndicator={() => <></>}
                            backgroundColor='transparent'
                        />
                        :
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                            <Video
                                source={{ uri: item.imgUrl }}
                                paused={!(index == activeSlide)}
                                resizeMode={'cover'}
                                repeat={true}
                                style={[styles.backgroundVideo, props.videoStyle]}
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
    },
    imageView: {
        height: wp(50),
        borderRadius: wp(3),
        resizeMode: "cover"
    },
})