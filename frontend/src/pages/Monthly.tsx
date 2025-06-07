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
} from '@chakra-ui/react'
import { FaCalendarAlt, FaChartLine, FaCoins, FaUsers } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import OverviewChart from '../components/OverviewChart'
import { monthlyData } from '../data/dashboardData'

const Monthly = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  // Calculate growth for each month
  const monthlySummary = monthlyData.sales.map((sale, index) => {
    const prevMonthSales = index > 0 ? monthlyData.sales[index - 1].value : 0
    const growth = prevMonthSales ? ((sale.value - prevMonthSales) / prevMonthSales) * 100 : 0
    return {
      month: sale.month,
      sales: sale.value,
      users: monthlyData.users[index].value,
      growth: Math.round(growth)
    }
  })

  return (
    <AnimatedPage>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading color="white" fontFamily="heading">Monthly Performance</Heading>
          <Text color="brand.lightGray">Monthly metrics and performance analysis</Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            bg={bgColor}
            p={6}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <Heading size="md" mb={4} color="white" fontFamily="heading">Monthly Sales</Heading>
            <VStack spacing={4} align="stretch">
              {monthlyData.sales.map((sale, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text color="brand.lightGray">{sale.month}</Text>
                    <Text color="white">${sale.value.toLocaleString()}</Text>
                  </HStack>
                  <Progress 
                    value={(sale.value / monthlyData.sales[11].value) * 100} 
                    colorScheme="blue" 
                    rounded="full" 
                  />
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
            <Heading size="md" mb={4} color="white" fontFamily="heading">Monthly Users</Heading>
            <VStack spacing={4} align="stretch">
              {monthlyData.users.map((user, index) => (
                <Box key={index}>
                  <HStack justify="space-between" mb={2}>
                    <Text color="brand.lightGray">{user.month}</Text>
                    <Text color="white">{user.value.toLocaleString()} users</Text>
                  </HStack>
                  <Progress 
                    value={(user.value / monthlyData.users[11].value) * 100} 
                    colorScheme="blue" 
                    rounded="full" 
                  />
                </Box>
              ))}
            </VStack>
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
            <Icon as={FaCalendarAlt} w={6} h={6} color="brand.blue" />
            <Heading size="md" color="white" fontFamily="heading">Monthly Summary</Heading>
          </HStack>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color="brand.lightGray">Month</Th>
                <Th color="brand.lightGray">Sales</Th>
                <Th color="brand.lightGray">Users</Th>
                <Th color="brand.lightGray">Growth</Th>
                <Th color="brand.lightGray">Performance</Th>
              </Tr>
            </Thead>
            <Tbody>
              {monthlySummary.map((stat, index) => (
                <Tr key={index}>
                  <Td color="white">{stat.month}</Td>
                  <Td color="white">${stat.sales.toLocaleString()}</Td>
                  <Td color="white">{stat.users.toLocaleString()}</Td>
                  <Td color={stat.growth >= 0 ? "brand.blue" : "brand.red"}>
                    {stat.growth >= 0 ? "+" : ""}{stat.growth}%
                  </Td>
                  <Td color="white">
                    <Progress 
                      value={Math.abs(stat.growth)} 
                      colorScheme={stat.growth >= 0 ? "blue" : "red"} 
                      rounded="full" 
                    />
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

export default Monthly 