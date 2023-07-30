import type { TResponse } from "~/services/types"

export type TPhotoResult = {
  photoId: string,
  result: TResponse<string | void>
}