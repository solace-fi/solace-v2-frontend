import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { aurora } from 'wagmi/chains'

export const Aurora = {
  ...aurora,
  logo: EthereumLogo,
  contracts: {},
}
