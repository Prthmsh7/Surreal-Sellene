import './polyfills';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TomoEVMKitProvider } from '@tomo-inc/tomo-evm-kit';
import { TOMO_CONFIG } from './config/tomo';
import { getDefaultConfig } from '@tomo-inc/tomo-evm-kit';
import { mainnet, sepolia } from 'wagmi/chains';
import App from './App';

// Configure wagmi
const config = getDefaultConfig({
  clientId: TOMO_CONFIG.clientId,
  appName: TOMO_CONFIG.metadata.name,
  projectId: TOMO_CONFIG.projectId,
  chains: [mainnet, sepolia],
  ssr: false
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <TomoEVMKitProvider
          options={{
            appName: TOMO_CONFIG.metadata.name,
            projectId: TOMO_CONFIG.projectId,
            clientId: TOMO_CONFIG.clientId,
            modalSize: 'wide',
            theme: {
              mode: 'dark',
              accentColor: '#0066cc',
              borderRadius: 'medium'
            },
            showRecentTransactions: true,
            coolMode: true,
            socialsFirst: true,
            initialChain: sepolia,
            _noOtherWallets: false,
            appInfo: {
              name: TOMO_CONFIG.metadata.name,
              description: TOMO_CONFIG.metadata.description,
              url: TOMO_CONFIG.metadata.url,
              icons: TOMO_CONFIG.metadata.icons
            },
            walletConnect: {
              projectId: TOMO_CONFIG.projectId,
              metadata: {
                name: TOMO_CONFIG.metadata.name,
                description: TOMO_CONFIG.metadata.description,
                url: TOMO_CONFIG.metadata.url,
                icons: TOMO_CONFIG.metadata.icons
              }
            },
            chains: TOMO_CONFIG.chains
          }}
        >
          <App />
        </TomoEVMKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
