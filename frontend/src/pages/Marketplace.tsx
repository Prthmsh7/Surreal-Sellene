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
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Select,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  Switch,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { FaEthereum, FaClock, FaFire, FaChartLine, FaUsers, FaLock, FaShare, FaFilter, FaSort, FaSearch, FaTimes } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import { useState, memo, useMemo } from 'react'

// Memoized Collection Card
const CollectionCard = memo(({ collection, onOpen }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const handleClick = () => {
    onOpen(collection)
  }

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      overflow="hidden"
      border="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{ 
        transform: 'translateY(-4px)',
        boxShadow: '0 10px 20px rgba(66, 153, 225, 0.2)',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      <Box position="relative" h="200px">
        <Skeleton isLoaded={imageLoaded} h="full" w="full">
          <Image
            src={collection.image}
            alt={collection.title}
            w="full"
            h="full"
            objectFit="cover"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </Skeleton>
        <Badge
          position="absolute"
          top={2}
          right={2}
          colorScheme="blue"
          px={2}
          py={1}
          borderRadius="full"
        >
          {collection.category}
        </Badge>
      </Box>
      <VStack p={4} align="start" spacing={3}>
        <Heading size="md" color="white" fontFamily="heading">
          {collection.title}
        </Heading>
        <Text color="brand.lightGray" fontSize="sm" noOfLines={2}>
          {collection.description}
        </Text>
        <HStack justify="space-between" w="full">
          <HStack>
            <Icon as={FaUsers} color="brand.blue" />
            <Text color="white" fontSize="sm">{collection.owners} owners</Text>
          </HStack>
          <HStack>
            <Icon as={FaEthereum} color="brand.blue" />
            <Text color="white" fontSize="sm">{collection.price} ETH</Text>
          </HStack>
        </HStack>
        <Progress 
          value={(collection.sold / collection.total) * 100} 
          colorScheme="blue" 
          size="sm" 
          w="full" 
          borderRadius="full"
        />
        <HStack justify="space-between" w="full">
          <Text color="brand.lightGray" fontSize="xs">{collection.sold} of {collection.total} shares sold</Text>
          <Text color="brand.blue" fontSize="xs">{((collection.sold / collection.total) * 100).toFixed(1)}%</Text>
        </HStack>
      </VStack>
    </Box>
  )
})

const BuySharesModal = ({ isOpen, onClose, collection }) => {
  const [shares, setShares] = useState(1)
  const toast = useToast()

  const handleBuy = () => {
    // TODO: Implement actual purchase logic
    toast({
      title: "Purchase Successful",
      description: `You have purchased ${shares} shares of ${collection.title}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="brand.darkerGray" border="1px" borderColor="brand.lightGray">
        <ModalHeader color="white" fontFamily="heading">Buy Shares</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <HStack spacing={4}>
              <Box flex="1">
                <Image
                  src={collection?.image}
                  alt={collection?.title}
                  borderRadius="lg"
                  w="full"
                  h="200px"
                  objectFit="cover"
                />
              </Box>
              <VStack flex="1" align="start" spacing={4}>
                <Heading size="md" color="white" fontFamily="heading">
                  {collection?.title}
                </Heading>
                <Text color="brand.lightGray" fontSize="sm">
                  {collection?.description}
                </Text>
                <HStack spacing={4}>
                  <Stat>
                    <StatLabel color="brand.lightGray">Price per Share</StatLabel>
                    <StatNumber color="white">{collection?.price} ETH</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel color="brand.lightGray">Available Shares</StatLabel>
                    <StatNumber color="white">{collection?.total - collection?.sold}</StatNumber>
                  </Stat>
                </HStack>
              </VStack>
            </HStack>

            <VStack spacing={4} align="stretch">
              <Text color="white" fontWeight="medium">Number of Shares</Text>
              <NumberInput
                min={1}
                max={collection?.total - collection?.sold}
                value={shares}
                onChange={(value) => setShares(Number(value))}
              >
                <NumberInputField bg="brand.darkGray" color="white" borderColor="brand.lightGray" />
                <NumberInputStepper>
                  <NumberIncrementStepper color="white" />
                  <NumberDecrementStepper color="white" />
                </NumberInputStepper>
              </NumberInput>
              <HStack justify="space-between">
                <Text color="brand.lightGray">Total Cost:</Text>
                <Text color="white" fontWeight="bold">{shares * collection?.price} ETH</Text>
              </HStack>
            </VStack>

            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleBuy}
              leftIcon={<FaShare />}
              isDisabled={shares < 1}
            >
              Buy Shares
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const FilterSidebar = ({ isOpen, onClose, filters, setFilters, categories }) => {
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const handleCategoryToggle = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handlePriceChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value
      }
    }))
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay backdropFilter="blur(10px)" />
      <DrawerContent bg="rgba(17, 17, 17, 0.8)" backdropFilter="blur(10px)" borderLeft="1px" borderColor={borderColor}>
        <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
          <HStack justify="space-between">
            <Heading size="md" color="white">Filters</Heading>
            <DrawerCloseButton color="white" />
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <VStack spacing={6} align="stretch">
            {/* Search */}
            <FormControl>
              <FormLabel color="white">Search</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaSearch} color="brand.lightGray" />
                </InputLeftElement>
                <Input
                  placeholder="Search collections..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  bg={bgColor}
                  borderColor={borderColor}
                  color="white"
                  _placeholder={{ color: 'brand.lightGray' }}
                />
              </InputGroup>
            </FormControl>

            {/* Quick Filters */}
            <VStack align="stretch" spacing={4}>
              <Heading size="sm" color="white">Quick Filters</Heading>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel color="white" mb="0">
                  <HStack>
                    <Icon as={FaFire} color="brand.blue" />
                    <Text>Trending</Text>
                  </HStack>
                </FormLabel>
                <Switch
                  isChecked={filters.trending}
                  onChange={(e) => setFilters(prev => ({ ...prev, trending: e.target.checked }))}
                  colorScheme="blue"
                />
              </FormControl>
              <FormControl display="flex" alignItems="center" justifyContent="space-between">
                <FormLabel color="white" mb="0">
                  <HStack>
                    <Icon as={FaClock} color="brand.blue" />
                    <Text>New</Text>
                  </HStack>
                </FormLabel>
                <Switch
                  isChecked={filters.new}
                  onChange={(e) => setFilters(prev => ({ ...prev, new: e.target.checked }))}
                  colorScheme="blue"
                />
              </FormControl>
            </VStack>

            <Divider borderColor={borderColor} />

            {/* Sort Options */}
            <VStack align="stretch" spacing={4}>
              <Heading size="sm" color="white">Sort By</Heading>
              <Select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                bg={bgColor}
                borderColor={borderColor}
                color="white"
              >
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="owners_desc">Most Owners</option>
                <option value="sold_desc">Most Sold</option>
              </Select>
            </VStack>

            <Divider borderColor={borderColor} />

            {/* Price Range */}
            <VStack align="stretch" spacing={4}>
              <Heading size="sm" color="white">Price Range (ETH)</Heading>
              <HStack spacing={2}>
                <NumberInput
                  min={0}
                  max={filters.priceRange.max}
                  value={filters.priceRange.min}
                  onChange={(value) => handlePriceChange('min', value)}
                  flex={1}
                >
                  <NumberInputField
                    placeholder="Min"
                    bg={bgColor}
                    borderColor={borderColor}
                    color="white"
                  />
                </NumberInput>
                <Text color="brand.lightGray">to</Text>
                <NumberInput
                  min={filters.priceRange.min}
                  value={filters.priceRange.max}
                  onChange={(value) => handlePriceChange('max', value)}
                  flex={1}
                >
                  <NumberInputField
                    placeholder="Max"
                    bg={bgColor}
                    borderColor={borderColor}
                    color="white"
                  />
                </NumberInput>
              </HStack>
            </VStack>

            <Divider borderColor={borderColor} />

            {/* Categories */}
            <VStack align="stretch" spacing={4}>
              <Heading size="sm" color="white">Categories</Heading>
              <Wrap spacing={2}>
                {categories.map((category) => (
                  <WrapItem key={category}>
                    <Tag
                      size="md"
                      borderRadius="full"
                      variant={filters.categories.includes(category) ? "solid" : "outline"}
                      colorScheme="blue"
                      cursor="pointer"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <TagLabel>{category}</TagLabel>
                      {filters.categories.includes(category) && <TagCloseButton />}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </VStack>

            {/* Clear Filters */}
            <Button
              leftIcon={<FaTimes />}
              variant="outline"
              colorScheme="blue"
              onClick={() => setFilters({
                search: '',
                trending: false,
                new: false,
                sortBy: 'price_asc',
                priceRange: {
                  min: 0,
                  max: 2
                },
                categories: []
              })}
            >
              Clear All Filters
            </Button>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

const FilterBar = ({ onOpen }) => {
  return (
    <HStack spacing={4} wrap="wrap">
      <InputGroup maxW="300px">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="brand.lightGray" />
        </InputLeftElement>
        <Input
          placeholder="Search collections..."
          bg="brand.darkerGray"
          borderColor="brand.lightGray"
          color="white"
          _placeholder={{ color: 'brand.lightGray' }}
        />
      </InputGroup>

      <Button
        leftIcon={<FaFilter />}
        variant="outline"
        colorScheme="blue"
        onClick={onOpen}
      >
        Filters
      </Button>
    </HStack>
  )
}

const Marketplace = () => {
  const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    trending: false,
    new: false,
    sortBy: 'price_asc',
    priceRange: {
      min: 0,
      max: 2
    },
    categories: []
  })

  // Dummy data for collections
  const collections = [
    {
      id: 1,
      title: "Digital Dreams",
      description: "A collection of futuristic digital art pieces exploring the intersection of technology and creativity.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      category: "Digital Art",
      price: 0.5,
      owners: 45,
      total: 100,
      sold: 55
    },
    {
      id: 2,
      title: "Abstract Emotions",
      description: "An emotional journey through abstract art, capturing the essence of human feelings in digital form.",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1045&q=80",
      category: "Abstract",
      price: 0.3,
      owners: 78,
      total: 200,
      sold: 122
    },
    {
      id: 3,
      title: "Pixel Paradise",
      description: "A nostalgic journey through pixel art, bringing retro gaming aesthetics to the modern digital age.",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Pixel Art",
      price: 0.2,
      owners: 120,
      total: 150,
      sold: 30
    },
    {
      id: 4,
      title: "Neural Networks",
      description: "AI-generated art exploring the boundaries between human creativity and machine learning.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "AI Art",
      price: 0.8,
      owners: 32,
      total: 80,
      sold: 48
    },
    {
      id: 5,
      title: "Cosmic Journey",
      description: "Space-themed digital art collection featuring stunning cosmic landscapes and celestial bodies.",
      image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Space Art",
      price: 0.4,
      owners: 95,
      total: 120,
      sold: 25
    },
    {
      id: 6,
      title: "Digital Portraits",
      description: "A collection of unique digital portraits blending traditional art techniques with modern technology.",
      image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Portraits",
      price: 0.6,
      owners: 65,
      total: 90,
      sold: 25
    },
    {
      id: 7,
      title: "Cyberpunk City",
      description: "Futuristic cityscapes and neon-lit urban environments in a cyberpunk aesthetic.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Cyberpunk",
      price: 0.7,
      owners: 88,
      total: 110,
      sold: 22
    },
    {
      id: 8,
      title: "Nature's Code",
      description: "Digital art exploring the mathematical patterns and algorithms found in nature.",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      category: "Generative",
      price: 0.45,
      owners: 72,
      total: 95,
      sold: 23
    },
    {
      id: 9,
      title: "Digital Sculptures",
      description: "3D digital sculptures pushing the boundaries of form and space in the digital realm.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      category: "3D Art",
      price: 0.9,
      owners: 42,
      total: 70,
      sold: 28
    }
  ]

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(collections.map(collection => collection.category))]
  }, [collections])

  // Filter and sort collections
  const filteredCollections = useMemo(() => {
    return collections
      .filter(collection => {
        // Search filter
        if (filters.search && !collection.title.toLowerCase().includes(filters.search.toLowerCase())) {
          return false
        }

        // Category filter
        if (filters.categories.length > 0 && !filters.categories.includes(collection.category)) {
          return false
        }

        // Price range filter
        if (collection.price < filters.priceRange.min || collection.price > filters.priceRange.max) {
          return false
        }

        // Trending filter (example: collections with more than 50% sold)
        if (filters.trending && (collection.sold / collection.total) < 0.5) {
          return false
        }

        // New filter (example: collections with less than 30% sold)
        if (filters.new && (collection.sold / collection.total) > 0.3) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_asc':
            return a.price - b.price
          case 'price_desc':
            return b.price - a.price
          case 'owners_desc':
            return b.owners - a.owners
          case 'sold_desc':
            return b.sold - a.sold
          default:
            return 0
        }
      })
  }, [collections, filters])

  const handleCardClick = (collection) => {
    setSelectedCollection(collection)
    onModalOpen()
  }

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

            {/* Filters */}
            <FilterBar onOpen={onFilterOpen} />

            {/* Featured Collections */}
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Heading size="lg" color="white">Featured Collections</Heading>
                <Text color="brand.lightGray">
                  Showing {filteredCollections.length} of {collections.length} collections
                </Text>
              </HStack>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {filteredCollections.map((collection) => (
                  <CollectionCard 
                    key={collection.id} 
                    collection={collection} 
                    onOpen={handleCardClick}
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={onFilterClose}
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      <BuySharesModal 
        isOpen={isModalOpen} 
        onClose={onModalClose} 
        collection={selectedCollection}
      />
    </AnimatedPage>
  )
}

export default Marketplace 