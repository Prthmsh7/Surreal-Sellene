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
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch, FaBars, FaUserCircle, FaTimes, FaUser, FaCog, FaSignOutAlt, FaEdit } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@tomo-inc/tomo-evm-kit'
import selleneLogo from '../assets/Sellene-logo-light.png'
import { useUserProfile } from '../contexts/UserProfileContext'
import { EditProfileModal } from './EditProfileModal'

export const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const { address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { profile, loading } = useUserProfile()
  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)
      if (openConnectModal) {
        await openConnectModal()
      }
    } catch (error) {
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const displayAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect'

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
                      p={4}
                      _hover={{ bg: 'brand.darkerGray' }}
                      cursor="pointer"
                    >
                      <HStack spacing={4}>
                        <Avatar size="sm" src={result.avatar} />
                        <VStack align="start" spacing={1}>
                          <HStack>
                            <Text color="white" fontWeight="bold">
                              {result.name}
                            </Text>
                            <Badge colorScheme="blue" fontSize="xs">
                              {result.badge}
                            </Badge>
                          </HStack>
                          <Text color="brand.lightGray" fontSize="sm">
                            {result.description}
                          </Text>
                        </VStack>
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

            {/* Profile Section */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                _hover={{ bg: 'brand.darkerGray' }}
                _active={{ bg: 'brand.darkerGray' }}
              >
                <HStack spacing={2}>
                  <Avatar
                    size="sm"
                    name={profile?.name || displayAddress}
                    src={profile?.profilePicture}
                  />
                  <Text
                    color={address ? "white" : "brand.blue"}
                    display={{ base: 'none', md: 'block' }}
                    fontWeight={address ? "normal" : "bold"}
                  >
                    {address ? profile?.name || displayAddress : 'Connect'}
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
                            {profile?.name || `User ${displayAddress}`}
                          </Text>
                          {profile?.badges.map((badge, index) => (
                            <Badge key={index} colorScheme={badge.color} fontSize="xs">
                              {badge.name}
                            </Badge>
                          ))}
                        </HStack>
                        <Text color="brand.lightGray" fontSize="sm">
                          {displayAddress}
                        </Text>
                        <Text color="brand.lightGray" fontSize="sm">
                          {profile?.bio || 'No bio yet'}
                        </Text>
                      </VStack>
                    </Box>
                    <MenuDivider borderColor={borderColor} />
                    <MenuItem
                      icon={<FaUser />}
                      onClick={() => navigate('/profile')}
                      _hover={{ bg: 'brand.darkerGray' }}
                      color="white"
                    >
                      View Profile
                    </MenuItem>
                    <MenuDivider borderColor={borderColor} />
                    <MenuItem
                      icon={<FaSignOutAlt />}
                      onClick={handleAuth}
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

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor} borderLeft="1px" borderColor={borderColor}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
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
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Profile Edit Modal */}
      <EditProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </Box>
  )
} 