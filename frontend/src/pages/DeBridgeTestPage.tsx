import { Box, Container, Heading, VStack, Text, useColorModeValue } from '@chakra-ui/react'
import { DeBridgeTest } from '../components/DeBridgeTest'
import AnimatedPage from '../components/AnimatedPage'

const DeBridgeTestPage = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <Box 
        minH="100vh" 
        bg={bgColor}
        pt="100px" // Account for navbar height (80px) + some padding
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Box>
              <Heading 
                color="white" 
                fontFamily="heading"
                size="xl"
                mb={2}
              >
                DeBridge Integration Test
              </Heading>
              <Text color="brand.lightGray" fontSize="lg">
                Test cross-chain transfers and bridge functionality
              </Text>
            </Box>

            <Box 
              bg="brand.darkerGray" 
              p={8} 
              rounded="xl" 
              border="1px" 
              borderColor={borderColor}
              shadow="lg"
            >
              <DeBridgeTest />
            </Box>
          </VStack>
        </Container>
      </Box>
    </AnimatedPage>
  )
}

export default DeBridgeTestPage 