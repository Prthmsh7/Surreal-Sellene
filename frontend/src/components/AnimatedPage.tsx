import { Box, BoxProps } from '@chakra-ui/react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
}

type MotionBoxProps = HTMLMotionProps<"div"> & BoxProps;

const MotionBox = motion(Box) as React.ComponentType<MotionBoxProps>;

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
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
  );
};

export default AnimatedPage; 