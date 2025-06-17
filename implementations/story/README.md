# Story Protocol Integration

This integration allows you to register IP assets using Story Protocol's SDK.

## Setup

1. Install dependencies:
```bash
npm install @story-protocol/core-sdk viem dotenv
```

2. Create a `.env` file in this directory with the following variables:
```env
# Story Protocol Configuration
NEXT_PUBLIC_RPC_URL=https://rpc.aeneid.story.xyz
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_nft_contract_address_here
WALLET_ADDRESS=your_wallet_address_here
WALLET_PRIVATE_KEY=your_private_key_here

# Optional: Story Protocol API Key (if needed)
STORY_API_KEY=your_api_key_here
```

3. Replace the placeholder values in `.env` with your actual values:
   - `NEXT_PUBLIC_RPC_URL`: The RPC URL for Story Protocol's testnet (already set)
   - `NEXT_PUBLIC_NFT_CONTRACT_ADDRESS`: Your NFT contract address
   - `WALLET_ADDRESS`: Your wallet address
   - `WALLET_PRIVATE_KEY`: Your wallet's private key
   - `STORY_API_KEY`: Your Story Protocol API key (if needed)

## Usage

```typescript
import { registerIP } from './spgIntegration';

// Example usage
const metadata = {
  name: "My Digital Artwork",
  description: "An amazing digital creation",
  mediaUrl: "ipfs://your-ipfs-hash/artwork.jpg",
  licenseType: "CC-BY-NC-4.0"
};

try {
  const result = await registerIP(metadata);
  console.log('IP registered successfully:', result);
} catch (error) {
  console.error('Failed to register IP:', error);
}
```

## Features

- Type-safe Story Protocol client initialization
- SPG NFT Collection creation
- IP Asset minting and registration
- Proper error handling
- Environment configuration
- TypeScript support

## Important Notes

1. Make sure you're connected to Story Protocol's testnet (Aeneid) before using this integration.
2. Keep your private key secure and never commit it to version control.
3. The integration uses Story Protocol's latest SDK version.
4. All transactions require gas fees in Story Protocol's native token.

## Error Handling

The integration includes comprehensive error handling:
- Client initialization errors
- Collection creation failures
- IP registration failures
- Environment configuration issues

Each function will throw an error with a descriptive message if something goes wrong. 