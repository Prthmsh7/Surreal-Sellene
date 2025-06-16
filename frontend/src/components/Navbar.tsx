import {
  Box,
  HStack,
  Button,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
  Avatar,
  Badge,
  useOutsideClick,
  InputRightElement,
  Flex,
  Container,
  Image,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FaSearch, FaBars, FaUserCircle, FaTimes, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@tomo-inc/tomo-evm-kit'
import selleneLogo from '../assets/Sellene-logo-light.png'
import { DeBridgeTest } from '../components/DeBridgeTest'

export const Navbar = () => {
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const [loading, setLoading] = useState(false)

  // Mock search results - replace with actual API call
  const searchResults = [
    {
      type: 'creator',
      name: 'Sarah Chen',
      avatar: 'https://bit.ly/dan-abramov',
      description: 'Digital Artist',
      badge: 'Verified',
    },
    {
      type: 'collection',
      name: 'Digital Dreams',
      avatar: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
      description: 'Collection by Sarah Chen',
      badge: 'Popular',
    },
    {
      type: 'artwork',
      name: 'Neural Network #42',
      avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      description: 'AI Art by Alex Rivera',
      badge: 'New',
    },
  ]

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Developers', path: '/developers' },
    { name: 'DeBridge Test', path: '/debridge-test' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  useOutsideClick({
    ref: searchRef as React.RefObject<HTMLElement>,
    handler: () => setIsSearchFocused(false),
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const handleAuth = async () => {
    try {
      setLoading(true)
      if (openConnectModal) {
        await openConnectModal()
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setLoading(false)
    }
  }

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'

  // Dummy profile data
  const profileData = {
    name: 'John Doe',
    avatar: 'https://bit.ly/dan-abramov',
    balance: '2.5 ETH',
    collections: 3,
    followers: 128,
    following: 45,
    bio: 'Digital artist and NFT enthusiast',
    joinedDate: 'March 2023',
    recentActivity: [
      {
        type: 'mint',
        title: 'Neural Dreams #42',
        timestamp: '2 hours ago',
        value: '0.5 ETH'
      },
      {
        type: 'sale',
        title: 'Digital Sunset',
        timestamp: '1 day ago',
        value: '1.2 ETH'
      },
      {
        type: 'purchase',
        title: 'Cosmic Waves',
        timestamp: '3 days ago',
        value: '0.8 ETH'
      }
    ],
    stats: {
      totalSales: '12.5 ETH',
      totalPurchases: '8.3 ETH',
      itemsCreated: 15,
      itemsSold: 8
    },
    badges: [
      { name: 'Early Adopter', color: 'green' },
      { name: 'Top Creator', color: 'purple' },
      { name: 'Verified', color: 'blue' }
    ]
  }

  return (
    <Box
      as="nav"
      position="fixed"
      w="full"
      h="80px"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex={1000}
    >
      <Container maxW="1400px" h="full">
        <Flex h="full" align="center" justify="space-between">
          {/* Left Section - Logo */}
          <Box flex="0 0 auto">
            <RouterLink to="/">
              <HStack spacing={2}>
                <Image src={selleneLogo} h="60px" alt="Sellene Logo" />
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                  fontFamily="heading"
                  letterSpacing="tight"
                >
                  Sellene
                </Text>
              </HStack>
            </RouterLink>
          </Box>

          {/* Center Section - Search */}
          <Box
            ref={searchRef}
            position="relative"
            maxW="500px"
            w="full"
            mx={8}
            display={{ base: 'none', md: 'block' }}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="brand.lightGray" />
              </InputLeftElement>
              <Input
                placeholder="Search creators, artworks, or collections..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                bg="brand.darkerGray"
                borderColor={isSearchFocused ? 'brand.blue' : borderColor}
                _hover={{ borderColor: 'brand.blue' }}
                _focus={{ borderColor: 'brand.blue' }}
                color="white"
                _placeholder={{ color: 'brand.lightGray' }}
                borderRadius="full"
                pr={searchQuery ? '40px' : undefined}
                h="44px"
              />
              {searchQuery && (
                <InputRightElement>
                  <Icon
                    as={FaTimes}
                    color="brand.lightGray"
                    cursor="pointer"
                    onClick={clearSearch}
                    _hover={{ color: 'white' }}
                  />
                </InputRightElement>
              )}
            </InputGroup>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery && (
              <Box
                position="absolute"
                top="100%"
                left={0}
                right={0}
                mt={2}
                bg={bgColor}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
                boxShadow="xl"
                maxH="400px"
                overflowY="auto"
                zIndex={1000}
              >
                <VStack spacing={0} align="stretch">
                  {searchResults.map((result, index) => (
                    <Box
                      key={index}
                      p={3}
                      _hover={{ bg: 'brand.darkerGray' }}
                      cursor="pointer"
                    >
                      <HStack spacing={3}>
                        <Avatar size="sm" src={result.avatar} />
                        <Box flex={1}>
                          <HStack>
                            <Text fontWeight="medium" color="white">
                              {result.name}
                            </Text>
                            <Badge
                              colorScheme={
                                result.badge === 'Verified'
                                  ? 'green'
                                  : result.badge === 'Popular'
                                  ? 'purple'
                                  : 'blue'
                              }
                              fontSize="xs"
                            >
                              {result.badge}
                            </Badge>
                          </HStack>
                          <Text fontSize="sm" color="brand.lightGray">
                            {result.description}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
            )}
          </Box>

          {/* Right Section - Navigation & Auth */}
          <HStack spacing={4}>
            {/* Desktop Navigation */}
            <HStack
              spacing={6}
              display={{ base: 'none', lg: 'flex' }}
            >
              {navItems.map((item) => (
                <RouterLink key={item.path} to={item.path}>
                  <Text
                    color={isActive(item.path) ? 'white' : 'brand.lightGray'}
                    fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                    _hover={{ color: 'white' }}
                  >
                    {item.name}
                  </Text>
                </RouterLink>
              ))}
            </HStack>

            {/* Profile Section - Always visible */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                _hover={{ bg: 'brand.darkerGray' }}
                _active={{ bg: 'brand.darkerGray' }}
              >
                <HStack spacing={2}>
                  <Avatar size="sm" src={address ? profileData.avatar : 'https://bit.ly/broken-link'} />
                  <Text 
                    color={address ? "white" : "brand.blue"} 
                    display={{ base: 'none', md: 'block' }}
                    fontWeight={address ? "normal" : "bold"}
                  >
                    {address ? profileData.name : 'Connect'}
                  </Text>
                </HStack>
              </MenuButton>
              <MenuList bg={bgColor} borderColor={borderColor}>
                {address ? (
                  <>
                    <Box p={3}>
                      <VStack align="start" spacing={2}>
                        <HStack spacing={2}>
                          <Text color="white" fontWeight="bold">
                            {profileData.name}
                          </Text>
                          {profileData.badges.map((badge, index) => (
                            <Badge key={index} colorScheme={badge.color} fontSize="xs">
                              {badge.name}
                            </Badge>
                          ))}
                        </HStack>
                        <Text color="brand.lightGray" fontSize="sm">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </Text>
                        <Text color="brand.lightGray" fontSize="sm">
                          {profileData.bio}
                        </Text>
                        <Text color="brand.lightGray" fontSize="xs">
                          Joined {profileData.joinedDate}
                        </Text>
                        <HStack spacing={4} pt={2}>
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="bold">
                              {profileData.balance}
                            </Text>
                            <Text color="brand.lightGray" fontSize="xs">
                              Balance
                            </Text>
                          </VStack>
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="bold">
                              {profileData.collections}
                            </Text>
                            <Text color="brand.lightGray" fontSize="xs">
                              Collections
                            </Text>
                          </VStack>
                          <VStack align="start" spacing={0}>
                            <Text color="white" fontSize="sm" fontWeight="bold">
                              {profileData.followers}
                            </Text>
                            <Text color="brand.lightGray" fontSize="xs">
                              Followers
                            </Text>
                          </VStack>
                        </HStack>
                        <Box w="full" pt={2}>
                          <Text color="white" fontSize="sm" fontWeight="bold" mb={2}>
                            Recent Activity
                          </Text>
                          <VStack align="start" spacing={2}>
                            {profileData.recentActivity.map((activity, index) => (
                              <HStack key={index} spacing={2} w="full">
                                <Badge
                                  colorScheme={
                                    activity.type === 'mint'
                                      ? 'green'
                                      : activity.type === 'sale'
                                      ? 'blue'
                                      : 'purple'
                                  }
                                  fontSize="xs"
                                >
                                  {activity.type}
                                </Badge>
                                <Text color="white" fontSize="xs" flex={1}>
                                  {activity.title}
                                </Text>
                                <Text color="brand.lightGray" fontSize="xs">
                                  {activity.value}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>
                    <MenuDivider borderColor={borderColor} />
                    <MenuItem
                      icon={<FaUser />}
                      _hover={{ bg: 'brand.darkerGray' }}
                      color="white"
                    >
                      View Profile
                    </MenuItem>
                    <MenuItem
                      icon={<FaCog />}
                      _hover={{ bg: 'brand.darkerGray' }}
                      color="white"
                    >
                      Settings
                    </MenuItem>
                    <MenuDivider borderColor={borderColor} />
                    <MenuItem
                      icon={<FaSignOutAlt />}
                      _hover={{ bg: 'brand.darkerGray' }}
                      color="white"
                    >
                      Disconnect
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <Box p={3}>
                      <VStack align="start" spacing={2}>
                        <Text color="white" fontWeight="bold">
                          Welcome to Sellene
                        </Text>
                        <Text color="brand.lightGray" fontSize="sm">
                          Connect your wallet to access all features
                        </Text>
                      </VStack>
                    </Box>
                    <MenuDivider borderColor={borderColor} />
                    <MenuItem
                      onClick={handleAuth}
                      icon={<FaUser />}
                      _hover={{ bg: 'brand.darkerGray' }}
                      color="brand.blue"
                      fontWeight="bold"
                    >
                      Connect Wallet
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>

            {/* Mobile Menu Button */}
            <Button
              display={{ base: 'flex', lg: 'none' }}
              variant="ghost"
              onClick={onOpen}
              _hover={{ bg: 'brand.darkerGray' }}
              _active={{ bg: 'brand.darkerGray' }}
            >
              <FaBars color="white" />
            </Button>
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <RouterLink key={item.path} to={item.path} onClick={onClose}>
                  <Text
                    color={isActive(item.path) ? 'white' : 'brand.lightGray'}
                    fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                    _hover={{ color: 'white' }}
                  >
                    {item.name}
                  </Text>
                </RouterLink>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
} 