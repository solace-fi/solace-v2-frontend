// export {}

import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

/*
  TODO Polish and research more 
  Ideal for calling multiple different contract functions with the same arguments
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
  Ideal for calling a single contract function multiple times with a single argument that is incremented by 1 after each call

*/

export const usePaginatedRead = (
  contract: {
    address: `0x${string}`
    abi: any[]
    functionName: string
    chainId: number
  },
  uniqueCacheKey: string,
  startIndex: number,
  itemsPerPage: number
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
