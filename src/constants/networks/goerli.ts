import { goerli } from 'wagmi/chains'
import { Network } from '../types'

export const Goerli: Network = {
  ...goerli,
  local: {
    name: 'Goerli',
    chainId: 5,
    supportedTxTypes: [0, 2],
    isTestnet: true,
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
