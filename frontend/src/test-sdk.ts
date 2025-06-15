import * as SDK from '@story-protocol/core-sdk';

// Log all exports
console.log('SDK exports:', Object.keys(SDK));

// Try to create an instance
const client = new SDK.default({
  rpcUrl: 'https://sepolia.infura.io/v3/your-key',
  chainId: 11155111,
  apiUrl: 'https://api.story.xyz'
});

console.log('Client:', client); 