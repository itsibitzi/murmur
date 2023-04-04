import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiPopover } from "@elastic/eui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { JobProgress } from "../components/JobProgress";
import { Body } from "../components/layout/Body";
import { Header } from "../components/layout/Header";
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
    <>
      <Header
        title="Files"
        right={
          <>
            <Button
              onClick={() => {
                setShowUploadModal(true);
              }}
            >
              Upload
            </Button>
            <EuiPopover
              button={
                <Button
                  onClick={() => setShowJobPopover(!showJobPopover)}
                  disabled={
                    files
                      .flatMap((file) => file.jobs)
                      .filter((job) => job.status !== "Done").length === 0
                  }
                >
                  Jobs
                </Button>
              }
              isOpen={showJobPopover}
              closePopover={() => setShowJobPopover(false)}
            >
              <JobProgress closePopover={() => setShowJobPopover(false)} />
            </EuiPopover>
          </>
        }
      ></Header>
      <Body>
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
      </Body>
      {showUploadModal && <Uploader setShowUploadModal={setShowUploadModal} />}
    </>
  );
};
