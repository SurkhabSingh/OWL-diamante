import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { ReactNode } from "react";

// 0. Setup queryClient

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

// 0. Setup queryClient

// 1. Get projectId at https://cloud.walletconnect.com
export const projectId = "6082a50d2b5eb6813af950b294b44f7f";

// 2. Create wagmiConfig
const metadata = {
  name: "Owl.gg",
  description: "gaming through blockchain",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // Optional - Override createConfig parameters
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true,
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": '"Urbanist", "sans-serif"',
    "--w3m-color-mix": "#1F1C18",
    "--w3m-color-mix-strength": 40,
    "--w3m-accent": "#1F1C18",
    "--w3m-font-size-master": "12px",
    "--w3m-border-radius-master": "2px",
  },
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
