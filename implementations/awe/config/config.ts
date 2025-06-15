import { AWEConfig } from '@awe-network/sdk';

export const aweConfig: AWEConfig = {
  apiKey: process.env.AWE_API_KEY || '',
  network: process.env.AWE_NETWORK || 'testnet',
  worldId: process.env.AWE_WORLD_ID || '',
  agentConfig: {
    maxAgents: 100,
    allowedActions: ['move', 'interact', 'trade', 'bridge'],
    defaultBehavior: {
      type: 'autonomous',
      parameters: {
        learningRate: 0.1,
        explorationRate: 0.2,
        memorySize: 1000
      }
    }
  },
  bridgeConfig: {
    supportedChains: [1, 137, 56, 88], // Ethereum, Polygon, BSC, TomoChain
    minBridgeAmount: '0.01',
    maxBridgeAmount: '100'
  }
}; 