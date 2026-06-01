'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import * as Icons from 'lucide-react'
import { Course } from '../types'
import { BentoCard } from './BentoGrid'

const GRADIENT_PAIRS: [string, string][] = [
  ['rgba(124,58,237,0.25)', 'rgba(59,130,246,0.15)'],
  ['rgba(6,182,212,0.2)', 'rgba(59,130,246,0.15)'],
  ['rgba(16,185,129,0.2)', 'rgba(6,182,212,0.12)'],
  ['rgba(245,158,11,0.2)', 'rgba(239,68,68,0.12)'],
]

function AnimatedProgressBar({ value }: { value: number }) {
  const width = useMotionValue(0)
  const springWidth = useSpring(width, { stiffness: 60, damping: 18 })
  const widthPct = useTransform(springWidth, (v) => `${v}%`)

  useEffect(() => {
    const t = setTimeout(() => width.set(value), 300)
    return () => clearTimeout(t)
  }, [value, width])

  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.08)' }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          width: widthPct,
          background: 'linear-gradient(90deg, #7c3aed, #3b82f6)',
        }}
      />
    </div>
  )
}

function DynamicIcon({ name, size = 20 }: { name: string; size?: number }) {
  const iconKey = name as keyof typeof Icons
  const Icon = (Icons[iconKey] as React.ComponentType<{ size?: number; className?: string }>) ?? Icons.BookOpen
  return <Icon size={size} className="text-white" />
}

interface CourseCardProps {
  course: Course
  index: number
  gradientIndex: number
}

export default function CourseCard({ course, index, gradientIndex }: CourseCardProps) {
  const [from, to] = GRADIENT_PAIRS[gradientIndex % GRADIENT_PAIRS.length]

  return (
    <BentoCard index={index} style={{ minHeight: 160 }}>
      {/* Card gradient */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      />

      <div className="relative p-5 flex flex-col h-full gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
        >
          <DynamicIcon name={course.icon_name} size={18} />
        </div>

        {/* Title */}
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-white leading-snug">{course.title}</h3>
        </div>

        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Progress
            </span>
            <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>
              {course.progress}%
            </span>
          </div>
          <AnimatedProgressBar value={course.progress} />
        </div>
      </div>
    </BentoCard>
  )
}
