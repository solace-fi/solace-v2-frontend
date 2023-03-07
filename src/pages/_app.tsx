import useOrderedConnections from "@/hooks/wallet/useOrderedConnections";
import { useAppSelector } from "@/store/_hooks";
import { Connection, getConnectionName } from "@/wallet";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import type { AppProps } from "next/app";
import { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";
import store from "../store/_store";
import GeneralUpdater from "../store/general/generalUpdater";
import ProviderUpdater from "../store/provider/providerUpdater";
import NetworkUpdater from "../store/network/networkUpdater";
import WalletUpdater from "../store/wallet/walletUpdater";

export function Web3Provider({ children }: { children: ReactNode }) {
  const selectedProvider = useAppSelector(
    (state) => state.general.selectedProvider
  );

  const connections = useOrderedConnections(selectedProvider);
  const connectors: [Connector, Web3ReactHooks][] = connections.map(
    ({ hooks, connector }) => [connector, hooks]
  );
  const key = useMemo(
    () =>
      connections
        .map(({ type }: Connection) => getConnectionName(type))
        .join("-"),
    [connections]
  );
  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  );
}

function Updaters() {
  return (
    <>
      <GeneralUpdater />
      <ProviderUpdater />
      <NetworkUpdater />
      <WalletUpdater />
    </>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Web3Provider>
        <Updaters />
        <Component {...pageProps} />
      </Web3Provider>
    </Provider>
  );
}
