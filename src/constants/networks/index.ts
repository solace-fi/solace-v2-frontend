import { Aurora } from './aurora'
import { Fantom } from './fantom'
import { Goerli } from './goerli'
import { Mainnet } from './mainnet'
import { Polygon } from './polygon'

export * from './goerli'
export * from './mainnet'
export * from './aurora'
export * from './fantom'
export * from './polygon'

export const NETWORKS = [Mainnet, Polygon, Aurora, Fantom, Goerli]
