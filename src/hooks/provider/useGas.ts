import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { GasData } from '../../constants/types'
import axios from 'axios'
import { GasConfiguration } from '../../constants/types/gas'
import { useAppSelector } from '@/store/_hooks'
import { useFeeData, usePublicClient } from 'wagmi'

// export const useGetFunctionGas = () => {
//   const activeNetwork = useAppSelector((state) => state.network.activeNetwork)
//   const gasData = useAppSelector((state) => state.provider.gasData)

//   const { connector } = useWeb3React()

//   const getGasConfig = useCallback(
//     (_gasValue: number | undefined): GasConfiguration => {
//       // null check and testnet check
//       const gasValue = _gasValue ?? gasData?.gasPrice

//       const activeWalletConnector = SUPPORTED_WALLETS.find(
//         (w) => w.connector === connector
//       )

//       if (
//         !activeWalletConnector ||
//         activeNetwork.isTestnet ||
//         !gasValue ||
//         !gasData
//       ) {
//         return {}
//       }

//       // type 2 transaction
//       if (
//         activeWalletConnector.supportedTxTypes.includes(2) &&
//         activeNetwork.supportedTxTypes.includes(2)
//       )
//         return {
//           maxFeePerGas: getGasValue(gasData.maxFeePerGas),
//           maxPriorityFeePerGas: getGasValue(gasData.maxPriorityFeePerGas),
//           type: 2,
//         }

//       // legacy type 0 transaction
//       return {
//         gasPrice: getGasValue(gasValue),
//       }
//     },
//     [activeNetwork, connector, gasData]
//   )

//   const getAutoGasConfig = useCallback(
//     (): GasConfiguration => getGasConfig(undefined),
//     [getGasConfig]
//   )

//   const gasConfig = useMemo(() => getAutoGasConfig(), [getAutoGasConfig])

//   return { gasConfig, getGasConfig, getAutoGasConfig }
// }
