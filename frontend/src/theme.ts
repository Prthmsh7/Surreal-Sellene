import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: '"Space Grotesk", sans-serif',
    body: '"Inter", sans-serif',
  },
  colors: {
    brand: {
      blue: '#1DA1F2',
      black: '#000000',
      darkGray: '#14171A',
      lightGray: '#657786',
      extraLightGray: '#AAB8C2',
      white: '#FFFFFF',
      gradient: 'linear-gradient(90deg, #1DA1F2 0%, #0D8ECF 100%)',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.black',
        color: 'white',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'full',
        transition: 'all 0.2s',
      },
      variants: {
        solid: {
          bg: 'brand.blue',
          color: 'white',
          _hover: {
            bg: 'blue.500',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.blue',
          color: 'brand.blue',
          _hover: {
            bg: 'rgba(29, 161, 242, 0.1)',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
        ghost: {
          color: 'white',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          bg: 'brand.darkGray',
          borderColor: 'brand.lightGray',
          transition: 'all 0.2s',
          _hover: {
            borderColor: 'brand.blue',
            transform: 'translateY(-1px)',
          },
          _focus: {
            borderColor: 'brand.blue',
            boxShadow: 'none',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          bg: 'brand.darkGray',
          borderColor: 'brand.lightGray',
          transition: 'all 0.2s',
          _hover: {
            borderColor: 'brand.blue',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        bg: 'brand.darkGray',
        borderColor: 'brand.lightGray',
        transition: 'all 0.2s',
        _hover: {
          borderColor: 'brand.blue',
          transform: 'translateY(-1px)',
        },
        _focus: {
          borderColor: 'brand.blue',
          boxShadow: 'none',
          transform: 'translateY(-1px)',
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: 'tight',
      },
    },
  },
})

export default theme 