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
  const [retryCount, setRetryCount] = useState(0);

  const connect = async () => {
    if (!openConnectModal) {
      console.error('Connect modal is not available');
      return;
    }

    try {
      setLoading(true);
      
      // Reset retry count
      setRetryCount(0);
      
      // Add a delay before opening the modal
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Open the connect modal
      await openConnectModal();
      
      // Wait for connection
      const maxRetries = 3;
      const checkConnection = async () => {
        if (isConnected) {
          console.log('Wallet connected successfully:', address);
          return;
        }
        
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          await new Promise(resolve => setTimeout(resolve, 1000));
          await checkConnection();
        } else {
          console.error('Failed to connect after multiple attempts');
        }
      };
      
      await checkConnection();
      
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