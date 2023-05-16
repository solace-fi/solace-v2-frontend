import { useEffect, useRef, useState } from 'react'
import { BlockData } from '../../constants/types'
import { useBlockNumber } from 'wagmi'

export const useGetLatestBlock = (): BlockData => {
  const [blockNumber, setBlockNumber] = useState<bigint | undefined>(undefined)
  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>(
    undefined
  )

  useBlockNumber({
    watch: true,
    onBlock(blockNumber) {
      setBlockNumber(blockNumber)
      setBlockTimestamp(Date.now() / 1000)
    },
  })

  return { blockNumber, blockTimestamp }
}
