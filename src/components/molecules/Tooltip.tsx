/* import packages */
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip'
import styled, { css } from 'styled-components'
import 'react-tooltip/dist/react-tooltip.css'

/* import constants */
import { BKPT_MOBILE_END, Z_TOOLTIP } from '../../constants'

/* import components */
import { StyledLinkExternal } from '../atoms/Icon'
import { Tdiv } from '../atoms/Text'

/* import hooks */
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { HyperLink } from '../atoms/Link'

type StyledTooltipProps = {
  id: string
  tip: string
  link?: string
}

const CustomTooltipCss = css`
  max-width: 350px;
  font-size: 14px !important;
  pointer-events: auto !important;
  cursor: pointer;
  z-index: ${Z_TOOLTIP};
  &:hover {
    visibility: visible !important;
    opacity: 1 !important;
  }
`

const CustomTooltip = styled(Tooltip)`
  background-color: ${({ theme }) => theme.backgroundSurface} !important;
  ${CustomTooltipCss}
`

export function StyledNavTooltip({
  id,
  tip,
  children,
}: StyledTooltipProps & PropsWithChildren): JSX.Element {
  const { width } = useWindowDimensions()

  return (
    <>
      {width <= BKPT_MOBILE_END ? (
        <>
          <div id={id} data-tooltip-content={tip} style={{ padding: '4px 0' }}>
            {children}
          </div>
          <CustomTooltip
            anchorId={id}
            delayShow={100}
            delayHide={100}
            place="right"
          >
            <Tdiv t4 primary>
              {tip}
            </Tdiv>
          </CustomTooltip>
        </>
      ) : (
        children
      )}
    </>
  )
}

export function StyledTooltip({
  id,
  tip,
  children,
  alwaysShowChildren,
  disabled,
  link,
}: PropsWithChildren &
  StyledTooltipProps & {
    alwaysShowChildren?: boolean
    disabled?: boolean
  }): JSX.Element {
  /*************************************************************************************

  hooks

  *************************************************************************************/
  const { isDesktop } = useWindowDimensions()
  const [showChildren, setShowChildren] = useState<boolean>(false)
  const [isOnDesktop, setIsOnDesktop] = useState<boolean>(false)
  const [localLink, setLocalLink] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (alwaysShowChildren != undefined) setShowChildren(alwaysShowChildren)
  }, [alwaysShowChildren])

  useEffect(() => {
    setIsOnDesktop(isDesktop)
  }, [isDesktop])

  useEffect(() => {
    setLocalLink(link)
  }, [link])

  return (
    <>
      {isOnDesktop ? (
        <div>
          {disabled ? (
            children
          ) : (
            <>
              <a data-tooltip-id={id}>{children}</a>
              {localLink ? (
                <CustomTooltip id={id} clickable>
                  <HyperLink
                    href={localLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    <Tdiv t4 primary>
                      {tip}
                    </Tdiv>
                    <br />
                    <Tdiv inquiry textAlign="center" mt={1} bold>
                      Learn more {/* <StyledLinkExternal size={20} /> */}
                      <StyledLinkExternal className="h-5" />
                    </Tdiv>
                  </HyperLink>
                </CustomTooltip>
              ) : (
                <CustomTooltip id={id}>
                  <Tdiv t4 primary>
                    {tip}
                  </Tdiv>
                </CustomTooltip>
              )}
            </>
          )}
        </div>
      ) : showChildren ? (
        children
      ) : null}
    </>
  )
}
