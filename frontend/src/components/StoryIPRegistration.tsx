"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Image,
  Text,
  useToast,
  Icon,
  Grid,
  GridItem,
  Center,
} from '@chakra-ui/react';
import { FiFile, FiImage, FiMusic, FiPenTool, FiType } from 'react-icons/fi';
import { useAccount } from 'wagmi';
import { useStoryProtocolHook } from '../hooks/useStoryProtocol';

type AssetType = 'text' | 'image' | 'music' | 'art' | 'writing';

const assetTypes = [
  { value: 'text', label: 'Text', icon: FiType },
  { value: 'image', label: 'Image', icon: FiImage },
  { value: 'music', label: 'Music', icon: FiMusic },
  { value: 'art', label: 'Art', icon: FiPenTool },
  { value: 'writing', label: 'Writing', icon: FiType },
];

export function StoryIPRegistration() {
  const { address } = useAccount();
  const { registerNewIP, loading: isClientLoading, error: clientError } = useStoryProtocolHook();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [type, setType] = useState<AssetType>('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      try {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
      } catch (err) {
        toast({
          title: 'Invalid file',
          description: err instanceof Error ? err.message : 'Please select a valid file',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to register IP',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!title || !description) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadProgress(0);
      setIsUploading(true);

      // Register IP using our working implementation
      const response = await registerNewIP(title, description, file || undefined, type);

      toast({
        title: 'Success',
        description: 'IP registered successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setTitle('');
      setDescription('');
      setFile(null);
      setPreview(null);
      setType('text');
      setUploadProgress(0);
    } catch (err) {
      console.error('Failed to register IP:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to register IP',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  if (isClientLoading) {
    return (
      <Center minH="200px">
        <Text>Loading Story Protocol...</Text>
      </Center>
    );
  }

  return (
    <Box maxW="container.md" mx="auto" py={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your IP"
              bg="brand.darkGray"
              borderColor="brand.lightGray"
              color="white"
              _hover={{ borderColor: 'brand.blue' }}
              _focus={{ borderColor: 'brand.blue', boxShadow: 'none' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your IP"
              bg="brand.darkGray"
              borderColor="brand.lightGray"
              color="white"
              _hover={{ borderColor: 'brand.blue' }}
              _focus={{ borderColor: 'brand.blue', boxShadow: 'none' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Asset Type</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              {assetTypes.map((assetType) => (
                <GridItem key={assetType.value}>
                  <Button
                    onClick={() => setType(assetType.value as AssetType)}
                    variant={type === assetType.value ? 'solid' : 'outline'}
                    colorScheme="blue"
                    width="100%"
                    height="100px"
                    display="flex"
                    flexDirection="column"
                    gap={2}
                  >
                    <Icon as={assetType.icon} boxSize={6} />
                    <Text>{assetType.label}</Text>
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </FormControl>

          <FormControl>
            <FormLabel>Upload File (Optional)</FormLabel>
            <Input
              type="file"
              onChange={handleFileChange}
              display="none"
              id="file-upload"
            />
            <Button
              as="label"
              htmlFor="file-upload"
              colorScheme="blue"
              variant="outline"
              width="100%"
              height="100px"
              cursor="pointer"
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Icon as={FiFile} boxSize={6} />
              <Text>{file ? file.name : 'Choose a file'}</Text>
            </Button>
          </FormControl>

          {preview && (
            <Box>
              <Image src={preview} alt="Preview" maxH="200px" objectFit="contain" />
            </Box>
          )}

          {isUploading && (
            <Box>
              <Text mb={2}>Uploading to IPFS: {uploadProgress}%</Text>
              <Box
                w="100%"
                h="2px"
                bg="gray.200"
                position="relative"
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  h="100%"
                  w={`${uploadProgress}%`}
                  bg="blue.500"
                  transition="width 0.3s ease-in-out"
                />
              </Box>
            </Box>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting}
            loadingText="Registering..."
          >
            Register IP
          </Button>
        </VStack>
      </form>
    </Box>
  );
} 