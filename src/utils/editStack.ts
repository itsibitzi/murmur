type EditTextEvent = {
  type: "editText";
  removedText: string;
  addedText: string;
  segmentNumber: number;
  offset: number;
};

type SetSpeakerEvent = {
  type: "setSpeaker";
  speaderId: string;
};

type EditStackEvent = EditTextEvent | SetSpeakerEvent;

export class EditStack {
  private stack: EditStackEvent[] = [];
  private index = 0;

  push(item: EditStackEvent) {
    this.stack = this.stack.slice(0, this.index);
    this.stack.push(item);
    this.index = this.stack.length;
  }

  undo() {
    if (this.index > 0) {
      this.index--;
      return this.stack[this.index];
    }
  }

  redo() {
    if (this.index < this.stack.length) {
      const item = this.stack[this.index];
      this.index++;
      return item;
    }
  }
}
