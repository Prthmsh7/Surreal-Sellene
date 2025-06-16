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
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import AnimatedPage from './AnimatedPage';

const StoryIPRegistration: React.FC = () => {
  const { registerIP, loading, error, registeredIPs } = useStory();
  const { address } = useAuth();
  const toast = useToast();
  const bgColor = useColorModeValue('black', 'black');
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !mediaUrl.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
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

  if (!address) {
    return (
      <AnimatedPage>
        <Box minH="100vh" bg="black" pt="80px">
          <Container maxW="container.xl" py={8}>
            <VStack spacing={8} align="center">
              <Heading color="white">Connect Your Wallet</Heading>
              <Text color="brand.lightGray">
                Please connect your wallet to register IP
              </Text>
            </VStack>
          </Container>
        </Box>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <Box minH="100vh" bg="black" pt="80px">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Card bg="brand.darkGray" borderColor={borderColor} borderWidth="1px">
              <CardHeader>
                <Heading size="md" color="white">Register New IP</Heading>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel color="white">Title</FormLabel>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter IP title"
                        bg="brand.darkerGray"
                        borderColor={borderColor}
                        color="white"
                        _hover={{ borderColor: 'brand.blue' }}
                        _focus={{ borderColor: 'brand.blue' }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color="white">Description</FormLabel>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter IP description"
                        bg="brand.darkerGray"
                        borderColor={borderColor}
                        color="white"
                        _hover={{ borderColor: 'brand.blue' }}
                        _focus={{ borderColor: 'brand.blue' }}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color="white">Media URL</FormLabel>
                      <Input
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder="Enter media URL"
                        bg="brand.darkerGray"
                        borderColor={borderColor}
                        color="white"
                        _hover={{ borderColor: 'brand.blue' }}
                        _focus={{ borderColor: 'brand.blue' }}
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
              </CardBody>
            </Card>

            <Card bg="brand.darkGray" borderColor={borderColor} borderWidth="1px">
              <CardHeader>
                <Heading size="md" color="white">Your Registered IPs</Heading>
              </CardHeader>
              <CardBody>
                {loading ? (
                  <Center p={8}>
                    <Spinner color="brand.blue" />
                  </Center>
                ) : registeredIPs.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                    {registeredIPs.map((ip) => (
                      <Card key={ip.ipId} bg="brand.darkerGray" borderColor={borderColor} borderWidth="1px">
                        <CardHeader>
                          <Heading size="sm" color="white">{ip.title}</Heading>
                        </CardHeader>
                        <Divider borderColor={borderColor} />
                        <CardBody>
                          <Text color="brand.lightGray" fontSize="sm">
                            {ip.description}
                          </Text>
                          <Text color="brand.blue" fontSize="xs" mt={2} fontFamily="mono">
                            ID: {ip.ipId}
                          </Text>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text color="brand.lightGray" textAlign="center">No IPs registered yet.</Text>
                )}
              </CardBody>
            </Card>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  );
}

export default StoryIPRegistration; 