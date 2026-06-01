'use client'

import { motion } from 'framer-motion'
import { Flame, Zap } from 'lucide-react'
import { BentoCard } from './BentoGrid'

const STREAK = 12

export default function HeroTile({ index }: { index: number }) {
  return (
    <BentoCard
      index={index}
      className="col-span-full md:col-span-2"
      style={{ minHeight: 180 }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(59,130,246,0.12) 50%, transparent 100%)',
        }}
      />
      {/* Glowing orb */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'rgba(124,58,237,0.25)' }}
      />

      <div className="relative p-6 flex flex-col gap-3 h-full justify-between">
        <div>
          <p className="text-sm font-medium mb-1" style={{ color: '#a78bfa' }}>
            Welcome back
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Alex Johnson ✦
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#6b7280' }}>
            You&apos;re on a roll — keep pushing your limits today.
          </p>
        </div>

        {/* Streak badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-2 w-fit px-4 py-2 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(251,146,60,0.2), rgba(239,68,68,0.15))',
            border: '1px solid rgba(251,146,60,0.3)',
          }}
        >
          <Flame size={16} className="text-orange-400" />
          <span className="text-sm font-semibold text-orange-300">
            {STREAK} day streak
          </span>
          <Zap size={14} className="text-yellow-400" />
        </motion.div>
      </div>
    </BentoCard>
  )
}
