/*************************************************************************************

    Table of Contents:

    import packages
    import components
    import resources

    Logo
      Render

  *************************************************************************************/

/* import packages */
import React from 'react'

/* import components */
import { LogoBase } from '../atoms/Logo'
import { GeneralProps } from '../general'
import Image from 'next/image'

interface LogoProps {
  location: any
}

export const Logo: React.FC<GeneralProps & LogoProps> = ({ ...props }) => {
  /*************************************************************************************

    Render

  *************************************************************************************/
  return (
    <LogoBase {...props}>
      <Image src={''} alt="Logo" />
    </LogoBase>
  )
}

export const MiniLogo: React.FC<
  GeneralProps & LogoProps & { style?: React.CSSProperties }
> = ({ ...props }) => {
  /*************************************************************************************

    Render

  *************************************************************************************/
  return (
    <LogoBase {...props} width={40}>
      <Image src={''} alt="Logo" />
    </LogoBase>
  )
}
