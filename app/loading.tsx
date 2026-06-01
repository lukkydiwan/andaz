import CourseSkeleton from './components/CourseSkeleton'

export default function Loading() {
  return (
    <section
      className="grid gap-4 p-4 md:p-6"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
    >
      <CourseSkeleton />
    </section>
  )
}
