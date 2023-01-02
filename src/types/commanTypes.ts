export interface DropdownProps {
    title: string,
    id: number
}

export interface ImageList {
    id: number
    url: string
    mediaType: string | undefined
    thumbnail?: undefined
}
export interface DocList {
    id: number
    attachment: string,
    type: string | undefined
    bytes: number | null
    title: string | null
}

export interface VideoList {
    id: number
    url: string
    mediaType: string | undefined
    thumbnail?: string
}

export interface JobDataProps {
    id: number,
    name: string,
    distance: string,
    descriprion: string,
    imageurl: string
}
export interface location {
    latitude: number,
    longitude: number
}

export interface MapPositionProps {
    latitude: number
    longitude: number
    latitudeDelta?: number | undefined
    longitudeDelta?: number | undefined
}

export interface ItemProps {
    id?: number
    image: string | undefined
    mediaType?: string
}
