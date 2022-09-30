import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  EuiButton,
  EuiEmptyPrompt,
  EuiFilePicker,
  EuiImage,
  EuiLoadingSpinner,
  EuiPage,
  EuiPageBody,
  EuiText,
  useGeneratedHtmlId,
} from "@elastic/eui";
import logo from "./assets/logo.png";
import styled from "@emotion/styled";

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Center = styled.div`
  width: 100%;
  height: 173px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ACCEPTED_EXTENSIONS = [".mp3", ".aac", ".m4a"].join(",");

function App() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const filePickerId = useGeneratedHtmlId({ prefix: "filePicker" });

  const onChange = (files: any) => {
    setFiles(files.length > 0 ? Array.from(files) : []);
  };

  const submit = () => {
    console.log(files);
    setLoading(true);
    invoke("process_file", { path: files[0].name });
  };

  return (
    <EuiPage paddingSize="none">
      <EuiPageBody paddingSize="l">
        <EuiEmptyPrompt
          icon={<EuiImage size="fullWidth" src={logo} alt="" />}
          layout="horizontal"
          color="plain"
          title={<h2>Murmur</h2>}
          body={
            <>
              <p>Transcribe audio files from various languages.</p>
            </>
          }
          actions={
            loading ? (
              <Center>
                <EuiLoadingSpinner size="xxl" />
              </Center>
            ) : (
              <Actions>
                <EuiFilePicker
                  id={filePickerId}
                  accept={ACCEPTED_EXTENSIONS}
                  multiple
                  initialPromptText="Select one or more audio files"
                  onChange={onChange}
                />

                <EuiButton
                  color="primary"
                  disabled={files.length < 1}
                  onClick={submit}
                >
                  Submit
                </EuiButton>
              </Actions>
            )
          }
        />
      </EuiPageBody>
    </EuiPage>
  );
}

export default App;
