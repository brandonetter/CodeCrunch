import { create } from "zustand";

interface CodeStore {
  code: string;
  setCode: (code: string) => void;
  clearCode: () => void;
  setResults: (results: string) => void;
  setErrors: (errors: string) => void;
  results: string;
  errors: string;
  currentTab: string;
  newErrors: boolean;
  newResults: boolean;
  setCurrentTab: (tab: string) => void;
}

export const useCodeStore = create<CodeStore>((set, get) => ({
  code: "",
  results: "",
  errors: "",
  currentTab: "Results",
  newErrors: false,
  newResults: false,
  clearCode: () => set({ code: "" }),
  setCode: (code) => set({ code }),
  setResults: (results) => {
    set({ results });
    if (get().currentTab !== "Results") {
      set({ newResults: true });
    }
  },
  setErrors: (errors) => {
    set({ errors });

    if (get().currentTab !== "Errors") {
      set({ newErrors: true });
    }
  },
  setCurrentTab: (currentTab) => {
    set({ currentTab });
    if (currentTab === "Results") {
      set({ newResults: false });
    } else {
      set({ newErrors: false });
    }
  },
}));
