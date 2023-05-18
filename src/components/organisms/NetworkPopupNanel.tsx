import React, { useEffect, useState } from 'react'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { Scrollable } from '../atoms/Scroll'
import { Tdiv } from '../atoms/Text'
import ToggleSwitch from '../atoms/ToggleSwitch/ToggleSwitch'
import { motion } from 'framer-motion'
import { variants } from '../../styles/animation-styles'
import { useSwitchNetwork, useNetwork, useAccount } from 'wagmi'
import { useAppSelector, useAppDispatch } from '@/store/_hooks'
import { NETWORKS } from '@/constants/networks'
import { LocalNetwork } from '@/constants/types'
import { setDefaultLocalChain } from '@/store/general/generalSlice'

export function NetworkPopupPanel(): JSX.Element {
  const [showTestnets, setShowTestnets] = useState<boolean>(false)
  const { address: account } = useAccount()
  const { chain } = useNetwork()

  const { switchNetwork } = useSwitchNetwork()
  const showNetworks = useAppSelector((state) => state.ui.showNetworks)
  const dispatch = useAppDispatch()

  const adjustedChains = showTestnets
    ? NETWORKS.map((n) => n.local)
    : NETWORKS.map((n) => n.local).filter((c) => !c.isTestnet)

  useEffect(() => {
    if (chain) setShowTestnets(chain?.testnet ?? false)
  }, [chain])

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
                  {adjustedChains.map((_chain: LocalNetwork) => (
                    <Card
                      px={20}
                      py={10}
                      canHover
                      key={_chain.name}
                      onClick={() =>
                        account && switchNetwork
                          ? switchNetwork?.(_chain.chainId)
                          : dispatch(setDefaultLocalChain(_chain))
                      }
                      justifyCenter
                      info={_chain.chainId === chain?.id}
                    >
                      <Tdiv t4 bold lightPrimary={_chain.chainId === chain?.id}>
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
  const showNetworks = useAppSelector((state) => state.ui.showNetworks)

  const [showTestnets, setShowTestnets] = useState<boolean>(false)
  const { address: account } = useAccount()
  const { chain } = useNetwork()

  const { switchNetwork } = useSwitchNetwork()
  const dispatch = useAppDispatch()

  const adjustedChains = showTestnets
    ? NETWORKS.map((n) => n.local)
    : NETWORKS.map((n) => n.local).filter((c) => !c.isTestnet)

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
                  {adjustedChains.map((_chain: LocalNetwork) => (
                    <Card
                      px={20}
                      py={10}
                      canHover
                      key={_chain.name}
                      onClick={() =>
                        account && switchNetwork
                          ? switchNetwork?.(_chain.chainId)
                          : dispatch(setDefaultLocalChain(_chain))
                      }
                      justifyCenter
                      info={_chain.chainId === chain?.id}
                    >
                      <Tdiv t4 bold lightPrimary={_chain.chainId === chain?.id}>
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
