import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useStory } from '../contexts/StoryContext';
import { Link as RouterLink } from 'react-router-dom';

export function UserIPs() {
  const { registeredIPs, loading } = useStory();
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray');
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray');

  if (loading) {
    return (
      <Box p={4}>
        <Text color="white">Loading your IPs...</Text>
      </Box>
    );
  }

  if (!registeredIPs.length) {
    return (
      <Box p={4}>
        <VStack spacing={4}>
          <Text color="white">You haven't registered any IPs yet.</Text>
          <Link
            as={RouterLink}
            to="/register-ip"
            color="brand.blue"
            fontWeight="bold"
            _hover={{ textDecoration: 'underline' }}
          >
            Register your first IP
          </Link>
        </VStack>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="md" color="white" mb={4}>
        Your Registered IPs
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {registeredIPs.map((ip) => (
          <Box
            key={ip.ipId}
            bg={bgColor}
            p={6}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
          >
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                {ip.title}
              </Heading>
              <Text color="brand.lightGray" noOfLines={2}>
                {ip.description}
              </Text>
              <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
                {ip.ipId}
              </Badge>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
} 