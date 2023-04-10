import { invoke } from "@tauri-apps/api";
import { create } from "zustand";
import { File } from "../model/bindings/File";

type FileState = {
  files: File[];
  fetchFiles: () => void;
};

export const useFileStore = create<FileState>((set) => ({
  files: [],
  fetchFiles: async () => {
    const files = await invoke<File[]>("get_files");
    console.log(files);

    set(() => {
      return { files };
    });
  },
}));
