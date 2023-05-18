import React, { Fragment, useEffect, useRef, useState } from 'react'
import { PropsWithChildren } from 'react'
import { MobileNavPanelComponent, TopNav, MobileNavMenu } from '../atoms/Navbar'
import { Button } from '../atoms/Button'
import { Flex } from '../atoms/Flex'
import { StyledMenu, StyledMoon, StyledSun } from '../atoms/Icon'
import { RouteInfo } from '../../constants/types'
import { TabLabelLink, Tdiv } from '../atoms/Text'
import { Logo } from '../molecules/Logo'
import { VerticalSeparator } from '../atoms/Break'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { CloseButton } from '../molecules/Modal'
import { Card } from '../atoms/Card'
import { useAppSelector } from '@/store/_hooks'
import { toggleDarkTheme } from '@/store/general/generalSlice'
import { StyledNavLink } from '../atoms/Link'
import { useRouter } from 'next/router'
import { CustomConnectModule } from './CustomConnectModule'

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
  }
): JSX.Element {
  const [show, setShow] = useState(false)

  return (
    <>
      <MobileNavPanel
        show={show}
        setShow={setShow}
        routeInfoArr={props.routeInfoArr}
      />
      <Flex between pr={20}>
        <Button transparent nohover onClick={() => setShow(!show)}>
          <Tdiv primary>
            <StyledMenu size={40} />
          </Tdiv>
        </Button>
        <CustomConnectModule />
      </Flex>
    </>
  )
}

export function FullNavbar(
  props: PropsWithChildren & {
    routeInfoArr: RouteInfo[]
  }
): JSX.Element {
  const router = useRouter()

  return (
    <>
      <Flex between px={20}>
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
        <CustomConnectModule />
      </Flex>
    </>
  )
}

export function Navbar(
  props: PropsWithChildren & { routeInfoArr: RouteInfo[] }
): JSX.Element {
  const { isTablet, isMobile } = useWindowDimensions()

  const [displaySmallNavbar, setDisplaySmallNavbar] = useState<boolean>(false)

  useEffect(() => {
    setDisplaySmallNavbar(isTablet || isMobile)
  }, [isTablet, isMobile])

  return (
    <TopNav>
      {displaySmallNavbar ? (
        <MobileNavbar routeInfoArr={props.routeInfoArr} />
      ) : (
        <FullNavbar routeInfoArr={props.routeInfoArr} />
      )}
    </TopNav>
  )
}
