import React, { use, useEffect, useMemo, useState } from 'react'
import { Accordion } from '../atoms/Accordion'
import { Button, ButtonAppearance } from '../atoms/Button'
import {
  InputSectionWrapper,
  StyledGenericIconAndText,
  StyledInput,
} from '../atoms/Input'
import { Flex } from '../atoms/Flex'
import { Tdiv } from '../atoms/Text'
import { TokenInfo } from '../../constants/types'
import { truncateValue } from '../../utils/formatting'
// import { StyledArrowDropDown } from '../atoms/Icon'
import { Card } from '../atoms/Card'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { useAppSelector } from '@/store/_hooks'
import { formatUnits } from 'viem'

export const GenericInputSection = ({
  hasArrow,
  frontIcon,
  frontButtonText,
  backButtonText,
  isOpen,
  value,
  onChange,
  onClickFront,
  onClickBack,
  inputDisabled,
  frontButtonDisabled,
  backButtonDisabled,
  w,
  style,
  inputWidth,
  placeholder,
  nohover,
  displayIconOnMobile = true,
}: {
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasArrow?: boolean
  onClickFront?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickBack?: (e: React.ChangeEvent<HTMLInputElement>) => void
  frontButtonDisabled?: boolean
  backButtonDisabled?: boolean
  frontIcon?: JSX.Element
  frontButtonText?: string
  backButtonText?: string
  isOpen?: boolean
  inputDisabled?: boolean
  w?: number
  style?: React.CSSProperties
  inputWidth?: number
  placeholder?: string
  nohover?: boolean
  displayIconOnMobile?: boolean
}): JSX.Element => {
  const appTheme = useAppSelector((state) => state.general.appTheme)

  const { isMobile } = useWindowDimensions()

  const rawStyle = {
    ...style,
    width: w ? w : '100%',
    height: '50px',
    borderRadius: '4px',
  }

  const gradientStyle = useMemo(
    () =>
      appTheme == 'light'
        ? { techygradient: true, warmgradient: false }
        : { techygradient: false, warmgradient: true },
    [appTheme]
  )

  const [inputStyle, setInputStyle] = useState<React.CSSProperties>({
    backgroundColor: 'inherit',
    color: 'inherit',
    borderRadius: 'inherit',
    width: '100%',
    outline: 'none',
    border: 'inherit',
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    fontSize: 'inherit',
  })

  const [canCreateFront, setCanCreateFront] = useState<boolean>(false)

  useEffect(() => {
    const toggle =
      ((frontIcon != undefined || frontButtonText != undefined) &&
        isMobile &&
        displayIconOnMobile) ||
      ((frontIcon != undefined || frontButtonText != undefined) && !isMobile)
    setCanCreateFront(toggle)
  }, [isMobile, frontIcon, frontButtonText, displayIconOnMobile])

  const inputOnMobile = isMobile && !displayIconOnMobile

  const canClickFront =
    frontIcon != undefined ||
    frontButtonText != undefined ||
    onClickFront != undefined

  useEffect(() => {
    setInputStyle({
      ...inputStyle,
      width: inputWidth ?? '100%',
      borderTopLeftRadius: inputOnMobile
        ? '4px'
        : canClickFront
        ? '0px'
        : 'inherit',
      borderBottomLeftRadius: inputOnMobile
        ? '4px'
        : canClickFront
        ? '0px'
        : 'inherit',
      borderTopRightRadius: onClickBack ? '0px' : 'inherit',
      borderBottomRightRadius: onClickBack ? '0px' : 'inherit',
    })
  }, [inputOnMobile, canClickFront, onClickBack])

  const arrowStyle = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  }

  return (
    <InputSectionWrapper style={rawStyle}>
      {canCreateFront &&
        (onClickFront != undefined ? (
          <Button
            nohover={nohover}
            inquiry
            widthP={100}
            style={{
              justifyContent: 'center',
              height: '50px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
            onClick={onClickFront}
            disabled={frontButtonDisabled}
          >
            <Flex center gap={4}>
              <Tdiv autoAlignVertical lightPrimary>
                {frontIcon ?? ''}
              </Tdiv>
              <Tdiv lightPrimary t4 {...gradientStyle}>
                {frontButtonText ?? ''}
              </Tdiv>
              {hasArrow ? (
                // <StyledArrowDropDown style={arrowStyle} size={18} />
                // icon arrow is bad, let's just make it unicode
                <Tdiv lightPrimary t4 {...gradientStyle}>
                  ▼
                </Tdiv>
              ) : null}
            </Flex>
          </Button>
        ) : (
          <StyledGenericIconAndText>
            {frontIcon ?? ''}
            <Tdiv t5 secondary>
              {frontButtonText}
            </Tdiv>
          </StyledGenericIconAndText>
        ))}
      <StyledInput
        type="text"
        placeholder={placeholder ?? '0'}
        value={value ?? ''}
        onChange={onChange}
        style={inputStyle}
        disabled={inputDisabled}
      />
      {onClickBack ? (
        <Button
          onClick={onClickBack}
          disabled={backButtonDisabled}
          nohover={nohover}
          style={{
            border: 'inherit',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
          }}
        >
          {backButtonText ?? 'MAX'}
        </Button>
      ) : null}
    </InputSectionWrapper>
  )
}

export const DropdownOptions = ({
  comparingList,
  searchedList,
  isOpen,
  noneText,
  onClick,
  customProcessFunction,
  customHeight,
}: {
  comparingList?: string[]
  searchedList: { label: string; value: string; iconUrl?: string }[]
  isOpen: boolean
  noneText?: string
  onClick: (value: string) => void
  customProcessFunction?: (value: string) => string
  customHeight?: number
}): JSX.Element => {
  const appTheme = useAppSelector((state) => state.general.appTheme)

  const gradientStyle = useMemo(
    () =>
      appTheme == 'light'
        ? { techygradient: true, warmgradient: false }
        : { techygradient: false, warmgradient: true },
    [appTheme]
  )
  return (
    <Accordion
      isOpen={isOpen}
      style={{ marginTop: isOpen ? 12 : 0, position: 'relative' }}
      customHeight={`${customHeight ?? 380}px`}
      noBackgroundColor
      thinScrollbar
    >
      <Flex col gap={8} p={12}>
        {searchedList.map((item, i) => (
          <ButtonAppearance
            key={i}
            pt={10.5}
            pb={10.5}
            pl={12}
            pr={12}
            onClick={() => onClick(item.value)}
            disabled={
              comparingList ? comparingList.includes(item.label) : false
            }
            style={{ borderRadius: '8px' }}
          >
            <Flex stretch gap={12}>
              <Flex gap={8} itemsCenter>
                {item.iconUrl ? (
                  <img src={item.iconUrl} height={24} alt={item.iconUrl} />
                ) : (
                  <Tdiv {...gradientStyle}>{item.label}</Tdiv>
                )}
              </Flex>
              <Tdiv autoAlignVertical bold>
                {customProcessFunction
                  ? customProcessFunction(item.value)
                  : item.value}
              </Tdiv>
            </Flex>
          </ButtonAppearance>
        ))}
        {searchedList.length === 0 && (
          <Tdiv t3 textAlign="center" bold>
            {noneText ?? 'No results found'}
          </Tdiv>
        )}
      </Flex>
    </Accordion>
  )
}

export const BalanceDropdownOptions = ({
  searchedList,
  isOpen,
  noneText,
  ignorePrice,
  onClick,
  comparingList,
}: {
  searchedList: TokenInfo[]
  isOpen: boolean
  noneText?: string
  ignorePrice?: boolean
  comparingList?: string[]
  onClick?: (value: string) => void
}): JSX.Element => {
  const appTheme = useAppSelector((state) => state.general.appTheme)

  const gradientStyle = useMemo(
    () =>
      appTheme == 'light'
        ? { techygradient: true, warmgradient: false }
        : { techygradient: false, warmgradient: true },
    [appTheme]
  )

  return (
    <Accordion
      isOpen={isOpen}
      style={{ marginTop: isOpen ? 12 : 0, position: 'relative' }}
      customHeight={'380px'}
    >
      <Flex col gap={8} p={12}>
        {searchedList.map((item, i) => (
          <Card
            key={i}
            py={16}
            onClick={() => (onClick ? onClick(item.address) : undefined)}
            disabled={
              comparingList
                ? comparingList.includes(item.address.toLowerCase())
                : false
            }
          >
            <Flex stretch between pl={16} pr={16}>
              <Flex gap={8} itemsCenter>
                <img
                  src={`https://assets.solace.fi/${item.name.toLowerCase()}`}
                  width={16}
                  height={16}
                  alt={item.name}
                />
                <Tdiv {...gradientStyle}>{item.symbol}</Tdiv>
              </Flex>
              <Tdiv autoAlignVertical>
                {item.price > 0 && !ignorePrice
                  ? `~$${truncateValue(
                      parseFloat(formatUnits(item.balance, item.decimals)) *
                        item.price,
                      2
                    )}`
                  : `${truncateValue(
                      formatUnits(item.balance, item.decimals),
                      2
                    )}`}
              </Tdiv>
            </Flex>
          </Card>
        ))}
        {searchedList.length === 0 && (
          <Tdiv t3 textAlign="center" bold>
            {noneText ?? 'No results found'}
          </Tdiv>
        )}
      </Flex>
    </Accordion>
  )
}
