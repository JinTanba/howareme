"use client"

import type React from "react"
import { Search, Plus, CornerDownLeft, ArrowUp } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { AttachedFilesPreview } from "./attached-files-preview"

interface ChatInputFormProps {
  formRef: React.RefObject<HTMLFormElement>
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleAttachClick: () => void
  attachedFiles: File[]
  removeFile: (file: File) => void
  isInitialView?: boolean
}

export function ChatInputForm({
  formRef,
  input,
  handleInputChange,
  handleKeyDown,
  handleSubmit,
  handleAttachClick,
  attachedFiles,
  removeFile,
  isInitialView = false,
}: ChatInputFormProps) {
  if (isInitialView) {
    return (
      <form ref={formRef} onSubmit={handleSubmit} className="w-full mb-8">
        <div className="relative w-full bg-[#2D2D2D] border border-zinc-700 rounded-3xl shadow-lg p-4">
          <div className="flex items-start">
            <Search className="text-zinc-500 mt-2.5 mr-3 flex-shrink-0" size={20} />
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="w-full bg-transparent text-lg placeholder-zinc-500 focus:outline-none resize-none"
            />
            <div className="flex items-center space-x-2 mt-1.5">
              <button type="submit" className="p-2 text-zinc-400 hover:text-white transition-colors">
                <CornerDownLeft size={20} />
              </button>
            </div>
          </div>
          <div className="mt-3 ml-8">
            <button
              type="button"
              onClick={handleAttachClick}
              className="flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <Plus size={16} className="mr-2" />
              Add tabs or files
            </button>
          </div>
          <AttachedFilesPreview files={attachedFiles} onRemove={removeFile} className="mt-3 ml-8 pr-8" />
        </div>
      </form>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative">
      <div className="w-full bg-[#2D2D2D] border border-zinc-700 rounded-2xl focus-within:ring-2 focus-within:ring-red-500/50 shadow-lg transition-all flex flex-col">
        <AnimatePresence>
          {attachedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, padding: 0 }}
              animate={{ opacity: 1, height: "auto", padding: "0.75rem 1rem" }}
              exit={{ opacity: 0, height: 0, padding: 0 }}
              className="overflow-hidden border-b border-zinc-700"
            >
              <AttachedFilesPreview
                files={attachedFiles}
                onRemove={removeFile}
                gridClass="grid-cols-1 sm:grid-cols-2 max-h-36 overflow-y-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center relative">
          <input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask another question..."
            className="w-full bg-transparent py-3 pl-6 pr-20 text-base placeholder-zinc-500 focus:outline-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              type="button"
              onClick={handleAttachClick}
              className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-700"
            >
              <Plus size={20} />
            </button>
            <button
              type="submit"
              className="p-2 text-white bg-zinc-700 rounded-full hover:bg-zinc-600 transition-colors disabled:bg-zinc-800 disabled:text-zinc-500"
              disabled={!input.trim() && attachedFiles.length === 0}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
