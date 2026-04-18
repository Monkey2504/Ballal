import React from 'react';
import { motion } from 'framer-motion';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const variantClasses: Record<Variant, string> = {
  primary:   'bg-[#BE0000] text-white hover:bg-[#9B0000]',
  secondary: 'bg-transparent border border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#0F0F0F] hover:text-white',
  ghost:     'bg-transparent text-[#6B6B6B] hover:text-[#0F0F0F] hover:bg-[#F0F0EE]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9  px-4 text-[10px] gap-1.5',
  md: 'h-11 px-6 text-[11px] gap-2',
  lg: 'h-13 px-8 text-[12px] gap-2.5',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  children,
  className = '',
  disabled,
  ...rest
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-[8px]',
        'font-black uppercase tracking-widest',
        'transition-colors duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE0000] focus-visible:ring-offset-2',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...(rest as any)}
    >
      {icon && iconPosition === 'left' && <span aria-hidden="true">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span aria-hidden="true">{icon}</span>}
    </motion.button>
  );
};

export default Button;
