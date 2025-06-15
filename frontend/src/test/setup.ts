import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));

// Mock window.ethereum
Object.defineProperty(window, 'ethereum', {
  value: {
    request: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn(),
    isMetaMask: true
  },
  writable: true
}); 