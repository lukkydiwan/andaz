'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BentoCardProps {
  children: ReactNode
  className?: string
  index?: number
  style?: React.CSSProperties
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  }),
}

export function BentoCard({ children, className = '', index = 0, style }: BentoCardProps) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.015,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: '#16161f',
        border: '1px solid rgba(255,255,255,0.06)',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          borderRadius: 'inherit',
        }}
      />
      {/* Hover glow border */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 rounded-2xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(59,130,246,0.08), rgba(6,182,212,0.06))',
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </motion.article>
  )
}

interface BentoGridProps {
  children: ReactNode
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <section
      className="grid gap-4 p-4 md:p-6"
      style={{
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gridAutoRows: 'auto',
      }}
    >
      {children}
    </section>
  )
}
