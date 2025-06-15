declare module '@chakra-ui/react' {
  import { ComponentType, ReactNode } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    maxW?: string;
    mx?: string;
    p?: number | string;
    mt?: number | string;
    mb?: number | string;
    borderWidth?: number | string;
    borderRadius?: string;
    overflow?: string;
  }

  export interface ButtonProps {
    children?: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    colorScheme?: string;
    isLoading?: boolean;
    loadingText?: string;
    w?: string;
    h?: string;
    p?: number | string;
    variant?: 'solid' | 'outline';
    onClick?: () => void;
  }

  export interface FormControlProps {
    children?: ReactNode;
    isRequired?: boolean;
  }

  export interface FormLabelProps {
    children?: ReactNode;
  }

  export interface InputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    accept?: string;
  }

  export interface TextareaProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
  }

  export interface ImageProps {
    src?: string;
    alt?: string;
    maxH?: string;
    objectFit?: string;
    mb?: number | string;
  }

  export interface TextProps {
    children?: ReactNode;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    mt?: number | string;
    mb?: number | string;
    ml?: number | string;
    mr?: number | string;
    mx?: number | string;
    my?: number | string;
  }

  export interface VStackProps {
    children?: ReactNode;
    spacing?: number | string;
    align?: string;
  }

  export interface GridProps {
    children?: ReactNode;
    templateColumns?: string;
    gap?: number | string;
  }

  export interface GridItemProps {
    children?: ReactNode;
    key?: string;
  }

  export interface IconProps {
    as?: ComponentType;
    boxSize?: number | string;
  }

  export interface FlexProps {
    children?: ReactNode;
  }

  export interface HeadingProps {
    children?: ReactNode;
    size?: string;
    mb?: number | string;
  }

  export interface SimpleGridProps {
    children?: ReactNode;
    columns?: Record<string, number>;
    spacing?: number | string;
  }

  export interface CardProps {
    children?: ReactNode;
  }

  export interface CardBodyProps {
    children?: ReactNode;
  }

  export interface CardHeaderProps {
    children?: ReactNode;
  }

  export interface DividerProps {
    children?: ReactNode;
  }

  export interface SpinnerProps {
    children?: ReactNode;
  }

  export interface CenterProps {
    children?: ReactNode;
    p?: number | string;
  }

  export interface SelectProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children?: ReactNode;
  }

  export interface ToastProps {
    title: string;
    description: string;
    status: 'success' | 'error';
    duration: number;
    isClosable: boolean;
  }

  export const Box: ComponentType<BoxProps>;
  export const Button: ComponentType<ButtonProps>;
  export const FormControl: ComponentType<FormControlProps>;
  export const FormLabel: ComponentType<FormLabelProps>;
  export const Input: ComponentType<InputProps>;
  export const Textarea: ComponentType<TextareaProps>;
  export const Image: ComponentType<ImageProps>;
  export const Text: ComponentType<TextProps>;
  export const VStack: ComponentType<VStackProps>;
  export const Grid: ComponentType<GridProps>;
  export const GridItem: ComponentType<GridItemProps>;
  export const Icon: ComponentType<IconProps>;
  export const Flex: ComponentType<FlexProps>;
  export const Heading: ComponentType<HeadingProps>;
  export const SimpleGrid: ComponentType<SimpleGridProps>;
  export const Card: ComponentType<CardProps>;
  export const CardBody: ComponentType<CardBodyProps>;
  export const CardHeader: ComponentType<CardHeaderProps>;
  export const Divider: ComponentType<DividerProps>;
  export const Spinner: ComponentType<SpinnerProps>;
  export const Center: ComponentType<CenterProps>;
  export const Select: ComponentType<SelectProps>;
  export const useToast: () => (props: ToastProps) => void;
} 