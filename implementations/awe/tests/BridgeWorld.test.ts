import { BridgeWorld } from '../worlds/BridgeWorld';
import { BridgeAgent } from '../agents/BridgeAgent';
import { ethers } from 'ethers';

describe('BridgeWorld', () => {
  let world: BridgeWorld;
  let mockDeBridgeHandler: any;

  beforeEach(() => {
    // Mock DeBridge handler
    mockDeBridgeHandler = {
      sendCrossChain: jest.fn(),
      estimateGas: {
        sendCrossChain: jest.fn()
      }
    };

    // Initialize world
    world = new BridgeWorld('TestWorld', {
      maxAgents: 10,
      allowedActions: ['bridge', 'analyze']
    });
  });

  it('should initialize with bridge rules', async () => {
    await world.initialize();
    expect(world.rules.bridgeRules).toBeDefined();
  });

  it('should deploy bridge agent', async () => {
    const agent = await world.deployBridgeAgent('TestAgent', mockDeBridgeHandler);
    expect(agent).toBeInstanceOf(BridgeAgent);
  });

  it('should execute bridge strategy', async () => {
    const agent = await world.deployBridgeAgent('TestAgent', mockDeBridgeHandler);
    
    // Mock successful bridge analysis
    jest.spyOn(agent, 'analyzeBridgeOpportunity').mockResolvedValue({
      recommended: true,
      reason: 'Good opportunity',
      estimatedGas: '100000'
    });

    // Mock successful bridge transaction
    mockDeBridgeHandler.sendCrossChain.mockResolvedValue({
      wait: () => Promise.resolve()
    });

    const result = await world.executeBridgeStrategy(
      'TestAgent',
      137, // Polygon
      '0.1',
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    );

    expect(result).toBe(true);
    expect(mockDeBridgeHandler.sendCrossChain).toHaveBeenCalled();
  });

  it('should handle bridge analysis rejection', async () => {
    const agent = await world.deployBridgeAgent('TestAgent', mockDeBridgeHandler);
    
    // Mock rejected bridge analysis
    jest.spyOn(agent, 'analyzeBridgeOpportunity').mockResolvedValue({
      recommended: false,
      reason: 'High gas costs',
      estimatedGas: '1000000'
    });

    const result = await world.executeBridgeStrategy(
      'TestAgent',
      137,
      '0.1',
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
    );

    expect(result).toBe(false);
    expect(mockDeBridgeHandler.sendCrossChain).not.toHaveBeenCalled();
  });

  it('should track bridge statistics', async () => {
    const stats = await world.getBridgeStats();
    expect(stats).toHaveProperty('totalBridges');
    expect(stats).toHaveProperty('successfulBridges');
    expect(stats).toHaveProperty('failedBridges');
    expect(stats).toHaveProperty('totalVolume');
  });
}); 