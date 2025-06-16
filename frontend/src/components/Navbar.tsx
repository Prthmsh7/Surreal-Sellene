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
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FaSearch, FaBars, FaUserCircle, FaTimes } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useAccount } from 'wagmi'
import { useConnectModal } from '@tomo-inc/tomo-evm-kit'
import selleneLogo from '../assets/Sellene-logo-light.png'
import { DeBridgeTest } from '../components/DeBridgeTest'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

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
  const isMobile = useBreakpointValue({ base: true, md: false })

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

  return (
    <Box
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      w="full"
      h="80px"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex={1000}
    >
      <Container maxW="1400px" h="full" px={4}>
        <Flex h="full" align="center" justify="space-between">
          {/* Left Section - Logo and Mobile Menu */}
          <HStack spacing={4}>
            <Icon
              as={FaBars}
              display={{ base: 'block', md: 'none' }}
              color="white"
              w={6}
              h={6}
              cursor="pointer"
              onClick={onOpen}
            />
            <RouterLink to="/">
              <HStack spacing={2}>
                <Image src={selleneLogo} h="40px" alt="Sellene Logo" />
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color="white"
                  fontFamily="heading"
                  letterSpacing="tight"
                  display={{ base: 'none', sm: 'block' }}
                >
                  Sellene
                </Text>
              </HStack>
            </RouterLink>
          </HStack>

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

          {/* Right Section - Navigation and Connect */}
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => (
              <RouterLink key={item.path} to={item.path}>
                <Text
                  color={isActive(item.path) ? 'white' : 'brand.lightGray'}
                  _hover={{ color: 'white' }}
                  fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                >
                  {item.name}
                </Text>
              </RouterLink>
            ))}
            <Button
              onClick={handleAuth}
              isLoading={loading}
              bg="brand.blue"
              color="white"
              _hover={{ bg: 'brand.blueHover' }}
              borderRadius="full"
              px={6}
            >
              {displayAddress}
            </Button>
          </HStack>

          {/* Mobile Connect Button */}
          <Button
            display={{ base: 'flex', md: 'none' }}
            onClick={handleAuth}
            isLoading={loading}
            bg="brand.blue"
            color="white"
            _hover={{ bg: 'brand.blueHover' }}
            borderRadius="full"
            px={4}
          >
            {displayAddress}
          </Button>
        </Flex>
      </Container>

      {/* Mobile Menu Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <HStack spacing={2}>
              <Image src={selleneLogo} h="40px" alt="Sellene Logo" />
              <Text color="white" fontSize="xl" fontWeight="bold">
                Sellene
              </Text>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {navItems.map((item) => (
                <RouterLink key={item.path} to={item.path} onClick={onClose}>
                  <Text
                    color={isActive(item.path) ? 'white' : 'brand.lightGray'}
                    _hover={{ color: 'white' }}
                    fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                    py={2}
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