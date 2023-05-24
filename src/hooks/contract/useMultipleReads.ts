import {
  paginatedIndexesConfig,
  useContractInfiniteReads,
  useContractReads,
} from 'wagmi'

// https://wagmi.sh/react/hooks/useContractInfiniteReads

/*
  TODO Polish and research more, I'm honestly not that confident in this hook so maybe not use it so much for now
  getNextPageParam appears to increment the value by 1 each time before calling the contract functions again
*/

/**
 * EXPERIMENTAL - Ideal for calling multiple different contract functions with the same argument
 * @param contracts - An array of contract objects that contain the address, abi, functionName, and chainId of the contract you want to call
 * @param value - The value that is passed as the argument to the contract functions, typed as a number for now since number types are iterable objects
 * @param uniqueCacheKey - A unique string that is used to cache the data that is fetched, batch by batch
 * @returns
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

/**
 *
 * @param contract - The contract object that contains the address, abi, functionName, and chainId of the contract you want to call
 * @param startIndex - The initial value that is passed as the argument to the contract function on first iteration
 * @param itemsPerPage - How many items are fetched per call
 * @param uniqueCacheKey - A unique string that is used to cache the data that is fetched
 * @returns
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
  Ideal for calling MULTIPLE POTENTIALLY DIFFERENT contract functions with DIFFERENT arguments

  https://wagmi.sh/react/hooks/useContractReads
*/

/**
 *
 * @param contracts - An array of contract objects that contain the address, abi, functionName, chainId, and args of the contract you want to call
 * @returns
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
