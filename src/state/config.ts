import { invoke } from "@tauri-apps/api";
import { create } from "zustand";

type ConfigState = {
  ready: boolean;
  languages: string[];
  translationQualityLevels: string[];
  init: () => void;
};

export const useConfigStore = create<ConfigState>((set) => ({
  ready: false,
  languages: [],
  translationQualityLevels: [],
  init: async () => {
    const [languages, translationQualityLevels] = await Promise.all([
      invoke<string[]>("get_languages"),
      invoke<string[]>("get_translation_quality_levels"),
    ]);

    set(() => {
      return {
        ready: true,
        languages,
        translationQualityLevels,
      };
    });
  },
}));
