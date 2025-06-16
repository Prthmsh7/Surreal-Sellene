import { Box, useColorModeValue, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  const bgColor = useColorModeValue('brand.darkGray', 'brand.darkGray')

  return (
    <Box minH="100vh" bg={bgColor} pt="80px">
      <Flex>
        {/* Fixed Sidebar */}
        <Box
          position="fixed"
          left={0}
          top="80px"
          w="250px"
          h="calc(100vh - 80px)"
          display={{ base: "none", md: "block" }}
          zIndex={2}
        >
          <Sidebar />
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
          <Box maxW="1400px" mx="auto" px={6} py={6}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default DashboardLayout 