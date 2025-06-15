import { useAccount } from 'wagmi';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [error, setError] = useState(null);

    const handleConnect = async () => {
        try {
            await openConnectModal();
        } catch (err) {
            console.error('Connection error:', err);
            setError(err.message);
        }
    };

    // Clear error when connection status changes
    useEffect(() => {
        if (isConnected) {
            setError(null);
        }
    }, [isConnected]);

    return (
        <div className="App" style={{ padding: '20px' }}>
            <h1>Sellene</h1>
            {error && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Error: {error}
                </div>
            )}
            {isConnected ? (
                <div>
                    <p>Connected Address: {address}</p>
                </div>
            ) : (
                <button onClick={handleConnect}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
}

export default App; 