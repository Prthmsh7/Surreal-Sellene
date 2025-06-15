import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

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
        <Box p={4}>
            <VStack spacing={4} align="stretch">
                <Text fontSize="xl" fontWeight="bold">Security Settings</Text>
                {isConnected ? (
                    <Box>
                        <Text>Security features are enabled</Text>
                    </Box>
                ) : (
                    <Button
                        onClick={handleSetupSecurity}
                        isLoading={loading}
                        loadingText="Setting up..."
                        colorScheme="blue"
                    >
                        Setup Security
                    </Button>
                )}
            </VStack>
        </Box>
    );
} 