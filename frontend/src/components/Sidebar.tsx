import {
  Box,
  VStack,
  Text,
  Button,
  useColorModeValue,
  Divider,
  Icon,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  FaChartLine,
  FaGlobe,
  FaCalendarAlt,
  FaChartPie,
  FaCalendarDay,
  FaCog,
  FaMusic,
  FaPalette,
  FaBook,
  FaWallet,
  FaExchangeAlt,
  FaHistory,
  FaHome,
} from 'react-icons/fa'

const Sidebar = () => {
  const location = useLocation()
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

  const navItems = [
    {
      text: "Home",
      icon: FaHome,
      path: "/",
    },
    {
      text: "Dashboard",
      icon: FaChartLine,
      path: "/dashboard",
    },
    {
      text: "Portfolio",
      icon: FaWallet,
      path: "/dashboard/portfolio",
    },
    {
      text: "Marketplace",
      icon: FaExchangeAlt,
      path: "/dashboard/marketplace",
    },
    {
      text: "History",
      icon: FaHistory,
      path: "/dashboard/history",
    },
    {
      text: "Categories",
      icon: null,
    },
    {
      text: "Music",
      icon: FaMusic,
      path: "/dashboard/music",
    },
    {
      text: "Art",
      icon: FaPalette,
      path: "/dashboard/art",
    },
    {
      text: "Writing",
      icon: FaBook,
      path: "/dashboard/writing",
    },
    {
      text: "Analytics",
      icon: null,
    },
    {
      text: "Overview",
      icon: FaChartLine,
      path: "/dashboard/overview",
    },
    {
      text: "Geography",
      icon: FaGlobe,
      path: "/dashboard/geography",
    },
    {
      text: "Monthly",
      icon: FaCalendarAlt,
      path: "/dashboard/monthly",
    },
    {
      text: "Breakdown",
      icon: FaChartPie,
      path: "/dashboard/breakdown",
    },
    {
      text: "Daily",
      icon: FaCalendarDay,
      path: "/dashboard/daily",
    },
    {
      text: "Settings",
      icon: FaCog,
      path: "/dashboard/settings",
    },
  ]

  return (
    <Box
      as="nav"
      h="100%"
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
    >
      <VStack
        spacing={1}
        align="stretch"
        p={3}
        overflowY="auto"
        h="100%"
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'brand.lightGray',
            borderRadius: '24px',
          },
        }}
      >
        {navItems.map((item, index) => {
          if (item.icon === null) {
            return (
              <Box key={index} py={1}>
                <Text
                  color="brand.lightGray"
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                >
                  {item.text}
                </Text>
                <Divider mt={2} borderColor={borderColor} />
              </Box>
            )
          }

          const isActive = location.pathname === item.path
          return (
            <Button
              key={item.text}
              as={RouterLink}
              to={item.path}
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={<Icon as={item.icon} />}
              bg={isActive ? "brand.blue" : "transparent"}
              color={isActive ? "white" : "brand.lightGray"}
              _hover={{
                bg: isActive ? "brand.blue" : "brand.black",
                color: "white",
              }}
              h="36px"
              px={4}
              w="100%"
              transition="all 0.2s"
            >
              <Text fontSize="sm" fontWeight="medium">
                {item.text}
              </Text>
            </Button>
          )
        })}
      </VStack>
    </Box>
  )
}

export default Sidebar 