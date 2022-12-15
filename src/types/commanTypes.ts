export interface DropdownProps {
    title: string,
    id: number
}

export interface ImageList {
    id: number
    url: string
    mediaType: string | undefined
}
export interface DocList {
    id: number
    path: string,
    type: string | undefined
    mb: number | null
    title: string | null
}

export interface VideoList {
    id: number
    url: string
    mediaType: string | undefined
}