export {}

// IN DEVELOPMENT

// import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

// export const useBatchRead = (
//   contracts: {
//     address: `0x${string}`
//     abi: any[]
//     functionName: string
//     chainId: number
//   }[],
//   value: any[],
//   uniqueCacheKey: string
// ) => {
//   const { data, fetchNextPage } = useContractInfiniteReads({
//     cacheKey: uniqueCacheKey,
//     contracts(param = 0) {
//       const args = [param] as const
//       return contracts.map((contract) => ({
//         ...contract,
//         args,
//       }))
//     },
//     getNextPageParam: (_, pages) => pages.length + 1,
//   })

//   return { data, fetchNextPage }
// }

// export const usePaginatedRead = (
//   contract: {
//     address: `0x${string}`
//     abi: any[]
//     functionName: string
//     chainId: number
//   },
//   uniqueCacheKey: string,
//   startIndex: number,
//   itemsPerPage: number
// ) => {
//   const { data, fetchNextPage } = useContractInfiniteReads({
//     cacheKey: uniqueCacheKey,
//     ...paginatedIndexesConfig(
//       (index) => {
//         return [
//           {
//             ...contract,
//             args: [index] as {}[],
//           },
//         ]
//       },
//       { start: startIndex, perPage: itemsPerPage, direction: 'increment' }
//     ),
//   })

//   return { data, fetchNextPage }
// }
