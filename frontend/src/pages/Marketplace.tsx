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
  Textarea,
  FormHelperText,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  IconButton,
} from '@chakra-ui/react'
import { FaEthereum, FaClock, FaFire, FaChartLine, FaUsers, FaLock, FaShare, FaFilter, FaSort, FaSearch, FaTimes, FaCopyright, FaFileUpload, FaFileAudio, FaFilePdf, FaFileVideo, FaFileImage, FaTrash } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import { useState, memo, useMemo, useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import tempIPDatabase, { type IPData } from '../utils/tempDatabase'

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

const BuySharesModal = ({ isOpen, onClose, collection, onBuy }) => {
  const [shares, setShares] = useState(1)
  const toast = useToast()

  const handleBuy = () => {
    onBuy(shares)
    toast({
      title: "Purchase Successful",
      description: `You have purchased ${shares} shares of ${collection.title}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
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

const IPRegistrationModal = ({ isOpen, onClose, onIPRegistered }) => {
  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    totalShares: '',
    files: {
      audio: null,
      pdf: null,
      video: null,
      images: [],
    },
    legalDocument: '',
  })
  const toast = useToast()

  const handleSubmit = () => {
    if (!address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    // Validate required fields
    if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.totalShares) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
      return
    }

    try {
      // Create new IP in the database
      const newIP = tempIPDatabase.createIP({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        totalShares: parseInt(formData.totalShares),
        files: formData.files,
        legalDocument: formData.legalDocument,
        creator: address,
      })

      // Create a new collection card
      const newCollection = {
        id: newIP.id,
        title: newIP.title,
        description: newIP.description,
        image: newIP.files.images && newIP.files.images.length > 0 
          ? URL.createObjectURL(newIP.files.images[0]) 
          : 'https://via.placeholder.com/400x300',
        category: newIP.category,
        price: newIP.price,
        owners: newIP.owners,
        total: newIP.totalShares,
        sold: newIP.soldShares
      }

      // Notify parent component to update the marketplace
      onIPRegistered(newCollection)

      toast({
        title: "IP Registration Successful",
        description: "Your IP has been registered successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        price: '',
        totalShares: '',
        files: {
          audio: null,
          pdf: null,
          video: null,
          images: [],
        },
        legalDocument: '',
      })

      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register IP",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleFileChange = (type, files) => {
    if (!files || files.length === 0) return;

    if (type === 'images') {
      setFormData(prev => ({
        ...prev,
        files: {
          ...prev.files,
          images: [...prev.files.images, ...Array.from(files)]
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        files: {
          ...prev.files,
          [type]: files[0]
        }
      }))
    }
  }

  const removeFile = (type, index) => {
    if (type === 'images') {
      setFormData(prev => ({
        ...prev,
        files: {
          ...prev.files,
          images: prev.files.images.filter((_, i) => i !== index)
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        files: {
          ...prev.files,
          [type]: null
        }
      }))
    }
  }

  const FileUploadSection = () => (
    <VStack spacing={6} align="stretch">
      <Heading size="md" color="white">Upload IP Files</Heading>
      <Tabs 
        variant="soft-rounded" 
        colorScheme="blue" 
        index={activeTab}
        onChange={setActiveTab}
      >
        <TabList>
          <Tab color="white">Audio</Tab>
          <Tab color="white">PDF</Tab>
          <Tab color="white">Video</Tab>
          <Tab color="white">Images</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color="white">Audio File</FormLabel>
                <Input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange('audio', e.target.files)}
                  display="none"
                  id="audio-upload"
                />
                <Button
                  as="label"
                  htmlFor="audio-upload"
                  leftIcon={<FaFileAudio />}
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                >
                  Upload Audio
                </Button>
                {formData.files.audio && (
                  <HStack justify="space-between" bg="brand.darkGray" p={2} borderRadius="md">
                    <HStack>
                      <FaFileAudio color="brand.blue" />
                      <Text color="white">{formData.files.audio.name}</Text>
                    </HStack>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile('audio')}
                    />
                  </HStack>
                )}
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color="white">PDF Document</FormLabel>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileChange('pdf', e.target.files)}
                  display="none"
                  id="pdf-upload"
                />
                <Button
                  as="label"
                  htmlFor="pdf-upload"
                  leftIcon={<FaFilePdf />}
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                >
                  Upload PDF
                </Button>
                {formData.files.pdf && (
                  <HStack justify="space-between" bg="brand.darkGray" p={2} borderRadius="md">
                    <HStack>
                      <FaFilePdf color="brand.blue" />
                      <Text color="white">{formData.files.pdf.name}</Text>
                    </HStack>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile('pdf')}
                    />
                  </HStack>
                )}
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color="white">Video File</FormLabel>
                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange('video', e.target.files)}
                  display="none"
                  id="video-upload"
                />
                <Button
                  as="label"
                  htmlFor="video-upload"
                  leftIcon={<FaFileVideo />}
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                >
                  Upload Video
                </Button>
                {formData.files.video && (
                  <HStack justify="space-between" bg="brand.darkGray" p={2} borderRadius="md">
                    <HStack>
                      <FaFileVideo color="brand.blue" />
                      <Text color="white">{formData.files.video.name}</Text>
                    </HStack>
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile('video')}
                    />
                  </HStack>
                )}
              </FormControl>
            </VStack>
          </TabPanel>

          <TabPanel>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color="white">Images</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFileChange('images', e.target.files)}
                  display="none"
                  id="images-upload"
                />
                <Button
                  as="label"
                  htmlFor="images-upload"
                  leftIcon={<FaFileImage />}
                  variant="outline"
                  colorScheme="blue"
                  w="full"
                >
                  Upload Images
                </Button>
                <VStack spacing={2} mt={2}>
                  {formData.files.images.map((file, index) => (
                    <HStack key={index} justify="space-between" bg="brand.darkGray" p={2} borderRadius="md" w="full">
                      <HStack>
                        <FaFileImage color="brand.blue" />
                        <Text color="white">{file.name}</Text>
                      </HStack>
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile('images', index)}
                      />
                    </HStack>
                  ))}
                </VStack>
              </FormControl>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="brand.darkerGray" border="1px" borderColor="brand.lightGray">
        <ModalHeader color="white" fontFamily="heading">Register New IP</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody pb={6}>
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel color="white">IP Title</FormLabel>
              <Input
                placeholder="Enter IP title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                bg="brand.darkGray"
                color="white"
                borderColor="brand.lightGray"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Description</FormLabel>
              <Textarea
                placeholder="Describe your IP"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                bg="brand.darkGray"
                color="white"
                borderColor="brand.lightGray"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="white">Category</FormLabel>
              <Select
                placeholder="Select category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                bg="brand.darkGray"
                color="white"
                borderColor="brand.lightGray"
              >
                <option value="art">Art</option>
                <option value="music">Music</option>
                <option value="literature">Literature</option>
                <option value="technology">Technology</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <HStack spacing={4}>
              <FormControl isRequired>
                <FormLabel color="white">Price per Share (ETH)</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.price}
                  onChange={(value) => setFormData({ ...formData, price: value })}
                >
                  <NumberInputField bg="brand.darkGray" color="white" borderColor="brand.lightGray" />
                  <NumberInputStepper>
                    <NumberIncrementStepper color="white" />
                    <NumberDecrementStepper color="white" />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="white">Total Shares</FormLabel>
                <NumberInput
                  min={1}
                  value={formData.totalShares}
                  onChange={(value) => setFormData({ ...formData, totalShares: value })}
                >
                  <NumberInputField bg="brand.darkGray" color="white" borderColor="brand.lightGray" />
                  <NumberInputStepper>
                    <NumberIncrementStepper color="white" />
                    <NumberDecrementStepper color="white" />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </HStack>

            <Divider borderColor="brand.lightGray" />

            <FileUploadSection />

            <FormControl isRequired>
              <FormLabel color="white">Legal Document URL</FormLabel>
              <Input
                placeholder="Enter legal document URL"
                value={formData.legalDocument}
                onChange={(e) => setFormData({ ...formData, legalDocument: e.target.value })}
                bg="brand.darkGray"
                color="white"
                borderColor="brand.lightGray"
              />
              <FormHelperText color="brand.lightGray">
                Upload your IP registration document to IPFS and paste the URL here
              </FormHelperText>
            </FormControl>

            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleSubmit}
              leftIcon={<FaCopyright />}
              isDisabled={!formData.title || !formData.description || !formData.category || !formData.price || !formData.totalShares || !formData.legalDocument}
            >
              Register IP
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

const FilterBar = ({ onOpen, onIPRegistered }) => {
  const { isOpen: isIPModalOpen, onOpen: onIPModalOpen, onClose: onIPModalClose } = useDisclosure()
  
  return (
    <Flex justify="space-between" align="center" mb={6}>
      <HStack spacing={4}>
        <Button
          leftIcon={<FaFilter />}
          variant="outline"
          colorScheme="blue"
          onClick={onOpen}
        >
          Filters
        </Button>
        <Button
          leftIcon={<FaSort />}
          variant="outline"
          colorScheme="blue"
        >
          Sort
        </Button>
      </HStack>
      <Button
        leftIcon={<FaCopyright />}
        colorScheme="blue"
        onClick={onIPModalOpen}
      >
        Register IP
      </Button>
      <IPRegistrationModal 
        isOpen={isIPModalOpen} 
        onClose={onIPModalClose} 
        onIPRegistered={onIPRegistered}
      />
    </Flex>
  )
}

const Marketplace = () => {
  const { isOpen: isFilterOpen, onOpen: onFilterOpen, onClose: onFilterClose } = useDisclosure()
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [collections, setCollections] = useState([])
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

  // Function to format IP data
  const formatIPData = (ips) => {
    return ips.map(ip => ({
      id: ip.id,
      title: ip.title,
      description: ip.description,
      image: ip.files.images && ip.files.images.length > 0 
        ? URL.createObjectURL(ip.files.images[0]) 
        : 'https://via.placeholder.com/400x300',
      category: ip.category,
      price: ip.price,
      owners: ip.owners,
      total: ip.totalShares,
      sold: ip.soldShares
    }))
  }

  // Load IPs from temporary database
  const loadIPs = useCallback(() => {
    const ips = tempIPDatabase.getAllIPs()
    const formattedIPs = formatIPData(ips)
    setCollections(formattedIPs)
  }, [])

  // Initial load and setup refresh interval
  useEffect(() => {
    loadIPs()
    const interval = setInterval(loadIPs, 5000)
    return () => clearInterval(interval)
  }, [loadIPs])

  // Get unique categories from IPs
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

  const handleBuy = (shares) => {
    if (selectedCollection) {
      tempIPDatabase.updateShares(selectedCollection.id, shares)
      loadIPs() // Refresh collections after purchase
      onModalClose()
    }
  }

  const handleIPRegistered = (newCollection) => {
    // Add the new collection to the existing collections
    setCollections(prevCollections => [newCollection, ...prevCollections])
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
            <FilterBar onOpen={onFilterOpen} onIPRegistered={handleIPRegistered} />

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
        onBuy={handleBuy}
      />
    </AnimatedPage>
  )
}

export default Marketplace 