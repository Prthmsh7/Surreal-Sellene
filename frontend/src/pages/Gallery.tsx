import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  SimpleGrid,
  Image,
  Badge,
  HStack,
  Button,
  useColorModeValue,
  Icon,
  Flex,
} from '@chakra-ui/react'
import { FaHeart, FaComment, FaShare } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'

const Gallery = () => {
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const artworks = [
    {
      id: 1,
      title: 'Digital Dreams',
      artist: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      likes: 1234,
      comments: 89,
      category: 'Digital Art',
    },
    {
      id: 2,
      title: 'Neural Network',
      artist: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      likes: 856,
      comments: 45,
      category: 'AI Art',
    },
    {
      id: 3,
      title: 'Cosmic Journey',
      artist: 'Maya Patel',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      likes: 2103,
      comments: 156,
      category: 'Abstract',
    },
    {
      id: 4,
      title: 'Quantum Reality',
      artist: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
      likes: 987,
      comments: 67,
      category: 'Generative Art',
    },
  ]

  return (
    <AnimatedPage>
      <Box minH="100vh" bg="brand.darkGray" pt="80px">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <VStack spacing={4} align="start">
              <Heading color="white" size="2xl">Gallery</Heading>
              <Text color="brand.lightGray" fontSize="lg">
                Explore unique digital artworks from our talented creators
              </Text>
            </VStack>

            {/* Filters */}
            <HStack spacing={4} wrap="wrap">
              <Button variant="outline" colorScheme="blue" size="sm">
                All
              </Button>
              <Button variant="ghost" color="white" size="sm">
                Digital Art
              </Button>
              <Button variant="ghost" color="white" size="sm">
                AI Art
              </Button>
              <Button variant="ghost" color="white" size="sm">
                Abstract
              </Button>
              <Button variant="ghost" color="white" size="sm">
                Generative Art
              </Button>
            </HStack>

            {/* Artwork Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
              {artworks.map((artwork) => (
                <Box
                  key={artwork.id}
                  bg={bgColor}
                  borderRadius="lg"
                  overflow="hidden"
                  border="1px"
                  borderColor={borderColor}
                  transition="transform 0.2s"
                  _hover={{ transform: 'translateY(-4px)' }}
                >
                  <Box position="relative" h="250px">
                    <Image
                      src={artwork.image}
                      alt={artwork.title}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                    <Badge
                      position="absolute"
                      top={4}
                      right={4}
                      colorScheme="blue"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {artwork.category}
                    </Badge>
                  </Box>
                  <VStack p={4} align="start" spacing={3}>
                    <Heading size="md" color="white">
                      {artwork.title}
                    </Heading>
                    <Text color="brand.lightGray">by {artwork.artist}</Text>
                    <HStack spacing={4} w="full" justify="space-between">
                      <HStack spacing={4}>
                        <HStack spacing={1}>
                          <Icon as={FaHeart} color="brand.lightGray" />
                          <Text color="brand.lightGray">{artwork.likes}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={FaComment} color="brand.lightGray" />
                          <Text color="brand.lightGray">{artwork.comments}</Text>
                        </HStack>
                      </HStack>
                      <Icon as={FaShare} color="brand.lightGray" cursor="pointer" />
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>

            {/* Load More Button */}
            <Flex justify="center" pt={4}>
              <Button
                colorScheme="blue"
                variant="outline"
                size="lg"
                px={8}
              >
                Load More
              </Button>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  )
}

export default Gallery 