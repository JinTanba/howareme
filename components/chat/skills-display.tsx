"use client"
import { AtSign, Zap, PenSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Skill } from "@/lib/types"

const skills: Skill[] = [
  {
    icon: AtSign,
    title: "Mention Tabs",
    description: "Should I buy Multicolor Titanium or ACTIVE TU...",
    suggestion: "Compare Multicolor Titanium and ACTIVE TU",
    transform: "md:rotate-[-12deg] md:translate-x-[-40px] md:translate-y-[20px]",
  },
  {
    icon: Zap,
    title: "Browse Skills",
    description: "Make complex tasks simple and repeatable.",
    suggestion: "What are the most common use cases for AI skills?",
    transform: "md:rotate-[2deg] md:translate-y-[-10px]",
  },
  {
    icon: PenSquare,
    title: "Personalize",
    description: "Teach Dia to respond in your preferred style.",
    suggestion: "How can I personalize my AI assistant?",
    transform: "md:rotate-[14deg] md:translate-x-[40px] md:translate-y-[20px]",
  },
]

interface SkillsDisplayProps {
  onSkillClick: (suggestion: string) => void
  onClose: () => void
}

export function SkillsDisplay({ onSkillClick, onClose }: SkillsDisplayProps) {
  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2 [perspective:800px]">
        {skills.map((skill, index) => (
          <button
            key={index}
            onClick={() => onSkillClick(skill.suggestion)}
            className={cn(
              "w-full md:w-56 bg-[#2D2D2D] border border-zinc-800 rounded-2xl p-4 text-left transition-transform duration-300 ease-out hover:bg-[#3A3A3A] hover:scale-105",
              skill.transform,
            )}
          >
            <div className="flex items-center mb-2">
              <skill.icon size={16} className="mr-2" />
              <h3 className="font-semibold text-sm">{skill.title}</h3>
            </div>
            <p className="text-zinc-400 text-sm">{skill.description}</p>
          </button>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 md:-top-8 md:-right-8 p-1.5 bg-zinc-800 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
      >
        <X size={16} />
      </button>
    </div>
  )
}
