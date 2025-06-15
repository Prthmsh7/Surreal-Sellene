declare module 'react' {
  export interface ReactNode {
    children?: ReactNode;
  }

  export type ComponentType<P = {}> = (props: P) => JSX.Element | null;

  export interface ChangeEvent<T = Element> {
    target: T;
  }

  export interface FormEvent<T = Element> {
    preventDefault(): void;
  }

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void;
  export function useContext<T>(context: React.Context<T>): T;
  export function createContext<T>(defaultValue: T): React.Context<T>;
  export function useRef<T>(initialValue: T): { current: T };

  export namespace React {
    interface Context<T> {
      Provider: ComponentType<{ value: T; children?: ReactNode }>;
      Consumer: ComponentType<{ children: (value: T) => ReactNode }>;
    }
  }

  export namespace JSX {
    interface Element {
      type: string | ComponentType<any>;
      props: any;
      key: string | number | null;
    }

    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
} 