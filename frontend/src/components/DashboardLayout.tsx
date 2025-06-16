import { Box, useColorModeValue, Flex, useDisclosure, Icon, Button } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={bgColor} pt="80px">
      <Flex>
        {/* Mobile Menu Button */}
        <Button
          display={{ base: 'flex', md: 'none' }}
          position="fixed"
          left={4}
          top="90px"
          zIndex={3}
          onClick={onOpen}
          variant="ghost"
          color="white"
          p={2}
        >
          <Icon as={FaBars} w={6} h={6} />
        </Button>

        {/* Fixed Sidebar */}
        <Box
          position="fixed"
          left={0}
          top="80px"
          w="250px"
          h="calc(100vh - 80px)"
          display={{ base: "none", md: "block" }}
          zIndex={2}
          bg={bgColor}
          borderRight="1px"
          borderColor="brand.lightGray"
        >
          <Sidebar />
        </Box>

        {/* Mobile Sidebar */}
        <Box
          position="fixed"
          left={0}
          top="80px"
          w="250px"
          h="calc(100vh - 80px)"
          display={{ base: isOpen ? "block" : "none", md: "none" }}
          zIndex={2}
          bg={bgColor}
          borderRight="1px"
          borderColor="brand.lightGray"
        >
          <Sidebar onClose={onClose} />
        </Box>

        {/* Main Content Area */}
        <Box
          as="main"
          ml={{ base: 0, md: "250px" }}
          flex="1"
          minH="calc(100vh - 80px)"
          position="relative"
          overflow="auto"
          transition="margin-left 0.2s"
        >
          <Box maxW="1400px" mx="auto" px={{ base: 4, md: 6 }} py={6}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default DashboardLayout 