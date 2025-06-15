import { http } from 'viem';
import { mainnet, sepolia } from 'viem/chains';
import { createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

// Configure chains
const chains = [mainnet, sepolia] as const;

// Set up wagmi config
export const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    injected()
  ],
}); 