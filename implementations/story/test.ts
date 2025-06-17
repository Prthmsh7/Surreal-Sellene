import { registerIP } from './spgIntegration';

// Test metadata for your IP asset
const testMetadata = {
  name: "Test Digital Artwork",
  description: "A test digital creation for verifying Story Protocol integration",
  mediaUrl: "ipfs://QmTest/artwork.jpg", // Replace with your actual IPFS URL
  licenseType: "CC-BY-NC-4.0"
};

async function verifyEnvironment() {
  const requiredEnvVars = [
    'NEXT_PUBLIC_RPC_URL',
    'NEXT_PUBLIC_NFT_CONTRACT_ADDRESS',
    'WALLET_ADDRESS',
    'WALLET_PRIVATE_KEY'
  ];

  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => {
      console.error(`   - ${varName}`);
    });
    return false;
  }

  console.log('✅ All required environment variables are set');
  return true;
}

async function main() {
  console.log('🔍 Verifying environment setup...');
  if (!await verifyEnvironment()) {
    process.exit(1);
  }

  try {
    console.log('📝 Starting IP registration process...');
    console.log('Metadata:', testMetadata);

    const result = await registerIP(testMetadata);
    
    console.log('✅ IP registration successful!');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ IP registration failed:', error);
    process.exit(1);
  }
}

// Run the test
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }); 