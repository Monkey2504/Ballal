import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Share2, Copy, Smartphone, Facebook, Check, Link as LinkIcon, AlertTriangle, Shield, Info } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import QRCode from 'qrcode';

interface ShareSectionProps {
  language: LanguageCode;
}

const ShareSection: React.FC<ShareSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const [qrError, setQrError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ballal-asbl.be';
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  const t = translations[language];
  
  const shareText = "Ballal ASBL - Solidarité Guinée-Belgique";
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + appUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;

  // --- CLIENT-SIDE QR CODE GENERATION (SECURE P0) ---
  useEffect(() => {
    if (canvasRef.current && QRCode) {
        try {
            QRCode.toCanvas(canvasRef.current, appUrl, {
                width: 200,
                margin: 2,
                color: {
                    dark: '#009460',
                    light: '#ffffff'
                }
            }, (error) => {
                if (error) {
                    console.error("QR Generation failed", error);
                    setQrError(true);
                }
            });
        } catch (e) {
            console.error("QR Library error", e);
            setQrError(true);
        }
    }
  }, [appUrl]);

  // --- ROBUST CLIPBOARD COPY (P1) ---
  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(appUrl);
        setCopied(true);
        // Announce to screen readers logic would go here via live region
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = appUrl;
      textArea.style.position = "fixed"; 
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (err) {
        console.error('Fallback copy failed', err);
        alert(t.share_copy_error || 'Copy failed');
      }
      document.body.removeChild(textArea);
    }

    setTimeout(() => setCopied(false), 3000);
  }, [appUrl, t]);

  // --- ROBUST NATIVE SHARE (P1) ---
  const handleNativeShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: 'BALLAL ASBL',
          text: shareText,
          url: appUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
           console.error('Share failed', err);
        }
      }
    }
  };

  return (
    <div className="py-12 min-h-screen bg-slate-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
             <Share2 className="h-8 w-8 text-[#CE1126]" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {t.share_title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 font-medium">
            {t.share_subtitle}
          </p>
        </div>

        {/* QR CODE SECTION (SECURE) */}
        <div className="bg-white rounded-2xl shadow-lg border-t-8 border-[#FCD116] overflow-hidden mb-8">
            <div className="p-8 flex flex-col items-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6" id="qr-label">
                    {t.share_scan}
                </p>
                
                <div className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-inner mb-6 flex items-center justify-center min-h-[200px] min-w-[200px]">
                    {!qrError ? (
                        <>
                            <canvas 
                                ref={canvasRef} 
                                className="max-w-full h-auto"
                                role="img"
                                aria-label={t.share_qr_alt || "QR Code"}
                            />
                            <div className="sr-only">{t.share_qr_inst}</div>
                        </>
                    ) : (
                        <div className="text-gray-400 text-xs text-center p-4">
                            QR Code indisponible<br/>(Erreur de génération)
                        </div>
                    )}
                </div>
                
                <div className="w-full max-w-md">
                    <label htmlFor="share-link-input" className="block text-xs font-bold text-gray-500 mb-2 uppercase text-left">
                        {t.share_link_label}
                    </label>
                    <div className="flex rounded-md shadow-sm relative">
                        {/* Toast Feedback for Copy */}
                        {copied && (
                            <div className="absolute -top-10 right-0 bg-green-600 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-2 flex items-center" role="alert">
                                <Check className="h-3 w-3 mr-2" />
                                {t.action_copied}
                            </div>
                        )}
                        
                        <div className="relative flex-grow focus-within:z-10">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                type="text"
                                id="share-link-input"
                                readOnly
                                value={appUrl}
                                onClick={(e) => e.currentTarget.select()}
                                className="focus:ring-red-500 focus:border-red-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300 bg-gray-50 py-3 text-gray-600 font-mono text-xs sm:text-sm cursor-text"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            aria-label={copied ? t.action_copied : t.share_copy}
                            className={`-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${copied ? 'bg-green-50 text-green-700 border-green-300' : 'bg-white text-gray-700'}`}
                        >
                            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                            <span className="hidden sm:inline">{copied ? t.action_copied : t.share_copy}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* SOCIAL SHARE BUTTONS (PRIVACY AWARE) */}
        <div className="space-y-4">
            
            {/* Privacy Warning */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-blue-800 leading-relaxed">
                    {t.share_privacy_warning}
                </p>
            </div>

            {canShare && (
                <button 
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gray-900 text-white rounded-xl shadow-md hover:bg-black transition-all hover:-translate-y-1 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
                >
                    <Share2 className="h-6 w-6 mr-3" />
                    {t.share_via}
                </button>
            )}

            <div className="grid grid-cols-1 gap-4">
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center w-full px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-md transition-all hover:-translate-y-1 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-green-300"
                    aria-label={t.share_whatsapp}
                >
                    <div className="mr-3 p-1 bg-white/20 rounded-full">
                        <Smartphone className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {t.share_whatsapp}
                </a>

                <a 
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center px-4 py-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl shadow-sm font-bold transition-all hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    aria-label={t.share_facebook}
                >
                    <Facebook className="h-5 w-5 mr-2" aria-hidden="true" />
                    {t.share_facebook}
                </a>
            </div>

        </div>

      </div>
    </div>
  );
};

export default ShareSection;