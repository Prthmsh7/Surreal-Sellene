import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Progress,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import { geographyData } from '../data/dashboardData'

const MotionBox = motion(Box)

const Geography = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading color="white" fontFamily="heading">Geography</Heading>
          <Text color="brand.lightGray">Distribution of users and sales by region</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4} color="white" fontFamily="heading">Users by Country</Heading>
            <VStack spacing={4} align="stretch">
              {geographyData.countries.map((country, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text color="brand.lightGray">{country.name}</Text>
                    <Text color="white">{country.value}%</Text>
                  </HStack>
                  <Progress value={country.value} colorScheme="blue" rounded="full" />
                </Box>
              ))}
            </VStack>
          </Box>

          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4} color="white" fontFamily="heading">Users by Region</Heading>
            <VStack spacing={4} align="stretch">
              {geographyData.regions.map((region, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text color="brand.lightGray">{region.name}</Text>
                    <Text color="white">{region.value}%</Text>
                  </HStack>
                  <Progress value={region.value} colorScheme="blue" rounded="full" />
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </AnimatedPage>
  )
}

export default Geography 