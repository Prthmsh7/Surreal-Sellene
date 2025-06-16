declare module '@chakra-ui/react' {
  import { ComponentType, ReactNode } from 'react';

  export interface BoxProps {
    children?: ReactNode;
    maxW?: string;
    mx?: string;
    py?: number | string;
    mt?: number | string;
    mb?: number | string;
    borderWidth?: number | string;
    borderRadius?: string;
    overflow?: string;
    position?: string;
    w?: string;
    h?: string;
    bg?: string;
    left?: string;
    top?: string;
    transition?: string;
  }

  export interface ButtonProps {
    children?: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    colorScheme?: string;
    variant?: string;
    size?: string;
    width?: string;
    height?: string;
    display?: string;
    flexDirection?: string;
    gap?: number | string;
    cursor?: string;
    isLoading?: boolean;
    loadingText?: string;
    onClick?: () => void;
    as?: string;
    htmlFor?: string;
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
    bg?: string;
    borderColor?: string;
    color?: string;
    _hover?: any;
    _focus?: any;
    type?: string;
    display?: string;
    id?: string;
  }

  export interface TextareaProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    bg?: string;
    borderColor?: string;
    color?: string;
    _hover?: any;
    _focus?: any;
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
  }

  export interface IconProps {
    as?: ComponentType;
    boxSize?: number | string;
  }

  export interface ImageProps {
    src?: string;
    alt?: string;
    maxH?: string;
    objectFit?: string;
  }

  export interface HeadingProps {
    children?: ReactNode;
    size?: string;
    mb?: number | string;
  }

  export interface CardProps {
    children?: ReactNode;
  }

  export interface SpinnerProps {
    children?: ReactNode;
  }

  export interface CenterProps {
    children?: ReactNode;
    p?: number | string;
    minH?: string;
  }

  export interface SelectProps {
    children?: ReactNode;
  }

  export const Box: ComponentType<BoxProps>;
  export const Button: ComponentType<ButtonProps>;
  export const FormControl: ComponentType<FormControlProps>;
  export const FormLabel: ComponentType<FormLabelProps>;
  export const Input: ComponentType<InputProps>;
  export const Textarea: ComponentType<TextareaProps>;
  export const Text: ComponentType<TextProps>;
  export const VStack: ComponentType<VStackProps>;
  export const Grid: ComponentType<GridProps>;
  export const GridItem: ComponentType<GridItemProps>;
  export const Icon: ComponentType<IconProps>;
  export const Image: ComponentType<ImageProps>;
  export const Heading: ComponentType<HeadingProps>;
  export const Card: ComponentType<CardProps>;
  export const Spinner: ComponentType<SpinnerProps>;
  export const Center: ComponentType<CenterProps>;
  export const Select: ComponentType<SelectProps>;

  export const useToast: () => any;
} 