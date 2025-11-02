import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tabs')({
  component: TabsPage,
})

function TabsPage() {
  return <div>Hello "/tabs"!</div>
}
