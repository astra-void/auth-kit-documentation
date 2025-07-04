"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type PackageManager = "npm" | "pnpm" | "yarn"

interface PackageManagerState {
  activeTab: PackageManager
  setActiveTab: (tab: PackageManager) => void
}

export const usePackageManagerStore = create<PackageManagerState>()(
  persist(
    (set) => ({
      activeTab: "npm",
      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "preferred-package-manager",
    }
  )
)
