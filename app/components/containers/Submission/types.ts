import { TPhoto } from "../PhotoForm"

export type TSubmission = {
  submissionId: string,
  created: number,
  photos: TPhoto[],
}