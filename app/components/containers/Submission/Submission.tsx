import type { TSubmission } from "./types";

export const Submission = ({ photos, created }: TSubmission) => {
  
  const _d = new Date(created);

  return (
    <div className="flex flex-col bg-slate-200 rounded p-2">
      <div className="pb-2 font-bold text-1xl">Submission from {_d.getMonth()}/{_d.getDate()}/{_d.getFullYear()}</div>
      <div>
        <div className="flex flex-wrap">
          {photos.map(photo => {
            return (
              <div key={photo.photoId} className="relative w-3/12 md:w-3/12 p-1">
                <img src={photo.src} className="block w-full"/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}