import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { goerli } from 'wagmi/chains'

export const Goerli = {
  ...goerli,
  logo: EthereumLogo,
  contracts: {
    ...goerli.contracts,
  },
}
