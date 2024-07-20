import { cva, VariantProps } from 'class-variance-authority';
import { Label } from 'flowbite-react';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface InputProps
  extends ComponentPropsWithoutRef<'input'>,
    VariantProps<typeof inputVariants> {
  icon?: ReactNode;
}

const inputVariants = cva('text-sm transition-colors duration-300 w-[300px]', {
  variants: {
    variant: {
      primary:
        'bg-gray-50 border border-gray-300 text-SLATE text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full',
      success:
        'bg-green-300 border border-green-300 text-[#ECF1F4] text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full',
      error:
        'bg-red-300 border border-red-300 text-[#ECF1F4] text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full ',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const Input = (props: InputProps) => {
  return (
    <div className="m-6">
      {props.id && <Label htmlFor={props.id}></Label>}
      <input
        type="text"
        {...props}
        className={inputVariants({ variant: props.variant })}
      />
    </div>
  );
};
