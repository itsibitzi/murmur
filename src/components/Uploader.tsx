import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFormRow,
  EuiLoadingSpinner,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiText,
} from "@elastic/eui";
import styled from "@emotion/styled";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { FC, useState } from "react";
import { useConfigStore } from "../state/config";

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

type UploaderProps = { setShowUploadModal: (open: boolean) => void };

export const Uploader: FC<UploaderProps> = ({ setShowUploadModal }) => {
  const languages = useConfigStore((state) => state.languages);
  const translationQualityLevels = useConfigStore(
    (state) => state.translationQualityLevels
  );

  const [state, setState] = useState<"ready" | "uploading" | "done">("ready");

  const [filename, setFileName] = useState<string | undefined>(undefined);
  const [path, setPath] = useState<string | undefined>();

  const languageOptions = languages.map((l) => ({ label: l }));
  const qualityLevelOptions = translationQualityLevels.map((t) => ({
    label: t,
  }));

  const [language, setLanguage] = useState<
    EuiComboBoxOptionOption<string> | undefined
  >(undefined);
  const [quality, setQuality] = useState<
    EuiComboBoxOptionOption<string> | undefined
  >(undefined);

  const onChangeLanguage = (e: EuiComboBoxOptionOption<string>[]) => {
    setLanguage(e[0]);
  };

  const onChageQuality = (e: EuiComboBoxOptionOption<string>[]) => {
    setQuality(e[0]);
  };

  const submit = () => {
    setState("uploading");

    const req = {
      path,
      language: language?.label,
      quality: quality?.label,
    };

    try {
      console.log(state);
      invoke("upload_file", { req }).then(() => {
        setState("done");
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <EuiModal onClose={() => setShowUploadModal(false)}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Upload</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        {state === "done" ? (
          <EuiText>
            Upload complete. You can continue using the app while we process the
            file.
          </EuiText>
        ) : state === "uploading" ? (
          <Center>
            <EuiLoadingSpinner size="xxl" />
          </Center>
        ) : (
          <Actions>
            <EuiFormRow label="Select language">
              <EuiComboBox
                aria-label="Select language"
                placeholder="English"
                singleSelection={{ asPlainText: true }}
                options={languageOptions}
                selectedOptions={language ? [language] : []}
                onChange={onChangeLanguage}
              />
            </EuiFormRow>
            <EuiFormRow label="Select transcription quality">
              <EuiComboBox
                aria-label="Select quality"
                placeholder="Medium"
                singleSelection={{ asPlainText: true }}
                options={qualityLevelOptions}
                selectedOptions={quality ? [quality] : []}
                onChange={onChageQuality}
              />
            </EuiFormRow>
            <EuiButton
              onClick={() => {
                open().then((inputFiles: string | string[] | null) => {
                  if (inputFiles === null) {
                    return;
                  }

                  let filepath: string;

                  if (Array.isArray(inputFiles)) {
                    filepath = inputFiles[0];
                  } else {
                    filepath = inputFiles;
                  }

                  setPath(filepath);
                  const pathSegments = filepath.split("/");

                  setFileName(pathSegments[pathSegments.length - 1]);
                });
              }}
            >
              {filename ? filename : "Select Audio File"}
            </EuiButton>
          </Actions>
        )}
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton
          color={state === "done" ? "primary" : "ghost"}
          onClick={() => setShowUploadModal(false)}
          fill
        >
          Close
        </EuiButton>
        {state !== "done" && (
          <EuiButton
            color="primary"
            disabled={
              state === "uploading" ||
              language === undefined ||
              quality == undefined ||
              path === null
            }
            onClick={submit}
          >
            Submit
          </EuiButton>
        )}
      </EuiModalFooter>
    </EuiModal>
  );
};
