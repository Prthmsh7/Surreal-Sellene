import { createClient } from '@story-protocol/core-sdk';

const RPC_URL = import.meta.env.VITE_RPC_URL;
const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID);
const STORY_API_URL = import.meta.env.VITE_STORY_API_URL;

if (!RPC_URL || !CHAIN_ID || !STORY_API_URL) {
  throw new Error('Missing required environment variables for Story Protocol');
}

// Initialize Story Protocol
export const storyProtocol = createClient({
  rpcUrl: RPC_URL,
  chainId: CHAIN_ID,
  apiUrl: STORY_API_URL,
});

// Helper function to handle path resolution in browser
export const resolvePath = (path: string): string => {
  // In browser environment, we'll just return the path as is
  return path;
};

// Browser-compatible configuration
export const STORY_PROTOCOL_CONFIG = {
  rpcUrl: RPC_URL,
  chainId: CHAIN_ID,
  ipfsGateway: 'https://ipfs.io/ipfs',
  supportedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'video/mp4', 'application/pdf'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  metadata: {
    name: 'Sellene IP Registry',
    description: 'IP registration system for Sellene platform',
    version: '1.0.0',
  },
};

export const STORY_CONTRACT_ADDRESSES = {
  ipRegistry: import.meta.env.VITE_IP_REGISTRY_ADDRESS as `0x${string}`,
  licenseRegistry: import.meta.env.VITE_LICENSE_REGISTRY_ADDRESS as `0x${string}`,
  disputeModule: import.meta.env.VITE_DISPUTE_MODULE_ADDRESS as `0x${string}`,
};

// GraphQL queries
export const GET_NFTS_QUERY = `
  query GetNFTs($owner: String!) {
    nfts(where: { owner: $owner }) {
      id
      name
      description
      image
      attributes {
        trait_type
        value
      }
    }
  }
`;

export const CREATE_NFT_MUTATION = `
  mutation CreateNFT($input: CreateNFTInput!) {
    createNFT(input: $input) {
      id
      name
      description
      image
    }
  }
`; 