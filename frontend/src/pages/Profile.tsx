import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Avatar,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaEdit, FaWallet, FaHistory, FaStar } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'

const Profile = () => {
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <Box minH="100vh" bg="brand.darkGray" pt="80px">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            {/* Profile Header */}
            <Box
              bg={bgColor}
              p={8}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
            >
              <HStack spacing={8} align="start">
                <Avatar
                  size="2xl"
                  name="John Doe"
                  src="https://bit.ly/dan-abramov"
                />
                <VStack align="start" flex={1} spacing={4}>
                  <HStack justify="space-between" w="full">
                    <VStack align="start" spacing={1}>
                      <Heading size="lg" color="white">John Doe</Heading>
                      <Text color="brand.lightGray">@johndoe</Text>
                    </VStack>
                    <Button
                      leftIcon={<FaEdit />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Edit Profile
                    </Button>
                  </HStack>
                  <Text color="white">
                    Digital artist and NFT creator. Passionate about bringing unique digital art to life.
                  </Text>
                  <HStack spacing={4}>
                    <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
                      Creator
                    </Badge>
                    <Badge colorScheme="green" px={2} py={1} borderRadius="md">
                      Verified
                    </Badge>
                  </HStack>
                </VStack>
              </HStack>
            </Box>

            {/* Stats Grid */}
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
              <Stat
                bg={bgColor}
                p={6}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <StatLabel color="brand.lightGray">Total Sales</StatLabel>
                <StatNumber color="white">$24,500</StatNumber>
                <StatHelpText color="green.400">+12.5% from last month</StatHelpText>
              </Stat>

              <Stat
                bg={bgColor}
                p={6}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <StatLabel color="brand.lightGray">Artworks</StatLabel>
                <StatNumber color="white">42</StatNumber>
                <StatHelpText color="brand.lightGray">Total creations</StatHelpText>
              </Stat>

              <Stat
                bg={bgColor}
                p={6}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <StatLabel color="brand.lightGray">Followers</StatLabel>
                <StatNumber color="white">1,234</StatNumber>
                <StatHelpText color="green.400">+89 this week</StatHelpText>
              </Stat>

              <Stat
                bg={bgColor}
                p={6}
                borderRadius="lg"
                border="1px"
                borderColor={borderColor}
              >
                <StatLabel color="brand.lightGray">Rating</StatLabel>
                <StatNumber color="white">4.8</StatNumber>
                <StatHelpText color="brand.lightGray">Based on 156 reviews</StatHelpText>
              </Stat>
            </SimpleGrid>

            {/* Quick Actions */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
              <Button
                leftIcon={<FaWallet />}
                colorScheme="blue"
                variant="outline"
                size="lg"
                h="100px"
              >
                Connect Wallet
              </Button>
              <Button
                leftIcon={<FaHistory />}
                colorScheme="blue"
                variant="outline"
                size="lg"
                h="100px"
              >
                View History
              </Button>
              <Button
                leftIcon={<FaStar />}
                colorScheme="blue"
                variant="outline"
                size="lg"
                h="100px"
              >
                My Collections
              </Button>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  )
}

export default Profile 