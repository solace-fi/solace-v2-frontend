import { NETWORKS } from "@/constants/networks";
import useDebounce from "@/hooks/useDebounce";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../_hooks";
import { updateActiveNetwork, updateShowTestnets } from "./networkSlice";

export default function Updater() {
  const { chainId, provider: library } = useWeb3React();
  const dispatch = useAppDispatch();

  const [activeChainId, setActiveChainId] = useState<number | undefined>(
    chainId
  );
  const activeNetwork = useAppSelector((state) => state.network.activeNetwork);

  useEffect(() => {
    if (library && chainId) {
      setActiveChainId(chainId);
    }
  }, [dispatch, library, chainId]);

  const debouncedChainId = useDebounce(activeChainId, 100);

  useEffect(() => {
    const network = debouncedChainId
      ? NETWORKS.find((network) => network.chainId == debouncedChainId) ?? null
      : null;
    dispatch(updateActiveNetwork(network ?? NETWORKS[0]));
  }, [dispatch, debouncedChainId]);

  useEffect(() => {
    dispatch(updateShowTestnets(activeNetwork.isTestnet));
  }, [dispatch, activeNetwork]);

  return null;
}
