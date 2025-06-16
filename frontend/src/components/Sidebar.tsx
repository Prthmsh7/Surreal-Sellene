import {
  Box,
  VStack,
  Icon,
  Text,
  Link,
  useColorModeValue,
  useBreakpointValue,
  Collapse,
  useDisclosure,
  Button,
  Divider,
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { 
  FaChartLine,
  FaGlobe,
  FaCalendarAlt,
  FaChartPie,
  FaCalendarDay,
  FaUser,
} from 'react-icons/fa'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const Sidebar = () => {
  const location = useLocation()
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')
  const isMobile = useBreakpointValue({ base: true, md: false })
  const { isOpen, onToggle } = useDisclosure()

  const navItems = [
    {
      icon: FaUser,
      label: 'Profile',
      path: '/profile',
    },
    {
      icon: null,
      label: 'Analytics',
      path: null,
    },
    {
      icon: FaChartLine,
      label: 'Overview',
      path: '/dashboard/overview',
    },
    {
      icon: FaGlobe,
      label: 'Geography',
      path: '/dashboard/geography',
    },
    {
      icon: FaCalendarAlt,
      label: 'Monthly',
      path: '/dashboard/monthly',
    },
    {
      icon: FaChartPie,
      label: 'Breakdown',
      path: '/dashboard/breakdown',
    },
    {
      icon: FaCalendarDay,
      label: 'Daily',
      path: '/dashboard/daily',
    },
  ]

  return (
    <Box
      as="nav"
      position="fixed"
      left={0}
      top={0}
      bottom={0}
      w={{ base: "full", md: "240px" }}
      bg={bgColor}
      borderRight="1px"
      borderColor={borderColor}
      py={4}
      zIndex="sticky"
      display={{ base: isOpen ? "block" : "none", md: "block" }}
    >
      <VStack spacing={2} align="stretch" px={4}>
        {navItems.map((item, index) => {
          if (item.icon === null) {
            return (
              <Box key={index} py={2}>
                <Text
                  color="brand.blue"
                  fontSize="sm"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  px={4}
                >
                  {item.label}
                </Text>
                <Divider mt={2} borderColor={borderColor} />
              </Box>
            )
          }

          return (
            <Link
              key={item.path}
              as={RouterLink}
              to={item.path}
              _hover={{ textDecoration: 'none' }}
            >
              <MotionBox
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  variant="ghost"
                  w="full"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={item.icon} />}
                  color={location.pathname === item.path ? 'brand.blue' : 'white'}
                  bg={location.pathname === item.path ? 'whiteAlpha.100' : 'transparent'}
                  _hover={{
                    bg: 'whiteAlpha.200',
                  }}
                  size="lg"
                >
                  <Text>{item.label}</Text>
                </Button>
              </MotionBox>
            </Link>
          )
        })}
      </VStack>
    </Box>
  )
}

export default Sidebar 