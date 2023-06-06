import { SVGProps } from 'react'
import styled, { css } from 'styled-components'
// import { ArrowDropDown } from '@styled-icons/material-rounded/ArrowDropDown'
// import { Checkmark } from '@styled-icons/evaicons-solid/Checkmark'
// import { Copy } from '@styled-icons/boxicons-regular/Copy'
// import { DarkMode } from '@styled-icons/material-outlined/DarkMode'
// import { DarkTheme } from '@styled-icons/fluentui-system-regular/DarkTheme'
// import { Discord } from '@styled-icons/simple-icons/Discord'
// import { DocumentText } from '@styled-icons/typicons/DocumentText'
// import { Documents } from '@styled-icons/ionicons-sharp/Documents'
// import { Calendar } from '@styled-icons/ionicons-sharp/Calendar'
// import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded'
// import { Github } from '@styled-icons/boxicons-logos/Github'
// import { History } from '@styled-icons/boxicons-regular/History'
// import { Info } from '@styled-icons/fluentui-system-regular/Info'
// import { LinkExternal } from '@styled-icons/boxicons-regular/LinkExternal'
// import { Medium } from '@styled-icons/boxicons-logos/Medium'
// import { Menu } from '@styled-icons/boxicons-regular/Menu'
// import { NetworkChart } from '@styled-icons/boxicons-regular/NetworkChart'
// import { PeopleCommunity } from '@styled-icons/fluentui-system-filled/PeopleCommunity'
// import { Sun } from '@styled-icons/evaicons-solid/Sun'
// import { Twitter } from '@styled-icons/boxicons-logos/Twitter'
// import { Wallet } from '@styled-icons/boxicons-solid/Wallet'
// import { Warning } from '@styled-icons/fluentui-system-regular/Warning'
// import { ArrowIosBackOutline } from '@styled-icons/evaicons-outline/ArrowIosBackOutline'

// export const StyledIconCss = css`
//   margin: auto;
//   display: block;
// `

// export const StyledHistory = styled(History)`
//   display: block;
// `

// export const StyledWallet = styled(Wallet)`
//   display: block;
// `

// export const StyledNetworkChart = styled(NetworkChart)`
//   display: block;
// `

// export const StyledDots = styled(DotsHorizontalRounded)`
//   margin: auto 0;
//   display: block;
// `

// export const StyledInfo = styled(Info)``

// export const StyledCommunity = styled(PeopleCommunity)``

// export const StyledDiscord = styled(Discord)``

// export const StyledTwitter = styled(Twitter)``

// export const StyledGithub = styled(Github)``

// export const StyledMedium = styled(Medium)``

// export const StyledDocuments = styled(Documents)``

// export const StyledDocumentText = styled(DocumentText)``

// export const StyledSun = styled(Sun)``

// export const StyledMoon = styled(DarkMode)``

// export const StyledTheme = styled(DarkTheme)``

// export const StyledArrowDropDown = styled(ArrowDropDown)``

// export const StyledLinkExternal = styled(LinkExternal)``

// export const StyledMenu = styled(Menu)`
//   ${StyledIconCss}
// `

// export const StyledCheckmark = styled(Checkmark)`
//   ${StyledIconCss}
// `

// export const StyledWarning = styled(Warning)`
//   ${StyledIconCss}
// `

// export const StyledCopy = styled(Copy)``

// export const StyledArrowIosBackOutline = styled(ArrowIosBackOutline)``

// export const StyledCalendar = styled(Calendar)``
export default function DefaultIcon() {
  return styled.div``
}

const SvgWrapper = styled.svg`
  fill: currentColor;
`

type SvgWrapperProps = Omit<SVGProps<SVGSVGElement>, 'ref'>

// styled checkmark and copy

export const StyledCheckmark: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgWrapper>
  )
}

export const StyledCopy: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15 15H9a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgWrapper>
  )
}

// StyledMenu, StyledMoon, StyledSun

export const StyledMenu: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="3"
        y1="9"
        x2="21"
        y2="9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="3"
        y1="15"
        x2="21"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgWrapper>
  )
}

export const StyledMoon: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        clipRule="evenodd"
        d="M12 20a8 8 0 100-16 8 8 0 000 16z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgWrapper>
  )
}

export const StyledSun: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 1v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 21v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4.22 4.22l1.42 1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18.36 18.36l1.42 1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M1 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M21 12h2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4.22 19.78l1.42-1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18.36 5.64l1.42-1.42"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgWrapper>
  )
}

// StyledArrowIosBackOutline

export const StyledArrowIosBackOutline: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <polyline
        points="15 18 9 12 15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgWrapper>
  )
}

// StyledLinkExternal

export const StyledLinkExternal: React.FC<SvgWrapperProps> = (props) => {
  return (
    <SvgWrapper
      {...props}
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 19V5M5 12l7-7 7 7"
        ></path>
      </g>
    </SvgWrapper>
  )
}
