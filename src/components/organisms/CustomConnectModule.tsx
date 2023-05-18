import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '../atoms/Button'
import { Tdiv } from '../atoms/Text'
import { Flex } from '../atoms/Flex'
import { UserImage } from '../molecules/UserImage'
import { shortenAddress } from '@/utils'
import { useEffect, useState } from 'react'
import { useEnsName } from 'wagmi'
import { CustomAvatar } from '../molecules/CustomAvatar'

export const CustomConnectModule = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const { data: ensName } = useEnsName()

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
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted
        const connected = ready && account && chain

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <Button transparent outlined onClick={openConnectModal}>
                    <Tdiv primary>Connect</Tdiv>
                  </Button>
                )
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} error>
                    Wrong network
                  </Button>
                )
              }
              return (
                <Flex gap={12}>
                  <Button
                    transparent
                    outlined
                    p={8}
                    style={{ borderRadius: '4px', minWidth: 'unset' }}
                    onClick={openChainModal}
                  >
                    <Flex>
                      <img
                        src={chain.iconUrl}
                        width={20}
                        height={20}
                        style={{ marginRight: '2px' }}
                        alt={chain.name}
                      />
                      <Tdiv nowrap autoAlignVertical>
                        {chain.name}
                      </Tdiv>
                    </Flex>
                  </Button>
                  <Button
                    transparent
                    outlined
                    p={8}
                    style={{ borderRadius: '4px', minWidth: 'unset' }}
                    onClick={openAccountModal}
                  >
                    <Flex between gap={5} itemsCenter>
                      <UserImage
                        width={20}
                        height={20}
                        style={{ margin: 'auto' }}
                      >
                        <CustomAvatar
                          address={account?.address ?? undefined}
                          size={20}
                        />
                      </UserImage>
                      {scrollPosition <= 40 &&
                        (account ? (
                          <Flex col around>
                            <Tdiv textAlign="left" t4>
                              {ensName ?? shortenAddress(account.address)}
                            </Tdiv>
                          </Flex>
                        ) : (
                          <Flex col around>
                            <Tdiv textAlign="left">Not connected</Tdiv>
                          </Flex>
                        ))}
                    </Flex>
                  </Button>
                </Flex>
              )
            })()}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}
