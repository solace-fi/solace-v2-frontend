import { TransactionCondition, Error } from '../enums'

export type BlockData = { blockNumber?: bigint; blockTimestamp?: number }

export type LocalTx = {
  hash: any
  type: string
  status: TransactionCondition
}

export type ErrorData = {
  type: Error
  metadata: string
  uniqueId: string
}

export type WindowDimensions = {
  width: number
  height: number
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
}

export type CheckboxData = { id: string; checked: boolean }

export type RouteInfo = {
  name: string
  title: string
  to: string
}
