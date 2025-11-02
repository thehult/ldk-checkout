import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSwishQrCode } from '@/hooks/useSwishQrCode'
import { useState } from 'react'
import { Spinner } from './ui/spinner'

export function SwishButton({
  amount,
  message = '',
  onPaid,
  onCancel,
}: {
  amount: number
  message?: string
  onPaid?: () => void
  onCancel?: () => void
}) {
  const [getQrCode, gettingQrCode, qrError] = useSwishQrCode()
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  async function handlePay() {
    const qrCodeUrl = await getQrCode(amount, message)
    setQrCodeUrl(qrCodeUrl)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handlePay} disabled={amount <= 0}>
          Betala med Swish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Betala med Swish</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2">
          {gettingQrCode && <Spinner className="size-8 text-primary" />}
          {!gettingQrCode && qrCodeUrl && (
            <img src={qrCodeUrl || ''} alt="Swish QR Code" />
          )}
          {!gettingQrCode && qrError && <p>{qrError.message}</p>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-lg">{amount} kr</span>
        </div>
        <DialogClose asChild>
          <Button type="button" onClick={() => onPaid?.()}>
            Betalat!
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
