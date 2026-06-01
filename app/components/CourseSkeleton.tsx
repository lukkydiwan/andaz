'use client'

import { motion } from 'framer-motion'

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      className={`rounded-lg ${className}`}
      style={{ background: 'rgba(255,255,255,0.07)' }}
    />
  )
}

export default function CourseSkeleton() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <article
          key={i}
          className="rounded-2xl p-5 flex flex-col gap-3"
          style={{
            background: '#16161f',
            border: '1px solid rgba(255,255,255,0.06)',
            minHeight: 160,
          }}
        >
          <SkeletonPulse className="w-10 h-10 rounded-xl" />
          <SkeletonPulse className="h-4 w-3/4" />
          <SkeletonPulse className="h-3 w-1/2" />
          <div className="mt-auto space-y-2">
            <SkeletonPulse className="h-3 w-full" />
            <SkeletonPulse className="h-1.5 w-full rounded-full" />
          </div>
        </article>
      ))}
    </>
  )
}
