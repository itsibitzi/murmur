import { EuiFlexGroup, EuiFlexItem, EuiProgress } from "@elastic/eui";
import styled from "@emotion/styled";
import { FC } from "react";
import { useFileStore } from "../state/files";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

type JobProgressProps = {
  closePopover: () => void;
};

export const JobProgress: FC<JobProgressProps> = ({ closePopover }) => {
  const files = useFileStore((state) => state.files);

  let jobs = files
    .flatMap((file) => file.jobs.map((j) => ({ ...j, name: file.name })))
    .filter((job) => job.status !== "Done");

  if (jobs.length === 0) {
    closePopover();
  }

  console.log(jobs);

  return (
    <Container>
      <EuiFlexGroup direction="column">
        {jobs.map((job) => {
          if (job.status === "Done") {
            return null;
          }

          return (
            <EuiFlexItem>
              <div>{job.name}</div>
              {job.status === "InProgress" ? (
                <EuiProgress />
              ) : (
                <b>{job.status}</b>
              )}
            </EuiFlexItem>
          );
        })}
      </EuiFlexGroup>
    </Container>
  );
};
