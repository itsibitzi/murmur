import { useState } from "react";
import { EuiPage, EuiPageBody } from "@elastic/eui";
import { Uploader } from "./Uploader";
import { Editor } from "./Editor";

function App() {
  const [transcription, setTranscription] = useState(null);

  return (
    <EuiPage paddingSize="none">
      {transcription === null ? (
        <EuiPageBody paddingSize="l">
          <Uploader setTranscription={setTranscription} />
        </EuiPageBody>
      ) : (
        <Editor transcription={transcription} />
      )}
    </EuiPage>
  );
}

export default App;
