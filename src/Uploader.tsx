import {
  EuiButton,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiEmptyPrompt,
  EuiFormRow,
  EuiImage,
  EuiLoadingSpinner,
} from "@elastic/eui";
import styled from "@emotion/styled";
import { invoke } from "@tauri-apps/api";
import { open } from "@tauri-apps/api/dialog";
import { FC, useState } from "react";
import logo from "./assets/stolas.png";

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

type UploaderProps = {
  languages: string[];
  transcriptionQualityLevels: string[];
  setTranscription: (transcription: any) => void;
};

export const Uploader: FC<UploaderProps> = ({
  languages,
  transcriptionQualityLevels,
}) => {
  const [loading, setLoading] = useState(false);

  const [filename, setFileName] = useState<string | undefined>(undefined);
  const [path, setPath] = useState<string | undefined>();

  const languageOptions = languages.map((l) => ({ label: l }));
  const qualityLevelOptions = transcriptionQualityLevels.map((t) => ({
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

  const submit = async () => {
    setLoading(true);

    const req = {
      path,
      language: language?.label,
      quality: quality?.label,
    };

    try {
      await invoke("upload_file", { req });
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
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

            <EuiButton
              color="primary"
              disabled={
                language === undefined || quality == undefined || path === null
              }
              onClick={submit}
            >
              Submit
            </EuiButton>
          </Actions>
        )
      }
    />
  );
};
