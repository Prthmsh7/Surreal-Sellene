declare module '../contexts/StoryContext' {
  import { ReactNode } from 'react';

  export interface IP {
    id: string;
    name: string;
    description: string;
    image: string;
    type: 'text' | 'image' | 'music' | 'art' | 'writing';
    attributes: Record<string, any>;
    owner: string;
    createdAt: string;
  }

  export interface StoryContextType {
    registeredIPs: IP[];
    loading: boolean;
    error: string | null;
    registerIP: (data: {
      title: string;
      description: string;
      mediaUrl?: string;
      type: 'text' | 'image' | 'music' | 'art' | 'writing';
      file?: File;
    }) => Promise<void>;
    refreshIPs: () => Promise<void>;
  }

  export function useStory(): StoryContextType;

  export interface StoryProviderProps {
    children: ReactNode;
  }

  export function StoryProvider(props: StoryProviderProps): JSX.Element;
} 