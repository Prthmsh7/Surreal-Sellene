import React from 'react';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@tomo-inc/tomo-evm-kit';
import { Box, Button, Text, VStack } from '@chakra-ui/react';

function SecureAuth() {
    const { isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    const handleConnect = () => {
        if (openConnectModal) {
            openConnectModal();
        }
    };

    return (
        <Box p={8}>
            <VStack spacing={4}>
                {!isConnected ? (
                    <>
                        <Text>Please connect your wallet to continue</Text>
                        <Button onClick={handleConnect} colorScheme="blue">
                            Connect Wallet
                        </Button>
                    </>
                ) : (
                    <Text>Wallet connected!</Text>
                )}
            </VStack>
        </Box>
    );
}

export default SecureAuth; 