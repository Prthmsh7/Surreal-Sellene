import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { StoryIPRegistration } from '../components/StoryIPRegistration';
import { CrossChainTransfer } from '../components/CrossChainTransfer';
import { useAuth } from '../contexts/AuthContext';

export default function Create() {
  const { address } = useAuth();

  if (!address) {
    return (
      <Container maxW="container.md" py={8}>
        <VStack spacing={6}>
          <Heading size="lg">Create New IP</Heading>
          <Text>Please connect your wallet to continue.</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Box w="full">
          <Heading size="lg" mb={6}>Create New IP</Heading>
          <StoryIPRegistration />
        </Box>

        <Box w="full">
          <Heading size="lg" mb={6}>Cross-Chain Transfer</Heading>
          <CrossChainTransfer />
        </Box>
      </VStack>
    </Container>
  );
} 