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
} from '@chakra-ui/react';
import { useStoryProtocol } from '../providers/StoryProtocolProvider';
import { FiFile, FiImage, FiMusic, FiPenTool, FiType } from 'react-icons/fi';
import { uploadToIPFS, validateFile, generateMetadata } from '../utils/ipfs';
import type { IconType } from 'react-icons';

type AssetType = 'text' | 'image' | 'music' | 'art' | 'writing';

interface AssetTypeOption {
  value: AssetType;
  label: string;
  icon: IconType;
}

const ASSET_TYPES: AssetTypeOption[] = [
  { value: 'text', label: 'Text', icon: FiType },
  { value: 'image', label: 'Image', icon: FiImage },
  { value: 'music', label: 'Music', icon: FiMusic },
  { value: 'art', label: 'Art', icon: FiPenTool },
  { value: 'writing', label: 'Writing', icon: FiFile },
];

export function StoryIPRegistration(): JSX.Element {
  const { registerIP, isLoading, error } = useStoryProtocol();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [type, setType] = useState<AssetType>('text');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      try {
        validateFile(selectedFile, type as 'image' | 'music' | 'art' | 'writing');
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } catch (err) {
        toast({
          title: 'Invalid file',
          description: err instanceof Error ? err.message : 'Invalid file type or size',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
      let imageUrl = '';
      
      if (file) {
        imageUrl = await uploadToIPFS(file);
      }

      const metadata = await generateMetadata(title, description, imageUrl, type);
      const result = await registerIP(metadata);

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
    }
  };

  return (
    <Box maxW="container.md" mx="auto" py={8}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl isRequired>
            <FormLabel color="white">Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your IP"
              backgroundColor="brand.darkGray"
              borderColor="brand.lightGray"
              color="white"
              _hover={{ borderColor: 'brand.blue' }}
              _focus={{ borderColor: 'brand.blue', boxShadow: 'none' }}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel color="white">Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your IP"
              backgroundColor="brand.darkGray"
              borderColor="brand.lightGray"
              color="white"
              _hover={{ borderColor: 'brand.blue' }}
              _focus={{ borderColor: 'brand.blue', boxShadow: 'none' }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white">Asset Type</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              {ASSET_TYPES.map((assetType) => (
                <GridItem key={assetType.value}>
                  <Button
                    w="full"
                    h="full"
                    p={4}
                    variant={type === assetType.value ? 'solid' : 'outline'}
                    onClick={() => setType(assetType.value)}
                    colorScheme="blue"
                  >
                    <VStack>
                      <Icon as={assetType.icon} boxSize={6} />
                      <Text fontSize="sm">{assetType.label}</Text>
                    </VStack>
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </FormControl>

          <FormControl>
            <FormLabel color="white">File Upload</FormLabel>
            <Input
              type="file"
              accept={
                type === 'image'
                  ? 'image/*'
                  : type === 'music'
                  ? 'audio/*'
                  : type === 'art'
                  ? 'image/*'
                  : 'application/pdf'
              }
              onChange={handleFileChange}
              backgroundColor="brand.darkGray"
              borderColor="brand.lightGray"
              color="white"
              _hover={{ borderColor: 'brand.blue' }}
              _focus={{ borderColor: 'brand.blue', boxShadow: 'none' }}
            />
            {preview && type === 'image' && (
              <Box mt={2}>
                <Image src={preview} maxH="200px" objectFit="contain" />
              </Box>
            )}
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            isLoading={isSubmitting || isLoading}
            loadingText="Registering IP..."
            isDisabled={isSubmitting || isLoading}
          >
            Register IP
          </Button>
        </VStack>
      </form>
    </Box>
  );
} 