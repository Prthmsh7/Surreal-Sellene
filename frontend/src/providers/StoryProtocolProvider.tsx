import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { StoryClient } from '@story-protocol/core-sdk';
import { useAccount, useWalletClient } from 'wagmi';
import { STORY_PROTOCOL_CONFIG, STORY_CONTRACT_ADDRESSES } from '../config/storyProtocol';
import { Address } from 'viem';
import { http } from 'viem';

interface StoryProtocolContextType {
  storyProtocol: StoryClient | null;
  registerIP: (metadata: any) => Promise<any>;
  getIPDetails: (ipId: Address) => Promise<any>;
  isLoading: boolean;
  error: Error | null;
}

const defaultContext: StoryProtocolContextType = {
  storyProtocol: null,
  registerIP: async () => {
    throw new Error('Story Protocol not initialized');
  },
  getIPDetails: async () => {
    throw new Error('Story Protocol not initialized');
  },
  isLoading: false,
  error: null,
};

const StoryProtocolContext = createContext<StoryProtocolContextType>(defaultContext);

export const useStoryProtocol = () => useContext(StoryProtocolContext);

interface StoryProtocolProviderProps {
  children: ReactNode;
}

export const StoryProtocolProvider = ({ children }: StoryProtocolProviderProps) => {
  const [storyProtocol, setStoryProtocol] = useState<StoryClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const initializeStoryProtocol = async () => {
      if (!isConnected || !address || !walletClient) {
        console.log('Wallet not connected, skipping Story Protocol initialization');
        setStoryProtocol(null);
        setIsLoading(false);
        return;
      }

      try {
        console.log('Initializing Story Protocol...');
        const config = {
          account: address,
          transport: http(STORY_PROTOCOL_CONFIG.rpcUrl),
          chainId: STORY_PROTOCOL_CONFIG.chainId,
          contracts: {
            ipRegistry: STORY_CONTRACT_ADDRESSES.ipRegistry,
            licenseRegistry: STORY_CONTRACT_ADDRESSES.licenseRegistry,
            disputeModule: STORY_CONTRACT_ADDRESSES.disputeModule,
          },
        };

        const client = await StoryClient.newClient(config);
        console.log('Story Protocol initialized successfully');
        setStoryProtocol(client);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize Story Protocol:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize Story Protocol'));
        setStoryProtocol(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeStoryProtocol();
  }, [isConnected, address, walletClient]);

  const registerIP = async (metadata: any) => {
    if (!storyProtocol) {
      throw new Error('Story Protocol not initialized');
    }
    try {
      const result = await storyProtocol.ipAsset.register(metadata);
      console.log('IP registered successfully:', result);
      return result;
    } catch (err) {
      console.error('Failed to register IP:', err);
      throw err;
    }
  };

  const getIPDetails = async (ipId: Address) => {
    if (!storyProtocol) {
      throw new Error('Story Protocol not initialized');
    }
    try {
      const result = await storyProtocol.ipAsset.isRegistered(ipId);
      console.log('IP details retrieved:', result);
      return result;
    } catch (err) {
      console.error('Failed to get IP details:', err);
      throw err;
    }
  };

  const value = {
    storyProtocol,
    registerIP,
    getIPDetails,
    isLoading,
    error,
  };

  return (
    <StoryProtocolContext.Provider value={value}>
      {children}
    </StoryProtocolContext.Provider>
  );
}; 