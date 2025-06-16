import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { mainnet } from 'wagmi/chains';

interface IP {
  id: string;
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registeredIPs, setRegisteredIPs] = useState<Array<{ ipId: string; title: string; description: string }>>([]);

  useEffect(() => {
    if (address) {
      refreshIPs();
    }
  }, [address]);

  const refreshIPs = async () => {
    if (!address) return;
    
    try {
      setLoading(true);
      setError(null);

      // Format IP ID based on wallet address
      const ipId = `story:${address.toLowerCase()}`;
      
      // For now, we'll just show the wallet's IP
      setRegisteredIPs([{
        ipId,
        title: 'My Story Protocol IP',
        description: 'IP registered on Story Protocol'
      }]);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch IPs';
      setError(errorMessage);
      console.error('Error fetching IPs:', err);
    } finally {
      setLoading(false);
    }
  };

  const registerIP = async (title: string, description: string, mediaUrl: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    try {
      setLoading(true);
      setError(null);

      // Format IP ID based on wallet address
      const ipId = `story:${address.toLowerCase()}`;
      
      // For now, we'll just return the IP ID
      // In a real implementation, this would interact with the Story Protocol smart contract
      await refreshIPs();
      return ipId;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to register IP';
      setError(errorMessage);
      console.error('Error registering IP:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    error,
    registeredIPs,
    refreshIPs,
    registerIP
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}

const StoryContext = createContext<{
  loading: boolean;
  error: string | null;
  registeredIPs: Array<{ ipId: string; title: string; description: string }>;
  refreshIPs: () => Promise<void>;
  registerIP: (title: string, description: string, mediaUrl: string) => Promise<string>;
}>({
  loading: false,
  error: null,
  registeredIPs: [],
  refreshIPs: async () => {},
  registerIP: async () => ''
});

export const useStory = () => useContext(StoryContext); 