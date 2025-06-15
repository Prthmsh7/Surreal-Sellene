import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useStoryProtocol } from '../providers/StoryProtocolProvider';

export function useStoryProtocolHook() {
  const { address } = useAccount();
  const [error, setError] = useState<string | null>(null);
  const { isInitialized, registerIP: registerIPFromProvider, getIPDetails: getIPDetailsFromProvider } = useStoryProtocol();

  // Register a new IP asset
  const registerNewIP = async (
    title: string,
    description: string,
    file?: File,
    type: 'text' | 'image' | 'music' | 'art' | 'writing' = 'text'
  ) => {
    if (!address) throw new Error('Wallet not connected');
    if (!isInitialized) throw new Error('Story Protocol not initialized');

    try {
      setError(null);
      await registerIPFromProvider({
        title,
        description,
        type,
        file,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register IP';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Fetch IP details
  const getIPDetails = async (ipId: string) => {
    if (!address) throw new Error('Wallet not connected');
    if (!isInitialized) throw new Error('Story Protocol not initialized');

    try {
      return await getIPDetailsFromProvider(address);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch IP details';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  return {
    loading: !isInitialized,
    error,
    registerNewIP,
    getIPDetails,
  };
} 