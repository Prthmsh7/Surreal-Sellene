import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { TomoEVMKitProvider, getDefaultConfig } from '@tomo-inc/tomo-evm-kit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import '@tomo-inc/tomo-evm-kit/styles.css';

const config = getDefaultConfig({
    clientId: 'foagCugAzwQrEyWjETM3x0VTAtp1YG9ZL6blI6c5rDZEGnfQxJripV1vkxxmS3nzVVGNHoDieV8NbAPlXlbNnrDj',
    appName: 'Sellene',
    projectId: 'a6fe50d71ddcd662f68ae2708132b51f',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
});

const queryClient = new QueryClient();

export function TomoProvider({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <TomoEVMKitProvider>
                    {children}
                </TomoEVMKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
} 