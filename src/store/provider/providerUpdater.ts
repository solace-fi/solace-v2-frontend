import { useGetLatestBlock } from '@/hooks/provider/useGetLatestBlock'
import { useEffect } from 'react'
import { useAppDispatch } from '../_hooks'
import { setLatestBlock } from './providerSlice'

export default function Updater() {
  const dispatch = useAppDispatch()

  const { blockNumber, blockTimestamp } = useGetLatestBlock()

  useEffect(() => {
    if (blockNumber && blockTimestamp) {
      dispatch(
        setLatestBlock({
          number: blockNumber.toString(),
          timestamp: blockTimestamp,
        })
      )
    }
  }, [dispatch, blockNumber, blockTimestamp])

  return null
}
