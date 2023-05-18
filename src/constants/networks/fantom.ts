import { fantom } from 'wagmi/chains'
import { Network } from '../types'

export const Fantom: Network = {
  ...fantom,
  local: {
    name: 'Fantom',
    chainId: 250,
    supportedTxTypes: [0, 2],
    isTestnet: false,
    logo: '/assets/svg/networks/ethereum-logo.svg',
    explorer: {
      name: 'FTMScan',
      key: '',
      url: 'https://ftmscan.com',
      apiUrl: 'https://api.ftmscan.com',
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
