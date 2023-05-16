import { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch } from '../_hooks'
import { useAccount } from 'wagmi'
import { toast } from 'react-toastify'
import { TransactionCondition, Error } from '../../constants/enums'
import { ErrorData } from '../../constants/types'
import { setErrors } from './toastSlice'
import { useAppSelector } from '@/store/_hooks'
import { useToast } from '@/hooks/useToast'
import { appError } from '@/constants'

export default function Updater() {
  const dispatch = useAppDispatch()
  const lastAccount = useRef<string>('')
  const { address: account } = useAccount()

  const { makeAppToast } = useToast()

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
