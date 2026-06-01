'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Bell, Moon, Globe, Shield, User } from 'lucide-react'

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <button
      onClick={() => setOn(!on)}
      className="relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0"
      style={{ background: on ? '#7c3aed' : 'rgba(255,255,255,0.1)' }}
    >
      <motion.div
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white"
      />
    </button>
  )
}

type SettingRow =
  | { label: string; type: 'text'; value: string }
  | { label: string; type: 'toggle'; on: boolean }

const SECTIONS: { icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; title: string; color: string; rows: SettingRow[] }[] = [
  {
    icon: User,
    title: 'Profile',
    color: '#7c3aed',
    rows: [
      { label: 'Display Name', type: 'text', value: 'Alex Johnson' },
      { label: 'Email', type: 'text', value: 'alex@example.com' },
      { label: 'Bio', type: 'text', value: 'Lifelong learner' },
    ],
  },
  {
    icon: Bell,
    title: 'Notifications',
    color: '#3b82f6',
    rows: [
      { label: 'Daily reminders', type: 'toggle', on: true },
      { label: 'Streak alerts', type: 'toggle', on: true },
      { label: 'New course announcements', type: 'toggle', on: false },
      { label: 'Weekly summary email', type: 'toggle', on: true },
    ],
  },
  {
    icon: Moon,
    title: 'Appearance',
    color: '#a78bfa',
    rows: [
      { label: 'Dark mode (always on)', type: 'toggle', on: true },
      { label: 'Reduce animations', type: 'toggle', on: false },
      { label: 'Compact layout', type: 'toggle', on: false },
    ],
  },
  {
    icon: Shield,
    title: 'Privacy',
    color: '#10b981',
    rows: [
      { label: 'Public profile', type: 'toggle', on: false },
      { label: 'Show streak on leaderboard', type: 'toggle', on: true },
    ],
  },
]

export default function SettingsPage() {
  return (
    <section className="p-4 md:p-6 space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6b7280, #4b5563)' }}
        >
          <Settings size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>Manage your account preferences</p>
        </div>
      </div>

      {SECTIONS.map((section, si) => {
        const Icon = section.icon
        return (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.08, type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-2xl overflow-hidden"
            style={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Section header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <Icon size={15} style={{ color: section.color }} />
              <span className="text-sm font-semibold text-white">{section.title}</span>
            </div>

            {/* Rows */}
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
              {section.rows.map((row, ri) => (
                <div key={ri} className="flex items-center justify-between px-5 py-3.5 gap-4">
                  <span className="text-sm" style={{ color: '#d1d5db' }}>{row.label}</span>
                  {row.type === 'toggle' ? (
                    <Toggle defaultOn={row.on} />
                  ) : (
                    <span className="text-sm" style={{ color: '#6b7280' }}>{row.value}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </section>
  )
}
