import React from 'react'
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

interface BottomSheetProps {
    children?: any,
    height?: number,
    TopLeftRadius?: number,
    TopRightRadius?: number,
}

const BottomSheet = React.forwardRef((props: BottomSheetProps & RBSheetProps, ref: any) => {
    return (
        <RBSheet
            ref={ref}
            closeOnDragDown={true}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            height={props.height}
            customStyles={{
                container: {
                    borderTopLeftRadius: props.TopLeftRadius ? props.TopLeftRadius : wp(8),
                    borderTopRightRadius: props.TopRightRadius ? props.TopRightRadius : wp(8)
                },
                wrapper: {
                    backgroundColor: "transparent",
                },
                draggableIcon: {
                    backgroundColor: "#9E9E9E"
                }
            }}>
            {props.children}
        </RBSheet>
    )
})

export default BottomSheet