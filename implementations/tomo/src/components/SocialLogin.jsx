import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import './SocialLogin.css';

export function SocialLogin() {
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [loading, setLoading] = useState(false);

    const handleSocialLogin = async () => {
        try {
            setLoading(true);
            await openConnectModal();
        } catch (error) {
            console.error('Failed to login:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="social-login">
            <h2>Social Login</h2>
            {isConnected ? (
                <div>
                    <p>Connected Address: {address}</p>
                </div>
            ) : (
                <button onClick={handleSocialLogin} disabled={loading}>
                    {loading ? 'Connecting...' : 'Connect with Social'}
                </button>
            )}
        </div>
    );
} 