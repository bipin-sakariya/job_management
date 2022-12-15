export interface DropdownProps {
    title: string,
    id: number
}
export interface location {
    latitude: number,
    longitude: number
}

export interface MapPositionProps {
    latitude: number
    longitude: number
    latitudeDelta?: number
    longitudeDelta?: number
}