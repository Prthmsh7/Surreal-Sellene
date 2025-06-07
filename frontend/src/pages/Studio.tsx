import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Progress,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaRocket, FaCoins, FaChartLine, FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'

const MotionBox = motion(Box)

const Studio = () => {
  return (
    <AnimatedPage>
      <Box maxW="1200px" mx="auto">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Studio Header */}
          <HStack justify="space-between" mb={8}>
            <VStack align="start" spacing={1}>
              <Heading color="white" fontFamily="heading">Creator Studio</Heading>
              <Text color="brand.lightGray">Manage your works and track performance</Text>
            </VStack>
            <Button leftIcon={<FaPlus />} colorScheme="blue">
              New Work
            </Button>
          </HStack>

          {/* Stats Overview */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <StatCard
              icon={FaRocket}
              label="Total Works"
              value="12"
              helpText="+2 this month"
            />
            <StatCard
              icon={FaCoins}
              label="Total Revenue"
              value="$45.2K"
              helpText="+$12.3K this month"
            />
            <StatCard
              icon={FaChartLine}
              label="Average ROI"
              value="156%"
              helpText="+23% from last month"
            />
          </SimpleGrid>

          {/* Studio Content */}
          <Tabs variant="soft-rounded" colorScheme="blue">
            <TabList mb={8}>
              <Tab>Works</Tab>
              <Tab>Analytics</Tab>
              <Tab>Earnings</Tab>
            </TabList>

            <TabPanels>
              {/* Works Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th color="brand.lightGray">Title</Th>
                        <Th color="brand.lightGray">Category</Th>
                        <Th color="brand.lightGray">Tokens</Th>
                        <Th color="brand.lightGray">Price</Th>
                        <Th color="brand.lightGray">ROI</Th>
                        <Th color="brand.lightGray">Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {[1, 2, 3].map((item) => (
                        <Tr key={item}>
                          <Td color="white">Digital Dreams</Td>
                          <Td><Badge colorScheme="blue">Art</Badge></Td>
                          <Td color="white">500/1000</Td>
                          <Td color="white">$2.5</Td>
                          <Td color="brand.blue">156%</Td>
                          <Td>
                            <HStack spacing={2}>
                              <Button size="sm" leftIcon={<FaEye />} variant="ghost">
                                View
                              </Button>
                              <Button size="sm" leftIcon={<FaEdit />} variant="ghost">
                                Edit
                              </Button>
                              <Button size="sm" leftIcon={<FaTrash />} variant="ghost" colorScheme="red">
                                Delete
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
              </TabPanel>

              {/* Analytics Tab */}
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  <AnalyticsCard
                    title="Token Distribution"
                    value="65%"
                    label="Sold"
                    color="blue"
                  />
                  <AnalyticsCard
                    title="Revenue Growth"
                    value="23%"
                    label="This Month"
                    color="green"
                  />
                </SimpleGrid>
              </TabPanel>

              {/* Earnings Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box bg="brand.darkGray" p={6} rounded="lg" border="1px" borderColor="brand.lightGray">
                    <Heading size="md" color="white" fontFamily="heading" mb={4}>Earnings Overview</Heading>
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                      <Stat>
                        <StatLabel color="brand.lightGray">This Month</StatLabel>
                        <StatNumber color="white">$12.3K</StatNumber>
                        <StatHelpText color="brand.blue">+23% from last month</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel color="brand.lightGray">Total Earnings</StatLabel>
                        <StatNumber color="white">$45.2K</StatNumber>
                        <StatHelpText color="brand.blue">All time</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel color="brand.lightGray">Pending</StatLabel>
                        <StatNumber color="white">$2.1K</StatNumber>
                        <StatHelpText color="brand.blue">To be released</StatHelpText>
                      </Stat>
                    </SimpleGrid>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>
      </Box>
    </AnimatedPage>
  )
}

const StatCard = ({ icon, label, value, helpText }: { icon: any; label: string; value: string; helpText: string }) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Stat
        px={6}
        py={8}
        bg="brand.darkGray"
        rounded="lg"
        border="1px"
        borderColor="brand.lightGray"
      >
        <Icon as={icon} w={8} h={8} color="brand.blue" mb={4} />
        <StatLabel color="brand.lightGray">{label}</StatLabel>
        <StatNumber color="white" fontSize="3xl" fontFamily="heading">{value}</StatNumber>
        <StatHelpText color="brand.blue">{helpText}</StatHelpText>
      </Stat>
    </MotionBox>
  )
}

const AnalyticsCard = ({ title, value, label, color }: { title: string; value: string; label: string; color: string }) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <VStack
        p={6}
        bg="brand.darkGray"
        rounded="lg"
        align="start"
        spacing={4}
        border="1px"
        borderColor="brand.lightGray"
      >
        <Heading size="md" color="white" fontFamily="heading">{title}</Heading>
        <Text color={`${color}.400`} fontSize="2xl" fontWeight="bold">{value}</Text>
        <Text color="brand.lightGray">{label}</Text>
        <Progress value={parseInt(value)} colorScheme={color} size="sm" w="full" />
      </VStack>
    </MotionBox>
  )
}

export default Studio 