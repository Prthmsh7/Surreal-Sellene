import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TomoEVMKitProvider, getDefaultConfig } from '@tomo-inc/tomo-evm-kit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import '@tomo-inc/tomo-evm-kit/styles.css';
import App from './App';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}

// Initialize Tomo SDK config
const config = getDefaultConfig({
  clientId: 'foagCugAzwQrEyWjETM3x0VTAtp1YG9ZL6blI6c5rDZEGnfQxJripV1vkxxmS3nzVVGNHoDieV8NbAPlXlbNnrDj',
  appName: 'Sellene',
  projectId: 'a6fe50d71ddcd662f68ae2708132b51f',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <TomoEVMKitProvider
            options={{
              appName: 'Sellene',
              projectId: 'a6fe50d71ddcd662f68ae2708132b51f',
              clientId: 'foagCugAzwQrEyWjETM3x0VTAtp1YG9ZL6blI6c5rDZEGnfQxJripV1vkxxmS3nzVVGNHoDieV8NbAPlXlbNnrDj',
              modalSize: 'wide',
              theme: {
                mode: 'light',
                accentColor: '#0066cc',
                borderRadius: 'medium'
              }
            }}
          >
            <App />
          </TomoEVMKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorBoundary>
  </React.StrictMode>
); 