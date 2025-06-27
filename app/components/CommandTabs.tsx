"use client"

import { useState, useEffect } from "react"
import { Copy, Check } from "lucide-react"
import { SiNpm, SiPnpm, SiYarn } from "react-icons/si"

const STORAGE_KEY = "preferred-package-manager"

interface CommandTabsProps {
    npm: string;
    pnpm: string;
    yarn: string;
};

export default function InstallTabs({
    npm,
    pnpm,
    yarn
}: CommandTabsProps) {
  const [activeTab, setActiveTab] = useState("npm")
  const [copiedTab, setCopiedTab] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

 const tabs = [
    {
        name: "npm",
        command: npm,
        icon: SiNpm,
        color: "text-red-500",
    },
    {
        name: "pnpm",
        command: pnpm,
        icon: SiPnpm,
        color: "text-orange-500",
    },
    {
        name: "yarn",
        command: yarn,
        icon: SiYarn,
        color: "text-blue-500",
    },
]

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved && tabs.some((tab) => tab.name === saved)) {
        setActiveTab(saved)
      }
    } catch (error) {
      console.warn("Failed to load package manager preference:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
    try {
      localStorage.setItem(STORAGE_KEY, tabName)
    } catch (error) {
      console.warn("Failed to save package manager preference:", error)
    }
  }

  const copyToClipboard = async (command: string, tabName: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedTab(tabName)
      setTimeout(() => setCopiedTab(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const activeTabData = tabs.find((tab) => tab.name === activeTab)

  if (!isLoaded) {
    return (
      <div className="not-prose my-6">
        <div className="flex border-b border-gray-200 dark:border-neutral-800 mb-4">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <div
                key={tab.name}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-500 dark:text-gray-400"
              >
                <IconComponent className="w-4 h-4" />
                {tab.name}
              </div>
            )
          })}
        </div>
        <div className="border border-gray-200 dark:border-neutral-800 rounded-md p-4">
          <div className="h-5 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="not-prose my-6">
      <div className="flex border-b border-gray-200 dark:border-neutral-800 mb-4">
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.name}
              onClick={() => handleTabChange(tab.name)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.name
                  ? "border-gray-900 dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <IconComponent className={`w-4 h-4 ${activeTab === tab.name ? tab.color : ""}`} />
              {tab.name}
            </button>
          )
        })}
      </div>

      {activeTabData && (
        <div className="border border-gray-200 dark:border-neutral-700 rounded-sm p-4">
          <div className="flex items-center justify-between">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">{activeTabData.command}</code>
            <button
              onClick={() => copyToClipboard(activeTabData.command, activeTabData.name)}
              className="ml-4 p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              title="Copy to clipboard"
            >
              {copiedTab === activeTabData.name ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
