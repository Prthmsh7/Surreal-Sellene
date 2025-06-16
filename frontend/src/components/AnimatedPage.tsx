import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ zIndex: 1 }}
    >
      {children}
    </MotionBox>
  )
}

export default AnimatedPage 