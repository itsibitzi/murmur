import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AudioFile } from "../components/AudioFile";
import { Button } from "../components/Button";
import {
  DropDown,
  DropDownItem,
  DropDownSeparator,
} from "../components/DropDown";
import { MenuIcon } from "../components/icons/MenuIcon";
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

  const jobCount = files
    .flatMap((file) => file.jobs)
    .filter((job) => job.status !== "Done").length;

  return (
    <>
      <Header
        title="Files"
        right={
          <DropDown
            proxy={
              <Button>
                <MenuIcon />
              </Button>
            }
          >
            <>
              <DropDownItem
                text={"Add Audio"}
                onClick={() => {
                  setShowUploadModal(true);
                }}
              />
              <DropDownSeparator />
              <DropDownItem text={"Jobs go here"} />
            </>
          </DropDown>
        }
      ></Header>
      <Body>
        <div className="flex flex-row flex-wrap">
          {files
            .filter((file) => file.jobs.some((j) => j.status === "Done"))
            .map((item) => (
              <AudioFile
                key={item.id}
                file={item}
                onClick={() => {
                  navigate(`/editor/${item.id}`);
                }}
              />
            ))}
        </div>
      </Body>
      {showUploadModal && <Uploader setShowUploadModal={setShowUploadModal} />}
    </>
  );
};
