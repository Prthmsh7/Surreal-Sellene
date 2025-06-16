import {
  Box,
  VStack,
  Icon,
  Text,
  Link,
  useColorModeValue,
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

interface SidebarProps {
  onClose?: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation()
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const borderColor = useColorModeValue('brand.lightGray', 'brand.lightGray')

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

  const handleClick = (path: string | null) => {
    if (path && onClose) {
      onClose()
    }
  }

  return (
    <Box
      as="nav"
      h="calc(100vh - 80px)"
      bg={bgColor}
      py={4}
      overflowY="auto"
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
              onClick={() => handleClick(item.path)}
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
                  px={4}
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