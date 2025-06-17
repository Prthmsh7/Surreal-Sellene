import { StoryClient } from '@story-protocol/core-sdk';
import { http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

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
  mintFee: number;
}

// Helper function to ensure addresses are in the correct format
const formatAddress = (address: string): `0x${string}` => {
  if (!address) throw new Error('Address is required');
  if (!address.startsWith('0x')) {
    return `0x${address}` as `0x${string}`;
  }
  return address as `0x${string}`;
};

// Initialize Story Protocol client
const initializeClient = async () => {
  try {
    if (!process.env.WALLET_ADDRESS) throw new Error('WALLET_ADDRESS is required');
    if (!process.env.WALLET_PRIVATE_KEY) throw new Error('WALLET_PRIVATE_KEY is required');

    // Create an account from private key
    const account = privateKeyToAccount(formatAddress(process.env.WALLET_PRIVATE_KEY));

    const client = await StoryClient.newClient({
      chainId: "aeneid", // Using testnet
      transport: http(process.env.NEXT_PUBLIC_RPC_URL || ''),
      account: account
    });

    console.log('Story Protocol client initialized successfully');
    return client;
  } catch (error) {
    console.error('Failed to initialize Story Protocol client:', error);
    throw error;
  }
};

// Create SPG NFT Collection
const createSPGCollection = async (client: StoryClient, params: SPGCollectionParams) => {
  try {
    if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      throw new Error('NFT_CONTRACT_ADDRESS is required');
    }

    const response = await client.ipAsset.register({
      nftContract: formatAddress(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS),
      tokenId: '1',
      ipMetadata: {
        ipMetadataURI: params.contractURI,
        ipMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        nftMetadataURI: params.contractURI,
        nftMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000'
      }
    });

    console.log('SPG Collection created successfully:', response);
    return response;
  } catch (error) {
    console.error('Failed to create SPG Collection:', error);
    throw error;
  }
};

// Mint and Register IP Asset
const mintAndRegisterIP = async (client: StoryClient, metadata: IPMetadata) => {
  try {
    if (!process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS) {
      throw new Error('NFT_CONTRACT_ADDRESS is required');
    }

    const response = await client.ipAsset.mintAndRegisterIp({
      spgNftContract: formatAddress(process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS),
      allowDuplicates: true,
      ipMetadata: {
        ipMetadataURI: metadata.mediaUrl,
        ipMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        nftMetadataURI: metadata.mediaUrl,
        nftMetadataHash: '0x0000000000000000000000000000000000000000000000000000000000000000'
      }
    });

    console.log('IP Asset minted and registered successfully:', {
      name: metadata.name,
      description: metadata.description,
      response
    });
    return response;
  } catch (error) {
    console.error('Failed to mint and register IP:', error);
    throw error;
  }
};

// Main execution flow
export const registerIP = async (metadata: IPMetadata) => {
  try {
    const client = await initializeClient();

    // Create collection if needed
    const collectionParams: SPGCollectionParams = {
      name: "MyIPCollection",
      symbol: "MIPC",
      contractURI: metadata.mediaUrl,
      isPublicMinting: false,
      mintFee: 0.01
    };

    await createSPGCollection(client, collectionParams);
    const registeredIP = await mintAndRegisterIP(client, metadata);

    return registeredIP;
  } catch (error) {
    console.error('IP registration process failed:', error);
    throw error;
  }
}; 