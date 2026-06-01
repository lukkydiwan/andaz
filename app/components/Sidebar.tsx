'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Award,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'courses',   label: 'Courses',   icon: BookOpen,        href: '/courses' },
  { id: 'progress',  label: 'Progress',  icon: BarChart2,       href: '/progress' },
  { id: 'achievements', label: 'Achievements', icon: Award,     href: '/achievements' },
  { id: 'settings',  label: 'Settings',  icon: Settings,        href: '/settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col h-screen sticky top-0 shrink-0 overflow-hidden z-40"
        style={{
          background: 'linear-gradient(180deg, #111118 0%, #0d0d14 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 min-h-[68px]">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          >
            <GraduationCap size={18} className="text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="font-semibold text-sm text-white whitespace-nowrap"
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
                style={{ color: active ? '#f1f0ff' : '#6b7280' }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(124,58,237,0.18)',
                      border: '1px solid rgba(124,58,237,0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className="shrink-0 relative z-10" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-2 rounded-xl transition-colors hover:bg-white/5"
            style={{ color: '#6b7280' }}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </motion.aside>

      {/* ── Tablet Sidebar — icons only ── */}
      <aside
        className="hidden md:flex lg:hidden flex-col h-screen sticky top-0 w-[72px] shrink-0 z-40"
        style={{
          background: 'linear-gradient(180deg, #111118 0%, #0d0d14 100%)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center justify-center py-5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
          >
            <GraduationCap size={18} className="text-white" />
          </div>
        </div>
        <nav className="flex-1 px-2 py-2 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.id}
                href={item.href}
                className="relative w-full flex items-center justify-center p-3 rounded-xl"
                style={{ color: active ? '#f1f0ff' : '#6b7280' }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active-tablet"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(124,58,237,0.18)',
                      border: '1px solid rgba(124,58,237,0.3)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className="relative z-10" />
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* ── Mobile Bottom Bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
        style={{
          background: 'rgba(17,17,24,0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              className="relative flex flex-col items-center gap-1 p-2 rounded-xl"
              style={{ color: active ? '#a78bfa' : '#6b7280' }}
            >
              {active && (
                <motion.div
                  layoutId="bottom-nav-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'rgba(124,58,237,0.15)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} className="relative z-10" />
              <span className="text-[10px] relative z-10">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
