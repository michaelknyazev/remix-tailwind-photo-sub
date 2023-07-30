import type { TPhotoForm } from "./types";

export const PhotoForm = ({ photos, statuses = [] }: TPhotoForm) => {
  const className = [
    "flex",
    "flex-wrap"
  ];

  return (
    <div className={className.join(' ')}>
      {photos.map(item => {
        const _status = statuses.find(_i => _i.photoId === item.photoId);

        return (
          <div key={item.photoId} className="relative w-3/12 md:w-3/12 p-1">
            <img src={item.src} className="block w-full"/>
            {_status ? (
              <div className="absolute bottom-1 right-1">
                "✅"
              </div>
            ) : ""}
          </div>
        );
      })}
    </div>
  )
}