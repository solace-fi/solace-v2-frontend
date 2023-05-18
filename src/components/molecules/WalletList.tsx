import React, { useCallback } from 'react'
// import { useWallet } from '../../context'
// import { CONNECTION_TYPE_TO_CONNECTION, SELECTABLE_WALLETS } from '../../wallet'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { Tdiv } from '../atoms/Text'
// import { getConnectionName } from '../../wallet'
// import { useWeb3React } from '@web3-react/core'
import { useAccount, useConnect } from 'wagmi'

export const WalletList = () => {
  const { connector } = useAccount()
  const { connect, connectors } = useConnect()

  return (
    <>
      <Flex col style={{ margin: 'auto' }} gap={10}>
        {connectors.map((_connector) => (
          <Card
            px={20}
            py={5}
            canHover
            key={_connector.id}
            onClick={() => connect({ connector: _connector })}
            info={_connector.id == connector?.id}
          >
            <Flex stretch between>
              <Card itemsCenter transparent p={5}>
                <Tdiv t4 bold lightPrimary={_connector.id == connector?.id}>
                  {_connector.name}
                </Tdiv>
              </Card>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  )
}
