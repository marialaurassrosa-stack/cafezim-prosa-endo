"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ScheduleState {
  selectedSessionIds: string[];
  isSelected: (sessionId: string) => boolean;
  select: (sessionId: string) => void;
  remove: (sessionId: string) => void;
  replace: (removeId: string, addId: string) => void;
  clearAll: () => void;
}

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      selectedSessionIds: [],
      isSelected: (sessionId) => get().selectedSessionIds.includes(sessionId),
      select: (sessionId) =>
        set((state) =>
          state.selectedSessionIds.includes(sessionId)
            ? state
            : { selectedSessionIds: [...state.selectedSessionIds, sessionId] }
        ),
      remove: (sessionId) =>
        set((state) => ({
          selectedSessionIds: state.selectedSessionIds.filter((id) => id !== sessionId),
        })),
      replace: (removeId, addId) =>
        set((state) => ({
          selectedSessionIds: [
            ...state.selectedSessionIds.filter((id) => id !== removeId),
            addId,
          ],
        })),
      clearAll: () => set({ selectedSessionIds: [] }),
    }),
    {
      name: "cafezim-prosa-endo:schedule",
      // Rehydrated manually (see ScheduleExperience) after mount, so the
      // server-rendered markup and the client's first paint always match —
      // avoids a hydration mismatch against whatever was saved in
      // localStorage from a previous visit.
      skipHydration: true,
    }
  )
);
