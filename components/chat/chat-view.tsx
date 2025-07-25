"use client"

import type React from "react"
import { motion } from "framer-motion"
import { X, Zap } from "lucide-react"
import type { ChatMessage as ChatMessageType } from "@/lib/types"
import { ChatMessage } from "./chat-message"
import { ChatInputForm } from "./chat-input-form"

interface ChatViewProps extends React.ComponentProps<typeof ChatInputForm> {
  messages: ChatMessageType[]
  isLoading: boolean
  chatContainerRef: React.RefObject<HTMLDivElement>
  showBottomBar: boolean
  setShowBottomBar: (show: boolean) => void
}

export function ChatView({
  messages,
  isLoading,
  chatContainerRef,
  showBottomBar,
  setShowBottomBar,
  ...chatInputProps
}: ChatViewProps) {
  return (
    <motion.div
      key="chat"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-3xl flex-grow flex flex-col pt-8 pb-48"
    >
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto px-4 md:px-8 space-y-8">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 text-sm">
            <div className="flex-shrink-0 mt-1 p-1.5 bg-zinc-800 border border-zinc-700 rounded-full animate-pulse">
              <Zap size={14} className="text-zinc-400" />
            </div>
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 z-20">
        <div className="max-w-3xl mx-auto">
          <ChatInputForm {...chatInputProps} />
          {showBottomBar && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-between items-center mt-2 text-xs text-zinc-500 px-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
                <span>Dia works best as your default browser. Try it for a week.</span>
              </div>
              <button onClick={() => setShowBottomBar(false)} className="p-1 hover:text-zinc-300">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
