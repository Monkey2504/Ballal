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
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
          {flagLine && (
            <span className="flag-line w-8 shrink-0" aria-hidden="true">
              <span /><span /><span />
            </span>
          )}
          <p className="dateline text-[11px] text-guinea-red">
            {eyebrow}
          </p>
        </div>
      )}
      <h2
        id={titleId}
        className="font-serif font-black text-[2rem] sm:text-[2.75rem] text-ink leading-[1.02] tracking-tight"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-body-lg text-ink-muted leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
