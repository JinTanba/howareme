"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { AnimatePresence } from "framer-motion"
import { InitialView } from "@/components/chat/initial-view"
import { ChatView } from "@/components/chat/chat-view"
import type { ChatMessage } from "@/lib/types"

// --- Mock Data for API Implementers ---
// This mock data demonstrates the expected structure for messages.
// To use it, pass `mockMessages` to the `initialMessages` property of the `useChat` hook below.
const mockMessages: ChatMessage[] = [
  {
    id: "mock-1",
    role: "user",
    content: "What are the main differences between the new iPhone and the latest Samsung Galaxy?",
  },
  {
    id: "mock-2",
    role: "assistant",
    content: `Of course! Here's a breakdown of the key differences between the latest iPhone and Samsung Galaxy models:

### Display
*   **iPhone**: Features a Super Retina XDR display with ProMotion technology, offering vibrant colors and a smooth 120Hz refresh rate.
*   **Samsung Galaxy**: Boasts a Dynamic AMOLED 2X display, also with a 120Hz refresh rate, known for its deep blacks and high contrast ratio.

### Camera
*   **iPhone**: Advanced triple-camera system with features like Cinematic mode and Photographic Styles. Excels in video recording.
*   **Samsung Galaxy**: Versatile quad-camera setup with a high-megapixel main sensor and advanced zoom capabilities (Space Zoom).

Would you like a more detailed comparison of a specific feature?`,
  },
]
// --- End of Mock Data ---

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [], // To use mock data, replace [] with `mockMessages`
    onFinish: () => {
      setAttachedFiles([])
    },
  })

  const [showSkills, setShowSkills] = useState(true)
  const [showBottomBar, setShowBottomBar] = useState(true)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const initialFormRef = useRef<HTMLFormElement>(null)
  const chatFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(e.target.files!)])
      e.target.value = "" // Allow selecting the same file again
    }
  }

  const removeFile = (fileToRemove: File) => {
    setAttachedFiles((prev) => prev.filter((file) => file !== fileToRemove))
  }

  const handleAttachClick = () => {
    fileInputRef.current?.click()
  }

  const handleSkillClick = (suggestion: string) => {
    setInput(suggestion)
    // Automatically submit the form
    // We need to create a synthetic event for this
    const form = initialFormRef.current || chatFormRef.current
    if (form) {
      const fakeEvent = {
        preventDefault: () => {},
        // Add other properties if needed by handleSubmit
      } as React.FormEvent<HTMLFormElement>
      handleSubmit(fakeEvent, {
        data: {
          message: suggestion,
        },
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() || attachedFiles.length > 0) {
        const form = initialFormRef.current?.contains(e.target as Node) ? initialFormRef.current : chatFormRef.current
        form?.requestSubmit()
      }
    }
  }

  const isInitialView = messages.length === 0

  const chatInputProps = {
    input,
    handleInputChange,
    handleKeyDown,
    handleSubmit,
    handleAttachClick,
    attachedFiles,
    removeFile,
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-zinc-950 text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-zinc-950" />
      <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple className="hidden" />

      <main className="flex-grow flex flex-col items-center w-full z-10">
        <AnimatePresence>
          {isInitialView ? (
            <InitialView
              {...chatInputProps}
              formRef={initialFormRef}
              showSkills={showSkills}
              setShowSkills={setShowSkills}
              handleSkillClick={handleSkillClick}
            />
          ) : (
            <ChatView
              {...chatInputProps}
              formRef={chatFormRef}
              messages={messages}
              isLoading={isLoading}
              chatContainerRef={chatContainerRef}
              showBottomBar={showBottomBar}
              setShowBottomBar={setShowBottomBar}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
