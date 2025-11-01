import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useSwishQrCode } from '@/hooks/useSwishQrCode'
import { useState } from 'react'

export function SwishButton({
  amount,
  message = '',
}: {
  amount: number
  message?: string
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
        <Button variant="outline" onClick={handlePay}>
          Betala med Swish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Betala med Swish</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center gap-2">
          {gettingQrCode && <p>Hämtar QR-kod, vänta...</p>}
          {!gettingQrCode && qrCodeUrl && (
            <img src={qrCodeUrl || ''} alt="Swish QR Code" />
          )}
          {!gettingQrCode && qrError && <p>{qrError.message}</p>}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
