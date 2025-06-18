require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { StoryClient } = require('@story-protocol/core-sdk');
const { http, createWalletClient, createPublicClient } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { aeneid } = require('viem/chains');

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://surreal-sellene.vercel.app'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static('uploads'));

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
console.log('CORS enabled for origins:', ['http://localhost:5173', 'http://localhost:3000', 'https://surreal-sellene.vercel.app'].join(', '));
console.log('Connected to network:', process.env.CHAIN_ID === '1315' ? 'Aeneid' : 'Unknown');
console.log('Using NFT contract:', process.env.NFT_CONTRACT_ADDRESS);
console.log('Wallet address:', process.env.WALLET_ADDRESS);
console.log('RPC URL:', getRpcUrl());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Surreal Sellene Backend API',
    status: 'operational',
    endpoints: {
      root: '/',
      health: '/health',
      registerIP: '/register-ip'
    },
    version: '1.0.0'
  });
});

app.post('/register-ip', upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, description } = req.body;
    const files = req.files;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    // Get the first uploaded file URL if any
    let mediaUrl = '';
    if (files) {
      const firstFile = Object.values(files)[0]?.[0];
      if (firstFile) {
        mediaUrl = `${req.protocol}://${req.get('host')}/uploads/${firstFile.filename}`;
      }
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 