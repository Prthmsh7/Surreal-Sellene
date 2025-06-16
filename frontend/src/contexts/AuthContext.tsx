import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';

interface AuthContextType {
  isAuthenticated: boolean;
  address: string | undefined;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(false);

  const connect = async () => {
    if (!openConnectModal) {
      console.error('Connect modal is not available');
      return;
    }

    try {
      setLoading(true);
      
      // Open the connect modal
      await openConnectModal();
      
      // Wait for connection with timeout
      const timeout = 15000; // 15 seconds timeout
      const startTime = Date.now();
      
      while (!isConnected && Date.now() - startTime < timeout) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      if (!isConnected) {
        throw new Error('Connection timeout');
      }
      
      console.log('Wallet connected successfully:', address);
      
    } catch (error) {
      console.error('Failed to connect:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    try {
      setLoading(true);
      // Implement disconnect logic if needed
    } catch (error) {
      console.error('Failed to disconnect:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add effect to handle connection state changes
  useEffect(() => {
    if (isConnected) {
      console.log('Wallet connected:', address);
      setLoading(false);
    }
  }, [isConnected, address]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isConnected,
        address,
        connect,
        disconnect,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 