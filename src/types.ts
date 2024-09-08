export type PhotosType = {
      small: string | null
      large: string | null
}

export type UserType = {
      name: string
      id: number
      photos: PhotosType
      status: string
      followed: boolean
}

export type ProfileType = {
      aboutMe: string
      contacts: {
            instagram: string
            twitter: string
      }
      fullName: string
      lookingForAJob: boolean
      lookingForAJobDescription: string
      photos: PhotosType
      userId: number
}

export type MessageType = {
      text: string
      likeNumber: number
      id: number
}

export type Chat = {
      name: string
      id: number
}
