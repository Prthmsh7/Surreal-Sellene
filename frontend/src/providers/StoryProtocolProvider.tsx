"use client";

import React, { createContext, useContext, useEffect, useState, type ReactNode, type FC } from 'react';
import { StoryClient } from '@story-protocol/core-sdk';
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';
import { http } from 'viem';

interface StoryProtocolContextType {
  client: StoryClient | null;
  isLoading: boolean;
  error: string | null;
}

const defaultContext: StoryProtocolContextType = {
  client: null,
  isLoading: false,
  error: null,
};

const StoryProtocolContext = createContext<StoryProtocolContextType>(defaultContext);

export const useStoryProtocol = () => {
  const context = useContext(StoryProtocolContext);
  if (!context) {
    throw new Error('useStoryProtocol must be used within a StoryProtocolProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

// Helper function to ensure addresses are in the correct format
const formatAddress = (address: string): `0x${string}` => {
  if (!address) throw new Error('Address is required');
  if (!address.startsWith('0x')) {
    return `0x${address}` as `0x${string}`;
  }
  return address as `0x${string}`;
};

export const StoryProtocolProvider: FC<Props> = ({ children }) => {
  const [client, setClient] = useState<StoryClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const initializeClient = async () => {
      if (!address || !walletClient || !publicClient) {
        setClient(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Initialize Story Protocol client using our working implementation
        const newClient = await StoryClient.newClient({
          chainId: "aeneid", // Using testnet
          transport: http(process.env.NEXT_PUBLIC_RPC_URL || ''),
          account: walletClient.account,
        });

        console.log('Story Protocol client initialized successfully');
        setClient(newClient);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize Story Protocol client';
        setError(errorMessage);
        console.error('Story Protocol initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeClient();
  }, [address, walletClient, publicClient]);

  // Log client state changes
  useEffect(() => {
    console.log('Story Protocol client state:', {
      isInitialized: !!client,
      isLoading,
      error,
      address
    });
  }, [client, isLoading, error, address]);

  const value = {
    client,
    isLoading,
    error
  };

  return (
    <StoryProtocolContext.Provider value={value}>
      {children}
    </StoryProtocolContext.Provider>
  );
}; 