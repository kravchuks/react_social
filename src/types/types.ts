export type PostsType = {
    id: number | null,
    message: string | null,
    like_count: number | null,
    image: string | null
}

export type ContactsType = {
    github: string | null,
    vk: string | null,
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
    website: string | null,
    youtube: string | null,
    mainLink: string | null,
}

export type PhotosType = {
    small: string | null,
    large: string | null,
}

export type ProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type UsersType = {
    id: number | null,
    name: string | null,
    status: string | null,
    photos: PhotosType
}

export type DialogType = {
    id: number | null,
    name: string | null,
    image: string | null
}

export type MessageType = {
    id: number | null,
    text: string | null
}