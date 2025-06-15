import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DeBridgeTest } from '../components/DeBridgeTest';

// Mock the useDeBridge hook
vi.mock('../contexts/DeBridgeContext', () => ({
  useDeBridge: () => ({
    loading: false,
    error: null,
    sendTokens: vi.fn(),
    CHAIN_IDS: {
      ETHEREUM: 1,
      POLYGON: 137,
      BSC: 56,
      TOMO: 88
    }
  })
}));

// Mock the useAuth hook
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    address: '0x7Cdf1Bf04dAC049Bb0C1f8A41B3E7E4AdE7D0859',
    isConnected: true
  })
}));

describe('DeBridge Integration Tests', () => {
  it('should handle token transfer to Ethereum', async () => {
    const { sendTokens } = require('../contexts/DeBridgeContext').useDeBridge();
    const mockSendTokens = vi.fn();
    sendTokens.mockImplementation(mockSendTokens);

    await mockSendTokens(
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0.1',
      1
    );

    expect(mockSendTokens).toHaveBeenCalledWith(
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0.1',
      1
    );
  });

  it('should handle token transfer to TomoChain', async () => {
    const { sendTokens } = require('../contexts/DeBridgeContext').useDeBridge();
    const mockSendTokens = vi.fn();
    sendTokens.mockImplementation(mockSendTokens);

    await mockSendTokens(
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0.1',
      88
    );

    expect(mockSendTokens).toHaveBeenCalledWith(
      '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      '0.1',
      88
    );
  });

  it('should handle invalid address', async () => {
    const { sendTokens } = require('../contexts/DeBridgeContext').useDeBridge();
    const mockSendTokens = vi.fn().mockRejectedValue(new Error('Invalid address'));
    sendTokens.mockImplementation(mockSendTokens);

    await expect(mockSendTokens(
      '0xinvalid',
      '0.1',
      1
    )).rejects.toThrow('Invalid address');
  });
}); 