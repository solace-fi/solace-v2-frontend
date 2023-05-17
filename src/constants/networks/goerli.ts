import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { goerli } from 'wagmi/chains'
import { Network } from '../types'

export const Goerli: Network = {
  ...goerli,
  supportedTxTypes: [0, 2],
  isTestnet: true,
  logo: EthereumLogo,
  explorer: {
    name: 'Etherscan',
    key: '',
    url: 'https://etherscan.io',
    apiUrl: 'https://api.etherscan.io',
    excludedContractAddrs: [],
  },
  config: {
    generalContracts: {},
    specialContracts: {},
    generalFeatures: {},
    specialFeatures: {},
  },
}
