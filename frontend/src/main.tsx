import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TomoEVMKitProvider, getDefaultConfig } from '@tomo-inc/tomo-evm-kit'
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains'
import '@tomo-inc/tomo-evm-kit/styles.css'
import App from './App'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import { TOMO_CONFIG } from './config/tomo'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

// Initialize Tomo SDK config with updated settings
const config = getDefaultConfig({
  clientId: TOMO_CONFIG.clientId,
  appName: TOMO_CONFIG.metadata.name,
  projectId: TOMO_CONFIG.projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
  enableWalletConnect: true,
  enableInjected: true,
  enableCoinbase: true,
  enableMetaMask: true,
  autoConnect: false
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <TomoEVMKitProvider
            options={{
              appName: TOMO_CONFIG.metadata.name,
              projectId: TOMO_CONFIG.projectId,
              clientId: TOMO_CONFIG.clientId,
              modalSize: 'wide',
              theme: {
                mode: 'light',
                accentColor: '#0066cc',
                borderRadius: 'medium'
              },
              enableWalletConnect: true,
              enableInjected: true,
              enableCoinbase: true,
              enableMetaMask: true,
              autoConnect: false
            }}
          >
            <App />
          </TomoEVMKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
