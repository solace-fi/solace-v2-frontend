/*
    https://www.educative.io/answers/type-0-vs-type-2-ethereum-transactions
    https://wagmi.sh/react/hooks/useFeeData

*/

import { GasConfiguration } from '@/constants/types'
import { useAppSelector } from '@/store/_hooks'
import { useEffect, useState } from 'react'
import { useFeeData, useNetwork } from 'wagmi'

/**
 *
 * @param use Return the gas configuration if true, and empty configuration if false.
 * @param txType 0 for legacy transactions, 2 for EIP-1559 transactions.
 * @returns
 */
export const useGas = (use?: boolean, txType?: 0 | 2) => {
  const defaultLocalChain = useAppSelector(
    (state) => state.general.defaultLocalChain
  )
  const { chain } = useNetwork()

  const { data, isError, isLoading } = useFeeData({
    chainId: chain?.id ?? defaultLocalChain.chainId,
  })
  const [gasConfig, setGasConfig] = useState<GasConfiguration>({})

  useEffect(() => {
    if (!data) return
    if (!use) {
      setGasConfig({})
      return
    }
    if (txType === 0 && data.gasPrice) {
      setGasConfig({
        gasPrice: data.gasPrice,
      })
    } else if (data.maxFeePerGas && data.maxPriorityFeePerGas) {
      setGasConfig({
        maxFeePerGas: data.maxFeePerGas,
        maxPriorityFeePerGas: data.maxPriorityFeePerGas,
      })
    }
  }, [data, use, txType])

  return { gasConfig, isError, isLoading }
}
