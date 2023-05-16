import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { polygon } from 'wagmi/chains'

export const Polygon = {
  ...polygon,
  logo: EthereumLogo,
  contracts: {
    ...polygon.contracts,
  },
}
