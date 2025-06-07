import { Box, Heading, Text, VStack, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'

const MotionBox = motion(Box)

const CreatorDashboard = () => {
  return (
    <AnimatedPage>
      <Container maxW="1200px" py={20}>
        <VStack spacing={8} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading size="2xl" mb={4} color="white" fontFamily="heading">
              Creator Dashboard
            </Heading>
            <Text fontSize="xl" color="brand.lightGray">
              This page is under development. Coming soon!
            </Text>
          </MotionBox>
        </VStack>
      </Container>
    </AnimatedPage>
  )
}

export default CreatorDashboard 