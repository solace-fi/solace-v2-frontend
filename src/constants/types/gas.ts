export type GasPriceResult = {
  fast: number
  proposed: number
  safe: number
  suggestBaseFee?: number
}

export type GasData = {
  lastBaseFeePerGas: bigint | null
  gasPrice: bigint | null
  maxFeePerGas: bigint | null
  maxPriorityFeePerGas: bigint | null
  formatted: {
    gasPrice: string | null
    maxFeePerGas: string | null
    maxPriorityFeePerGas: string | null
  }
}

export type GasConfiguration = {
  gasPrice?: number
  maxFeePerGas?: number
  maxPriorityFeePerGas?: number
  type?: number
  gasLimit?: number
}
