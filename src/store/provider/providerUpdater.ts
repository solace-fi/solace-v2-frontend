import { RPC_PROVIDERS } from "@/constants/networks";
import { useFetchGasData } from "@/hooks/provider/useGas";
import { useGetLatestBlock } from "@/hooks/provider/useGetLatestBlock";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../_hooks";
import { setGasData, setLatestBlock, setProvider } from "./providerSlice";

export default function Updater() {
  const dispatch = useAppDispatch();
  const activeNetwork = useAppSelector((state) => state.network.activeNetwork);
  const provider = useAppSelector((state) => state.provider.provider);

  const { blockNumber, blockTimestamp } = useGetLatestBlock();
  const gasData = useFetchGasData(provider);

  useEffect(() => {
    dispatch(setProvider(RPC_PROVIDERS[activeNetwork.chainId]));
  }, [dispatch, activeNetwork]);

  useEffect(() => {
    if (blockNumber && blockTimestamp) {
      dispatch(
        setLatestBlock({ number: blockNumber, timestamp: blockTimestamp })
      );
    }
  }, [dispatch, blockNumber, blockTimestamp]);

  useEffect(() => {
    if (gasData) {
      dispatch(setGasData(gasData));
    }
  }, [dispatch, gasData]);

  return null;
}
