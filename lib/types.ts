import type React from "react"

// Re-exporting the CoreMessage type from 'ai' as ChatMessage for clarity in this project.
// This is the primary data structure for a single message in the chat.
export type { CoreMessage as ChatMessage } from "ai"

// Defines the structure for a "skill" card displayed on the initial screen.
export type Skill = {
  icon: React.ElementType
  title: string
  description: string
  suggestion: string
  transform: string
}
