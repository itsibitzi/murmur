import { EuiPage, EuiPageBody } from "@elastic/eui";
import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import { Editor } from "./Editor";
import { Uploader } from "./Uploader";

function App() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [translationQualityLevels, setTranslationQualityLevels] = useState<
    string[]
  >([]);

  useEffect(() => {
    invoke("get_languages").then((l) => {
      console.log(l);
      setLanguages(l as string[]);
    });
    invoke("get_translation_quality_levels").then((t) => {
      setTranslationQualityLevels(t as string[]);
    });
  }, []);

  const [transcription, setTranscription] = useState(null);

  return (
    <EuiPage paddingSize="none">
      {transcription === null ? (
        <EuiPageBody paddingSize="l">
          <Uploader
            languages={languages}
            transcriptionQualityLevels={translationQualityLevels}
            setTranscription={setTranscription}
          />
        </EuiPageBody>
      ) : (
        <Editor transcription={transcription} />
      )}
    </EuiPage>
  );
}

export default App;
