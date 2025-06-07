import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import AnimatedPage from '../components/AnimatedPage'
import OverviewChart from '../components/OverviewChart'
import { overviewStats } from '../data/dashboardData'

const MotionBox = motion(Box)

const Overview = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <AnimatedPage>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading color="white" fontFamily="heading">Overview</Heading>
          <Text color="brand.lightGray">Welcome to your platform overview</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {overviewStats.map((stat, index) => (
            <Box
              key={index}
              bg={bgColor}
              p={6}
              rounded="lg"
              border="1px"
              borderColor={borderColor}
            >
              <Stat>
                <HStack justify="space-between">
                  <StatLabel color="brand.lightGray">{stat.title}</StatLabel>
                  <Icon as={stat.icon} w={6} h={6} color={stat.color} />
                </HStack>
                <StatNumber color="white" fontSize="3xl" fontWeight="bold">
                  {stat.value}
                </StatNumber>
                <StatHelpText color="brand.blue">
                  <StatArrow type="increase" />
                  {stat.change}
                </StatHelpText>
              </Stat>
            </Box>
          ))}
        </SimpleGrid>

        <Box
          bg={bgColor}
          p={6}
          rounded="lg"
          border="1px"
          borderColor={borderColor}
        >
          <Heading size="md" mb={4} color="white" fontFamily="heading">Performance Overview</Heading>
          <Box h="400px">
            <OverviewChart isDashboard={false} />
          </Box>
        </Box>
      </VStack>
    </AnimatedPage>
  )
}

export default Overview 