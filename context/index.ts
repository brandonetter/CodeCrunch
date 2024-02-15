import { create } from "zustand";
import { runCode } from "@/lib/actions/code";

interface Result {
  test: any;
  success: boolean;
  expectedOutput: any;
  output: any;
}

interface CodeStore {
  setCode: (code: string) => void;
  clearCode: () => void;
  setResults: (results: Result[]) => void;
  setErrors: (errors: string) => void;
  setLoading: (loading: boolean) => void;
  setCurrentTab: (tab: string) => void;
  executeCode: (challenge: string) => void;
  code: string;
  loading: boolean;
  results: Result[];
  errors: string;
  currentTab: string;
  newErrors: boolean;
  newResults: boolean;
}

export const useCodeStore = create<CodeStore>((set, get) => ({
  code: "",
  loading: false,
  results: [],
  errors: "",
  currentTab: "Results",
  newErrors: false,
  newResults: false,
  setLoading: (loading) => set({ loading }),
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
  executeCode: async (challenge) => {
    set({ loading: true });
    try {
      const { stderr, stdout } = await runCode(get().code, challenge);
      if (stderr) {
        set({
          errors: stderr,
          newErrors: get().currentTab !== "Errors",
        });
      } else {
        set({
          errors: "",
          results: stdout,
          newResults: get().currentTab !== "Results",
        });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
