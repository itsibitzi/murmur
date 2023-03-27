import {
  EuiButton,
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageTemplate,
  EuiPopover,
} from "@elastic/eui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { JobProgress } from "../components/JobProgress";
import { Uploader } from "../components/Uploader";
import { useFileStore } from "../state/files";

export const Menu = () => {
  const navigate = useNavigate();

  const files = useFileStore((state) => state.files);
  const fetchFiles = useFileStore((state) => state.fetchFiles);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showJobPopover, setShowJobPopover] = useState(false);

  // This could be made a little more clever by only polling while there's a job running
  useEffect(() => {
    const timer = setInterval(() => {
      fetchFiles();
      console.log("Polling for files");
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [fetchFiles]);

  return (
    <EuiPageTemplate grow={true}>
      <EuiPageTemplate.Header
        pageTitle="Murmur"
        alignItems="top"
        rightSideItems={[
          <EuiButton
            onClick={() => {
              setShowUploadModal(true);
            }}
          >
            Upload
          </EuiButton>,
          <EuiPopover
            button={
              <EuiButton
                onClick={() => setShowJobPopover(!showJobPopover)}
                disabled={
                  files
                    .flatMap((file) => file.jobs)
                    .filter((job) => job.status !== "Done").length === 0
                }
              >
                Jobs
              </EuiButton>
            }
            isOpen={showJobPopover}
            closePopover={() => setShowJobPopover(false)}
          >
            <JobProgress closePopover={() => setShowJobPopover(false)} />
          </EuiPopover>,
        ]}
      ></EuiPageTemplate.Header>
      <EuiPageTemplate.Section>
        <EuiFlexGroup wrap={true}>
          {files
            .filter((file) => file.jobs.some((j) => j.status === "Done"))
            .map((item) => (
              <EuiFlexItem key={item.id} style={{ minWidth: "300px" }}>
                <EuiCard
                  title={`${item.name}`}
                  onClick={() => {
                    navigate(`/editor/${item.id}`);
                  }}
                />
              </EuiFlexItem>
            ))}
        </EuiFlexGroup>
      </EuiPageTemplate.Section>
      {showUploadModal && <Uploader setShowUploadModal={setShowUploadModal} />}
    </EuiPageTemplate>
  );
};
