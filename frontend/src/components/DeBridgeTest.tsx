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
  useToast,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

export function DeBridgeTest() {
  const { sendTokens, loading, error, CHAIN_IDS } = useDeBridge();
  const { address } = useAuth();
  const [amount, setAmount] = useState('');
  const [targetChain, setTargetChain] = useState('');
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray');
  const textColor = useColorModeValue('white', 'white');
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray');
  const inputBgColor = useColorModeValue('brand.darkGray', 'brand.darkGray');
  const inputTextColor = useColorModeValue('white', 'white');
  const placeholderColor = useColorModeValue('brand.lightGray', 'brand.lightGray');

  const handleTransfer = async () => {
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
      // Convert chain ID to bigint
      const chainId = BigInt(targetChain);
      
      // Send tokens
      await sendTokens(
        address as `0x${string}`,
        amount,
        chainId
      );

      toast({
        title: 'Success',
        description: 'Transfer initiated successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Transfer failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box 
      p={8} 
      bg={bgColor} 
      borderRadius="xl" 
      borderWidth="1px" 
      borderColor={borderColor}
      shadow="lg"
    >
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color={textColor}>Test DeBridge Integration</Heading>
        
        <FormControl>
          <FormLabel color={textColor}>Amount (ETH)</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            bg={inputBgColor}
            color={inputTextColor}
            borderColor={borderColor}
            _placeholder={{ color: placeholderColor }}
            _hover={{ borderColor: 'brand.blue' }}
            _focus={{ borderColor: 'brand.blue', boxShadow: '0 0 0 1px var(--chakra-colors-brand-blue)' }}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Target Chain</FormLabel>
          <Select
            value={targetChain}
            onChange={(e) => setTargetChain(e.target.value)}
            placeholder="Select target chain"
            bg={inputBgColor}
            color={inputTextColor}
            borderColor={borderColor}
            _hover={{ borderColor: 'brand.blue' }}
            _focus={{ borderColor: 'brand.blue', boxShadow: '0 0 0 1px var(--chakra-colors-brand-blue)' }}
          >
            <option value={CHAIN_IDS.ETHEREUM.toString()}>Ethereum</option>
            <option value={CHAIN_IDS.POLYGON.toString()}>Polygon</option>
            <option value={CHAIN_IDS.BSC.toString()}>BSC</option>
            <option value={CHAIN_IDS.TOMO.toString()}>TomoChain</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="blue"
          onClick={handleTransfer}
          isLoading={loading}
          loadingText="Processing..."
          size="lg"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          Send Tokens
        </Button>

        {error && (
          <Text color="red.400" fontSize="sm">
            Error: {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
} 