import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import './SecureAuth.css';

export function SecureAuth() {
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [loading, setLoading] = useState(false);

    const handleSetupSecurity = async () => {
        try {
            setLoading(true);
            await openConnectModal();
        } catch (error) {
            console.error('Failed to setup security:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="secure-auth">
            <h2>Security Settings</h2>
            {isConnected ? (
                <div>
                    <p>Security features are enabled</p>
                </div>
            ) : (
                <button onClick={handleSetupSecurity} disabled={loading}>
                    {loading ? 'Setting up...' : 'Setup Security'}
                </button>
            )}
        </div>
    );
} 