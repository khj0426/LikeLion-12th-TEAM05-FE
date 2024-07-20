import { ComponentPropsWithoutRef } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/_utils';
import { Button as FlowBiteButton } from 'flowbite-react';

interface ButtonProps
  extends ComponentPropsWithoutRef<'button'>,
    VariantProps<typeof buttonVariants> {
  as?: 'a' | 'button';
  shape?: 'circular' | 'square' | 'rounded';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  block?: boolean;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors duration-300',
  {
    variants: {
      variant: {
        primary:
          'bg-[#7F85F5] text-[#FAFCFE] hover:bg-gray-500 focus:ring-gray-400',
        secondary:
          'bg-[#0E0E2C] text-[#FAFCFE] hover:bg-[#1A1A3D] focus:ring-[#0E0E2C]',
        register:
          'bg-[#4B4DED] text-[#FFFFFF] hover:bg-[#5A5CF0] focus:ring-[#4B4DED]',
      },
      weight: {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
      shape: {
        circular: 'rounded-full',
        square: 'rounded-none',
        rounded: 'rounded-md',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        shape: 'circular',
        class: 'px-3 py-3',
      },
    ],
    defaultVariants: {
      variant: 'secondary',
      weight: 'medium',
      size: 'md',
      shape: 'rounded',
    },
  }
);

export const Button = ({
  size = 'xs',
  shape = 'rounded',
  variant = 'secondary',
  weight = 'medium',
  as,
  block,
  ...rest
}: ButtonProps) => {
  const className = cn(
    buttonVariants({
      variant,
      weight,
      size,
      shape,
    }),
    {
      'w-full': block,
    }
  );

  return (
    <FlowBiteButton className={className} {...rest}>
      {rest.children}
    </FlowBiteButton>
  );
};
