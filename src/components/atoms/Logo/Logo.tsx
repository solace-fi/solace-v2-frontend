import { LogoBase } from '.'
import Image from 'next/image'

export const Logo = ({ ...props }) => {
  return (
    // <LogoBase {...props}>
    <Image src="/assets/svg/logo.svg" alt="logo" width={24} height={24} />
    // {/* </LogoBase> */}
  )
}
