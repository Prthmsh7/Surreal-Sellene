import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Progress,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import BreakdownChart from '../components/BreakdownChart'
import { breakdownData } from '../data/dashboardData'

const MotionBox = motion(Box)

const Breakdown = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading color="white" fontFamily="heading">Breakdown</Heading>
          <Text color="brand.lightGray">Detailed breakdown of sales and categories</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4} color="white" fontFamily="heading">Sales by Category</Heading>
            <Box h="400px">
              <BreakdownChart isDashboard={false} />
            </Box>
          </Box>

          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4} color="white" fontFamily="heading">Category Distribution</Heading>
            <VStack spacing={4} align="stretch">
              {breakdownData.categories.map((category, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <HStack>
                      <Icon as={category.icon} color="brand.blue" />
                      <Text color="brand.lightGray">{category.name}</Text>
                    </HStack>
                    <Text color="white">{category.value}%</Text>
                  </HStack>
                  <Progress value={category.value} colorScheme="blue" rounded="full" />
                </Box>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          {Object.entries(breakdownData.subcategories).map(([category, subcategories]) => (
            <Box
              key={category}
              bg={bgColor}
              p={6}
              rounded="lg"
              border="1px"
              borderColor={borderColor}
            >
              <Heading size="md" mb={4} color="white" fontFamily="heading" textTransform="capitalize">
                {category} Breakdown
              </Heading>
              <VStack spacing={4} align="stretch">
                {subcategories.map((subcategory, index) => (
                  <Box key={index}>
                    <HStack justify="space-between" mb={2}>
                      <Text color="brand.lightGray">{subcategory.name}</Text>
                      <Text color="white">{subcategory.value}%</Text>
                    </HStack>
                    <Progress value={subcategory.value} colorScheme="blue" rounded="full" />
                  </Box>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </AnimatedPage>
  )
}

export default Breakdown 