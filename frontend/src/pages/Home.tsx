import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaRocket, FaChartLine, FaLock, FaExchangeAlt, FaUsers } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'
import AnimatedPage from '../components/AnimatedPage'

const MotionBox = motion(Box)

const Feature = ({ icon, title, text }: { icon: any; title: string; text: string }) => {
  return (
    <Stack spacing={4} align="center" textAlign="center">
      <Icon as={icon} w={10} h={10} color="brand.blue" />
      <Text fontWeight="bold" fontSize="xl" color="white">{title}</Text>
      <Text color="brand.lightGray">{text}</Text>
    </Stack>
  )
}

const Home = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <Box bg={bgColor} minH="100vh">
        {/* Hero Section */}
        <Box py={20} bg="brand.darkerGray">
          <Container maxW="1200px">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="space-between"
              gap={8}
            >
              <VStack align={{ base: 'center', md: 'start' }} spacing={6} flex={1}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Heading
                    size="2xl"
                    color="white"
                    fontFamily="heading"
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Tokenize Your Creative Work
                  </Heading>
                  <Text
                    fontSize="xl"
                    color="brand.lightGray"
                    mt={4}
                    textAlign={{ base: 'center', md: 'left' }}
                  >
                    Transform your intellectual property into tradeable assets
                  </Text>
                </MotionBox>
                <HStack spacing={4} justify={{ base: 'center', md: 'start' }}>
                  <Button
                    as={RouterLink}
                    to="/dashboard"
                    colorScheme="blue"
                    size="lg"
                    leftIcon={<FaRocket />}
                  >
                    Get Started
                  </Button>
                  <Button
                    as={RouterLink}
                    to="/dashboard"
                    variant="outline"
                    size="lg"
                    leftIcon={<FaChartLine />}
                  >
                    Learn More
                  </Button>
                </HStack>
              </VStack>
              <MotionBox
                flex={1}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop&q=60"
                  alt="Digital Art"
                  rounded="lg"
                  shadow="2xl"
                />
              </MotionBox>
            </Flex>
          </Container>
        </Box>

        {/* Features Section */}
        <Box py={20}>
          <Container maxW="1200px">
            <VStack spacing={12}>
              <VStack spacing={4} textAlign="center">
                <Heading color="white" fontFamily="heading">Why Choose Us</Heading>
                <Text color="brand.lightGray" maxW="600px">
                  Our platform offers unique features to help creators and investors succeed
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} w="full">
                <Feature
                  icon={FaLock}
                  title="Secure IP Protection"
                  text="Your intellectual property is protected with state-of-the-art security measures"
                />
                <Feature
                  icon={FaExchangeAlt}
                  title="Easy Trading"
                  text="Trade your tokenized assets seamlessly on our platform"
                />
                <Feature
                  icon={FaUsers}
                  title="Growing Community"
                  text="Join a vibrant community of creators and investors"
                />
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box py={20} bg="brand.darkerGray">
          <Container maxW="1200px">
            <VStack spacing={8} textAlign="center">
              <Heading color="white" fontFamily="heading">Ready to Get Started?</Heading>
              <Text color="brand.lightGray" maxW="600px">
                Join our platform today and start tokenizing your creative work
              </Text>
              <Button
                as={RouterLink}
                to="/dashboard"
                colorScheme="blue"
                size="lg"
                leftIcon={<FaRocket />}
              >
                Launch Dashboard
              </Button>
            </VStack>
          </Container>
        </Box>
      </Box>
    </AnimatedPage>
  )
}

export default Home 