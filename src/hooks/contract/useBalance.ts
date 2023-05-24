/*
    https://wagmi.sh/react/hooks/useBalance

    Since this is a simple react hook, it's ideal for use for a single or a few tokens per situation.

    However, if you want to fetch like 10+ token balances for a user, it might become cumbersome to use this hook ten times, in that case, use
    useMulticallReads instead, which allows you to fetch multiple token balances in a single call.
*/

import { useBalance as useWagmiBalance } from 'wagmi'

/**
 *
 * @param contract - The contract object that contains the address, token, chainId, and decimals of the token you want to fetch the balance of.
 * @returns - The status object which includes the balance of the token in the contract object.
 */
export const useBalance = (contract: {
  address: `0x${string}`
  token: `0x${string}`
  chainId: number
  decimals: number
}) => {
  const { data, error, isLoading } = useWagmiBalance({
    address: contract.address,
    token: contract.token,
    chainId: contract.chainId,
    formatUnits: contract.decimals,
  })

  return { data, error, isLoading }
}
