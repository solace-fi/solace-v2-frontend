import { Hex, TransactionReceipt } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useGas } from '../provider/useGas'

/*

  The usePrepareContractWrite hook appears to proactively simulate the contract transaction on first render(maybe?) and immediately
  returning any error that might happen. Very helpful since it will save the user gas from potential failures.

  The useContractWrite hook is used to actually send the transaction to the blockchain. The function writeAsync is the key function for you to call, it is also undefined
  if the transaction simulation fails, making it a great variable to create the UI and user guard rails.

  The useWaitForTransaction hook is used to wait for the transaction to be mined, self explanatory.
*/

/**
 *
 * @param contract - Contract object containing the address, abi, and chainId of the contract you want to write to.
 * @param functionName - The name of the function you want to write to.
 * @param args - The arguments of the function you want to write to.
 * @param overrides - Object to override value, transaction type, gas limit, and useFeeData for whether to change gas estimation mechanism.
 * @callback onPrepareSuccess - Callback function when the usePrepareContractWrite is successful.
 * @callback onPrepareError - Callback function when the usePrepareContractWrite fails.
 * @callback onWriteSuccess - Callback function when the useContractWrite is successful.
 * @callback onWriteError - Callback function when the useContractWrite fails.
 * @callback onTxSuccess - Callback function when the useWaitForTransaction is successful.
 * @callback onTxError - Callback function when the useWaitForTransaction fails.
 * @returns
 */
export const useWrite = (
  contract: { address: `0x${string}`; abi: any; chainId: number },
  functionName: string,
  args: any[],
  overrides?: {
    value?: bigint
    txType?: 0 | 2
    gasLimit?: bigint
    useFeeData?: boolean
  },
  onPrepareSuccess?: (data: any) => any,
  onPrepareError?: (error: any) => any,
  onWriteSuccess?: (data: any) => any,
  onWriteError?: (error: any) => any,
  onTxSuccess?: (data: any) => any,
  onTxError?: (error: any) => any
) => {
  const { gasConfig } = useGas(overrides?.useFeeData, overrides?.txType)

  /*
  https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
  */
  const { config } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    chainId: contract.chainId,
    value: overrides?.value,
    gas: overrides?.gasLimit,
    ...gasConfig,
    onSuccess(data) {
      if (onPrepareSuccess) onPrepareSuccess(data)
    },
    onError(error: Error) {
      if (onPrepareError) onPrepareError(error)
    },
  })

  /*
  https://wagmi.sh/react/hooks/useContractWrite
  */
  const {
    data: writeData,
    error: writeError,
    writeAsync,
  } = useContractWrite({
    ...config,
    onSuccess(data: { hash: Hex }) {
      if (onWriteSuccess) onWriteSuccess(data)
    },
    onError(error: Error) {
      if (onWriteError) onWriteError(error)
    },
  })

  /*
  https://wagmi.sh/react/hooks/useWaitForTransaction
  */
  const {
    data: txData,
    error: txError,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess(data: TransactionReceipt) {
      if (onTxSuccess) onTxSuccess(data)
    },
    onError(error: Error) {
      if (onTxError) onTxError(error)
    },
  })

  return {
    writeAsync,
    writeData,
    writeError,
    txData,
    txError,
    isTxLoading,
    isTxSuccess,
  }
}
