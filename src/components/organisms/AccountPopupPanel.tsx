import makeBlockie from 'ethereum-blockies-base64'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { variants } from '../../styles/animation-styles'
import { getExplorerItemUrl, shortenAddress } from '../../utils'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import {
  StyledArrowIosBackOutline,
  StyledLinkExternal,
  StyledMoon,
  StyledSun,
} from '../atoms/Icon'
import { Scrollable } from '../atoms/Scroll'
import { Tdiv, Tspan } from '../atoms/Text'
import { CopyButton } from '../molecules/CopyButton'
import { UserImage } from '../molecules/UserImage'
import { WalletList } from '../molecules/WalletList'
import { RecentActivityTable } from './RecentActivityTable'
import { useAccount, useDisconnect, useEnsName, useNetwork } from 'wagmi'
import { useAppDispatch, useAppSelector } from '@/store/_hooks'
import { toggleDarkTheme } from '@/store/general/generalSlice'
import { ExplorerscanApi } from '@/constants/enums'
import { HyperLink } from '../atoms/Link'
import Image from 'next/image'

export function AccountPopupPanel(): JSX.Element {
  const dispatch = useAppDispatch()

  const appTheme = useAppSelector((state) => state.general.appTheme)
  const showAccount = useAppSelector((state) => state.ui.showAccount)

  const { data: name } = useEnsName()
  const { address: account } = useAccount()
  const { disconnect } = useDisconnect()

  const [showCopyTip, setShowCopyTip] = useState(false)
  const [showExploreTip, setShowExploreTip] = useState(false)
  const [showThemeTip, setShowThemeTip] = useState(false)

  const [panelState, setPanelState] = useState<'start' | 'wallet' | 'tx'>(
    'start'
  )

  const { chain } = useNetwork()

  const [explorerUrl, setExplorerUrl] = React.useState('')

  useEffect(() => {
    if (chain && chain.blockExplorers?.default.url) {
      setExplorerUrl(chain.blockExplorers?.default.url)
    }
  }, [chain])

  return (
    <>
      {showAccount && (
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
            <Card interactiveBg col outlined>
              {account && (
                <Flex itemsCenter gap={5} mb={20} justifyCenter>
                  <UserImage width={25} height={25}>
                    <Image
                      src={makeBlockie(account)}
                      alt={'account'}
                      width={25}
                      height={25}
                    />
                  </UserImage>
                  <Tdiv t4 semibold>
                    {name ?? shortenAddress(account)}
                  </Tdiv>
                  <Flex gap={5}>
                    <CopyButton
                      transparent
                      onMouseEnter={() => setShowCopyTip(true)}
                      onMouseLeave={() => setShowCopyTip(false)}
                      toCopy={account}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      {showCopyTip && (
                        <Tspan
                          primary
                          t6
                          style={{ position: 'absolute', top: '30px' }}
                        >
                          Copy
                        </Tspan>
                      )}
                    </CopyButton>
                    <Button
                      transparent
                      onMouseEnter={() => setShowExploreTip(true)}
                      onMouseLeave={() => setShowExploreTip(false)}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      <Tdiv primary>
                        <HyperLink
                          href={getExplorerItemUrl(
                            explorerUrl,
                            account,
                            ExplorerscanApi.ADDRESS
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <StyledLinkExternal size={20} />
                        </HyperLink>
                      </Tdiv>
                      {showExploreTip && (
                        <Tspan t6 style={{ position: 'absolute', top: '30px' }}>
                          Explorer
                        </Tspan>
                      )}
                    </Button>
                  </Flex>
                </Flex>
              )}
              {panelState == 'start' && (
                <motion.div
                  variants={variants.slideA}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Flex col gap={10}>
                    {account && (
                      <Button inquiry onClick={() => setPanelState('tx')}>
                        Recent Activity
                      </Button>
                    )}
                    <Button
                      transparent
                      outlined
                      onClick={() => setPanelState('wallet')}
                    >
                      <Tdiv primary>
                        {account ? 'Change Wallet' : 'Connect Wallet'}
                      </Tdiv>
                    </Button>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'wallet' && (
                <motion.div
                  variants={variants.slideB}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Flex gap={10}>
                      <Button width={35} onClick={() => setPanelState('start')}>
                        <StyledArrowIosBackOutline size={20} />
                      </Button>
                      <Button transparent outlined onClick={disconnect}>
                        <Tdiv regular primary>
                          Disconnect
                        </Tdiv>
                      </Button>
                    </Flex>
                    <Scrollable maxMobileHeight={'40vh'}>
                      <WalletList />
                    </Scrollable>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'tx' && (
                <motion.div
                  variants={variants.slideB}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Button width={35} onClick={() => setPanelState('start')}>
                      <StyledArrowIosBackOutline size={20} />
                    </Button>
                    <RecentActivityTable />
                  </Flex>
                </motion.div>
              )}
              <Flex justifyCenter mt={20}>
                <Button
                  outlined={appTheme == 'light'}
                  onClick={() => dispatch(toggleDarkTheme(appTheme == 'light'))}
                  white
                  onMouseEnter={() => setShowThemeTip(true)}
                  onMouseLeave={() => setShowThemeTip(false)}
                  width={30}
                  radius={50}
                  height={30}
                  style={{ position: 'relative' }}
                >
                  {appTheme == 'light' ? <StyledSun /> : <StyledMoon />}
                  {showThemeTip && (
                    <Tspan t6 style={{ position: 'absolute', top: '30px' }}>
                      Theme
                    </Tspan>
                  )}
                </Button>
              </Flex>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  )
}

export function AccountPopupPanelMobile(): JSX.Element {
  const dispatch = useAppDispatch()

  const appTheme = useAppSelector((state) => state.general.appTheme)

  const { data: name } = useEnsName()
  const { address: account } = useAccount()
  const showAccount = useAppSelector((state) => state.ui.showAccount)
  const { disconnect } = useDisconnect()

  const [showCopyTip, setShowCopyTip] = useState(false)
  const [showExploreTip, setShowExploreTip] = useState(false)
  const [showThemeTip, setShowThemeTip] = useState(false)

  const [panelState, setPanelState] = useState<'start' | 'wallet' | 'tx'>(
    'start'
  )

  const { chain } = useNetwork()

  const [explorerUrl, setExplorerUrl] = React.useState('')

  useEffect(() => {
    if (chain && chain.blockExplorers?.default.url) {
      setExplorerUrl(chain.blockExplorers?.default.url)
    }
  }, [chain])

  return (
    <>
      {showAccount && (
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
            <Card col interactiveBg outlined style={{ borderRadius: '0' }}>
              {account && (
                <Flex itemsCenter gap={5} mb={20} justifyCenter>
                  <UserImage width={25} height={25}>
                    <Image
                      src={makeBlockie(account)}
                      alt={'account'}
                      width={25}
                      height={25}
                    />
                  </UserImage>
                  <Tdiv t4 semibold>
                    {name ?? shortenAddress(account)}
                  </Tdiv>
                  <Flex gap={5}>
                    <CopyButton
                      transparent
                      onMouseEnter={() => setShowCopyTip(true)}
                      onMouseLeave={() => setShowCopyTip(false)}
                      toCopy={account}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      {showCopyTip && (
                        <Tspan
                          primary
                          t6
                          style={{ position: 'absolute', top: '30px' }}
                        >
                          Copy
                        </Tspan>
                      )}
                    </CopyButton>
                    <Button
                      transparent
                      onMouseEnter={() => setShowExploreTip(true)}
                      onMouseLeave={() => setShowExploreTip(false)}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      <Tdiv primary>
                        <HyperLink
                          href={getExplorerItemUrl(
                            explorerUrl,
                            account,
                            ExplorerscanApi.ADDRESS
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <StyledLinkExternal size={20} />
                        </HyperLink>
                      </Tdiv>
                      {showExploreTip && (
                        <Tspan t6 style={{ position: 'absolute', top: '30px' }}>
                          Explorer
                        </Tspan>
                      )}
                    </Button>
                  </Flex>
                </Flex>
              )}
              {panelState == 'start' && (
                <motion.div
                  variants={variants.slideA}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Flex col gap={10}>
                    {account && (
                      <Button inquiry onClick={() => setPanelState('tx')}>
                        Recent Activity
                      </Button>
                    )}
                    <Button
                      transparent
                      outlined
                      onClick={() => setPanelState('wallet')}
                    >
                      <Tdiv primary>
                        {account ? 'Change Wallet' : 'Connect Wallet'}
                      </Tdiv>
                    </Button>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'wallet' && (
                <motion.div
                  variants={variants.slideB}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Flex gap={10}>
                      <Button width={35} onClick={() => setPanelState('start')}>
                        <StyledArrowIosBackOutline size={20} />
                      </Button>
                      <Button transparent outlined onClick={disconnect}>
                        <Tdiv regular primary>
                          Disconnect
                        </Tdiv>
                      </Button>
                    </Flex>
                    <Scrollable maxMobileHeight={'40vh'}>
                      <WalletList />
                    </Scrollable>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'tx' && (
                <motion.div
                  variants={variants.slideB}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Button width={35} onClick={() => setPanelState('start')}>
                      <StyledArrowIosBackOutline size={20} />
                    </Button>
                    <RecentActivityTable />
                  </Flex>
                </motion.div>
              )}
              <Flex justifyCenter mt={20}>
                <Button
                  outlined={appTheme == 'light'}
                  onClick={() => dispatch(toggleDarkTheme(appTheme != 'light'))}
                  white
                  onMouseEnter={() => setShowThemeTip(true)}
                  onMouseLeave={() => setShowThemeTip(false)}
                  radius={50}
                  height={30}
                  style={{ position: 'relative' }}
                >
                  {appTheme == 'light' ? (
                    <StyledSun size={30} />
                  ) : (
                    <StyledMoon size={30} />
                  )}
                  {showThemeTip && (
                    <Tspan t6 style={{ position: 'absolute', top: '30px' }}>
                      Theme
                    </Tspan>
                  )}
                </Button>
              </Flex>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  )
}
