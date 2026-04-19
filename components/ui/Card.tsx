import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  accentColor?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  accentColor,
}) => {
  const Tag = onClick ? motion.button : motion.div;

  return (
    <Tag
      onClick={onClick}
      whileHover={hover ? { y: -4, transition: { type: 'spring', stiffness: 350, damping: 22 } } : undefined}
      className={[
        'bg-white border border-border-subtle rounded-token-lg',
        'shadow-soft-sm',
        hover ? 'hover:shadow-soft-lg transition-shadow' : '',
        onClick ? 'cursor-pointer text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40 focus-visible:ring-offset-2' : '',
        'relative overflow-hidden',
        className,
      ].join(' ')}
    >
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: accentColor }}
          aria-hidden="true"
        />
      )}
      {children}
    </Tag>
  );
};

export default Card;
