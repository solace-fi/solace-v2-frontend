import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { fantom } from 'wagmi/chains'

export const Fantom = {
  ...fantom,
  logo: EthereumLogo,
  contracts: {
    ...fantom.contracts,
  },
}
