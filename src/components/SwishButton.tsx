import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'

export function SwishButton() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://mpc.getswish.net/qrg-swish/api/v1/prefilled', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        format: 'png',
        payee: {
          value: '0737558100',
          editable: false,
        },
        amount: {
          value: 500,
          editable: false,
        },
        message: {
          value: '10st öl',
          editable: false,
        },
        size: 300,
      }),
    }).then(async (res) => {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setQrCodeUrl(url)
    })
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Betala med Swish</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Betala med Swish</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <img src={qrCodeUrl || ''} alt="Swish QR Code" />
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
