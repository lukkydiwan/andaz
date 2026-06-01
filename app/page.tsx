export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import HeroTile from './components/HeroTile'
import ActivityTile from './components/ActivityTile'
import StatsRow from './components/StatsRow'
import CourseGrid from './components/CourseGrid'
import CourseSkeleton from './components/CourseSkeleton'

export default function DashboardPage() {
  return (
    <section
      className="grid gap-4 p-4 md:p-6"
      style={{
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}
    >
      {/* Hero — spans full width */}
      <div className="col-span-3 md:col-span-2">
        <HeroTile index={0} />
      </div>

      {/* Stats — 3 across or stacked */}
      <StatsRow startIndex={1} />

      {/* Courses section header */}
      <div className="col-span-3 px-1 pt-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#6b7280' }}>
          Active Courses
        </h2>
      </div>

      {/* Course cards — server component with Suspense */}
      <Suspense fallback={<CourseSkeleton />}>
        <CourseGrid startIndex={5} />
      </Suspense>

      {/* Activity chart — spans full width */}
      <div className="col-span-3">
        <ActivityTile index={10} />
      </div>
    </section>
  )
}
