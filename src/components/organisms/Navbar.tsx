import React, { Fragment, useEffect, useRef, useState } from 'react'
import { PropsWithChildren } from 'react'
import { MobileNavPanelComponent, TopNav, MobileNavMenu } from '../atoms/Navbar'
import { Button } from '../atoms/Button'
import { Flex } from '../atoms/Flex'
import { StyledMenu, StyledMoon, StyledSun } from '../atoms/Icon'
import { RouteInfo } from '../../constants/types'
import { shortenAddress } from '../../utils'
import { TabLabelLink, Tdiv } from '../atoms/Text'
import { UserImage } from '../molecules/UserImage'
import { Logo } from '../molecules/Logo'
import { VerticalSeparator } from '../atoms/Break'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import UnconnectedUser from '../../assets/svg/unconnected_user.svg'
import { CloseButton } from '../molecules/Modal'
import { Card } from '../atoms/Card'
import { AccountPopupPanel, AccountPopupPanelMobile } from './AccountPopupPanel'
import { useOnClickOutside } from '../../hooks/internal/useOnClickOutside'
import { NetworkPopupPanel, NetworkPopupPanelMobile } from './NetworkPopupNanel'
import { useAppDispatch, useAppSelector } from '@/store/_hooks'
import { toggleTheme } from '@/store/general/generalSlice'
import { useAccount, useEnsName, useNetwork } from 'wagmi'
import { useDispatch } from 'react-redux'
import { setShowAccount, setShowNetworks } from '@/store/ui/uiSlice'

export function MobileNavPanel(
  props: PropsWithChildren & {
    show: boolean
    setShow: (show: boolean) => void
    routeInfoArr: RouteInfo[]
  }
): JSX.Element {
  const appTheme = useAppSelector((state) => state.general.appTheme)

  const { isMobile } = useWindowDimensions()
  // const navigate = useNavigate()
  // const location = useLocation()

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
                  location.pathname == page.to ||
                  page.children?.some((child) =>
                    location.pathname.includes(child)
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
              onClick={appTheme == 'dark' ? toggleTheme : undefined}
              style={{ minWidth: '0', minHeight: '0' }}
              p={10}
            >
              <StyledSun size={30} />
            </Button>
            <VerticalSeparator />
            <Button
              nohover
              onClick={appTheme == 'light' ? toggleTheme : undefined}
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
  // const { activeNetwork } = useNetwork()
  // const { account } = useWeb3React()
  // const { toggleAccount, toggleNetworks } = useCache()
  const [show, setShow] = useState(false)

  const { chain } = useNetwork()
  const { address: account } = useAccount()

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
              // onClick={toggleNetworks}
            >
              {/* {chain.logo && <img src={chain.logo} width={30} height={30} />} */}
            </Button>
          </span>
          <span ref={props.accountButtonRef}>
            <Button
              transparent
              nohover
              // onClick={toggleAccount}
              style={{ borderRadius: '28px', minWidth: 'unset' }}
            >
              {account ? (
                <UserImage width={35} height={35} style={{ margin: 'auto' }}>
                  {/* <img src={makeBlockie(account)} alt={'account'} /> */}
                </UserImage>
              ) : (
                <img src={UnconnectedUser} />
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
  // const { account } = useWeb3React()
  // const name = useENS()
  // const { activeNetwork } = useNetwork()
  const [scrollPosition, setScrollPosition] = useState(0)
  const { address: account } = useAccount()
  const { data: ensName } = useEnsName()
  // const location = useLocation()
  // const { toggleAccount, toggleNetworks } = useCache()

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
          <Logo location={location} />
          <Flex gap={20}>
            {props.routeInfoArr.map((page) => (
              <Fragment key={page.to}>
                <TabLabelLink
                  t4
                  selected={
                    location.pathname == page.to ||
                    page.children?.some((child) =>
                      location.pathname.includes(child)
                    )
                  }
                >
                  {/* <StyledNavLink to={page.to}>{page.name}</StyledNavLink> */}
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
              // onClick={toggleNetworks}
            >
              {/* <Flex>
                {activeNetwork.logo && (
                  <img
                    src={activeNetwork.logo}
                    width={30}
                    height={30}
                    style={{ marginRight: '2px' }}
                  />
                )}
                <Tdiv nowrap autoAlignVertical>
                  {activeNetwork.name}
                </Tdiv>
              </Flex> */}
            </Button>
          </span>
          <span ref={props.accountButtonRef}>
            <Button
              transparent
              outlined
              p={8}
              style={{ borderRadius: '28px', minWidth: 'unset' }}
              // onClick={toggleAccount}
            >
              <Flex between gap={5} itemsCenter>
                {account ? (
                  <UserImage width={30} height={30} style={{ margin: 'auto' }}>
                    {/* <img src={makeBlockie(account)} alt={'account'} /> */}
                  </UserImage>
                ) : (
                  <img src={UnconnectedUser} />
                )}
                {scrollPosition <= 40 &&
                  (account ? (
                    <Flex col around>
                      <Tdiv textAlign="left" t4>
                        {ensName ?? shortenAddress(account)}
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

  return (
    <TopNav>
      <span ref={accountPanelRef}>
        {!isMobile ? <AccountPopupPanel /> : <AccountPopupPanelMobile />}
      </span>
      <span ref={networkPanelRef}>
        {!isMobile ? <NetworkPopupPanel /> : <NetworkPopupPanelMobile />}
      </span>
      {isTablet || isMobile ? (
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
