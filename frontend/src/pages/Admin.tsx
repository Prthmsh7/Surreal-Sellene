import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  Button,
  Icon,
} from '@chakra-ui/react'
import { FaUsers, FaChartLine, FaFileAlt, FaCog } from 'react-icons/fa'
import AnimatedPage from '../components/AnimatedPage'
import Sidebar from '../components/Sidebar'

const Admin = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12.5%",
      icon: FaUsers,
      color: "blue.400",
    },
    {
      title: "Total Sales",
      value: "$45,678",
      change: "+8.2%",
      icon: FaChartLine,
      color: "green.400",
    },
    {
      title: "Active Listings",
      value: "89",
      change: "+5.7%",
      icon: FaFileAlt,
      color: "purple.400",
    },
    {
      title: "System Status",
      value: "Healthy",
      change: "100% Uptime",
      icon: FaCog,
      color: "yellow.400",
    },
  ]

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new tokenized creative work",
      action: "Create",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      action: "Manage",
    },
    {
      title: "View Reports",
      description: "Access detailed analytics and reports",
      action: "View",
    },
    {
      title: "System Settings",
      description: "Configure platform settings",
      action: "Configure",
    },
  ]

  return (
    <AnimatedPage>
      <Sidebar />
      <Box ml="250px" p="1.5rem 2.5rem">
        <VStack align="start" spacing={8}>
          <Heading color="white" fontFamily="heading">ADMIN DASHBOARD</Heading>
          <Text color="brand.lightGray">Manage your platform and view analytics</Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="full">
            {stats.map((stat, index) => (
              <Box
                key={index}
                bg={bgColor}
                p={6}
                rounded="lg"
                border="1px"
                borderColor={borderColor}
              >
                <HStack justify="space-between" mb={4}>
                  <StatLabel color="brand.lightGray">{stat.title}</StatLabel>
                  <Icon as={stat.icon} color={stat.color} boxSize={6} />
                </HStack>
                <StatNumber color="white" fontSize="2xl" mb={2}>
                  {stat.value}
                </StatNumber>
                <StatHelpText color={stat.color}>
                  <StatArrow type="increase" />
                  {stat.change}
                </StatHelpText>
              </Box>
            ))}
          </SimpleGrid>

          <Heading size="md" color="white" mt={8}>Quick Actions</Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
            {quickActions.map((action, index) => (
              <Box
                key={index}
                bg={bgColor}
                p={6}
                rounded="lg"
                border="1px"
                borderColor={borderColor}
              >
                <VStack align="start" spacing={4}>
                  <Heading size="sm" color="white">
                    {action.title}
                  </Heading>
                  <Text color="brand.lightGray">
                    {action.description}
                  </Text>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    alignSelf="flex-end"
                  >
                    {action.action}
                  </Button>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </AnimatedPage>
  )
}

export default Admin 