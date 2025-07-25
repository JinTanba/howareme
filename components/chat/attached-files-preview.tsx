"use client"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { formatFileSize, getFileIcon } from "@/lib/utils"

interface AttachedFilesPreviewProps {
  files: File[]
  onRemove: (file: File) => void
  className?: string
  gridClass?: string
}

export function AttachedFilesPreview({
  files,
  onRemove,
  className = "",
  gridClass = "grid-cols-1 sm:grid-cols-2",
}: AttachedFilesPreviewProps) {
  if (files.length === 0) return null

  return (
    <div className={className}>
      <div className={`grid gap-3 ${gridClass}`}>
        <AnimatePresence>
          {files.map((file, index) => {
            const Icon = getFileIcon(file.type)
            return (
              <motion.div
                layout
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 bg-zinc-800/80 border border-zinc-700 rounded-lg p-2 text-sm text-zinc-300 overflow-hidden"
              >
                <Icon className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                <div className="flex-grow overflow-hidden">
                  <p className="truncate font-medium text-white">{file.name}</p>
                  <p className="text-xs text-zinc-500">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={() => onRemove(file)}
                  className="text-zinc-500 hover:text-white transition-colors rounded-full p-1 flex-shrink-0 -mr-1"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
