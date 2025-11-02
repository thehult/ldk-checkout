import { createFileRoute } from '@tanstack/react-router'
import { MenuList } from '@/components/MenuList'
import { FindTabCombobox } from '@/components/FindTab'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <MenuList />
    </div>
  )
}
