import React from 'react'
import { Content } from '../atoms/Container'
import { Flex } from '../atoms/Flex'
import { Tdiv } from '../atoms/Text'

export const PleaseConnectWallet = (): JSX.Element => {
  return (
    <Content>
      <Flex col gap={30}>
        <Tdiv bold t1 textAlign="center">
          Please connect your wallet to view this page
        </Tdiv>
      </Flex>
    </Content>
  )
}
