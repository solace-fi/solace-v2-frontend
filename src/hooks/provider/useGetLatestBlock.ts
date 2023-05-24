import { useEffect, useRef, useState } from 'react'
import { BlockData } from '../../constants/types'
import { useBlockNumber } from 'wagmi'

export const useGetLatestBlock = (): BlockData => {
  const [block, setBlock] = useState<bigint | undefined>(undefined)
  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>(
    undefined
  )

  useBlockNumber({
    onBlock(blockNumber) {
      setBlock(blockNumber)
      setBlockTimestamp(Date.now() / 1000)
    },
  })

  return { blockNumber: block, blockTimestamp }
}
