import { ActionArgs } from "@remix-run/node";
import { HPhotoActionSave } from "~/handlers/HPhoto/HPhotoActionSave";
import { HPhotoPage } from "~/handlers/HPhoto/HPhotoPage";


export default HPhotoPage

export async function action(props: ActionArgs) {
  return HPhotoActionSave(props) 
}