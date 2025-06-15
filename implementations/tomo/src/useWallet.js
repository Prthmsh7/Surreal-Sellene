import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import { getDefaultConfig } from '@tomo-inc/tomo-evm-kit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';

export function useWallet() {
    const { openConnectModal } = useConnectModal();

    const connect = async () => {
        try {
            await openConnectModal();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    return {
        connect,
    };
} 