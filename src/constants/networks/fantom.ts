import EthereumLogo from '../../assets/svg/networks/ethereum-logo.svg'
import { fantom } from 'wagmi/chains'
import { Network } from '../types'

export const Fantom: Network = {
  ...fantom,
  supportedTxTypes: [0, 2],
  isTestnet: false,
  logo: EthereumLogo,
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
}
