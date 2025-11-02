import firebaseApp from '@/firebaseApp'
import { getFunctions } from 'firebase/functions'
import { useEffect } from 'react'
import { useHttpsCallable } from 'react-firebase-hooks/functions'

export const useSwishQrCode = (): [
  (amount: number, message: string) => Promise<string>,
  boolean,
  Error | undefined,
] => {
  const [executeCallable, executing, error] = useHttpsCallable(
    getFunctions(firebaseApp),
    'getSwishQrCode',
  )

  useEffect(() => {
    if (error) console.error('Swish QR Code Error:', error)
  }, [error])

  const getQrCode = async (amount: number, message: string = '') => {
    console.log('Requesting Swish QR Code for amount:', amount)
    const result = await executeCallable({
      amount,
      message,
    })
    console.log('Swish QR Code Result:', result)
    if (!result?.data) throw new Error('No QR code data received from function')
    return result.data as string
    // var image = result.data as Blob
    // console.log('Swish QR Code Image:', image)
    // return URL.createObjectURL(image)
  }
  return [getQrCode, executing, error]
}
