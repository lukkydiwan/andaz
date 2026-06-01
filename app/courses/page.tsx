export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import CourseGrid from '../components/CourseGrid'
import CourseSkeleton from '../components/CourseSkeleton'
import { BentoCard } from '../components/BentoGrid'
import { BookOpen } from 'lucide-react'

export default function CoursesPage() {
  return (
    <section className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pt-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}
        >
          <BookOpen size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">My Courses</h1>
          <p className="text-sm" style={{ color: '#6b7280' }}>Track your active enrollments</p>
        </div>
      </div>

      {/* Course grid */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
      >
        <Suspense fallback={<CourseSkeleton />}>
          <CourseGrid startIndex={0} />
        </Suspense>
      </div>
    </section>
  )
}
