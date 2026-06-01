'use client'

import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { BentoCard } from './BentoGrid'

// Deterministic pseudo-random so server and client render identically (no hydration mismatch)
function seededValue(week: number, day: number): number {
  const n = Math.sin(week * 127 + day * 311) * 43758.5453
  return Math.floor((n - Math.floor(n)) * 5)
}

const WEEKS = 20
const DAYS = 7
const ACTIVITY = Array.from({ length: WEEKS }, (_, wi) =>
  Array.from({ length: DAYS }, (_, di) => seededValue(wi, di))
)

const COLORS = [
  'rgba(255,255,255,0.04)',
  'rgba(124,58,237,0.3)',
  'rgba(124,58,237,0.5)',
  'rgba(124,58,237,0.7)',
  'rgba(167,139,250,0.9)',
]

export default function ActivityTile({ index }: { index: number }) {
  return (
    <BentoCard index={index} className="col-span-full md:col-span-2" style={{ minHeight: 180 }}>
      <div className="p-5 h-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Activity size={16} style={{ color: '#a78bfa' }} />
          <h2 className="text-sm font-semibold text-white">Learning Activity</h2>
          <span className="ml-auto text-xs" style={{ color: '#6b7280' }}>
            Last 20 weeks
          </span>
        </div>

        {/* Contribution grid */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          {ACTIVITY.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((level, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: (wi * 7 + di) * 0.003,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="w-3 h-3 rounded-sm shrink-0"
                  style={{ background: COLORS[level] }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-xs" style={{ color: '#6b7280' }}>Less</span>
          {COLORS.map((c, i) => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
          ))}
          <span className="text-xs" style={{ color: '#6b7280' }}>More</span>
        </div>
      </div>
    </BentoCard>
  )
}
