import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import React from 'react'
import { Button } from './ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer'
import { useIsMobile } from '@/hooks/use-mobile'
import { Label } from './ui/label'

interface Tab {
  id: string
  label: string
}

const tabs: Tab[] = [
  {
    id: '123',
    label: 'Tobias',
  },
  {
    id: '345',
    label: 'Hult',
  },
  {
    id: '456',
    label: 'Hultqvist',
  },
  {
    id: '456123',
    label: 'Hult qvist',
  },
  {
    id: '679',
    label: 'Hammarn',
  },
]

export function FindTabCombobox() {
  const [open, setOpen] = React.useState(false)
  const isMobile = useIsMobile()
  const [selectedTab, setSelectedTab] = React.useState<Tab | null>(null)
  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {selectedTab ? <>{selectedTab.label}</> : <>Välj nota...</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="center"
          sideOffset={0}
        >
          <FindTabCommand setOpen={setOpen} setSelectedTab={setSelectedTab} />
        </PopoverContent>
      </Popover>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          {selectedTab ? <>{selectedTab.label}</> : <>Välj nota...</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <FindTabCommand setOpen={setOpen} setSelectedTab={setSelectedTab} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
function FindTabCommand({
  setOpen,
  setSelectedTab,
}: {
  setOpen: (open: boolean) => void
  setSelectedTab: (tab: Tab | null) => void
}) {
  const [currentSearch, setCurrentSearch] = React.useState('')

  return (
    <Command>
      <CommandInput
        placeholder="Hitta tab..."
        value={currentSearch}
        onValueChange={setCurrentSearch}
        onSubmit={() => console.log('Test?')}
      />
      <CommandList>
        <CommandGroup>
          {tabs.map((tab) => (
            <CommandItem
              key={tab.id}
              id={tab.id}
              onSelect={(value) => {
                console.log('Selected tab:', value)
                setSelectedTab(
                  tabs.find((priority) => priority.id === tab.id) || null,
                )
                setOpen(false)
              }}
            >
              {tab.label}
            </CommandItem>
          ))}
          {currentSearch.length > 0 && (
            <CommandItem
              id="ny"
              onSelect={(value) => {
                console.log('Creating new tab:', currentSearch)
                setSelectedTab({
                  id: null!,
                  label: currentSearch,
                })
                setOpen(false)
              }}
              className="italic"
            >
              Skapa ny: "{currentSearch}"
            </CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
