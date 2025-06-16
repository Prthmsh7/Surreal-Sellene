import React, { useState, useRef } from 'react';
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
  HStack,
  Icon,
  Image,
  IconButton,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { 
  FaUpload, 
  FaFileAudio, 
  FaFileImage, 
  FaFilePdf, 
  FaLink, 
  FaTimes,
  FaPlay,
  FaPause,
} from 'react-icons/fa';
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
  const [uploadedFiles, setUploadedFiles] = useState<{
    audio?: File;
    image?: File;
    pdf?: File;
  }>({});
  const [previews, setPreviews] = useState<{
    audio?: string;
    image?: string;
    pdf?: string;
  }>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileUpload = (type: 'audio' | 'image' | 'pdf', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = {
      audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
      image: ['image/jpeg', 'image/png', 'image/gif'],
      pdf: ['application/pdf']
    };

    if (!validTypes[type].includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: `Please upload a valid ${type} file`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setUploadedFiles(prev => ({ ...prev, [type]: file }));
    setPreviews(prev => ({ ...prev, [type]: previewUrl }));
  };

  const removeFile = (type: 'audio' | 'image' | 'pdf') => {
    setUploadedFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[type];
      return newFiles;
    });
    setPreviews(prev => {
      const newPreviews = { ...prev };
      delete newPreviews[type];
      return newPreviews;
    });
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || (!mediaUrl.trim() && Object.keys(uploadedFiles).length === 0)) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields and provide either a media URL or upload files',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    try {
      // Here you would typically upload the files to your storage service
      // and get their URLs before registering the IP
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
      setUploadedFiles({});
      setPreviews({});
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

                    <FormControl>
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
                        leftElement={<Icon as={FaLink} color="brand.lightGray" />}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel color="white">Upload Media Files</FormLabel>
                      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                        {/* Audio Upload */}
                        <Box>
                          <Input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => handleFileUpload('audio', e)}
                            display="none"
                            id="audio-upload"
                          />
                          <Button
                            as="label"
                            htmlFor="audio-upload"
                            leftIcon={<FaFileAudio />}
                            colorScheme="blue"
                            variant="outline"
                            w="full"
                            cursor="pointer"
                          >
                            Upload Audio
                          </Button>
                          {previews.audio && (
                            <Box mt={2} p={2} bg="brand.darkerGray" borderRadius="md">
                              <HStack justify="space-between">
                                <Text color="white" fontSize="sm" noOfLines={1}>
                                  {uploadedFiles.audio?.name}
                                </Text>
                                <HStack>
                                  <IconButton
                                    aria-label="Play audio"
                                    icon={isPlaying ? <FaPause /> : <FaPlay />}
                                    size="sm"
                                    onClick={toggleAudio}
                                  />
                                  <IconButton
                                    aria-label="Remove audio"
                                    icon={<FaTimes />}
                                    size="sm"
                                    onClick={() => removeFile('audio')}
                                  />
                                </HStack>
                              </HStack>
                              <audio ref={audioRef} src={previews.audio} style={{ display: 'none' }} />
                            </Box>
                          )}
                        </Box>

                        {/* Image Upload */}
                        <Box>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload('image', e)}
                            display="none"
                            id="image-upload"
                          />
                          <Button
                            as="label"
                            htmlFor="image-upload"
                            leftIcon={<FaFileImage />}
                            colorScheme="blue"
                            variant="outline"
                            w="full"
                            cursor="pointer"
                          >
                            Upload Image
                          </Button>
                          {previews.image && (
                            <Box mt={2} p={2} bg="brand.darkerGray" borderRadius="md">
                              <Image
                                src={previews.image}
                                alt="Preview"
                                maxH="100px"
                                objectFit="contain"
                              />
                              <HStack justify="space-between" mt={2}>
                                <Text color="white" fontSize="sm" noOfLines={1}>
                                  {uploadedFiles.image?.name}
                                </Text>
                                <IconButton
                                  aria-label="Remove image"
                                  icon={<FaTimes />}
                                  size="sm"
                                  onClick={() => removeFile('image')}
                                />
                              </HStack>
                            </Box>
                          )}
                        </Box>

                        {/* PDF Upload */}
                        <Box>
                          <Input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handleFileUpload('pdf', e)}
                            display="none"
                            id="pdf-upload"
                          />
                          <Button
                            as="label"
                            htmlFor="pdf-upload"
                            leftIcon={<FaFilePdf />}
                            colorScheme="blue"
                            variant="outline"
                            w="full"
                            cursor="pointer"
                          >
                            Upload PDF
                          </Button>
                          {previews.pdf && (
                            <Box mt={2} p={2} bg="brand.darkerGray" borderRadius="md">
                              <HStack justify="space-between">
                                <Text color="white" fontSize="sm" noOfLines={1}>
                                  {uploadedFiles.pdf?.name}
                                </Text>
                                <IconButton
                                  aria-label="Remove PDF"
                                  icon={<FaTimes />}
                                  size="sm"
                                  onClick={() => removeFile('pdf')}
                                />
                              </HStack>
                            </Box>
                          )}
                        </Box>
                      </SimpleGrid>
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