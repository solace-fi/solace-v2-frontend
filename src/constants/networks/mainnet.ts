import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { mainnet } from 'wagmi/chains'
import { Network } from '../types'

export const Mainnet: Network = {
  ...mainnet,
  isTestnet: false,
  supportedTxTypes: [0, 2],
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
