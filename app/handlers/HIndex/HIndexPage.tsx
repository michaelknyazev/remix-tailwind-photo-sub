import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/UI/Button";
import { ButtonGroup } from "~/components/UI/ButtonGroup";
import { List } from "~/components/UI/List";
import { NonIdealState } from "~/components/UI/NonIdealState";
import { Submission, TSubmission } from "~/components/containers/Submission";
import { DefaultPageLayout } from "~/components/layouts/DefaultPageLayout";

export const HIndexPage = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<TSubmission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = () => navigate("/take");

  useEffect(() => {
    if (loading) {
      const _storedSubmissions = window.localStorage.getItem("submissions");

      if (_storedSubmissions) {
        const _subs = JSON.parse(_storedSubmissions);

        setSubmissions(_subs.reverse());
        setLoading(false);
      }
    }
  }, []);

  return (
    <DefaultPageLayout>
      <DefaultPageLayout.Position>
        <h1 className="font-bold text-3xl">My submissions</h1>
      </DefaultPageLayout.Position>
      <DefaultPageLayout.Position main>
        {(() => {
          if (!submissions.length) {
            return (
              <NonIdealState
                icon={<FaceFrownIcon className="w-20" />}
                title="No submissions"
                description="You have not submitted any photos"
              />
            );
          }

          return (
            <List>
              {submissions.map((submission) => {
                return (
                  <Submission key={submission.submissionId} {...submission} />
                );
              })}
            </List>
          );
        })()}
      </DefaultPageLayout.Position>
      <DefaultPageLayout.Position submit>
        <ButtonGroup>
          <Button onClick={handleSubmit}>Submit more photos</Button>
        </ButtonGroup>
      </DefaultPageLayout.Position>
    </DefaultPageLayout>
  );
};
