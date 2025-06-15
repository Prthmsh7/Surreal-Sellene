import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  SimpleGrid,
  Button,
  useColorModeValue,
  Icon,
  Flex,
  HStack,
  Image,
  useBreakpointValue,
  Badge,
  useToast,
  Grid,
  GridItem,
  Circle,
  useToken,
} from '@chakra-ui/react'
import { FaRocket, FaUsers, FaCoins, FaChartLine, FaHandshake, FaLock, FaGlobe, FaShieldAlt, FaPalette, FaLightbulb, FaCheckCircle } from 'react-icons/fa'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import { keyframes } from '@emotion/react'

const MotionBox = motion(Box)

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const About = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const isMobile = useBreakpointValue({ base: true, md: false })
  const navigate = useNavigate()
  const toast = useToast()
  const [blue, purple] = useToken('colors', ['brand.blue', 'brand.purple'])

  const handleArtistClick = async () => {
    try {
      // TODO: Implement wallet connection
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to join as an artist",
        status: "info",
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const handleCollectorClick = () => {
    navigate('/marketplace')
  }

  return (
    <AnimatedPage>
      <Box 
        minH="100vh" 
        bg={bgColor} 
        pt={{ base: "100px", md: "120px", lg: "140px" }} 
        pb={{ base: 4, md: 6, lg: 8 }}
        position="relative"
        overflow="hidden"
        style={{ zIndex: 0 }}
      >
        {/* Animated background elements */}
        <Box
          position="absolute"
          top="10%"
          left="5%"
          w="400px"
          h="400px"
          borderRadius="full"
          bgGradient={`radial(${blue}, ${purple})`}
          opacity="0.1"
          filter="blur(40px)"
          animation={`${float} 8s ease-in-out infinite`}
        />
        <Box
          position="absolute"
          bottom="10%"
          right="5%"
          w="500px"
          h="500px"
          borderRadius="full"
          bgGradient={`radial(${purple}, ${blue})`}
          opacity="0.1"
          filter="blur(40px)"
          animation={`${float} 8s ease-in-out infinite reverse`}
        />

        <Container maxW="container.xl" h="full">
          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
            gap={{ base: 4, md: 5, lg: 6 }}
            h="full"
          >
            {/* Left Column */}
            <GridItem>
              <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="stretch" h="full">
                {/* Hero Section */}
                <Box 
                  bg={bgColor}
                  p={{ base: 4, md: 5, lg: 6 }}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderColor}
                  position="relative"
                >
                  <Badge
                    position="absolute"
                    top={{ base: 2, md: 3, lg: 4 }}
                    right={{ base: 2, md: 3, lg: 4 }}
                    colorScheme="blue"
                    px={{ base: 2, md: 3 }}
                    py={{ base: 0.5, md: 1 }}
                    borderRadius="full"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="medium"
                  >
                    Beta Access Available
                  </Badge>
                  <VStack spacing={{ base: 3, md: 4 }} align="start">
                    <Icon as={FaLightbulb} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} color="brand.blue" />
                    <Heading 
                      size={{ base: "lg", md: "xl" }}
                      color="white" 
                      fontFamily="heading"
                      lineHeight="1.2"
                      bgGradient="linear(to-r, brand.blue, brand.purple)"
                      bgClip="text"
                    >
                      Revolutionizing Digital Art Trading
                    </Heading>
                    <Text color="brand.lightGray" fontSize={{ base: "sm", md: "md" }}>
                      We're building the future of digital art trading, where artists and collectors connect in a secure, 
                      transparent, and innovative marketplace.
                    </Text>
                    <HStack spacing={{ base: 3, md: 4 }}>
                      <Button
                        onClick={handleArtistClick}
                        colorScheme="blue"
                        size={{ base: "sm", md: "md" }}
                        leftIcon={<FaRocket />}
                        px={{ base: 4, md: 6 }}
                      >
                        Join as Artist
                      </Button>
                      <Button
                        onClick={handleCollectorClick}
                        variant="outline"
                        size={{ base: "sm", md: "md" }}
                        leftIcon={<FaChartLine />}
                        px={{ base: 4, md: 6 }}
                      >
                        Start Collecting
                      </Button>
                    </HStack>
                  </VStack>
                </Box>

                {/* Stats Grid */}
                <SimpleGrid columns={2} spacing={{ base: 3, md: 4 }}>
                  <StatCard
                    icon={FaUsers}
                    label="Active Artists"
                    value="2,567"
                    helpText="+18% from last month"
                    trend="up"
                  />
                  <StatCard
                    icon={FaCoins}
                    label="Trading Volume"
                    value="$8.5M"
                    helpText="+35% from last month"
                    trend="up"
                  />
                  <StatCard
                    icon={FaChartLine}
                    label="Art Pieces"
                    value="15.2K"
                    helpText="+25% from last month"
                    trend="up"
                  />
                  <StatCard
                    icon={FaHandshake}
                    label="Successful Trades"
                    value="1,234"
                    helpText="+20% from last month"
                    trend="up"
                  />
                </SimpleGrid>
              </VStack>
            </GridItem>

            {/* Right Column */}
            <GridItem>
              <VStack spacing={{ base: 4, md: 5, lg: 6 }} align="stretch" h="full">
                {/* Mission Box */}
                <Box 
                  bg={bgColor}
                  p={{ base: 4, md: 5, lg: 6 }}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderColor}
                >
                  <VStack spacing={{ base: 3, md: 4 }} align="start">
                    <Heading size={{ base: "md", md: "lg" }} color="white" fontFamily="heading">
                      Our Mission
                    </Heading>
                    <Text color="brand.lightGray" fontSize={{ base: "xs", md: "sm" }}>
                      We're on a mission to democratize digital art trading by creating a platform that empowers artists 
                      and collectors alike through blockchain technology.
                    </Text>
                    <SimpleGrid columns={2} spacing={{ base: 3, md: 4 }} w="full">
                      <FeatureCard
                        icon={FaPalette}
                        title="For Artists"
                        description="Showcase your digital art and earn fair compensation."
                        features={['Smart Contracts', 'Direct Connection', 'Global Market']}
                        badge="New"
                      />
                      <FeatureCard
                        icon={FaChartLine}
                        title="For Collectors"
                        description="Discover and collect unique digital art pieces."
                        features={['Verified Art', 'Secure Trading', 'Investment']}
                        badge="Popular"
                      />
                    </SimpleGrid>
                  </VStack>
                </Box>

                {/* Values Box */}
                <Box 
                  bg={bgColor}
                  p={{ base: 4, md: 5, lg: 6 }}
                  borderRadius="lg"
                  border="1px"
                  borderColor={borderColor}
                >
                  <VStack spacing={{ base: 3, md: 4 }} align="start">
                    <Heading size={{ base: "md", md: "lg" }} color="white" fontFamily="heading">
                      Our Values
                    </Heading>
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 3, md: 4 }} w="full">
                      <ValueCard
                        icon={FaLock}
                        title="Security"
                        description="Blockchain-secured transactions"
                        features={['Smart Contracts', 'Encryption']}
                      />
                      <ValueCard
                        icon={FaGlobe}
                        title="Global"
                        description="Worldwide marketplace"
                        features={['24/7 Trading', 'Multi-currency']}
                      />
                      <ValueCard
                        icon={FaHandshake}
                        title="Fair"
                        description="Automated royalties"
                        features={['Transparent Fees', 'Fair Pricing']}
                      />
                    </SimpleGrid>
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </Container>

        {/* Simple Marquee Footer */}
        <Box
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          bg="blackAlpha.900"
          py={4}
          zIndex="1000"
          overflow="hidden"
          whiteSpace="nowrap"
          width="100%"
        >
          <Box
            as="div"
            animation={`${keyframes`
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            `} 35s linear infinite`}
            display="inline-flex"
            width="max-content"
          >
            <Text 
              color="white" 
              fontSize="xl" 
              fontWeight="extrabold" 
              display="inline-block" 
              mx={8}
              letterSpacing="wide"
              textTransform="uppercase"
            >
              TRADE ART • SELL YOUR CREATIONS • BUY UNIQUE PIECES • EARN ROYALTIES • PROTECT YOUR WORK • GLOBAL MARKETPLACE • INSTANT PAYMENTS • SECURE TRANSACTIONS • VERIFIED ARTISTS • EXCLUSIVE COLLECTIONS • DIGITAL GALLERY • ARTIST COMMUNITY • CREATIVE ECONOMY • BLOCKCHAIN ART • FUTURE OF CREATIVITY
            </Text>
            <Text 
              color="white" 
              fontSize="xl" 
              fontWeight="extrabold" 
              display="inline-block" 
              mx={8}
              letterSpacing="wide"
              textTransform="uppercase"
            >
              TRADE ART • SELL YOUR CREATIONS • BUY UNIQUE PIECES • EARN ROYALTIES • PROTECT YOUR WORK • GLOBAL MARKETPLACE • INSTANT PAYMENTS • SECURE TRANSACTIONS • VERIFIED ARTISTS • EXCLUSIVE COLLECTIONS • DIGITAL GALLERY • ARTIST COMMUNITY • CREATIVE ECONOMY • BLOCKCHAIN ART • FUTURE OF CREATIVITY
            </Text>
          </Box>
        </Box>
      </Box>
    </AnimatedPage>
  )
}

const FeatureCard = ({ icon, title, description, badge, features }: { icon: any; title: string; description: string; badge?: string; features?: string[] }) => {
  return (
    <MotionBox
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <VStack
        p={{ base: 3, md: 4 }}
        bg="brand.darkGray"
        rounded="lg"
        align="start"
        spacing={{ base: 2, md: 3 }}
        border="1px"
        borderColor="brand.lightGray"
        h="full"
        position="relative"
      >
        {badge && (
          <Badge
            position="absolute"
            top={{ base: 1, md: 2 }}
            right={{ base: 1, md: 2 }}
            colorScheme="blue"
            variant="solid"
            borderRadius="full"
            px={{ base: 1, md: 2 }}
            fontSize={{ base: "2xs", md: "xs" }}
          >
            {badge}
          </Badge>
        )}
        <Icon as={icon} w={{ base: 5, md: 6 }} h={{ base: 5, md: 6 }} color="brand.blue" />
        <Heading size={{ base: "xs", md: "sm" }} color="white" fontFamily="heading">{title}</Heading>
        <Text color="brand.lightGray" fontSize={{ base: "2xs", md: "xs" }}>{description}</Text>
        {features && (
          <VStack align="start" spacing={{ base: 1, md: 2 }} w="full" pt={{ base: 1, md: 2 }}>
            {features.map((feature, index) => (
              <HStack key={index} spacing={{ base: 1, md: 2 }}>
                <Icon as={FaCheckCircle} color="brand.blue" w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} />
                <Text color="brand.lightGray" fontSize={{ base: "2xs", md: "xs" }}>{feature}</Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </MotionBox>
  )
}

const ValueCard = ({ icon, title, description, features }: { icon: any; title: string; description: string; features?: string[] }) => {
  return (
    <MotionBox
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <VStack
        p={{ base: 2, md: 3 }}
        bg="brand.darkGray"
        rounded="lg"
        align="start"
        spacing={{ base: 1, md: 2 }}
        border="1px"
        borderColor="brand.lightGray"
        h="full"
      >
        <Icon as={icon} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} color="brand.blue" />
        <Heading size={{ base: "2xs", md: "xs" }} color="white" fontFamily="heading">{title}</Heading>
        <Text color="brand.lightGray" fontSize={{ base: "2xs", md: "xs" }}>{description}</Text>
        {features && (
          <VStack align="start" spacing={{ base: 1, md: 2 }} w="full" pt={{ base: 1, md: 2 }}>
            {features.map((feature, index) => (
              <HStack key={index} spacing={{ base: 1, md: 2 }}>
                <Icon as={FaCheckCircle} color="brand.blue" w={{ base: 2, md: 3 }} h={{ base: 2, md: 3 }} />
                <Text color="brand.lightGray" fontSize={{ base: "2xs", md: "xs" }}>{feature}</Text>
              </HStack>
            ))}
          </VStack>
        )}
      </VStack>
    </MotionBox>
  )
}

const StatCard = ({ icon, label, value, helpText, trend }: { icon: any; label: string; value: string; helpText: string; trend?: 'up' | 'down' }) => {
  return (
    <MotionBox
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        p={{ base: 3, md: 4 }}
        bg="brand.darkerGray"
        rounded="lg"
        border="1px"
        borderColor="brand.lightGray"
        h="full"
      >
        <Icon as={icon} w={{ base: 4, md: 5 }} h={{ base: 4, md: 5 }} color="brand.blue" mb={{ base: 1, md: 2 }} />
        <Text color="brand.lightGray" fontSize={{ base: "2xs", md: "xs" }} mb={{ base: 1, md: 2 }}>{label}</Text>
        <Text color="white" fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={{ base: 1, md: 2 }}>{value}</Text>
        <HStack spacing={{ base: 1, md: 2 }}>
          <Icon 
            as={trend === 'up' ? FaChartLine : FaChartLine} 
            color={trend === 'up' ? 'green.400' : 'red.400'} 
            w={{ base: 2, md: 3 }} 
            h={{ base: 2, md: 3 }} 
          />
          <Text color={trend === 'up' ? 'green.400' : 'red.400'} fontSize={{ base: "2xs", md: "xs" }}>{helpText}</Text>
        </HStack>
      </Box>
    </MotionBox>
  )
}

export default About 