import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useWriteContract } from 'wagmi';
import { parseEther } from 'viem';

// DeBridge contract addresses
const DEBRIDGE_HANDLER_ADDRESS = '0xcF8a8C591956c31bf6094368ED239131127c6161' as `0x${string}`; // Your deployed DeBridgeHandler contract address

// Chain IDs
const CHAIN_IDS = {
  ETHEREUM: 1n,
  POLYGON: 137n,
  BSC: 56n,
  TOMO: 88n // TomoChain
} as const;

export function DeBridgeProvider({ children }: { children: React.ReactNode }) {
  const { address } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Contract write for sending tokens cross-chain
  const { writeContract, isPending } = useWriteContract();

  const sendTokens = async (
    receiver: `0x${string}`,
    amount: string,
    targetChainId: bigint
  ) => {
    if (!address) {
      setError('Wallet not connected');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Convert amount to wei
      const amountInWei = parseEther(amount);

      // Send tokens cross-chain
      await writeContract({
        address: DEBRIDGE_HANDLER_ADDRESS,
        abi: [
          {
            name: 'sendCrossChain',
            type: 'function',
            stateMutability: 'payable',
            inputs: [
              { name: '_receiver', type: 'address' },
              { name: '_amount', type: 'uint256' },
              { name: '_targetChainId', type: 'uint256' }
            ],
            outputs: []
          }
        ],
        functionName: 'sendCrossChain',
        args: [receiver, amountInWei, targetChainId],
        value: parseEther('0.01') // Bridge fee in native token
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send tokens';
      setError(errorMessage);
      console.error('Error sending tokens:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading: loading || isPending,
    error,
    sendTokens,
    CHAIN_IDS
  };

  return (
    <DeBridgeContext.Provider value={value}>
      {children}
    </DeBridgeContext.Provider>
  );
}

const DeBridgeContext = createContext<{
  loading: boolean;
  error: string | null;
  sendTokens: (receiver: `0x${string}`, amount: string, targetChainId: bigint) => Promise<void>;
  CHAIN_IDS: typeof CHAIN_IDS;
}>({
  loading: false,
  error: null,
  sendTokens: async () => {},
  CHAIN_IDS
});

export const useDeBridge = () => useContext(DeBridgeContext); 