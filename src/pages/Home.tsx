import { setSelectedProvider } from "@/store/general/generalSlice";
import { useAppSelector, useAppDispatch } from "@/store/_hooks";
import { useWeb3React } from "@web3-react/core";

export default function Home() {
  const selectedProvider = useAppSelector(
    (state) => state.general.selectedProvider
  );
  const minute = useAppSelector((state) => state.general.minute);
  const block = useAppSelector((state) => state.provider.latestBlock);
  const { chainId, provider, account, connector } = useWeb3React();

  return (
    <div>
      <h1>{selectedProvider}</h1>
      <h1>{minute}</h1>
      <h1>{block.number}</h1>
      <h1>{chainId}</h1>
      <h1>{account}</h1>
    </div>
  );
}
