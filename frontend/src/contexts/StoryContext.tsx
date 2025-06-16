import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { toast } from 'react-hot-toast';
import { useStoryProtocolHook } from '../hooks/useStoryProtocol';
import { useStoryProtocol } from '../providers/StoryProtocolProvider';

interface IP {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'text' | 'image' | 'music' | 'art' | 'writing';
  attributes: Record<string, any>;
  owner: string;
  createdAt: string;
}

interface StoryContextType {
  registeredIPs: any[];
  loading: boolean;
  error: string | null;
  registerIP: (title: string, description: string, file?: File, type?: 'text' | 'image' | 'music' | 'art' | 'writing') => Promise<void>;
  refreshIPs: () => Promise<void>;
}

const defaultContext: StoryContextType = {
  registeredIPs: [],
  loading: false,
  error: null,
  registerIP: async () => {},
  refreshIPs: async () => {},
};

const StoryContext = createContext<StoryContextType>(defaultContext);

type StoryProviderProps = {
  children: ReactNode;
};

export function StoryProvider({ children }: StoryProviderProps) {
  const { address } = useAccount();
  const { client, isLoading: isClientLoading } = useStoryProtocol();
  const [registeredIPs, setRegisteredIPs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { registerNewIP, getIPDetails, isInitialized } = useStoryProtocolHook();

  const refreshIPs = async () => {
    if (!address || !isInitialized) {
      console.log('Skipping refreshIPs - not ready:', { address, isInitialized });
      return;
    }

    try {
      setIsLoading(true);
      const ips = await getIPDetails(address);
      if (ips) {
        setRegisteredIPs(Array.isArray(ips) ? ips : [ips]);
      }
    } catch (err) {
      console.error('Failed to refresh IPs:', err);
      toast.error('Failed to refresh IPs');
      setError(err instanceof Error ? err.message : 'Failed to refresh IPs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address && isInitialized && !isClientLoading) {
      console.log('Running refreshIPs - all conditions met:', { address, isInitialized, isClientLoading });
      refreshIPs();
    }
  }, [address, isInitialized, isClientLoading]);

  const registerIP = async (
    title: string,
    description: string,
    file?: File,
    type: 'text' | 'image' | 'music' | 'art' | 'writing' = 'text'
  ) => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isInitialized) {
      toast.error('Story Protocol is not initialized yet');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await registerNewIP(title, description, file, type);
      toast.success('IP registered successfully');
      await refreshIPs();
    } catch (err) {
      console.error('Failed to register IP:', err);
      toast.error('Failed to register IP');
      setError(err instanceof Error ? err.message : 'Failed to register IP');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    registeredIPs,
    loading: isLoading || isClientLoading,
    error,
    registerIP,
    refreshIPs,
  };

  return <StoryContext.Provider value={value}>{children}</StoryContext.Provider>;
}

export function useStory() {
  const context = useContext(StoryContext);
  if (context === undefined) {
    throw new Error('useStory must be used within a StoryProvider');
  }
  return context;
} 