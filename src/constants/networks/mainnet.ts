import { mainnet } from 'wagmi/chains'
import { Network } from '../types'

export const Mainnet: Network = {
  ...mainnet,
  local: {
    name: 'Ethereum',
    chainId: 1,
    isTestnet: false,
    supportedTxTypes: [0, 2],
    logo: '/assets/svg/networks/ethereum-logo.svg',
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
  },
}
