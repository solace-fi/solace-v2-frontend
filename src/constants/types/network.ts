import { Chain } from 'viem'
import { ContractSources } from '.'

export type Network = Chain & {
  supportedTxTypes: number[]
  logo: string
  isTestnet: boolean
  explorer: {
    name: string
    key: string
    url: string
    apiUrl: string
    excludedContractAddrs: string[]
  }
  config: {
    generalContracts: { [key: string]: ContractSources }
    specialContracts: { [key: string]: ContractSources }
    generalFeatures: { [key: string]: boolean }
    specialFeatures: { [key: string]: boolean }
  }
}
