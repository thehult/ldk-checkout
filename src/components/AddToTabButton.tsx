import { useCart } from '@/hooks/useCart'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { FindTabCombobox } from './FindTab'
import { Label } from './ui/label'

export function AddToTabButton({
  onPaid,
  onCancel,
}: {
  onPaid?: () => void
  onCancel?: () => void
}) {
  const total = useCart((state) => state.total)
  const serializeCart = useCart((state) => state.serialize)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={total <= 0}>Lägg till på nota</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lägg till på nota</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-start justify-center gap-2 pt-2">
          <Label>Nota</Label>
          <FindTabCombobox />
        </div>
        <div className="flex items-center justify-center gap-2"></div>
        <DialogClose asChild>
          <Button type="button" onClick={() => onPaid?.()}>
            Lägg till
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            type="button"
            variant={'outline'}
            onClick={() => onCancel?.()}
          >
            Avbryt
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
