import { Hex, TransactionReceipt } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'

export const useWrite = (
  contract: { address: `0x${string}`; abi: any; chainId: number },
  functionName: string,
  args: any[],
  onWriteSuccess?: (data: any) => any,
  onWriteError?: (error: any) => any,
  onTxSuccess?: (data: any) => any,
  onTxError?: (error: any) => any
) => {
  /*
  https://wagmi.sh/react/prepare-hooks/usePrepareContractWrite
  */
  const { config } = usePrepareContractWrite({
    address: contract.address,
    abi: contract.abi,
    functionName,
    args,
    chainId: contract.chainId,
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
