import React, { useState } from 'react';
import { useStory } from '../contexts/StoryContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
  Text,
  Heading,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spinner,
  Center,
} from '@chakra-ui/react';

export function StoryIPRegistration() {
  const { registerIP, loading, error, registeredIPs } = useStory();
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const ipId = await registerIP(title, description, mediaUrl);
      
      toast({
        title: 'IP Registered Successfully',
        description: `IP ID: ${ipId}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Clear form
      setTitle('');
      setDescription('');
      setMediaUrl('');
    } catch (err) {
      toast({
        title: 'Registration Failed',
        description: err instanceof Error ? err.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <Box p={4} borderWidth="1px" borderRadius="lg">
        <Text>Please connect your wallet to register IP.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={8} align="stretch">
        <Box borderWidth="1px" borderRadius="lg" p={6}>
          <Heading size="md" mb={4}>Register New IP</Heading>
          
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter IP title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter IP description"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Media URL</FormLabel>
                <Input
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Enter media URL"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                loadingText="Registering..."
                width="full"
              >
                Register IP
              </Button>
            </VStack>
          </form>

          {error && (
            <Text color="red.500" mt={4}>Error: {error}</Text>
          )}
        </Box>

        <Box>
          <Heading size="md" mb={4}>Your Registered IPs</Heading>
          
          {loading ? (
            <Center p={8}>
              <Spinner />
            </Center>
          ) : registeredIPs.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {registeredIPs.map((ip) => (
                <Card key={ip.ipId}>
                  <CardHeader>
                    <Heading size="sm">{ip.title}</Heading>
                  </CardHeader>
                  <Divider />
                  <CardBody>
                    <Text fontSize="sm" color="gray.600">
                      {ip.description}
                    </Text>
                    <Text fontSize="xs" color="gray.500" mt={2} fontFamily="mono">
                      ID: {ip.ipId}
                    </Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Text color="gray.500">No IPs registered yet.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
} 