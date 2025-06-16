import {
  Box,
  Container,
  Image,
  VStack,
  Text,
  useColorModeValue,
  HStack,
  Icon,
  Button,
  Grid,
  GridItem,
  Circle,
  useToken,
  useToast,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import { motion } from 'framer-motion'
import { 
  FaArrowRight,
  FaPalette,
  FaChartLine,
  FaShieldAlt,
  FaGlobe,
  FaCoins,
  FaUsers,
  FaLock,
  FaRocket,
} from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import selleneLogo from '../assets/Sellene-logo-light.png'
import { useNavigate } from 'react-router-dom'

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

const Home = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const [blue, purple] = useToken('colors', ['brand.blue', 'brand.purple'])

  const handleStartCreating = () => {
    toast({
      title: "Connect Wallet",
      description: "Please connect your wallet to start creating and exploring masterpieces",
      status: "info",
      duration: 5000,
      isClosable: true,
    })
  }

  const handleLearnMore = () => {
    navigate('/about')
  }

  return (
    <AnimatedPage>
      <Box 
        bg={bgColor} 
        h="100vh"
        position="relative"
        overflow="hidden"
        style={{ zIndex: 0 }}
        w="100vw"
        maxW="100vw"
        m={0}
        p={0}
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

        <Box 
          position="relative" 
          zIndex="1" 
          h="100vh" 
          w="100%"
          maxW="100%"
          m={0}
          p={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Grid 
            templateRows="1fr"
            gap={4}
            h="full"
            w="100%"
            maxW="100%"
            m={0}
            p={0}
            px={{ base: 4, md: 8, lg: 12 }}
          >
            <GridItem display="flex" alignItems="center">
              <Grid 
                templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
                gap={{ base: 8, lg: 12 }} 
                alignItems="center"
                h="full"
                w="100%"
                maxW="100%"
              >
                {/* Left Column - Logo and Main Content */}
                <GridItem>
                  <VStack align="start" spacing={6} w="full">
                    <MotionBox
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                      position="relative"
                      w="full"
                      display="flex"
                      justifyContent="center"
                      mb={4}
                    >
                      <Circle
                        size="500px"
                        bgGradient={`radial(${blue}, ${purple})`}
                        opacity="0.1"
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        animation={`${pulse} 4s ease-in-out infinite`}
                      />
                      <Image
                        src={selleneLogo}
                        alt="Sellene Logo"
                        w={{ base: "300px", md: "400px" }}
                        h="auto"
                        objectFit="contain"
                        filter="drop-shadow(0 0 40px rgba(66, 153, 225, 0.5))"
                        position="relative"
                        zIndex="1"
                      />
                    </MotionBox>

                    <VStack align="start" spacing={6} w="full">
                      <Text
                        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                        fontWeight="bold"
                        lineHeight="1.1"
                        bgGradient="linear(to-r, brand.blue, brand.purple, brand.blue)"
                        bgSize="200% auto"
                        bgClip="text"
                        animation={`${pulse} 8s linear infinite`}
                      >
                        Your Art, Your Value
                      </Text>

                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color="brand.lightGray"
                        maxW="600px"
                        lineHeight="1.6"
                      >
                        Transform your creative works into valuable digital assets. Sell, trade, and earn from your art with our secure blockchain platform.
                      </Text>

                      <HStack spacing={6} pt={2}>
                        <Button
                          onClick={handleStartCreating}
                          colorScheme="blue"
                          size="lg"
                          leftIcon={<FaRocket />}
                          px={8}
                        >
                          Start Creating
                        </Button>
                        <Button
                          onClick={handleLearnMore}
                          variant="outline"
                          size="lg"
                          rightIcon={<FaArrowRight />}
                          px={8}
                        >
                          Learn More
                        </Button>
                      </HStack>
                    </VStack>
                  </VStack>
                </GridItem>

                {/* Right Column - Feature Cards */}
                <GridItem>
                  <Grid 
                    templateColumns="repeat(2, 1fr)" 
                    gap={4}
                    maxH="calc(100vh - 100px)"
                    overflowY="auto"
                    w="100%"
                    sx={{
                      '&::-webkit-scrollbar': {
                        width: '4px',
                      },
                      '&::-webkit-scrollbar-track': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: 'brand.blue',
                        borderRadius: '24px',
                      },
                    }}
                  >
                    {[
                      {
                        icon: FaGlobe,
                        title: "Cross-Chain Trading",
                        description: "Trade assets across multiple blockchains seamlessly"
                      },
                      {
                        icon: FaLock,
                        title: "Secure Storage",
                        description: "Your digital assets are protected with advanced security"
                      },
                      {
                        icon: FaPalette,
                        title: "Sell Artworks",
                        description: "List and sell your digital art with secure ownership"
                      },
                      {
                        icon: FaCoins,
                        title: "Earn Royalties",
                        description: "Get paid for every resale of your artwork"
                      },
                      {
                        icon: FaUsers,
                        title: "Global Market",
                        description: "Connect with art collectors worldwide"
                      },
                      {
                        icon: FaShieldAlt,
                        title: "Secure Rights",
                        description: "Protect your intellectual property rights"
                      },
                      {
                        icon: FaChartLine,
                        title: "Market Analytics",
                        description: "Track performance and market trends"
                      },
                      {
                        icon: FaRocket,
                        title: "Quick Launch",
                        description: "Start selling your art in minutes"
                      }
                    ].map((feature, index) => (
                      <MotionBox
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{
                          y: -4,
                          boxShadow: '0 10px 20px rgba(66, 153, 225, 0.2)',
                          borderColor: 'brand.blue'
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.1,
                          ease: "easeOut",
                          hover: {
                            duration: 0.2
                          }
                        }}
                        bg="brand.darkerGray"
                        p={4}
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="brand.lightGray"
                        h="120px"
                      >
                        <VStack align="start" spacing={2} h="full">
                          <HStack spacing={2}>
                            <Icon as={feature.icon} w={5} h={5} color="brand.blue" />
                            <Text color="white" fontSize="md" fontWeight="bold">
                              {feature.title}
                            </Text>
                          </HStack>
                          <Text color="brand.lightGray" fontSize="sm" noOfLines={2}>
                            {feature.description}
                          </Text>
                        </VStack>
                      </MotionBox>
                    ))}
                  </Grid>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Box>

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

export default Home 