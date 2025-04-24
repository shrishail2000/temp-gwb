import { cn } from '@/utilities/ui';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm md:text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default', //default means primary, check the classes applied for the default variant
    },
    variants: {
      size: {
        clear: '',
        default: 'h-12 px-4 py-3',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
      },
      variant: {
        default:
          'bg-primary text-inverse-on-surface hover:bg-primary-fixed-dim active:bg-on-secondary-fixed',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        surface: 'bg-surface text-surface-foreground hover:bg-surface-dim !font-normal',
        ghost: 'hover:bg-card hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
        outline: 'border border-border bg-background hover:bg-card hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'inverse-primary': 'bg-on-primary text-primary hover:bg-surface active:bg-surface-dim',
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
  asChild = false,
  className,
  size,
  variant,
  ref,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />;
};

export { Button, buttonVariants };
