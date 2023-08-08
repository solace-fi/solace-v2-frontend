import { AvatarComponent } from '@rainbow-me/rainbowkit'
import makeBlockie from 'ethereum-blockies-base64'
import Image from 'next/image'

export const CustomAvatar: AvatarComponent = ({
  address,
}: {
  address?: string
}) => {
  return address ? (
    <Image src={makeBlockie(address)} alt={'account'} width={40} height={40} />
  ) : (
    <Image src="/assets/svg/unconnected_user.svg" alt={'unconnected user'} />
  )
}
