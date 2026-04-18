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
        'bg-white border border-[#E8E8E6] rounded-[12px]',
        'shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
        hover ? 'hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-shadow' : '',
        onClick ? 'cursor-pointer text-left w-full' : '',
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
