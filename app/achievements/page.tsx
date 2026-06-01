'use client'

import { motion } from 'framer-motion'
import { Award, Flame, Zap, Star, BookOpen, Target, TrendingUp, Clock } from 'lucide-react'
import { BentoCard } from '../components/BentoGrid'

const BADGES = [
  { icon: Flame,     label: 'On Fire',        desc: '10-day streak',          unlocked: true,  color: '#f97316' },
  { icon: BookOpen,  label: 'Bookworm',        desc: 'Complete 3 courses',     unlocked: true,  color: '#3b82f6' },
  { icon: Star,      label: 'Star Student',    desc: 'Score 100% on a quiz',   unlocked: true,  color: '#f59e0b' },
  { icon: Zap,       label: 'Speed Learner',   desc: 'Finish a module in 1hr', unlocked: true,  color: '#a78bfa' },
  { icon: Target,    label: 'Goal Crusher',    desc: 'Hit all weekly goals',   unlocked: false, color: '#10b981' },
  { icon: TrendingUp,label: 'Rising Star',     desc: 'Top 10% this month',     unlocked: false, color: '#06b6d4' },
  { icon: Clock,     label: 'Night Owl',       desc: 'Study after midnight',   unlocked: false, color: '#8b5cf6' },
  { icon: Award,     label: 'Completionist',   desc: 'Finish all courses',     unlocked: false, color: '#ec4899' },
]

export default function AchievementsPage() {
  return (
    <section className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
        >
          <Award size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Achievements</h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            {BADGES.filter(b => b.unlocked).length} of {BADGES.length} badges unlocked
          </p>
        </div>
      </div>

      {/* XP bar */}
      <div
        className="rounded-2xl p-5"
        style={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-white">Level 7 — Apprentice</span>
          <span className="text-xs" style={{ color: '#a78bfa' }}>2,340 / 3,000 XP</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #7c3aed, #f59e0b)' }}
          />
        </div>
        <p className="text-xs mt-2" style={{ color: '#6b7280' }}>660 XP to Level 8</p>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BADGES.map((badge, i) => {
          const Icon = badge.icon
          return (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.04, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center"
              style={{
                background: '#16161f',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: badge.unlocked ? 1 : 0.4,
                willChange: 'transform',
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: badge.unlocked
                    ? `rgba(${hexToRgb(badge.color)}, 0.2)`
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${badge.unlocked ? badge.color + '44' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <Icon size={20} style={{ color: badge.unlocked ? badge.color : '#4b5563' }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{badge.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{badge.desc}</p>
              </div>
              {badge.unlocked && (
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.3)' }}
                >
                  Unlocked
                </span>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}
