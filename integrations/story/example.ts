import { registerIP } from './spgIntegration';

async function main() {
  // Example metadata for your IP asset
  const metadata = {
    name: "My Digital Artwork",
    description: "An amazing digital creation",
    mediaUrl: "ipfs://your-ipfs-hash/artwork.jpg", // Replace with your actual IPFS URL
    licenseType: "CC-BY-NC-4.0"
  };

  try {
    console.log('Starting IP registration process...');
    console.log('Metadata:', metadata);

    const result = await registerIP(metadata);
    
    console.log('IP registration successful!');
    console.log('Result:', result);
  } catch (error) {
    console.error('IP registration failed:', error);
  }
}

// Run the example
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 