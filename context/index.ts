import { create } from "zustand";
import { runCode } from "@/lib/actions/code";
import React, { Component } from "react";

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

interface PopupStore {
  open: boolean;
  setOpen: (open: boolean) => void;
  Component: React.FC;
  setComponent: (component: React.FC) => void;
}

interface UserStore {
  user: any;
  setUser: (user: any) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const usePopupStore = create<PopupStore>((set) => ({
  open: false,
  Component: React.Fragment as React.FC,
  setOpen: (open) => set({ open }),
  setComponent: (component) => set({ Component: component }),
}));

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
      const { stderr, stdout, points } = await runCode(get().code, challenge);
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

        points &&
          useUserStore
            .getState()
            .setUser({ points: useUserStore.getState().user.points + points });
      }
    } finally {
      set({ loading: false });
    }
  },
}));
