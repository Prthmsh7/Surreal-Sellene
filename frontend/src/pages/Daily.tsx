import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  Badge,
} from '@chakra-ui/react'
import { FaCalendarDay, FaChartLine, FaCoins, FaUsers } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import OverviewChart from '../components/OverviewChart'

const Daily = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const dailyStats = [
    { day: 'Monday', sales: '$2,500', users: 45, transactions: 28, status: 'high' },
    { day: 'Tuesday', sales: '$2,800', users: 52, transactions: 32, status: 'high' },
    { day: 'Wednesday', sales: '$2,300', users: 48, transactions: 25, status: 'medium' },
    { day: 'Thursday', sales: '$2,600', users: 50, transactions: 30, status: 'high' },
    { day: 'Friday', sales: '$3,200', users: 65, transactions: 38, status: 'high' },
    { day: 'Saturday', sales: '$2,900', users: 55, transactions: 33, status: 'medium' },
    { day: 'Sunday', sales: '$2,400', users: 42, transactions: 26, status: 'medium' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'green'
      case 'medium':
        return 'yellow'
      case 'low':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <AnimatedPage>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading color="white" fontFamily="heading">Daily Performance</Heading>
          <Text color="brand.lightGray">Daily metrics and performance analysis</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <HStack mb={4}>
              <Icon as={FaChartLine} w={6} h={6} color="brand.blue" />
              <Heading size="md" color="white" fontFamily="heading">Daily Sales</Heading>
            </HStack>
            <Box h="300px">
              <OverviewChart isDashboard={false} />
            </Box>
          </Box>

          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <HStack mb={4}>
              <Icon as={FaUsers} w={6} h={6} color="brand.blue" />
              <Heading size="md" color="white" fontFamily="heading">User Activity</Heading>
            </HStack>
            <VStack spacing={4} align="stretch">
              {dailyStats.map((stat, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text color="brand.lightGray">{stat.day}</Text>
                    <Text color="white">{stat.users} users</Text>
                  </HStack>
                  <Progress value={(stat.users / 65) * 100} colorScheme="blue" rounded="full" />
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
            <HStack mb={4}>
              <Icon as={FaCoins} w={6} h={6} color="brand.blue" />
              <Heading size="md" color="white" fontFamily="heading">Daily Revenue</Heading>
            </HStack>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="brand.lightGray">Day</Th>
                  <Th color="brand.lightGray">Sales</Th>
                  <Th color="brand.lightGray">Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dailyStats.map((stat, index) => (
                  <Tr key={index}>
                    <Td color="white">{stat.day}</Td>
                    <Td color="white">{stat.sales}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(stat.status)}>
                        {stat.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>

        <Box
          bg={bgColor}
          p={6}
          rounded="lg"
          border="1px"
          borderColor={borderColor}
        >
          <HStack mb={4}>
            <Icon as={FaCalendarDay} w={6} h={6} color="brand.blue" />
            <Heading size="md" color="white" fontFamily="heading">Daily Summary</Heading>
          </HStack>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="brand.lightGray">Day</Th>
                <Th color="brand.lightGray">Sales</Th>
                <Th color="brand.lightGray">Users</Th>
                <Th color="brand.lightGray">Transactions</Th>
                <Th color="brand.lightGray">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dailyStats.map((stat, index) => (
                <Tr key={index}>
                  <Td color="white">{stat.day}</Td>
                  <Td color="white">{stat.sales}</Td>
                  <Td color="white">{stat.users}</Td>
                  <Td color="white">{stat.transactions}</Td>
                  <Td>
                    <Badge colorScheme={getStatusColor(stat.status)}>
                      {stat.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </AnimatedPage>
  )
}

export default Daily 