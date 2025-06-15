import { useState } from 'react';
import { useWallet } from '../useWallet';
import './WalletConnect.css';

export function WalletConnect() {
    const { isConnected, address, connect, disconnect } = useWallet();
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        try {
            setLoading(true);
            await connect();
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            setLoading(true);
            await disconnect();
        } catch (error) {
            console.error('Failed to disconnect wallet:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="wallet-connect">
            <h2>Wallet Connection</h2>
            
            {isConnected ? (
                <div className="wallet-status connected">
                    <h3>🎉 Wallet Connected</h3>
                    <div className="wallet-info">
                        <p><strong>Address:</strong> <span className="address">{address}</span></p>
                        <button
                            className="disconnect-button"
                            onClick={handleDisconnect}
                            disabled={loading}
                        >
                            {loading ? 'Disconnecting...' : 'Disconnect Wallet'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="connect-section">
                    <p>Connect your wallet to access all features</p>
                    <button
                        className="connect-button"
                        onClick={handleConnect}
                        disabled={loading}
                    >
                        {loading ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                </div>
            )}

            <div className="wallet-features">
                <h3>Available Features</h3>
                <ul>
                    <li>🔒 Secure wallet connection</li>
                    <li>🔄 Multi-chain support</li>
                    <li>📱 Mobile-friendly interface</li>
                    <li>⚡ Fast transaction processing</li>
                </ul>
            </div>
        </div>
    );
} 