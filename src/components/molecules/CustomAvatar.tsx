import { AvatarComponent } from '@rainbow-me/rainbowkit'
import makeBlockie from 'ethereum-blockies-base64'

export const CustomAvatar: AvatarComponent = ({
  address,
}: {
  address?: string
}) => {
  return address ? (
    <img src={makeBlockie(address)} alt={'account'} width={40} height={40} />
  ) : (
    <img src="/assets/svg/unconnected_user.svg" alt={'unconnected user'} />
  )
}
