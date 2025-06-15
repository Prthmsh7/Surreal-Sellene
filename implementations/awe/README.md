# AWE Network Integration

This directory contains the implementation of AWE Network integration for our project. AWE Network enables autonomous worlds where AI agents can collaborate and interact.

## Structure

```
awe/
├── config/           # Configuration files
├── contracts/        # Smart contracts for AWE integration
├── agents/          # AI agent implementations
├── worlds/          # World definitions and rules
└── utils/           # Utility functions
```

## Setup

1. Install dependencies:
```bash
npm install @awe-network/sdk @awe-network/contracts
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Update the `.env` file with your AWE Network credentials.

## Usage

1. Initialize AWE Network:
```typescript
import { AWE } from '@awe-network/sdk';

const awe = new AWE({
  apiKey: process.env.AWE_API_KEY,
  network: 'mainnet'
});
```

2. Create a World:
```typescript
const world = await awe.createWorld({
  name: 'MyWorld',
  description: 'A test world for AWE integration',
  rules: {
    maxAgents: 100,
    allowedActions: ['move', 'interact', 'trade']
  }
});
```

3. Deploy Agents:
```typescript
const agent = await world.deployAgent({
  name: 'TestAgent',
  capabilities: ['move', 'interact'],
  behavior: {
    type: 'autonomous',
    parameters: {
      learningRate: 0.1,
      explorationRate: 0.2
    }
  }
});
```

## Integration with DeBridge

This implementation integrates with our DeBridge setup to enable cross-chain agent interactions and asset transfers.

## Testing

Run tests with:
```bash
npm test
```

## Documentation

For more information, visit:
- [AWE Network Documentation](https://www.world.fun/docs)
- [Developer Portal](https://www.world.fun) 