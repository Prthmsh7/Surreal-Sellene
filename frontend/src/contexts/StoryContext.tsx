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

interface StoryContextType {
  loading: boolean;
  error: string | null;
  registeredIPs: Array<{ ipId: string; title: string; description: string }>;
  refreshIPs: () => Promise<void>;
  registerIP: (title: string, description: string, mediaUrl: string) => Promise<string>;
}

const defaultContext: StoryContextType = {
  loading: false,
  error: null,
  registeredIPs: [],
  refreshIPs: async () => {},
  registerIP: async () => ''
};

const StoryContext = createContext<StoryContextType>(defaultContext);

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

      // Format IP ID based on wallet address and timestamp
      const timestamp = Date.now();
      const ipId = `story:${address.toLowerCase()}:${timestamp}`;
      
      // Add the new IP to the list
      const newIP = {
        ipId,
        title,
        description
      };
      
      setRegisteredIPs(prev => [...prev, newIP]);
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

  const value: StoryContextType = {
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

export const useStory = () => {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
}; 