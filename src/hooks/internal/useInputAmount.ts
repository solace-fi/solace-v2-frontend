import { useState, useCallback } from 'react'
import { POW_NINE } from '../../constants'
import { fixed, filterAmount, formatAmount } from '../../utils'
import { formatUnits, parseUnits } from 'viem'
import { useFeeData, useNetwork } from 'wagmi'

export const useInputAmount = () => {
  const [amount, setAmount] = useState<string>('')
  const [maxSelected, setMaxSelected] = useState<boolean>(false)

  const { data: gasData } = useFeeData()
  const { chain } = useNetwork()

  const isAppropriateAmount = useCallback(
    (amount: string, amountDecimals: number, assetBalance: bigint): boolean => {
      const bigIntAmount = parseUnits(amount as `${number}`, amountDecimals)
      if (!amount || amount == '.' || bigIntAmount <= BigInt(0)) return false
      return assetBalance >= bigIntAmount
    },
    []
  )

  const calculateMaxAmount = useCallback(
    (balance: bigint, amountDecimals: number, gasLimit?: number) => {
      const bal = formatUnits(balance, amountDecimals)
      if (!gasLimit || !gasData || !gasData.gasPrice) return bal
      // if currency to send is also for paying gas, subtract gas from amount to send
      const gasInCurrency = (gasLimit / POW_NINE) * Number(gasData.gasPrice)
      return Math.max(fixed(fixed(bal, 6) - fixed(gasInCurrency, 6), 6), 0)
    },
    [gasData]
  )

  const handleInputChange = useCallback(
    (input: string, maxDecimals?: number, maxBalance?: string) => {
      const filtered = filterAmount(input)
      const formatted = formatAmount(filtered)
      if (
        filtered.includes('.') &&
        filtered.split('.')[1]?.length >
          (maxDecimals ?? chain?.nativeCurrency.decimals ?? 18)
      )
        return
      if (
        maxBalance &&
        parseUnits(`${Number(formatted)}`, maxDecimals ?? 18) >
          parseUnits(`${Number(maxBalance)}`, maxDecimals ?? 18)
      )
        return
      setAmount(filtered)
      setMaxSelected(false)
    },
    [amount, chain?.nativeCurrency.decimals]
  )

  const setMax = useCallback(
    (balance: bigint, balanceDecimals: number, gasLimit?: number) => {
      const calculatedMaxAmount = calculateMaxAmount(
        balance,
        balanceDecimals,
        gasLimit
      )
      setAmount(calculatedMaxAmount.toString())
      setMaxSelected(true)
    },
    [calculateMaxAmount]
  )

  const resetAmount = useCallback(() => {
    setAmount('')
    setMaxSelected(false)
  }, [])

  return {
    amount,
    maxSelected,
    isAppropriateAmount,
    handleInputChange,
    setMax,
    resetAmount,
  }
}
