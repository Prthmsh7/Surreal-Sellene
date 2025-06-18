import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { ENDPOINTS } from '../config/api';

interface RegisterIPResponse {
  ipId: string;
  tokenId: string;
  success: boolean;
}

interface StoryContextType {
  registeredIPs: Array<{ ipId: string; title: string; description: string; mediaUrl: string }>;
  refreshIPs: () => Promise<void>;
  registerIP: (name: string, description: string, mediaUrl: string) => Promise<RegisterIPResponse>;
  isLoading: boolean;
}

const defaultContext: StoryContextType = {
  registeredIPs: [],
  refreshIPs: async () => {},
  registerIP: async () => ({ ipId: '', tokenId: '', success: false }),
  isLoading: false
};

const StoryContext = createContext<StoryContextType>(defaultContext);

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [registeredIPs, setRegisteredIPs] = useState<Array<{ ipId: string; title: string; description: string; mediaUrl: string }>>([]);
  const toast = useToast();
  const { address } = useAccount();

  const refreshIPs = async () => {
    // Implement IP refresh logic here
  };

  useEffect(() => {
    refreshIPs();
  }, [address]);

  const registerIP = async (name: string, description: string, mediaUrl: string): Promise<RegisterIPResponse> => {
    setLoading(true);
    try {
      if (!address) {
        throw new Error('Please connect your wallet first');
      }

      const response = await fetch(ENDPOINTS.registerIP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          mediaUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Check if the error is related to insufficient funds
        if (data.error?.includes('insufficient funds') || 
            data.error?.toLowerCase().includes('exceeds the balance')) {
          throw new Error('Insufficient funds in your wallet. Please add funds to continue.');
        }
        throw new Error(data.error || 'Failed to register IP');
      }

      toast({
        title: 'Success',
        description: 'IP registered successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Add the new IP to the local state
      const newIP = {
        ipId: data.ipId,
        title: name,
        description,
        mediaUrl
      };
      setRegisteredIPs(prev => [...prev, newIP]);

      return {
        ipId: data.ipId,
        tokenId: data.tokenId,
        success: true
      };

    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'Failed to register IP',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    registeredIPs,
    refreshIPs,
    registerIP,
    isLoading: loading
  };

  return (
    <StoryContext.Provider value={value}>
      {children}
    </StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
} 