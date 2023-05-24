import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

/*
  https://wagmi.sh/react/hooks/useContractRead

  Pretty self explanatory, reads the contract and returns the data, error, and isLoading state.
  */

/**
 *
 * @param contract - Contract object containing the address, abi, and chainId of the contract you want to read from.
 * @param functionName - The name of the function you want to read from.
 * @param args - The arguments of the function you want to read from.
 * @callback onSuccess - Callback function when the read is successful.
 * @callback onError - Callback function when the read fails.
 * @returns
 */
export const useRead = <T>(
  contract: { address: `0x${string}`; abi: any; chainId: number },
  functionName: string,
  args?: any[],
  onSuccess?: (data: any) => any,
  onError?: (error: Error) => any
) => {
  const [returnedData, setReturnedData] = useState<T | undefined>(undefined)

  const { data, error, isLoading, refetch } = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    chainId: contract.chainId,
    onSuccess(data) {
      if (onSuccess) onSuccess(data)
    },
    onError(error) {
      if (onError) onError(error)
    },
  })

  useEffect(() => {
    if (data) setReturnedData(data as T)
  }, [data])

  return { data: returnedData, error, isLoading, refetch }
}
