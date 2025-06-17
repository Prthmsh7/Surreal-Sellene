import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Heading,
  useToast,
  HStack,
  Icon,
  Text
} from '@chakra-ui/react';
import { FaFileAudio, FaFileImage, FaFilePdf } from 'react-icons/fa';

export function StoryIPRegistration() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: File | null }>({
    audio: null,
    image: null,
    pdf: null
  });
  const toast = useToast();
  const fileInputRefs = {
    audio: useRef<HTMLInputElement>(null),
    image: useRef<HTMLInputElement>(null),
    pdf: useRef<HTMLInputElement>(null)
  };

  // Theme colors
  const bgColor = 'gray.900';
  const inputBgColor = 'gray.800';
  const borderColor = 'gray.700';
  const buttonBgColor = 'blue.400';
  const buttonHoverColor = 'blue.500';
  const textColor = 'white';
  const labelColor = 'gray.300';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData to handle file uploads
      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      
      // Append files if they exist
      if (uploadedFiles.audio) formData.append('audio', uploadedFiles.audio);
      if (uploadedFiles.image) formData.append('image', uploadedFiles.image);
      if (uploadedFiles.pdf) formData.append('pdf', uploadedFiles.pdf);

      const response = await fetch('http://localhost:3001/register-ip', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'IP Registration Successful',
          description: `IP ID: ${data.ipId}, Token ID: ${data.tokenId}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // Clear form
        setTitle('');
        setDescription('');
        setMediaUrl('');
        setUploadedFiles({
          audio: null,
          image: null,
          pdf: null
        });
      } else {
        throw new Error(data.error || 'Failed to register IP');
      }
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = (type: 'audio' | 'image' | 'pdf') => {
    const input = fileInputRefs[type].current;
    if (input) {
      input.click();
    }
  };

  const handleFileChange = (type: 'audio' | 'image' | 'pdf', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [type]: file
      }));
      
      // Create a temporary URL for the file
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
      
      toast({
        title: 'File Uploaded',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} file uploaded successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box 
      as="form" 
      onSubmit={handleSubmit}
      bg={bgColor}
      p={8}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      width="100%"
      maxW="1200px"
      mx="auto"
    >
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color={textColor}>Register New IP</Heading>

        <FormControl isRequired>
          <FormLabel color={labelColor}>Title</FormLabel>
          <Input
            placeholder="Enter IP title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            bg={inputBgColor}
            border="none"
            color={textColor}
            _placeholder={{ color: 'gray.500' }}
            _hover={{ borderColor: buttonBgColor }}
            _focus={{ borderColor: buttonBgColor, boxShadow: 'none' }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel color={labelColor}>Description</FormLabel>
          <Textarea
            placeholder="Enter IP description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            bg={inputBgColor}
            border="none"
            color={textColor}
            _placeholder={{ color: 'gray.500' }}
            _hover={{ borderColor: buttonBgColor }}
            _focus={{ borderColor: buttonBgColor, boxShadow: 'none' }}
            minH="150px"
          />
        </FormControl>

        <FormControl>
          <FormLabel color={labelColor}>Media URL</FormLabel>
          <Input
            placeholder="Enter media URL"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            bg={inputBgColor}
            border="none"
            color={textColor}
            _placeholder={{ color: 'gray.500' }}
            _hover={{ borderColor: buttonBgColor }}
            _focus={{ borderColor: buttonBgColor, boxShadow: 'none' }}
          />
        </FormControl>

        <Box>
          <Text mb={4} color={labelColor}>Upload Media Files</Text>
          <HStack spacing={4} width="100%">
            <Input
              type="file"
              accept="audio/*"
              ref={fileInputRefs.audio}
              onChange={(e) => handleFileChange('audio', e)}
              display="none"
            />
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRefs.image}
              onChange={(e) => handleFileChange('image', e)}
              display="none"
            />
            <Input
              type="file"
              accept=".pdf"
              ref={fileInputRefs.pdf}
              onChange={(e) => handleFileChange('pdf', e)}
              display="none"
            />
            <Button
              leftIcon={<Icon as={FaFileAudio} />}
              onClick={() => handleUpload('audio')}
              flex={1}
              variant="outline"
              color="blue.400"
              borderColor="blue.400"
              _hover={{ bg: 'blue.400', color: 'white' }}
            >
              {uploadedFiles.audio ? 'Change Audio' : 'Upload Audio'}
            </Button>
            <Button
              leftIcon={<Icon as={FaFileImage} />}
              onClick={() => handleUpload('image')}
              flex={1}
              variant="outline"
              color="blue.400"
              borderColor="blue.400"
              _hover={{ bg: 'blue.400', color: 'white' }}
            >
              {uploadedFiles.image ? 'Change Image' : 'Upload Image'}
            </Button>
            <Button
              leftIcon={<Icon as={FaFilePdf} />}
              onClick={() => handleUpload('pdf')}
              flex={1}
              variant="outline"
              color="blue.400"
              borderColor="blue.400"
              _hover={{ bg: 'blue.400', color: 'white' }}
            >
              {uploadedFiles.pdf ? 'Change PDF' : 'Upload PDF'}
            </Button>
          </HStack>
        </Box>

        <Button
          type="submit"
          bg={buttonBgColor}
          color="white"
          size="lg"
          width="100%"
          _hover={{ bg: buttonHoverColor }}
          isLoading={isLoading}
          loadingText="Registering IP..."
        >
          Register IP
        </Button>
      </VStack>
    </Box>
  );
} 