import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  titleId?: string;
  className?: string;
  align?: 'left' | 'center';
  flagLine?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  titleId,
  className = '',
  align = 'left',
  flagLine = false,
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={['max-w-2xl', alignClass, className].join(' ')}
    >
      {flagLine && (
        <div className="flag-line mb-4 w-12" aria-hidden="true">
          <span /><span /><span />
        </div>
      )}
      {eyebrow && (
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BE0000] mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className="font-serif font-black text-3xl sm:text-4xl text-[#0F0F0F] leading-tight"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
