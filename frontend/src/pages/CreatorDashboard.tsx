import { Box, Heading, Text, VStack, Container, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'

const MotionBox = motion(Box)

const CreatorDashboard = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <Container maxW="1400px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg={bgColor}
            p={{ base: 4, md: 6 }}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="start">
              <Heading size="xl" color="white" fontFamily="heading">
                Creator Dashboard
              </Heading>
              <Text fontSize="lg" color="brand.lightGray">
                This page is under development. Coming soon!
              </Text>
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            bg={bgColor}
            p={{ base: 4, md: 6 }}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <VStack spacing={4} align="start">
              <Heading size="xl" color="white" fontFamily="heading">
                Your IP Portfolio
              </Heading>
              <Text fontSize="lg" color="brand.lightGray">
                Manage and track your intellectual property assets
              </Text>
            </VStack>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </AnimatedPage>
  )
}

export default CreatorDashboard 