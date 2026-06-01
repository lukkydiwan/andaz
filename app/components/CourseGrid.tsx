import { getCourses } from '../lib/supabase'
import { Course } from '../types'
import CourseCard from './CourseCard'

export default async function CourseGrid({ startIndex }: { startIndex: number }) {
  let courses: Course[] = []
  let error: string | null = null

  try {
    courses = await getCourses()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load courses'
  }

  if (error) {
    return (
      <article
        className="col-span-full rounded-2xl p-6 flex items-center gap-3"
        style={{
          background: 'rgba(239,68,68,0.08)',
          border: '1px solid rgba(239,68,68,0.2)',
        }}
      >
        <span className="text-red-400 text-sm">
          ⚠ Could not load courses: {error}
        </span>
      </article>
    )
  }

  if (!courses.length) {
    return (
      <article
        className="col-span-full rounded-2xl p-6 text-center"
        style={{ background: '#16161f', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p className="text-sm" style={{ color: '#6b7280' }}>No courses found. Add some in Supabase!</p>
      </article>
    )
  }

  return (
    <>
      {courses.map((course, i) => (
        <CourseCard
          key={course.id}
          course={course}
          index={startIndex + i}
          gradientIndex={i}
        />
      ))}
    </>
  )
}
