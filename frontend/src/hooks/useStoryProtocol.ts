import { useState, useRef, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { StoryClient } from '@story-protocol/core-sdk';
import { http } from 'viem';
import { toast } from 'react-hot-toast';
import { uploadToIPFS } from '../utils/ipfs';

// Types for our metadata
interface IPMetadata {
  name: string;
  description: string;
  mediaUrl: string;
  licenseType: string;
}

interface SPGCollectionParams {
  name: string;
  symbol: string;
  contractURI: string;
  isPublicMinting: boolean;
  mintOpen: boolean;
  mintFeeRecipient: `0x${string}`;
  mintFee: bigint;
  mintFeeToken?: `0x${string}`;
  baseURI?: string;
  maxSupply?: number;
  owner?: `0x${string}`;
}

interface IPDetails {
  id: string;
  title: string;
  description: string;
  image: string;
  imageHash: string;
  mediaUrl: string;
  mediaHash: string;
  mediaType: string;
  createdAt: string;
  creators: Array<{
    name: string;
    address: string;
    contributionPercent: number;
    description?: string;
    image?: string;
    socialMedia?: Array<{
      platform: string;
      url: string;
    }>;
  }>;
}

interface StoryProtocolError extends Error {
  code?: string;
  details?: any;
}

// Helper function to ensure addresses are in the correct format
const formatAddress = (address: string): `0x${string}` => {
  if (!address) throw new Error('Address is required');
  if (!address.startsWith('0x')) {
    return `0x${address}` as `0x${string}`;
  }
  return address as `0x${string}`;
};

export function useStoryProtocolHook() {
  const { address } = useAccount();
  const [error, setError] = useState<StoryProtocolError | null>(null);
  const clientRef = useRef<StoryClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleError = (err: unknown, context: string): StoryProtocolError => {
    const error: StoryProtocolError = err instanceof Error ? err : new Error(String(err));
    error.code = err instanceof Error && 'code' in err ? (err as any).code : 'UNKNOWN_ERROR';
    error.details = err instanceof Error && 'details' in err ? (err as any).details : undefined;
    
    const errorMessage = `${context}: ${error.message}`;
    console.error(errorMessage, error);
    toast.error(errorMessage);
    setError(error);
    return error;
  };

  // Initialize Story Protocol client
  const initializeClient = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_RPC_URL) {
        throw new Error('RPC_URL is required');
      }

      if (clientRef.current && isInitialized) {
        return clientRef.current;
      }

      const client = await StoryClient.newClient({
        chainId: "aeneid",
        transport: http(process.env.NEXT_PUBLIC_RPC_URL),
        account: undefined
      });

      clientRef.current = client;
      setIsInitialized(true);
      setError(null);
      console.log('Story Protocol client initialized successfully');
      return client;
    } catch (err) {
      setIsInitialized(false);
      throw handleError(err, 'Failed to initialize Story Protocol client');
    }
  };

  // Initialize client on mount
  useEffect(() => {
    initializeClient().catch(console.error);
  }, []);

  // Get IP Details for a token ID
  const getIPDetails = async (address: string) => {
    if (!isInitialized || !clientRef.current) {
      console.log('Client state:', { isInitialized, client: !!clientRef.current });
      throw handleError(new Error('Story Protocol client not initialized'), 'Client Error');
    }

    try {
      // TODO: Implement getting IPs by address using the SDK
      // For now, return an empty array as we need to implement the proper SDK call
      return [];
    } catch (err) {
      throw handleError(err, 'Failed to get IP details');
    }
  };

  // Create SPG NFT Collection
  const createSPGCollection = async (params: SPGCollectionParams) => {
    if (!isInitialized || !clientRef.current) {
      const error = 'Story Protocol client not initialized';
      toast.error(error);
      throw new Error(error);
    }

    try {
      const response = await clientRef.current.nftClient.createNFTCollection({
        name: params.name,
        symbol: params.symbol,
        isPublicMinting: params.isPublicMinting,
        mintOpen: params.mintOpen,
        mintFeeRecipient: params.mintFeeRecipient,
        mintFee: params.mintFee,
        mintFeeToken: params.mintFeeToken,
        contractURI: params.contractURI,
        baseURI: params.baseURI,
        maxSupply: params.maxSupply,
        owner: params.owner
      });

      console.log('SPG Collection created successfully:', response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create SPG Collection';
      setError(handleError(err, 'Failed to create SPG Collection'));
      throw err;
    }
  };

  // Mint and Register IP Asset
  const mintAndRegisterIP = async (metadata: IPMetadata) => {
    if (!isInitialized || !clientRef.current) {
      throw handleError(new Error('Story Protocol client not initialized'), 'Client Error');
    }

    try {
      if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
        throw new Error('NFT_CONTRACT_ADDRESS is required');
      }

      const response = await clientRef.current.ipAsset.mintAndRegisterIp({
        spgNftContract: formatAddress(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS),
        allowDuplicates: true,
        ipMetadata: {
          ipMetadataURI: metadata.mediaUrl,
          ipMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
          nftMetadataURI: metadata.mediaUrl,
          nftMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000'
        }
      });

      setError(null);
      console.log('IP Asset minted and registered successfully:', {
        name: metadata.name,
        description: metadata.description,
        response
      });
      return response;
    } catch (err) {
      throw handleError(err, 'Failed to mint and register IP');
    }
  };

  // Main registration flow
  const registerNewIP = async (
    title: string,
    description: string,
    file?: File,
    type: 'text' | 'image' | 'music' | 'art' | 'writing' = 'text'
  ) => {
    try {
      if (!clientRef.current) {
        await initializeClient();
      }

      if (!address) {
        throw new Error('Wallet not connected');
      }

      // Create collection if needed
      const collectionParams: SPGCollectionParams = {
        name: "MyIPCollection",
        symbol: "MIPC",
        contractURI: "ipfs://test",
        isPublicMinting: false,
        mintOpen: true,
        mintFeeRecipient: formatAddress(address),
        mintFee: BigInt(10000000000000000) // 0.01 ETH in wei
      };

      await createSPGCollection(collectionParams);

      // Register the IP
      const metadata: IPMetadata = {
        name: title,
        description,
        mediaUrl: file ? await uploadToIPFS(file) : "ipfs://test",
        licenseType: "CC0"
      };

      const registeredIP = await mintAndRegisterIP(metadata);
      return registeredIP;
    } catch (err) {
      throw handleError(err, 'Failed to register IP');
    }
  };

  return {
    error,
    isInitialized,
    getIPDetails,
    registerNewIP,
    initializeClient,
    createSPGCollection,
    mintAndRegisterIP
  };
} 