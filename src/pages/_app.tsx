import { useAppSelector } from '@/store/_hooks'
import type { AppProps } from 'next/app'
import { ReactNode, useEffect, useMemo } from 'react'
import { Provider } from 'react-redux'
import store from '../store/_store'
import GeneralUpdater from '../store/general/generalUpdater'
import ProviderUpdater from '../store/provider/providerUpdater'
import ToastUpdater from '../store/toast/toastUpdater'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { Goerli, Aurora, Mainnet, Fantom, Polygon } from '@/constants/networks'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import {
  ALCHEMY_ETHEREUM_API_KEY,
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_POLYGON_API_KEY,
} from '@/constants'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, Layout } from '@/components/atoms/Layout'
import { ToastContainer } from 'react-toastify'
import { lightTheme, darkTheme } from '../styles/themes'
import { Network, RouteInfo } from '@/constants/types'
import { Navbar } from '@/components/organisms/Navbar'
import { AnimatePresence, motion } from 'framer-motion'

import { getDarkMode } from '../store/darkMode'
import { toggleDarkTheme } from '../store/general/generalSlice'
import { useAppDispatch } from '../store/_hooks'
import { setShowApp } from '@/store/ui/uiSlice'

import '../styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/toast.css'
import { Flex } from '@/components/atoms/Flex'

import '@rainbow-me/rainbowkit/styles.css'
import {
  AvatarComponent,
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme as raindowDarkTheme,
} from '@rainbow-me/rainbowkit'
import makeBlockie from 'ethereum-blockies-base64'
import { UserImage } from '@/components/molecules/UserImage'
import { CustomAvatar } from '@/components/molecules/CustomAvatar'

const routeInfoArr: RouteInfo[] = [
  {
    name: 'Playground',
    title: 'Playground',
    to: 'playground',
  },
  {
    name: 'Risk Market',
    title: 'Risk Market',
    to: '',
    // children: ['/pool'],
  },
  {
    name: 'Dashboard',
    title: 'Dashboard',
    to: 'dashboard',
  },
]

function Updaters() {
  return (
    <>
      <GeneralUpdater />
      <ProviderUpdater />
      <ToastUpdater />
    </>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [Mainnet, Polygon, Aurora, Fantom, Goerli],
    [
      alchemyProvider({ apiKey: String(ALCHEMY_ETHEREUM_API_KEY) }),
      alchemyProvider({ apiKey: String(ALCHEMY_POLYGON_API_KEY) }),
      alchemyProvider({ apiKey: String(ALCHEMY_GOERLI_API_KEY) }),
      jsonRpcProvider({ rpc: (chain) => ({ http: 'https://rpc.ftm.tools/' }) }),
      jsonRpcProvider({
        rpc: (chain) => ({ http: 'https://mainnet.aurora.dev' }),
      }),
      publicProvider(),
    ]
  )

  const { connectors } = getDefaultWallets({
    appName: 'Solace',
    projectId: 'SOLACE_V2',
    chains,
  })

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
  })

  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <Updaters />
        <CustomRainbowKitProvider chains={chains}>
          <DarkModeProvider>
            <StyledThemeProvider>
              <Navbar routeInfoArr={routeInfoArr} />
              <Layout>
                <AnimatePresence mode="wait" initial={false}>
                  <GlobalStyle key={'_globalStyle'} />
                  <Component {...pageProps} />
                </AnimatePresence>
                <ToastContainer />
              </Layout>
            </StyledThemeProvider>
          </DarkModeProvider>
        </CustomRainbowKitProvider>
      </WagmiConfig>
    </Provider>
  )
}

function DarkModeProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // dispatch(toggleDarkTheme(getDarkMode()))
    const app = setTimeout(() => {
      dispatch(setShowApp(true))
    }, 1000)

    return () => {
      clearTimeout(app)
    }
  }, [])

  return <>{children}</>
}

function StyledThemeProvider({ children }: { children: ReactNode }) {
  const appTheme = useAppSelector((state) => state.general.appTheme)
  const theme = appTheme == 'light' ? lightTheme : darkTheme

  const showApp = useAppSelector((state) => state.ui.showApp)

  return (
    <ThemeProvider theme={theme}>
      {showApp ? (
        children
      ) : (
        <Flex
          itemsCenter
          justifyCenter
          style={{ height: '100vh', width: '100%', backgroundColor: '#000' }}
        >
          <div style={{ width: '200px', height: '200px' }}>
            <img
              src="/assets/svg/colored_spinner.svg"
              alt={'loading'}
              width={200}
              height={200}
            />
          </div>
        </Flex>
      )}
    </ThemeProvider>
  )
}

function CustomRainbowKitProvider({
  chains,
  children,
}: {
  chains: any[]
  children: ReactNode
}) {
  return (
    <RainbowKitProvider
      showRecentTransactions={true}
      modalSize="compact"
      theme={raindowDarkTheme()}
      chains={chains}
      avatar={CustomAvatar}
    >
      {children}
    </RainbowKitProvider>
  )
}
