import { json, unstable_createFileUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { v4 as uuidv4 } from 'uuid';

import type { ActionArgs } from "@remix-run/node";
import type { FileUploadHandlerFilterArgs } from "@remix-run/node/dist/upload/fileUploadHandler";

export const HPhotoActionSave = async ({ request }: ActionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createFileUploadHandler({
      directory: "public/taken_images",
      file: () => `${uuidv4()}.jpg`,
      filter: ({ contentType }: FileUploadHandlerFilterArgs) => {
        if (contentType === 'image/jpeg') return true;
        return false;
      }
    })
  )
  const uploadedImage = formData.get("image");

  if (uploadedImage) {
    return json({
      success: true,
      event: "SUCCESS",
      result: null
    })
  }

  return json({
    success: false,
    event: "ERROR",
    result: null
  })
}
