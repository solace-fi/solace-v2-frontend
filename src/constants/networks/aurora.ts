import { aurora } from 'wagmi/chains'
import { Network } from '../types'

export const Aurora: Network = {
  ...aurora,
  supportedTxTypes: [0, 2],
  logo: '/assets/svg/networks/ethereum-logo.svg',
  isTestnet: false,
  explorer: {
    name: 'Aurorascan',
    key: '',
    url: 'https://explorer.aurora.dev/',
    apiUrl: 'https://explorer.mainnet.aurora.dev/api',
    excludedContractAddrs: [],
  },
  config: {
    generalContracts: {},
    specialContracts: {},
    generalFeatures: {},
    specialFeatures: {},
  },
}
