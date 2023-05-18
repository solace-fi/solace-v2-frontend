import React, { Fragment, use, useEffect, useRef, useState } from 'react'
import { PropsWithChildren } from 'react'
import { MobileNavPanelComponent, TopNav, MobileNavMenu } from '../atoms/Navbar'
import { Button } from '../atoms/Button'
import { Flex } from '../atoms/Flex'
import { StyledMenu, StyledMoon, StyledSun } from '../atoms/Icon'
import { Network, RouteInfo } from '../../constants/types'
import { shortenAddress } from '../../utils'
import { TabLabelLink, Tdiv } from '../atoms/Text'
import { UserImage } from '../molecules/UserImage'
import { Logo } from '../molecules/Logo'
import { VerticalSeparator } from '../atoms/Break'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { CloseButton } from '../molecules/Modal'
import { Card } from '../atoms/Card'
import { AccountPopupPanel, AccountPopupPanelMobile } from './AccountPopupPanel'
import { useOnClickOutside } from '../../hooks/internal/useOnClickOutside'
import { NetworkPopupPanel, NetworkPopupPanelMobile } from './NetworkPopupNanel'
import { useAppDispatch, useAppSelector } from '@/store/_hooks'
import { toggleDarkTheme } from '@/store/general/generalSlice'
import { useAccount, useEnsName, useNetwork } from 'wagmi'
import { useDispatch } from 'react-redux'
import { setShowAccount, setShowNetworks } from '@/store/ui/uiSlice'
import { Mainnet, NETWORKS } from '@/constants/networks'
import { StyledNavLink } from '../atoms/Link'
import { useRouter } from 'next/router'
import makeBlockie from 'ethereum-blockies-base64'
import Image from 'next/image'

export function MobileNavPanel(
  props: PropsWithChildren & {
    show: boolean
    setShow: (show: boolean) => void
    routeInfoArr: RouteInfo[]
  }
): JSX.Element {
  const appTheme = useAppSelector((state) => state.general.appTheme)
  const router = useRouter()

  const { isMobile } = useWindowDimensions()

  return (
    <MobileNavPanelComponent shouldShow={props.show}>
      <MobileNavMenu>
        <Flex between m={20}>
          <CloseButton
            lightColor={appTheme == 'dark'}
            onClick={() => props.setShow(false)}
          />
        </Flex>
        <Flex col gap={10} p={10}>
          {props.routeInfoArr.map((page) => (
            <Card
              justifyCenter
              key={page.to}
              onClick={() => {
                props.setShow(false)
                // navigate(page.to)
              }}
            >
              <Tdiv
                info={
                  router.pathname == page.to ||
                  page.children?.some((child) =>
                    router.pathname.includes(child)
                  )
                }
              >
                {page.name}
              </Tdiv>
            </Card>
          ))}
        </Flex>
        <div style={{ flex: '1 1' }}></div>
        <Flex col mb={isMobile ? 80 : 50}>
          <Flex center gap={20}>
            <Button
              nohover
              onClick={() =>
                appTheme == 'dark' ? toggleDarkTheme(false) : undefined
              }
              style={{ minWidth: '0', minHeight: '0' }}
              p={10}
            >
              <StyledSun size={30} />
            </Button>
            <VerticalSeparator />
            <Button
              nohover
              onClick={() =>
                appTheme == 'light' ? toggleDarkTheme(true) : undefined
              }
              style={{ minWidth: '0', minHeight: '0' }}
              p={10}
            >
              <StyledMoon size={30} />
            </Button>
          </Flex>
        </Flex>
      </MobileNavMenu>
    </MobileNavPanelComponent>
  )
}

export function MobileNavbar(
  props: PropsWithChildren & {
    routeInfoArr: RouteInfo[]
    accountButtonRef: React.RefObject<HTMLDivElement>
    networkButtonRef: React.RefObject<HTMLDivElement>
  }
): JSX.Element {
  const dispatch = useAppDispatch()
  const showNetworks = useAppSelector((state) => state.ui.showNetworks)
  const showAccount = useAppSelector((state) => state.ui.showAccount)
  const [show, setShow] = useState(false)

  const { chain } = useNetwork()
  const { address: account } = useAccount()

  const [localChain, setLocalChain] = useState<Network>(Mainnet)

  useEffect(() => {
    if (chain) {
      const foundNetwork = NETWORKS.find((n) => n.id === chain.id)
      if (foundNetwork) setLocalChain(foundNetwork)
    }
  }, [chain])

  return (
    <>
      <MobileNavPanel
        show={show}
        setShow={setShow}
        routeInfoArr={props.routeInfoArr}
      />
      <Flex between>
        <Button transparent nohover onClick={() => setShow(!show)}>
          <Tdiv primary>
            <StyledMenu size={40} />
          </Tdiv>
        </Button>
        <Flex gap={10} pr={20}>
          <span ref={props.networkButtonRef}>
            <Button
              transparent
              p={4}
              outlined
              style={{ borderRadius: '28px', minWidth: 'unset' }}
              onClick={() => dispatch(setShowNetworks(!showNetworks))}
            >
              {localChain.logo && (
                <img
                  src={localChain.logo}
                  width={30}
                  height={30}
                  alt={localChain.name}
                />
              )}
            </Button>
          </span>
          <span ref={props.accountButtonRef}>
            <Button
              transparent
              nohover
              onClick={() => dispatch(setShowAccount(!showAccount))}
              style={{ borderRadius: '28px', minWidth: 'unset' }}
            >
              {account ? (
                <UserImage width={35} height={35} style={{ margin: 'auto' }}>
                  <img src={makeBlockie(account)} alt={'account'} />
                </UserImage>
              ) : (
                <img
                  src="/assets/svg/unconnected_user.svg"
                  alt={'unconnected user'}
                />
              )}
            </Button>
          </span>
        </Flex>
      </Flex>
    </>
  )
}

export function FullNavbar(
  props: PropsWithChildren & {
    routeInfoArr: RouteInfo[]
    accountButtonRef: React.RefObject<HTMLDivElement>
    networkButtonRef: React.RefObject<HTMLDivElement>
  }
): JSX.Element {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { data: ensName } = useEnsName()

  const showAccount = useAppSelector((state) => state.ui.showAccount)
  const showNetworks = useAppSelector((state) => state.ui.showNetworks)
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { chain } = useNetwork()
  const { address: account } = useAccount()

  const [localChain, setLocalChain] = useState<Network>(Mainnet)
  const [localAccount, setLocalAccount] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    if (chain) {
      const foundNetwork = NETWORKS.find((n) => n.id === chain.id)
      if (foundNetwork) setLocalChain(foundNetwork)
    }
  }, [chain])

  useEffect(() => {
    setLocalAccount(account)
  }, [account])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Flex stretch between px={20}>
        <Flex gap={20} itemsCenter>
          <Logo location={router} />
          <Flex gap={20}>
            {props.routeInfoArr.map((page) => (
              <Fragment key={page.to}>
                <TabLabelLink
                  t4
                  selected={
                    router.pathname == page.to ||
                    page.children?.some((child) =>
                      router.pathname.includes(child)
                    )
                  }
                >
                  <StyledNavLink href={`/${page.to}`}>
                    {page.name}
                  </StyledNavLink>
                </TabLabelLink>
              </Fragment>
            ))}
          </Flex>
        </Flex>
        <Flex gap={10} itemsCenter>
          <span ref={props.networkButtonRef}>
            <Button
              transparent
              outlined
              p={8}
              style={{ borderRadius: '28px', minWidth: 'unset' }}
              onClick={() => dispatch(setShowNetworks(!showNetworks))}
            >
              <Flex>
                <img
                  src={localChain.logo}
                  width={30}
                  height={30}
                  style={{ marginRight: '2px' }}
                  alt={localChain.name}
                />
                <Tdiv nowrap autoAlignVertical>
                  {localChain.name}
                </Tdiv>
              </Flex>
            </Button>
          </span>
          <span ref={props.accountButtonRef}>
            <Button
              transparent
              outlined
              p={8}
              style={{ borderRadius: '28px', minWidth: 'unset' }}
              onClick={() => dispatch(setShowAccount(!showAccount))}
            >
              <Flex between gap={5} itemsCenter>
                {localAccount ? (
                  <UserImage width={30} height={30} style={{ margin: 'auto' }}>
                    <img src={makeBlockie(localAccount)} alt={'account'} />
                  </UserImage>
                ) : (
                  <img
                    src="/assets/svg/unconnected_user.svg"
                    alt={'unconnected user'}
                  />
                )}
                {scrollPosition <= 40 &&
                  (localAccount ? (
                    <Flex col around>
                      <Tdiv textAlign="left" t4>
                        {ensName ?? shortenAddress(localAccount)}
                      </Tdiv>
                    </Flex>
                  ) : (
                    <Flex col around>
                      <Tdiv textAlign="left">Not connected</Tdiv>
                    </Flex>
                  ))}
              </Flex>
            </Button>
          </span>
        </Flex>
      </Flex>
    </>
  )
}

export function Navbar(
  props: PropsWithChildren & { routeInfoArr: RouteInfo[] }
): JSX.Element {
  const showAccount = useAppSelector((state) => state.ui.showAccount)
  const showNetworks = useAppSelector((state) => state.ui.showNetworks)

  const dispatch = useDispatch()

  const { isTablet, isMobile } = useWindowDimensions()

  const accountButtonRef = useRef<HTMLDivElement>(null)
  const networkButtonRef = useRef<HTMLDivElement>(null)
  const accountPanelRef = useRef<HTMLDivElement>(null)
  const networkPanelRef = useRef<HTMLDivElement>(null)

  const [isMobileLocal, setIsMobileLocal] = useState<boolean>(false)

  const [displaySmallNavbar, setDisplaySmallNavbar] = useState<boolean>(false)

  useOnClickOutside(
    accountButtonRef,
    showAccount ? () => dispatch(setShowAccount(false)) : undefined,
    [accountPanelRef]
  )

  useOnClickOutside(
    networkButtonRef,
    showNetworks ? () => dispatch(setShowNetworks(false)) : undefined,
    [networkPanelRef]
  )

  useEffect(() => {
    setDisplaySmallNavbar(isTablet || isMobile)
  }, [isTablet, isMobile])

  useEffect(() => {
    setIsMobileLocal(isMobile)
  }, [isMobile])

  return (
    <TopNav>
      <span ref={accountPanelRef}>
        {!isMobileLocal ? <AccountPopupPanel /> : <AccountPopupPanelMobile />}
      </span>
      <span ref={networkPanelRef}>
        {!isMobileLocal ? <NetworkPopupPanel /> : <NetworkPopupPanelMobile />}
      </span>
      {displaySmallNavbar ? (
        <MobileNavbar
          routeInfoArr={props.routeInfoArr}
          accountButtonRef={accountButtonRef}
          networkButtonRef={networkButtonRef}
        />
      ) : (
        <FullNavbar
          routeInfoArr={props.routeInfoArr}
          accountButtonRef={accountButtonRef}
          networkButtonRef={networkButtonRef}
        />
      )}
    </TopNav>
  )
}
