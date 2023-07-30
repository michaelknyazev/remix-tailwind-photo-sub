export type TPhoto = {
  photoId: string,
  src: string
}

export type TPhotoForm = {
  photos: TPhoto[],
  statuses: TPhotoStatus[]
}

export type TPhotoStatus = {
  photoId: string,
  status: number // 0 - failed, 1 - uploaded
}
