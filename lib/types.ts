import type React from "react"

// Re-exporting the Message type from 'ai/react' as ChatMessage for clarity in this project.
// This is the primary data structure for a single message in the chat.
export type { Message as ChatMessage } from "ai/react"

// Defines the structure for a "skill" card displayed on the initial screen.
export type Skill = {
  icon: React.ElementType
  title: string
  description: string
  suggestion: string
  transform: string
}
