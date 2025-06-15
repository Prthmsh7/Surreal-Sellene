import React, { useState } from 'react';
import { useDeBridge } from '../contexts/DeBridgeContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
  useToast
} from '@chakra-ui/react';

export function CrossChainTransfer() {
  const { address } = useAuth();
  const { loading, error, sendTokens, CHAIN_IDS } = useDeBridge();
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [targetChain, setTargetChain] = useState(CHAIN_IDS.ETHEREUM.toString());
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast({
        title: 'Error',
        description: 'Please connect your wallet first',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await sendTokens(receiver, amount, parseInt(targetChain));
      
      toast({
        title: 'Success',
        description: 'Cross-chain transfer initiated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Reset form
      setReceiver('');
      setAmount('');
      setTargetChain(CHAIN_IDS.ETHEREUM.toString());
    } catch (err) {
      toast({
        title: 'Error',
        description: error || 'Failed to send tokens',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="xl"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" color="purple.600">
            Cross-Chain Transfer
          </Text>

          <FormControl isRequired>
            <FormLabel>Receiver Address</FormLabel>
            <Input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="0x..."
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              step="0.000000000000000001"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Target Chain</FormLabel>
            <Select
              value={targetChain}
              onChange={(e) => setTargetChain(e.target.value)}
            >
              <option value={CHAIN_IDS.ETHEREUM}>Ethereum</option>
              <option value={CHAIN_IDS.POLYGON}>Polygon</option>
              <option value={CHAIN_IDS.BSC}>BSC</option>
              <option value={CHAIN_IDS.TOMO}>TomoChain</option>
            </Select>
          </FormControl>

          <Button
            type="submit"
            colorScheme="purple"
            width="full"
            isLoading={loading}
            loadingText="Sending..."
          >
            Send Tokens
          </Button>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
        </VStack>
      </form>
    </Box>
  );
} 