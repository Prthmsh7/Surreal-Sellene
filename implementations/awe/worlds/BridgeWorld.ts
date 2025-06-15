import { World, WorldRules } from '@awe-network/sdk';
import { BridgeAgent } from '../agents/BridgeAgent';
import { aweConfig } from '../config/config';

export class BridgeWorld extends World {
  private bridgeAgents: Map<string, BridgeAgent>;

  constructor(name: string, rules: WorldRules) {
    super(name, rules);
    this.bridgeAgents = new Map();
  }

  async initialize(): Promise<void> {
    // Initialize world state
    await super.initialize();

    // Set up bridge-specific rules
    this.rules = {
      ...this.rules,
      bridgeRules: {
        minBridgeAmount: aweConfig.bridgeConfig.minBridgeAmount,
        maxBridgeAmount: aweConfig.bridgeConfig.maxBridgeAmount,
        supportedChains: aweConfig.bridgeConfig.supportedChains
      }
    };
  }

  async deployBridgeAgent(
    name: string,
    deBridgeHandler: any
  ): Promise<BridgeAgent> {
    const agent = new BridgeAgent(
      name,
      {
        canBridge: true,
        canAnalyze: true,
        canTrade: true
      },
      aweConfig.agentConfig.defaultBehavior,
      deBridgeHandler,
      aweConfig.bridgeConfig.supportedChains
    );

    await this.addAgent(agent);
    this.bridgeAgents.set(name, agent);

    return agent;
  }

  async executeBridgeStrategy(
    agentName: string,
    targetChain: number,
    amount: string,
    receiver: string
  ): Promise<boolean> {
    const agent = this.bridgeAgents.get(agentName);
    if (!agent) {
      throw new Error(`Agent ${agentName} not found`);
    }

    // Analyze bridge opportunity
    const analysis = await agent.analyzeBridgeOpportunity(
      this.chainId,
      targetChain,
      amount
    );

    if (!analysis.recommended) {
      console.log(`Bridge not recommended: ${analysis.reason}`);
      return false;
    }

    // Execute bridge
    return await agent.bridgeAssets(targetChain, amount, receiver);
  }

  async getBridgeStats(): Promise<{
    totalBridges: number;
    successfulBridges: number;
    failedBridges: number;
    totalVolume: string;
  }> {
    // Implement bridge statistics tracking
    return {
      totalBridges: 0,
      successfulBridges: 0,
      failedBridges: 0,
      totalVolume: '0'
    };
  }
} 