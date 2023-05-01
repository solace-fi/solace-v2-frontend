import { setSelectedProvider } from '@/store/general/generalSlice'
import { useAppSelector, useAppDispatch } from '@/store/_hooks'
import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'

export default function App() {
  const selectedProvider = useAppSelector(
    (state) => state.general.selectedProvider
  )
  const minute = useAppSelector((state) => state.general.minute)
  const block = useAppSelector((state) => state.provider.latestBlock)
  const { chainId, account } = useWeb3React()

  return (
    <div>
      <h1>{selectedProvider?.toString()}</h1>
      <h1>{minute}</h1>
      <h1>{block.number}</h1>
      <h1>{chainId}</h1>
      <h1>{account}</h1>
      <Link href={'/dashboard'}>
        <h3>See dashboard</h3>
      </Link>
      <Link href={'/pools'}>
        <h3>See Pools</h3>
      </Link>
    </div>
  )
}
