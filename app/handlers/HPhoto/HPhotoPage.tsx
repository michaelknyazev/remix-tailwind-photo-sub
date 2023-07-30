import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { dataURItoBlob } from "~/helpers/dataURItoBlob";

import { DefaultPageLayout } from "~/components/layouts/DefaultPageLayout";

import { PhotoForm } from "~/components/containers/PhotoForm";
import { PhotoMaker } from "~/components/containers/PhotoMaker";

import { Button } from "~/components/UI/Button";

import * as PhotoService from "~/services/photo.service";

import type { TPhoto, TPhotoStatus } from "~/components/containers/PhotoForm";
import type { TPhotoResult } from "./types";
import { NonIdealState } from "~/components/UI/NonIdealState";
import { FaceSmileIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@remix-run/react";
import { ButtonGroup } from "~/components/UI/ButtonGroup";
import { TSubmission } from "~/components/containers/Submission/types";

export const HPhotoPage = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<TPhoto[]>([]);
  const [statuses, setStatuses] = useState<TPhotoStatus[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [submissionId, setSubmissionId] = useState<string>(uuidv4());

  const handlePhoto = (src: string) => {
    const _newPhoto = {
      photoId: uuidv4(),
      src: src,
    };

    const newPhotos = [...photos, _newPhoto];

    setPhotos(newPhotos);
  };

  const handleCancel = () => navigate("/");

  const handleSubmit = async () => {
    if (!photos.length) return;

    setIsSubmitLoading(true);

    const _promises = photos.map((item): Promise<TPhotoResult> => {
      const fd = new FormData();
      const _blob = dataURItoBlob(item.src);

      fd.append("image", _blob);

      return PhotoService.Send(fd)
        .then((res) => {
          return {
            photoId: item.photoId,
            result: res,
          };
        })
        .catch((_) => {
          return {
            photoId: item.photoId,
            result: {
              success: false,
              event: "PROMISE_FAILED",
              result: "Promise is failed",
            },
          };
        });
    });

    try {
      const result = await Promise.all(_promises);
      const newStatuses: TPhotoStatus[] = result.map((item) => {
        const _itemStatus = ((res) => {
          switch (res.event) {
            case "SUCCESS":
              return 1;
            default:
            case "ERROR":
              return 0;
          }
        })(item.result);

        return {
          photoId: item.photoId,
          status: _itemStatus,
        };
      });

      const newSubmission: TSubmission = { 
        submissionId, 
        photos,
        created: Date.now()
      };
      let currentSubmissions = [];

      const _getSubs = window.localStorage.getItem("submissions");
      if (_getSubs) currentSubmissions = JSON.parse(_getSubs);

      currentSubmissions.push(newSubmission);
      window.localStorage.setItem("submissions", JSON.stringify(currentSubmissions));

      setStatuses(newStatuses);
    } catch (err) {
      //console.log(err);
    }

    setIsSubmitLoading(false);
  };

  const handleReset = () => {
    setStatuses([]);
    setPhotos([]);
    setSubmissionId(uuidv4());
  };

  const isThereAnyPhotos = !!photos.length;

  return (
    <DefaultPageLayout>
      <DefaultPageLayout.Position photo>
        {(() => {
          if (!statuses.length) return <PhotoMaker onPhoto={handlePhoto} />;

          return (
            <NonIdealState
              icon={<FaceSmileIcon className="w-20" />}
              title="Photos are submitted!"
              description="Your photos successfully uploaded to our server."
            />
          );
        })()}
      </DefaultPageLayout.Position>
      <DefaultPageLayout.Position main>
        {isThereAnyPhotos && <PhotoForm photos={photos} statuses={statuses} />}
      </DefaultPageLayout.Position>
      <DefaultPageLayout.Position submit>
        <ButtonGroup>
          <Button
            onClick={!!statuses.length ? handleReset : handleSubmit}
            loading={isSubmitLoading}
            disabled={!isThereAnyPhotos}
          >
            {!statuses.length ? "Submit" : "Submit Again"}
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </DefaultPageLayout.Position>
    </DefaultPageLayout>
  );
};
