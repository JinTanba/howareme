import ReactMarkdown from "react-markdown"
import { Zap } from "lucide-react"
import type { ChatMessage } from "@/lib/types"

interface ChatMessageProps {
  message: ChatMessage
}

export function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="bg-red-800/80 rounded-2xl px-4 py-2 text-sm text-white shadow-md max-w-lg">{content}</div>
      </div>
    )
  }

  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1 p-1.5 bg-zinc-800 border border-zinc-700 rounded-full">
        <Zap size={14} className="text-zinc-400" />
      </div>
      <div className="prose-custom flex-1">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}
