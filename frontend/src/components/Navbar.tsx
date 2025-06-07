import {
  Box,
  HStack,
  Button,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Text,
  List,
  ListItem,
  Avatar,
  Badge,
  useOutsideClick,
  InputRightElement,
  Flex,
  Container,
  Image,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { FaSearch, FaBars, FaUserCircle, FaBell, FaCog, FaTimes } from 'react-icons/fa'
import { useState, useRef } from 'react'
import selleneLogo from '../assets/Sellene-logo-light.png'

const Navbar = () => {
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

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
    { name: 'Creators Studio', path: '/studio' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Developers', path: '/developers' },
    { name: 'About', path: '/about' },
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  useOutsideClick({
    ref: searchRef,
    handler: () => setIsSearchFocused(false),
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
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
              >
                <List spacing={0}>
                  {searchResults.map((result, index) => (
                    <ListItem
                      key={index}
                      p={3}
                      _hover={{ bg: 'brand.darkerGray' }}
                      cursor="pointer"
                      borderBottom={index !== searchResults.length - 1 ? '1px' : 'none'}
                      borderColor={borderColor}
                    >
                      <HStack spacing={3}>
                        <Avatar
                          size="sm"
                          name={result.name}
                          src={result.avatar}
                        />
                        <VStack align="start" spacing={0} flex={1}>
                          <HStack spacing={2}>
                            <Text color="white" fontWeight="medium">
                              {result.name}
                            </Text>
                            <Badge
                              colorScheme={
                                result.badge === 'Verified'
                                  ? 'green'
                                  : result.badge === 'Popular'
                                  ? 'blue'
                                  : 'purple'
                              }
                              fontSize="xs"
                            >
                              {result.badge}
                            </Badge>
                          </HStack>
                          <Text color="brand.lightGray" fontSize="sm">
                            {result.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>

          {/* Right Section - Navigation & Actions */}
          <HStack spacing={6} align="center">
            {/* Desktop Navigation */}
            <HStack spacing={6} display={{ base: 'none', lg: 'flex' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  color={isActive(item.path) ? 'brand.blue' : 'white'}
                  _hover={{
                    bg: 'brand.darkerGray',
                    color: 'brand.blue',
                  }}
                  px={3}
                  h="44px"
                >
                  {item.name}
                </Button>
              ))}
            </HStack>

            {/* Right Side Actions */}
            <HStack spacing={4}>
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: 'brand.darkerGray' }}
                display={{ base: 'none', md: 'flex' }}
                h="44px"
                w="44px"
                p={0}
              >
                <Icon as={FaBell} boxSize={5} />
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'brand.darkerGray' }}
                  h="44px"
                  w="44px"
                  p={0}
                >
                  <Icon as={FaUserCircle} boxSize={6} />
                </MenuButton>
                <MenuList bg={bgColor} borderColor={borderColor}>
                  <MenuItem
                    as={RouterLink}
                    to="/profile"
                    _hover={{ bg: 'brand.darkerGray' }}
                    color="white"
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to="/settings"
                    _hover={{ bg: 'brand.darkerGray' }}
                    color="white"
                  >
                    Settings
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                color="white"
                _hover={{ bg: 'brand.darkerGray' }}
                display={{ base: 'flex', lg: 'none' }}
                onClick={onOpen}
                h="44px"
                w="44px"
                p={0}
              >
                <Icon as={FaBars} boxSize={5} />
              </Button>
            </HStack>
          </HStack>
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bgColor} borderLeft="1px" borderColor={borderColor}>
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  color={isActive(item.path) ? 'brand.blue' : 'white'}
                  _hover={{
                    bg: 'brand.darkerGray',
                    color: 'brand.blue',
                  }}
                  onClick={onClose}
                  h="44px"
                >
                  {item.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Navbar 