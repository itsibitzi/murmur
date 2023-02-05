import { EuiButton, EuiPageTemplate } from "@elastic/eui";
import { FC, useState } from "react";

type EditorProps = {
  transcription: any;
};

export const Editor: FC<EditorProps> = ({ transcription }) => {
  const [people, setPeople] = useState([]);

  console.log(transcription);
  return (
    <EuiPageTemplate grow={true}>
      <EuiPageTemplate.Header
        pageTitle="Murmur Editor"
        rightSideItems={[<EuiButton>Export</EuiButton>]}
      ></EuiPageTemplate.Header>
      <EuiPageTemplate.Section>
        {transcription.subtitles.map((subtitle: any) => <Segment />
        )}
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};
