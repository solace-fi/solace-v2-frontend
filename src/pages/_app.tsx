import { useAppSelector } from '@/store/_hooks'
import type { AppProps } from 'next/app'
import { ReactNode, useMemo } from 'react'
import { Provider } from 'react-redux'
import store from '../store/_store'
import GeneralUpdater from '../store/general/generalUpdater'
import ProviderUpdater from '../store/provider/providerUpdater'
import ToastUpdater from '../store/toast/toastUpdater'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { Goerli, Aurora, Mainnet, Fantom, Polygon } from '@/constants/networks'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { LedgerConnector } from 'wagmi/connectors/ledger'
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
import { RouteInfo } from '@/constants/types'
import { Navbar } from '@/components/organisms/Navbar'
import { AnimatePresence } from 'framer-motion'
import '../styles/index.css'

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

  const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    connectors: [
      new InjectedConnector({ chains }),
      // new WalletConnectConnector({
      //   chains,
      //   options: {
      //     projectId: '...',
      //   },
      // }),
      new LedgerConnector({ chains }),
      new CoinbaseWalletConnector({ chains, options: { appName: 'wagmi.sh' } }),
    ],
  })

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

  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <StyledThemeProvider>
          <Updaters />
          <Navbar routeInfoArr={routeInfoArr} />
          <Layout>
            <AnimatePresence mode="wait" initial={false}>
              <GlobalStyle key={'_globalStyle'} />
              <Component {...pageProps} />
              <ToastContainer key={'_toastContainer'} />
            </AnimatePresence>
          </Layout>
        </StyledThemeProvider>
      </WagmiConfig>
    </Provider>
  )
}

function StyledThemeProvider({ children }: { children: ReactNode }) {
  const appTheme = useAppSelector((state) => state.general.appTheme)
  const theme = appTheme == 'light' ? lightTheme : darkTheme

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
