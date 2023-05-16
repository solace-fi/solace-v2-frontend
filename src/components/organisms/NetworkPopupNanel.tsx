import React, { useState } from 'react'
// import { useProvider, useNetwork, useCache } from '../../context'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { Scrollable } from '../atoms/Scroll'
import { Tdiv } from '../atoms/Text'
import ToggleSwitch from '../atoms/ToggleSwitch/ToggleSwitch'
import { Network } from '../../constants/types'
import { motion } from 'framer-motion'
import { variants } from '../../styles/animation-styles'
import { Chain, useSwitchNetwork, useNetwork } from 'wagmi'

export function NetworkPopupPanel(): JSX.Element {
  // const { showNetworks } = useCache()
  const showNetworks = true

  const [showTestnets, setShowTestnets] = useState<boolean>(false)
  const { chain } = useNetwork()

  // const { adjustedNetworks, showTestnets, handleShowTestnets } = useProvider()
  // const { activeNetwork, changeNetwork } = useNetwork()

  const { chains, switchNetwork } = useSwitchNetwork()

  const adjustedChains = showTestnets
    ? chains
    : chains.filter((c) => !c.testnet)

  return (
    <>
      {showNetworks && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            right: '20px',
            zIndex: '1000',
          }}
        >
          <motion.div
            variants={variants.drop}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card interactiveBg col gap={10} outlined>
              <Flex justifyCenter itemsCenter>
                <Tdiv t4 primary>
                  Show Testnets
                </Tdiv>
                <ToggleSwitch
                  id="show-testnets"
                  toggled={showTestnets}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShowTestnets(e.target.checked)
                  }
                />
              </Flex>
              <Scrollable maxMobileHeight={'40vh'}>
                <Flex col style={{ margin: 'auto' }} gap={10}>
                  {adjustedChains.map((_chain: Chain) => (
                    <Card
                      px={20}
                      py={10}
                      canHover
                      key={_chain.name}
                      onClick={() => switchNetwork?.(_chain.id)}
                      justifyCenter
                      info={_chain.id === chain?.id}
                    >
                      <Tdiv t4 bold lightPrimary={_chain.id === chain?.id}>
                        {_chain.name}
                      </Tdiv>
                    </Card>
                  ))}
                </Flex>
              </Scrollable>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  )
}

export function NetworkPopupPanelMobile(): JSX.Element {
  // const { showNetworks } = useCache()
  const showNetworks = true

  const [showTestnets, setShowTestnets] = useState<boolean>(false)
  const { chain } = useNetwork()

  // const { adjustedNetworks, showTestnets, handleShowTestnets } = useProvider()
  // const { activeNetwork, changeNetwork } = useNetwork()

  const { chains, switchNetwork } = useSwitchNetwork()

  const adjustedChains = showTestnets
    ? chains
    : chains.filter((c) => !c.testnet)

  return (
    <>
      {showNetworks && (
        <div
          style={{
            position: 'fixed',
            top: '65px',
            zIndex: '1000',
            width: '100%',
          }}
        >
          <motion.div
            variants={variants.drop}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card
              col
              gap={10}
              interactiveBg
              outlined
              style={{ borderRadius: '0' }}
            >
              <Flex justifyCenter itemsCenter>
                <Tdiv t4 primary>
                  Show Testnets
                </Tdiv>
                <ToggleSwitch
                  id="show-testnets"
                  toggled={showTestnets}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setShowTestnets(e.target.checked)
                  }
                />
              </Flex>
              <Scrollable maxMobileHeight={'40vh'}>
                <Flex col style={{ margin: 'auto' }} gap={10}>
                  {adjustedChains.map((_chain: Chain) => (
                    <Card
                      px={20}
                      py={10}
                      canHover
                      key={_chain.name}
                      onClick={() => switchNetwork?.(_chain.id)}
                      justifyCenter
                      info={_chain.id === chain?.id}
                    >
                      <Tdiv t4 bold lightPrimary={_chain.id === chain?.id}>
                        {_chain.name}
                      </Tdiv>
                    </Card>
                  ))}
                </Flex>
              </Scrollable>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  )
}
