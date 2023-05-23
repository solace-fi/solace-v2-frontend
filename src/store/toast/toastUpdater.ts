import { useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'

export default function Updater() {
  const lastAccount = useRef<string>('')
  const { address: account } = useAccount()

  // Removes toasts from display on chainId or account change
  useEffect(() => {
    // if this is the first account, meaning the account went from undefined to valid, do
    // not dismiss toasts
    if (!account || !lastAccount.current) return
    lastAccount.current = account
    toast.dismiss()
  }, [account])

  return null
}
