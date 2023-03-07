import {
  useEagerConnect,
  useInactiveListener,
} from "@/hooks/wallet/useEagerlyConnect";
import { useRef } from "react";
import { useAppSelector } from "../_hooks";

export default function Updater() {
  const manuallyDisconnected = useAppSelector(
    (state) => state.wallet.manuallyDisconnected
  );

  const triedEager = useEagerConnect();
  const triedEagerRef = useRef(triedEager);
  triedEagerRef.current = triedEager;
  useInactiveListener(triedEager && !manuallyDisconnected);
  return null;
}
