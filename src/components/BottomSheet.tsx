import React from 'react'
import RBSheet, { RBSheetProps } from 'react-native-raw-bottom-sheet'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { colors } from '../styles/Colors'

interface BottomSheetProps {
    children?: React.ReactNode,
    height?: number,
    TopLeftRadius?: number,
    TopRightRadius?: number,
    onClose?: () => void
}

const BottomSheet = React.forwardRef((props: BottomSheetProps & RBSheetProps, ref: any) => {
    return (
        <RBSheet
            ref={ref}
            closeOnDragDown={true}
            closeOnPressMask={true}
            dragFromTopOnly={true}
            onClose={props.onClose}
            height={props.height}
            customStyles={{
                container: {
                    borderTopLeftRadius: props.TopLeftRadius ? props.TopLeftRadius : wp(8),
                    borderTopRightRadius: props.TopRightRadius ? props.TopRightRadius : wp(8),
                },
                wrapper: {
                    backgroundColor: "transparent",
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowOpacity: 10,
                    shadowRadius: 10,
                    shadowOffset: { height: 0, width: 0 },
                    elevation: 5,
                },
                draggableIcon: {
                    backgroundColor: colors.bottom_sheet_tab,
                    width: wp(30),
                }
            }}>
            {props.children}
        </RBSheet>
    )
})

export default BottomSheet