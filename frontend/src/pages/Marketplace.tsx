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
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react'
import { FaEthereum, FaClock, FaFire, FaChartLine } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'

const Marketplace = () => {
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const collections = [
    {
      id: 1,
      title: 'Digital Dreams Collection',
      artist: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      floorPrice: 2.5,
      volume: 125.4,
      items: 1000,
      owners: 450,
    },
    {
      id: 2,
      title: 'Neural Networks',
      artist: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      floorPrice: 1.8,
      volume: 89.2,
      items: 500,
      owners: 320,
    },
    {
      id: 3,
      title: 'Cosmic Journey',
      artist: 'Maya Patel',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
      floorPrice: 3.2,
      volume: 210.5,
      items: 2000,
      owners: 890,
    },
  ]

  const trendingItems = [
    {
      id: 1,
      title: 'Quantum Reality #42',
      artist: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
      price: 4.2,
      timeLeft: '2h 30m',
      likes: 234,
    },
    {
      id: 2,
      title: 'Digital Dreams #156',
      artist: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      price: 2.8,
      timeLeft: '1h 45m',
      likes: 189,
    },
    {
      id: 3,
      title: 'Neural Network #89',
      artist: 'Alex Rivera',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      price: 3.5,
      timeLeft: '3h 15m',
      likes: 156,
    },
  ]

  return (
    <AnimatedPage>
      <Box minH="100vh" bg="brand.darkGray" pt="80px">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={12} align="stretch">
            {/* Header */}
            <VStack spacing={4} align="start">
              <Heading color="white" size="2xl">Marketplace</Heading>
              <Text color="brand.lightGray" fontSize="lg">
                Discover and collect unique digital assets
              </Text>
            </VStack>

            {/* Featured Collections */}
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color="white">Featured Collections</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {collections.map((collection) => (
                  <Box
                    key={collection.id}
                    bg={bgColor}
                    borderRadius="lg"
                    overflow="hidden"
                    border="1px"
                    borderColor={borderColor}
                    transition="transform 0.2s"
                    _hover={{ transform: 'translateY(-4px)' }}
                  >
                    <Box position="relative" h="200px">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    </Box>
                    <VStack p={6} align="start" spacing={4}>
                      <VStack align="start" spacing={1}>
                        <Heading size="md" color="white">
                          {collection.title}
                        </Heading>
                        <Text color="brand.lightGray">by {collection.artist}</Text>
                      </VStack>
                      <SimpleGrid columns={2} spacing={4} w="full">
                        <Stat>
                          <StatLabel color="brand.lightGray">Floor Price</StatLabel>
                          <StatNumber color="white">
                            <HStack spacing={1}>
                              <Icon as={FaEthereum} />
                              <Text>{collection.floorPrice}</Text>
                            </HStack>
                          </StatNumber>
                        </Stat>
                        <Stat>
                          <StatLabel color="brand.lightGray">Volume</StatLabel>
                          <StatNumber color="white">
                            <HStack spacing={1}>
                              <Icon as={FaEthereum} />
                              <Text>{collection.volume}K</Text>
                            </HStack>
                          </StatNumber>
                        </Stat>
                      </SimpleGrid>
                      <Button colorScheme="blue" w="full">
                        View Collection
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>

            {/* Trending Items */}
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Heading size="lg" color="white">Trending Now</Heading>
                <Button variant="ghost" color="brand.blue" rightIcon={<FaFire />}>
                  View All
                </Button>
              </HStack>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {trendingItems.map((item) => (
                  <Box
                    key={item.id}
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
                        src={item.image}
                        alt={item.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                      <Badge
                        position="absolute"
                        top={4}
                        right={4}
                        colorScheme="red"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        Trending
                      </Badge>
                    </Box>
                    <VStack p={4} align="start" spacing={3}>
                      <VStack align="start" spacing={1}>
                        <Heading size="md" color="white">
                          {item.title}
                        </Heading>
                        <Text color="brand.lightGray">by {item.artist}</Text>
                      </VStack>
                      <HStack justify="space-between" w="full">
                        <HStack spacing={1}>
                          <Icon as={FaEthereum} color="brand.blue" />
                          <Text color="white" fontWeight="bold">{item.price}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <Icon as={FaClock} color="brand.lightGray" />
                          <Text color="brand.lightGray">{item.timeLeft}</Text>
                        </HStack>
                      </HStack>
                      <Button colorScheme="blue" w="full">
                        Place Bid
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  )
}

export default Marketplace 