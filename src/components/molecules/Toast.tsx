/*************************************************************************************

    Table of Contents:

    import packages
    import constants
    import components
    import utils

    AppToast
      
    TransactionToast
      custom hooks
      local functions

  *************************************************************************************/

/* import packages */
import React, { useEffect } from 'react'

/* import constants */
import { ExplorerscanApi } from '../../constants/enums'
import { TransactionCondition } from '../../constants/enums'

/* import components */
import { Button } from '../atoms/Button'
import { Flex } from '../atoms/Flex'
import { Tdiv } from '../atoms/Text'
import { CopyButton } from './CopyButton'

/* import utils */
import { getExplorerItemUrl } from '../../utils/explorer'
import { useNetwork } from 'wagmi'

interface AppToastProps {
  message: string
  icon?: any
}

interface TransactionToastProps {
  txType: string
  condition: TransactionCondition
  txHash?: string
  errObj?: any
}

export const AppToast: React.FC<AppToastProps> = ({ message }) => {
  return (
    <Flex itemsCenter marginAuto>
      <Tdiv lightPrimary>{message}</Tdiv>
    </Flex>
  )
}

export const TransactionToast: React.FC<TransactionToastProps> = ({
  txType,
  condition,
  txHash,
  errObj,
}) => {
  const { chain } = useNetwork()

  const [explorerUrl, setExplorerUrl] = React.useState('')
  const [explorerName, setExplorerName] = React.useState('')

  useEffect(() => {
    if (
      chain &&
      chain.blockExplorers?.default.url &&
      chain.blockExplorers?.default.name
    ) {
      setExplorerUrl(chain.blockExplorers?.default.url)
      setExplorerName(chain.blockExplorers?.default.name)
    }
  }, [chain])

  const getStateFromCondition = (condition: TransactionCondition): string => {
    switch (condition) {
      case TransactionCondition.SUCCESS:
        return 'Successful'
      case TransactionCondition.FAILURE:
        return 'Failed'
      case TransactionCondition.PENDING:
        return 'Pending'
      case TransactionCondition.CANCELLED:
      default:
        return 'Cancelled'
    }
  }

  return (
    <Flex col gap={10}>
      <Flex itemsCenter marginAuto>
        <Tdiv lightPrimary>
          {txType}: {getStateFromCondition(condition)}
        </Tdiv>
      </Flex>
      {condition == TransactionCondition.CANCELLED && (
        <Flex>
          <Tdiv lightPrimary>
            The transaction could not reach the blockchain due to an issue on
            this website.
          </Tdiv>
        </Flex>
      )}
      {errObj && (
        <Flex>
          <Tdiv t4 lightPrimary>
            {errObj.message && errObj.code ? (
              <>
                <span>({errObj.code})</span>{' '}
                {errObj.message.length > 90
                  ? `${errObj.message.substring(0, 90)}...`
                  : errObj.message}
              </>
            ) : (
              'Unknown error, please check full error log'
            )}
          </Tdiv>
        </Flex>
      )}
      {(txHash || errObj) && (
        <Flex itemsCenter marginAuto gap={10}>
          {txHash && (
            <a
              href={getExplorerItemUrl(explorerUrl, txHash, ExplorerscanApi.TX)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button white>Check on {explorerName}</Button>
            </a>
          )}
          {errObj && (
            <CopyButton
              white
              toCopy={
                errObj.message && errObj.code && errObj.data
                  ? JSON.stringify({
                      code: errObj.code,
                      message: errObj.message,
                      data: errObj.data,
                    })
                  : errObj.message && errObj.code
                  ? JSON.stringify({
                      code: errObj.code,
                      message: errObj.message,
                    })
                  : JSON.stringify(errObj)
              }
              objectName={'Error Log'}
            />
          )}
        </Flex>
      )}
    </Flex>
  )
}
