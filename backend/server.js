require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { StoryClient } = require('@story-protocol/core-sdk');
const { http, createWalletClient, createPublicClient } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { aeneid } = require('viem/chains');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Construct RPC URL
const getRpcUrl = () => {
  return 'https://aeneid.storyrpc.io';
};

// Create wallet account from private key
const account = privateKeyToAccount(`0x${process.env.WALLET_PRIVATE_KEY}`);

// Create transport for Story Protocol client
const transport = http(getRpcUrl());

// Initialize Story Protocol client
const client = new StoryClient({
  chainId: Number(process.env.CHAIN_ID || 1315),
  account: account,
  transport: transport,
  apiKey: process.env.STORY_API_KEY,
  mode: 'production'
});

// Function to register IP using Story Protocol
async function registerIP(metadata) {
  try {
    // Call Story Protocol SDK to mint and register IP
    const result = await client.ipAsset.mintAndRegisterIp({
      spgNftContract: process.env.NFT_CONTRACT_ADDRESS,
      recipient: process.env.WALLET_ADDRESS,
      metadata: {
        ipMetadataURI: metadata.ipMetadataURI,
        ipMetadataHash: metadata.ipMetadataHash,
        nftMetadataURI: metadata.nftMetadataURI,
        nftMetadataHash: metadata.nftMetadataHash,
      },
      allowDuplicates: true
    });

    console.log('Registration successful:', result);
    return {
      ipId: result.ipId,
      tokenId: result.tokenId,
      txHash: result.txHash
    };
  } catch (error) {
    console.error('Error in registerIP:', error);
    throw error;
  }
}

// Log configuration on startup
console.log('Story Protocol backend service running on port', process.env.PORT || 3001);
console.log('CORS enabled for origins:', ['http://localhost:5173', 'http://localhost:3000'].join(', '));
console.log('Connected to network:', process.env.CHAIN_ID === '1315' ? 'Aeneid' : 'Unknown');
console.log('Using NFT contract:', process.env.NFT_CONTRACT_ADDRESS);
console.log('Wallet address:', process.env.WALLET_ADDRESS);
console.log('RPC URL:', getRpcUrl());

app.post('/register-ip', async (req, res) => {
  try {
    const { name, description, mediaUrl } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const metadata = {
      ipMetadataURI: mediaUrl || '',
      ipMetadataHash: '',
      nftMetadataURI: mediaUrl || '',
      nftMetadataHash: '',
      isPublic: true,
      network: 'Aeneid',
      nftContract: process.env.NFT_CONTRACT_ADDRESS,
      recipient: process.env.WALLET_ADDRESS,
      rpcUrl: getRpcUrl()
    };

    console.log('Registering IP with metadata:', metadata);

    try {
      const result = await registerIP(metadata);
      res.json({ success: true, ipId: result.ipId, tokenId: result.tokenId });
    } catch (error) {
      // Check for insufficient funds error
      if (error.message?.includes('insufficient funds') || 
          error.message?.toLowerCase().includes('exceeds the balance')) {
        return res.status(400).json({ 
          error: 'Insufficient funds in your wallet. Please add funds to continue.',
          details: {
            type: 'INSUFFICIENT_FUNDS',
            message: 'Your wallet does not have enough funds to pay for the transaction gas fees.'
          }
        });
      }

      // Handle other errors
      console.error('IP Registration failed:', error);
      res.status(500).json({ 
        error: 'Failed to register IP',
        details: error.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 