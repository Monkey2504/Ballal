import { useState } from 'react';

export const useClipboard = (resetDelay = 2500) => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch {
      // Fallback pour les navigateurs sans Clipboard API
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
      } catch {
        // Impossible de copier
      }
      document.body.removeChild(ta);
    }
  };

  return { copy, copied };
};
