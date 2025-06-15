declare module '@story-protocol/core-sdk' {
  export interface IPAsset {
    id: string;
    name: string;
    description: string;
    owner: string;
    metadata: {
      uri: string;
      hash: string;
    };
  }

  export interface IPRegistrationParams {
    name: string;
    description: string;
    metadata: {
      uri: string;
      hash: string;
    };
  }

  export interface StoryProtocolConfig {
    rpcUrl: string;
    chainId: number;
    apiUrl: string;
  }

  export class StoryProtocolClient {
    constructor(config: StoryProtocolConfig);
    registerIP(params: IPRegistrationParams): Promise<IPAsset>;
    getIP(id: string): Promise<IPAsset>;
  }
}

declare module '@story-protocol/react-sdk' {
  import { StoryProtocolClient } from '@story-protocol/core-sdk';
  
  export interface StoryProtocolProviderProps {
    config: {
      rpcUrl: string;
      chainId: number;
      apiUrl: string;
    };
    children: React.ReactNode;
  }

  export function StoryProtocolProvider(props: StoryProtocolProviderProps): JSX.Element;
  
  export function useStoryProtocol(): {
    protocol: StoryProtocolClient | null;
    isInitialized: boolean;
    error: Error | null;
  };
} 