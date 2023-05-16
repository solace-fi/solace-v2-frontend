import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { mainnet } from 'wagmi/chains'

export const Mainnet = {
  ...mainnet,
  logo: EthereumLogo,
  contracts: {
    ...mainnet.contracts,
  },
}
