import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Progress,
  Select,
  Badge,
  SimpleGrid,
  useColorModeValue,
  Avatar,
  AvatarGroup,
  Container,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaChartLine, FaCoins, FaUsers, FaLock, FaDownload, FaMusic, FaPalette, FaBook, FaArrowUp, FaArrowDown } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import BreakdownChart from '../components/BreakdownChart'

const MotionBox = motion(Box)

const InvestorDashboard = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <AnimatedPage>
      <Container maxW="1400px" px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        {/* Header */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          mb={8}
          gap={4}
        >
          <VStack align={{ base: 'center', md: 'start' }} spacing={1}>
            <Heading color="white" fontFamily="heading" fontSize={{ base: 'xl', md: '2xl' }}>DASHBOARD</Heading>
            <Text color="brand.lightGray" textAlign={{ base: 'center', md: 'left' }}>Track your IP investments and performance</Text>
          </VStack>
          <Button
            leftIcon={<FaDownload />}
            bg="brand.blue"
            color="white"
            _hover={{ bg: 'brand.darkBlue' }}
            fontSize="14px"
            fontWeight="bold"
            padding="10px 20px"
            w={{ base: 'full', md: 'auto' }}
          >
            Export Portfolio
          </Button>
        </Flex>

        {/* Main Grid */}
        <SimpleGrid 
          columns={{ base: 1, md: 2, lg: 4 }} 
          spacing={{ base: 4, md: 6 }} 
          mb={{ base: 4, md: 6 }}
        >
          <StatBox
            title="Total Portfolio Value"
            value="$24,500"
            increase="+12%"
            description="Since last month"
            icon={<Icon as={FaCoins} w={6} h={6} color="brand.blue" />}
          />
          <StatBox
            title="Active Investments"
            value="12"
            increase="+2"
            description="New this month"
            icon={<Icon as={FaChartLine} w={6} h={6} color="brand.blue" />}
          />
          <StatBox
            title="Total Returns"
            value="$3,200"
            increase="+8%"
            description="Year to date"
            icon={<Icon as={FaLock} w={6} h={6} color="brand.blue" />}
          />
          <StatBox
            title="Portfolio Diversity"
            value="85%"
            increase="+5%"
            description="Across categories"
            icon={<Icon as={FaUsers} w={6} h={6} color="brand.blue" />}
          />
        </SimpleGrid>

        {/* Main Content */}
        <SimpleGrid 
          columns={{ base: 1, lg: 3 }} 
          spacing={{ base: 4, md: 6 }}
          gap={{ base: 4, md: 6 }}
        >
          {/* Recent Transactions */}
          <Box
            gridColumn={{ lg: "span 2" }}
            bg={bgColor}
            p={{ base: 4, md: 6 }}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
            overflowX="auto"
          >
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              justify="space-between"
              align={{ base: 'stretch', sm: 'center' }}
              mb={4}
              gap={4}
            >
              <Heading size="md" color="white" fontFamily="heading">Recent Transactions</Heading>
              <Select
                size="sm"
                w={{ base: 'full', sm: '150px' }}
                bg="brand.black"
                color="white"
                borderColor={borderColor}
              >
                <option value="all">All Categories</option>
                <option value="music">Music</option>
                <option value="art">Art</option>
                <option value="writing">Writing</option>
              </Select>
            </Flex>
            <Box overflowX="auto">
              <Table variant="simple" minW={{ base: '600px', md: 'auto' }}>
                <Thead>
                  <Tr>
                    <Th color="brand.lightGray">Asset</Th>
                    <Th color="brand.lightGray">Category</Th>
                    <Th color="brand.lightGray">Date</Th>
                    <Th color="brand.lightGray">Amount</Th>
                    <Th color="brand.lightGray">Status</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <HStack>
                        <Icon as={FaMusic} color="brand.blue" />
                        <Text color="white">Summer Vibes</Text>
                      </HStack>
                    </Td>
                    <Td><Badge colorScheme="blue">Music</Badge></Td>
                    <Td color="white">2024-03-15</Td>
                    <Td color="white">$1,250</Td>
                    <Td><Badge colorScheme="green">Completed</Badge></Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <HStack>
                        <Icon as={FaPalette} color="brand.blue" />
                        <Text color="white">Digital Dreams</Text>
                      </HStack>
                    </Td>
                    <Td><Badge colorScheme="purple">Art</Badge></Td>
                    <Td color="white">2024-03-14</Td>
                    <Td color="white">$900</Td>
                    <Td><Badge colorScheme="green">Completed</Badge></Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <HStack>
                        <Icon as={FaBook} color="brand.blue" />
                        <Text color="white">Future Tales</Text>
                      </HStack>
                    </Td>
                    <Td><Badge colorScheme="orange">Writing</Badge></Td>
                    <Td color="white">2024-03-13</Td>
                    <Td color="white">$750</Td>
                    <Td><Badge colorScheme="yellow">Pending</Badge></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>

          {/* Portfolio Breakdown */}
          <Box
            bg={bgColor}
            p={{ base: 4, md: 6 }}
            rounded="lg"
            border="1px"
            borderColor={borderColor}
          >
            <VStack align="stretch" spacing={6}>
              <Heading size="md" color="white" fontFamily="heading">Portfolio Breakdown</Heading>
              <Box h={{ base: '200px', md: '300px' }}>
                <BreakdownChart isDashboard={true} />
              </Box>
              <VStack align="stretch" spacing={4}>
                <PortfolioItem
                  category="Music"
                  value={45}
                  amount="$11,025"
                  color="blue"
                  trend="up"
                  change="+2.5%"
                />
                <PortfolioItem
                  category="Art"
                  value={30}
                  amount="$7,350"
                  color="purple"
                  trend="down"
                  change="-1.2%"
                />
                <PortfolioItem
                  category="Writing"
                  value={25}
                  amount="$6,125"
                  color="orange"
                  trend="up"
                  change="+3.8%"
                />
              </VStack>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </AnimatedPage>
  )
}

const StatBox = ({ title, value, increase, description, icon }: { title: string; value: string; increase: string; description: string; icon: React.ReactNode }) => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  return (
    <Box
      bg={bgColor}
      p={{ base: 4, md: 6 }}
      rounded="lg"
      border="1px"
      borderColor={borderColor}
    >
      <VStack align="start" spacing={3}>
        <HStack justify="space-between" w="full">
          <Text color="brand.lightGray" fontSize="sm">{title}</Text>
          {icon}
        </HStack>
        <Text color="white" fontSize="2xl" fontWeight="bold">{value}</Text>
        <HStack>
          <Text color={increase.startsWith('+') ? 'green.400' : 'red.400'} fontSize="sm" fontWeight="bold">
            {increase}
          </Text>
          <Text color="brand.lightGray" fontSize="sm">{description}</Text>
        </HStack>
      </VStack>
    </Box>
  )
}

const PortfolioItem = ({ category, value, amount, color, trend, change }: { category: string; value: number; amount: string; color: string; trend: 'up' | 'down'; change: string }) => {
  return (
    <Box>
      <HStack justify="space-between" mb={2}>
        <Text color="white" fontWeight="medium">{category}</Text>
        <HStack spacing={2}>
          <Text color="white">{amount}</Text>
          <Text color={trend === 'up' ? 'green.400' : 'red.400'} fontSize="sm">
            {change}
          </Text>
        </HStack>
      </HStack>
      <Progress
        value={value}
        colorScheme={color}
        bg="whiteAlpha.200"
        rounded="full"
        h="8px"
      />
    </Box>
  )
}

const TrendingAsset = ({ title, category, icon, color, value, change, trend, owners }: { title: string; category: string; icon: any; color: string; value: string; change: string; trend: 'up' | 'down'; owners: number }) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      p={6}
      bg="brand.darkGray"
      rounded="lg"
      border="1px"
      borderColor="brand.lightGray"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <HStack>
            <Icon as={icon} color={`${color}.500`} />
            <Text color="white" fontWeight="bold">{title}</Text>
          </HStack>
          <Badge colorScheme={color}>{category}</Badge>
        </HStack>

        <HStack justify="space-between">
          <Text color="white" fontSize="xl" fontWeight="bold">{value}</Text>
          <HStack spacing={1}>
            <Icon as={trend === 'up' ? FaArrowUp : FaArrowDown} color={trend === 'up' ? 'green.500' : 'red.500'} />
            <Text color={trend === 'up' ? 'green.500' : 'red.500'}>{change}</Text>
          </HStack>
        </HStack>

        <HStack justify="space-between">
          <Text color="brand.lightGray" fontSize="sm">Owners</Text>
          <AvatarGroup size="sm" max={3}>
            <Avatar name="User 1" />
            <Avatar name="User 2" />
            <Avatar name="User 3" />
          </AvatarGroup>
        </HStack>
      </VStack>
    </MotionBox>
  )
}

export default InvestorDashboard 