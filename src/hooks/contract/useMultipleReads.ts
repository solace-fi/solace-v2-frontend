// export {}

import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractReads,
} from 'wagmi'

// https://wagmi.sh/react/hooks/useContractInfiniteReads

/*
  TODO Polish and research more, I'm honestly not that confident in this hook so maybe not use it so much for now

  Ideal for calling MULTIPLE DIFFERENT contract functions with the SAME arguments
  getNextPageParam appears to increment the value by 1 each time before calling the contract functions again
  The uniqueCachekey is used to cache all the data that it fetches, batch by batch
*/
export const useBatchRead = (
  contracts: {
    address: `0x${string}`
    abi: any[]
    functionName: string
    chainId: number
  }[],
  value: number,
  uniqueCacheKey: string
) => {
  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: uniqueCacheKey,
    contracts(param = value) {
      const args = [param] as const
      return contracts.map((contract) => ({
        ...contract,
        args,
      }))
    },
    getNextPageParam: (_, pages) => pages.length + value,
  })

  return { data, fetchNextPage }
}

/*
  Slightly more polished and predictable than useBatchRead
  Ideal for calling a SINGLE contract function multiple times with a SINGLE argument that is incremented by 1 after each call
*/

export const usePaginatedRead = (
  contract: {
    address: `0x${string}`
    abi: any[]
    functionName: string
    chainId: number
  },
  startIndex: number,
  itemsPerPage: number,
  uniqueCacheKey: string
) => {
  const { data, fetchNextPage } = useContractInfiniteReads({
    cacheKey: uniqueCacheKey,
    ...paginatedIndexesConfig(
      (index) => {
        return [
          {
            ...contract,
            args: [index] as {}[],
          },
        ]
      },
      { start: startIndex, perPage: itemsPerPage, direction: 'increment' }
    ),
  })

  return { data, fetchNextPage }
}

/*
  Ideal for calling MULTIPLE DIFFERENT contract functions with DIFFERENT arguments

  https://wagmi.sh/react/hooks/useContractReads
*/

export const useMulticallRead = (
  contracts: {
    address: `0x${string}`
    abi: any[]
    functionName: string
    chainId: number
    args: any[]
  }[]
) => {
  const { data, isError, isLoading } = useContractReads({ contracts })

  return { data, isError, isLoading }
}
