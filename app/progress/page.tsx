export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import CourseGrid from '../components/CourseGrid'
import CourseSkeleton from '../components/CourseSkeleton'
import { BentoCard } from '../components/BentoGrid'
import ActivityTile from '../components/ActivityTile'
import { BarChart2 } from 'lucide-react'

const MILESTONES = [
  { label: 'First course started', done: true, date: 'Jan 12' },
  { label: '5-day streak achieved', done: true, date: 'Jan 18' },
  { label: 'First course completed', done: true, date: 'Feb 3' },
  { label: '10-day streak', done: true, date: 'Feb 14' },
  { label: 'Complete 4 courses', done: false, date: null },
  { label: '30-day streak', done: false, date: null },
]

export default function ProgressPage() {
  return (
    <section className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}
        >
          <BarChart2 size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Progress</h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>Your learning journey at a glance</p>
        </div>
      </div>

      {/* Activity chart */}
      <div>
        <ActivityTile index={0} />
      </div>

      {/* Course progress */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>
          Course Progress
        </h2>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          <Suspense fallback={<CourseSkeleton />}>
            <CourseGrid startIndex={1} />
          </Suspense>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#6b7280' }}>
          Milestones
        </h2>
        <div className="space-y-2">
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: '#16161f',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: m.done ? 1 : 0.5,
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs"
                style={{
                  background: m.done ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${m.done ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  color: m.done ? '#a78bfa' : '#6b7280',
                }}
              >
                {m.done ? '✓' : ''}
              </div>
              <span className="text-sm flex-1" style={{ color: m.done ? '#f1f0ff' : '#6b7280' }}>
                {m.label}
              </span>
              {m.date && (
                <span className="text-xs" style={{ color: '#6b7280' }}>{m.date}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
