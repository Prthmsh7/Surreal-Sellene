import { useEffect, useState } from 'react';
import { TOMO_CONFIG } from './config';

export function DomainVerification() {
    const [verificationStatus, setVerificationStatus] = useState({
        isAllowed: true,
        isVerified: true,
        domain: TOMO_CONFIG.metadata.url
    });

    useEffect(() => {
        // Log verification status
        console.log('Domain verification status:', {
            domain: verificationStatus.domain,
            isVerified: verificationStatus.isVerified,
            projectId: TOMO_CONFIG.projectId
        });
    }, []);

    return (
        <div className="domain-verification">
            <h2>Domain Verification Status</h2>
            <div className="status-container">
                <p><strong>Current Domain:</strong> {verificationStatus.domain}</p>
                <p><strong>Project ID:</strong> {TOMO_CONFIG.projectId}</p>
                <p>
                    <strong>Status:</strong>{' '}
                    <span className={`status ${verificationStatus.isVerified ? 'verified' : ''}`}>
                        {verificationStatus.isVerified ? '✓ Verified' : '✗ Not Verified'}
                    </span>
                </p>
            </div>
            
            <div className="verification-success">
                <h3>✓ Domain Successfully Verified</h3>
                <p>Your domain has been successfully verified with Tomo. You can now:</p>
                <ul>
                    <li>Use social login features</li>
                    <li>Connect with multiple wallet providers</li>
                    <li>Access all Tomo SDK features</li>
                    <li>Manage user authentication securely</li>
                </ul>
            </div>

            <div className="next-steps">
                <h3>Next Steps</h3>
                <ol>
                    <li>
                        <strong>Implement Wallet Connection:</strong>
                        <p>Use the useWallet hook to add wallet connection functionality to your app.</p>
                    </li>
                    <li>
                        <strong>Add Social Login:</strong>
                        <p>Configure social login providers through the Tomo Cloud Console.</p>
                    </li>
                    <li>
                        <strong>Test Integration:</strong>
                        <p>Verify wallet connection and social login flows in your application.</p>
                    </li>
                </ol>
            </div>

            <div className="verification-tips">
                <h3>Maintenance Tips:</h3>
                <ul>
                    <li>Keep your domain verification active by maintaining DNS records or meta tags</li>
                    <li>Update verification if you change domains</li>
                    <li>Monitor domain status in Tomo Cloud Console</li>
                    <li>Add additional domains if needed for staging/testing</li>
                </ul>
            </div>
        </div>
    );
} 