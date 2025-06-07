import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'
import AnimatedPage from '../components/AnimatedPage'

const Customers = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')

  return (
    <AnimatedPage>
      <Box bg={bgColor} minH="100vh" pt="80px">
        <Container maxW="1200px">
          <VStack spacing={4} align="center" justify="center" minH="calc(100vh - 80px)">
            <Heading color="white" fontFamily="heading">Customers</Heading>
            <Text color="brand.lightGray" fontSize="xl">🚧 Under Development 🚧</Text>
            <Text color="brand.lightGray">This page is currently being built. Please check back later!</Text>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  )
}

export default Customers 