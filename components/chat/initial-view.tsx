"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import { ChatInputForm } from "./chat-input-form"
import { SkillsDisplay } from "./skills-display"

interface InitialViewProps extends React.ComponentProps<typeof ChatInputForm> {
  showSkills: boolean
  setShowSkills: (show: boolean) => void
  handleSkillClick: (suggestion: string) => void
}

export function InitialView({ showSkills, setShowSkills, handleSkillClick, ...chatInputProps }: InitialViewProps) {
  return (
    <motion.div
      key="initial"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl flex flex-col items-center justify-center flex-grow px-4"
    >
      <div className="p-3 rounded-full bg-zinc-800/50 border border-zinc-700 mb-6">
        <Bot size={28} className="text-zinc-400" />
      </div>

      <ChatInputForm {...chatInputProps} isInitialView />

      {showSkills && <SkillsDisplay onSkillClick={handleSkillClick} onClose={() => setShowSkills(false)} />}
    </motion.div>
  )
}
