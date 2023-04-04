import { Segment } from "./bindings/Segment";
import { Speaker } from "./bindings/Speaker";

export type SpeakerWithSegments = {
  speaker: Speaker;
  segments: Segment[];
};
