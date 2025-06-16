// frontend/src/config/storyProtocol.ts
const RPC_URL = import.meta.env.VITE_RPC_URL;
const CHAIN_ID = Number(import.meta.env.VITE_CHAIN_ID);
const STORY_API_URL = import.meta.env.VITE_STORY_API_URL;

if (!RPC_URL || !CHAIN_ID || !STORY_API_URL) {
  throw new Error('Missing required environment variables for Story Protocol');
}

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