import { useCallback, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { Connection } from "../../wallet";
import { setSelectedProvider } from "@/store/general/generalSlice";
import { setManuallyDisconnected } from "@/store/wallet/walletSlice";
import { useAppDispatch } from "@/store/_hooks";

export const useWalletHandler = (): {
  connect: (connection: Connection, eagerlyConnect?: boolean) => Promise<void>;
  disconnect: () => void;
} => {
  const { connector } = useWeb3React();
  const connecting = useRef(false);
  const dispatch = useAppDispatch();

  const connect = useCallback(
    async (connection: Connection, eagerlyConnect?: boolean) => {
      if (connecting.current) return;
      connecting.current = true;
      try {
        if (connection.connector.connectEagerly && eagerlyConnect) {
          await connection.connector.connectEagerly();
        } else {
          await connection.connector.activate();
        }
        onSuccess();
      } catch (error) {
        console.log("error", error);
        onError();
      }
      connecting.current = false;

      function onSuccess() {
        dispatch(setSelectedProvider(connection.type));
        dispatch(setManuallyDisconnected(false));
        console.log("success");
      }

      function onError() {
        console.log("error");
      }
    },
    [dispatch]
  );

  const disconnect = useCallback(() => {
    if (connector) {
      if (connector.deactivate) {
        connector.deactivate();
      } else {
        connector.resetState();
      }
      dispatch(setManuallyDisconnected(true));
      dispatch(setSelectedProvider(null));
    }
  }, [dispatch, connector]);

  return {
    connect,
    disconnect,
  };
};
