import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FileIcon, FileText, ImageIcon, FileArchive } from "lucide-react"
import type React from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper to format file size from bytes to a readable string.
export const formatFileSize = (bytes: number, decimalPoint?: number) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const dm = decimalPoint || 2
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

// Helper to get a relevant file icon based on the file's MIME type.
export const getFileIcon = (fileType: string): React.ElementType => {
  if (fileType.startsWith("image/")) return ImageIcon
  if (fileType === "application/pdf") return FileText
  if (fileType.startsWith("text/")) return FileText
  if (fileType.startsWith("application/zip") || fileType.startsWith("application/x-rar-compressed")) return FileArchive
  return FileIcon
}
