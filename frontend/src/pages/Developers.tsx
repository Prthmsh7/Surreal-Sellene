import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Icon,
  Badge,
  Code,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import {
  FaRocket,
  FaUsers,
  FaCoins,
  FaChartLine,
  FaHandshake,
  FaLock,
  FaGlobe,
  FaShieldAlt,
  FaBook,
  FaCode,
  FaTerminal,
} from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import MarqueeMenu from '../components/MarqueeMenu'
import '../components/MarqueeMenu.css'

const MotionBox = motion(Box)

const Developers = () => {
  const bgColor = useColorModeValue('brand.darkerGray', 'brand.darkerGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const resources = [
    {
      title: 'API Documentation',
      description: 'Comprehensive guide to our REST API endpoints and authentication',
      icon: FaBook,
      link: '#',
      badge: 'New',
    },
    {
      title: 'SDK Examples',
      description: 'Code samples and examples for our JavaScript and Python SDKs',
      icon: FaCode,
      link: '#',
      badge: 'Popular',
    },
    {
      title: 'Quick Start',
      description: 'Get started with our platform in less than 5 minutes',
      icon: FaRocket,
      link: '#',
    },
    {
      title: 'CLI Tool',
      description: 'Command-line interface for managing your digital assets',
      icon: FaTerminal,
      link: '#',
    },
  ]

  return (
    <AnimatedPage>
      <Box minH="100vh" bg="brand.darkGray" pt="80px">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={12} align="stretch">
            {/* About Section */}
            <Box textAlign="center" py={20} bg="brand.darkGray" mb={16}>
              <Container maxW="1200px">
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon as={FaRocket} w={12} h={12} color="brand.blue" mb={4} />
                  <Heading size="2xl" mb={6} color="white" fontFamily="heading">
                    About Sellene
                  </Heading>
                  <Text fontSize="xl" color="brand.lightGray" maxW="800px" mx="auto" mb={8}>
                    We're revolutionizing how creative works are valued, shared, and monetized through blockchain technology.
                    Our platform enables fractional ownership of intellectual property, making it accessible to everyone.
                  </Text>
                </MotionBox>
              </Container>
            </Box>

            {/* Mission Section */}
            <Container maxW="1200px" mb={16}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
                <VStack align="start" spacing={6}>
                  <Heading size="xl" color="white" fontFamily="heading">
                    Our Mission
                  </Heading>
                  <Text fontSize="lg" color="brand.lightGray">
                    We believe that creativity should be accessible to everyone. Our mission is to democratize access to creative works
                    by enabling fractional ownership through blockchain technology. We're building a future where creators can
                    monetize their work directly and investors can participate in the success of creative projects.
                  </Text>
                  <HStack spacing={4}>
                    <Button
                      as={RouterLink}
                      to="/register-ip"
                      colorScheme="blue"
                      size="lg"
                      leftIcon={<FaRocket />}
                    >
                      Start Creating
                    </Button>
                    <Button
                      as={RouterLink}
                      to="/investor"
                      variant="outline"
                      size="lg"
                      leftIcon={<FaChartLine />}
                    >
                      Start Investing
                    </Button>
                  </HStack>
                </VStack>
                <SimpleGrid columns={2} spacing={4}>
                  <StatCard
                    icon={FaUsers}
                    label="Active Creators"
                    value="1,234"
                    helpText="+12% from last month"
                  />
                  <StatCard
                    icon={FaCoins}
                    label="Total Value Locked"
                    value="$4.2M"
                    helpText="+23% from last month"
                  />
                  <StatCard
                    icon={FaChartLine}
                    label="Average ROI"
                    value="156%"
                    helpText="+8% from last month"
                  />
                  <StatCard
                    icon={FaHandshake}
                    label="Successful Deals"
                    value="892"
                    helpText="+15% from last month"
                  />
                </SimpleGrid>
              </SimpleGrid>
            </Container>

            {/* Security Section */}
            <Box bg="brand.darkGray" py={16} mb={16}>
              <Container maxW="1200px">
                <Heading size="xl" mb={12} textAlign="center" color="white" fontFamily="heading">
                  Built on Security
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                  <SecurityCard
                    icon={FaLock}
                    title="Blockchain Protection"
                    description="Your work is protected by blockchain technology, ensuring authenticity and ownership."
                  />
                  <SecurityCard
                    icon={FaGlobe}
                    title="Global Reach"
                    description="Access a worldwide network of investors and creators."
                  />
                  <SecurityCard
                    icon={FaShieldAlt}
                    title="Smart Contracts"
                    description="Automated, transparent, and secure transactions through smart contracts."
                  />
                </SimpleGrid>
              </Container>
            </Box>

            {/* Developers Section Header */}
            <VStack spacing={4} align="start">
              <Heading color="white" size="2xl">Developers</Heading>
              <Text color="brand.lightGray" fontSize="lg">
                Build the future of digital art with our powerful APIs and tools
              </Text>
            </VStack>

            {/* Quick Start */}
            <Box
              bg={bgColor}
              p={8}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
            >
              <VStack spacing={6} align="start">
                <Heading size="lg" color="white">Quick Start</Heading>
                <Code
                  p={4}
                  borderRadius="md"
                  bg="brand.darkGray"
                  color="white"
                  w="full"
                  fontSize="sm"
                >
                  npm install @sellene/sdk
                </Code>
                <Text color="brand.lightGray">
                  Initialize the SDK with your API key to get started
                </Text>
                <Code
                  p={4}
                  borderRadius="md"
                  bg="brand.darkGray"
                  color="white"
                  w="full"
                  fontSize="sm"
                >
                  {`const sellene = new SelleneSDK({
  apiKey: 'your-api-key',
  environment: 'production'
});`}
                </Code>
              </VStack>
            </Box>

            {/* Resources Grid */}
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color="white">Resources</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {resources.map((resource) => (
                  <Box
                    key={resource.title}
                    bg={bgColor}
                    p={6}
                    borderRadius="lg"
                    border="1px"
                    borderColor={borderColor}
                    transition="all 0.2s"
                    _hover={{ 
                      transform: 'translateY(-4px)',
                      borderColor: 'brand.blue',
                      boxShadow: '0 10px 20px rgba(66, 153, 225, 0.2)'
                    }}
                  >
                    <VStack align="start" spacing={4}>
                      <HStack spacing={4}>
                        <Icon as={resource.icon} boxSize={6} color="brand.blue" />
                        <Heading size="md" color="white">
                          {resource.title}
                        </Heading>
                        {resource.badge && (
                          <Badge colorScheme="blue" px={2} py={1} borderRadius="md">
                            {resource.badge}
                          </Badge>
                        )}
                      </HStack>
                      <Text color="brand.lightGray">
                        {resource.description}
                      </Text>
                      <Button
                        as={Link}
                        href={resource.link}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                      >
                        Learn More
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>

            {/* Community Section */}
            <Box
              bg={bgColor}
              p={8}
              borderRadius="lg"
              border="1px"
              borderColor={borderColor}
            >
              <VStack spacing={6} align="start">
                <Heading size="lg" color="white">Join Our Community</Heading>
                <Text color="brand.lightGray">
                  Connect with other developers, share ideas, and get help from our team
                </Text>
                <HStack spacing={4}>
                  <Button
                    as={Link}
                    href="#"
                    colorScheme="blue"
                    leftIcon={<FaGlobe />}
                  >
                    Discord
                  </Button>
                  <Button
                    as={Link}
                    href="#"
                    variant="outline"
                    leftIcon={<FaCode />}
                  >
                    GitHub
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  )
}

const StatCard = ({ icon, label, value, helpText }: { icon: any; label: string; value: string; helpText: string }) => (
  <Box
    bg={useColorModeValue('brand.darkerGray', 'brand.darkerGray')}
    p={6}
    borderRadius="lg"
    border="1px"
    borderColor={useColorModeValue('brand.lightGray', 'brand.lightGray')}
  >
    <VStack align="start" spacing={2}>
      <Icon as={icon} boxSize={6} color="brand.blue" />
      <Text color="brand.lightGray" fontSize="sm">{label}</Text>
      <Heading size="lg" color="white">{value}</Heading>
      <Text color="brand.blue" fontSize="sm">{helpText}</Text>
    </VStack>
  </Box>
)

const SecurityCard = ({ icon, title, description }: { icon: any; title: string; description: string }) => (
  <Box
    bg={useColorModeValue('brand.darkerGray', 'brand.darkerGray')}
    p={6}
    borderRadius="lg"
    border="1px"
    borderColor={useColorModeValue('brand.lightGray', 'brand.lightGray')}
  >
    <VStack align="start" spacing={4}>
      <Icon as={icon} boxSize={8} color="brand.blue" />
      <Heading size="md" color="white">{title}</Heading>
      <Text color="brand.lightGray">{description}</Text>
    </VStack>
  </Box>
)

export default Developers 