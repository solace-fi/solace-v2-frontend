import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'

export const useRead = <T>(
  contract: { address: `0x${string}`; abi: any; chainId: number },
  functionName: string,
  args?: any[],
  onSuccess?: (data: any) => any,
  onError?: (error: Error) => any
) => {
  const [returnedData, setReturnedData] = useState<T | undefined>(undefined)

  /*
  https://wagmi.sh/react/hooks/useContractRead
  */
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
