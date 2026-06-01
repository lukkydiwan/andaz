'use client'

import { Clock, Target, TrendingUp } from 'lucide-react'
import { BentoCard } from './BentoGrid'

const STATS = [
  { icon: Clock, label: 'Hours this week', value: '14.5', unit: 'hrs', color: '#3b82f6' },
  { icon: Target, label: 'Goals completed', value: '8', unit: '/10', color: '#10b981' },
  { icon: TrendingUp, label: 'XP earned', value: '2,340', unit: 'xp', color: '#f59e0b' },
]

export default function StatsRow({ startIndex }: { startIndex: number }) {
  return (
    <>
      {STATS.map((stat, i) => {
        const Icon = stat.icon
        return (
          <BentoCard key={stat.label} index={startIndex + i} style={{ minHeight: 110 }}>
            <div className="p-5 flex flex-col gap-2 h-full">
              <div className="flex items-center gap-2">
                <Icon size={14} style={{ color: stat.color }} />
                <span className="text-xs" style={{ color: '#6b7280' }}>{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-1 mt-auto">
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-sm" style={{ color: stat.color }}>{stat.unit}</span>
              </div>
            </div>
          </BentoCard>
        )
      })}
    </>
  )
}
