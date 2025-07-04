"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { SiNpm, SiPnpm, SiYarn } from "react-icons/si"
import { usePackageManagerStore } from "../stores/packageManagerStore"

const tabs = [
  { name: "npm", icon: SiNpm, color: "text-red-500" },
  { name: "pnpm", icon: SiPnpm, color: "text-orange-500" },
  { name: "yarn", icon: SiYarn, color: "text-blue-500" },
] as const

interface CommandTabsProps {
  npm: string
  pnpm: string
  yarn: string
}

export default function InstallTabs({ npm, pnpm, yarn }: CommandTabsProps) {
  const activeTab = usePackageManagerStore((state) => state.activeTab)
  const setActiveTab = usePackageManagerStore((state) => state.setActiveTab)
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const commands: Record<string, string> = { npm, pnpm, yarn }
  const activeTabData = tabs.find((tab) => tab.name === activeTab)

  const copyToClipboard = async (command: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedTab(tabName)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="not-prose my-6">
      <div className="flex border-b border-gray-200 dark:border-neutral-800 mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = tab.name === activeTab
          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-gray-900 dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? tab.color : ""}`} />
              {tab.name}
            </button>
          )
        })}
      </div>

      {activeTabData && (
        <div className="border border-gray-200 dark:border-neutral-700 rounded-sm p-4">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {commands[activeTab]}
            </code>
            <button
              onClick={() => copyToClipboard(commands[activeTab], activeTab)}
              className="ml-4 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="Copy to clipboard"
            >
              {copiedTab === activeTab ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
