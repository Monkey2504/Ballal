import React, { useState, useCallback, useEffect } from 'react';
import { 
  Share2, Copy, Smartphone, Facebook, Check, Link as LinkIcon, Info, 
  Twitter, Mail, QrCode, Download, Globe, Shield, Users, 
  ExternalLink, Heart, Sparkles, MessageSquare, Loader
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface ShareSectionProps {
  language: LanguageCode;
}

const ShareSection: React.FC<ShareSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(1428);
  const [qrStatus, setQrStatus] = useState<'idle' | 'generating' | 'success'>('idle');
  const [activePlatform, setActivePlatform] = useState<string | null>(null);
  
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ballal-asbl.be';
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  
  const t = translations[language] || translations['fr'];
  
  const shareText = t.share_text || "Ballal ASBL - Solidarité Guinée-Belgique • Justice, Culture, Autonomie Alimentaire";
  const shareHashtags = "BallalASBL,Solidarité,GuinéeBelgique,JusticeSociale";
  
  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + '\n\n' + appUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}&hashtags=${shareHashtags}`,
    email: `mailto:?subject=${encodeURIComponent(t.share_email_subject || 'Découvrez Ballal ASBL')}&body=${encodeURIComponent(shareText + '\n\n' + appUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(shareText)}`
  };

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: t.share_whatsapp || 'WhatsApp',
      icon: Smartphone,
      color: 'bg-[#25D366] hover:bg-[#20bd5a]',
      label: t.share_whatsapp || 'Partager sur WhatsApp'
    },
    {
      id: 'facebook',
      name: t.share_facebook || 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166fe5]',
      label: t.share_facebook || 'Partager sur Facebook'
    },
    {
      id: 'twitter',
      name: t.share_twitter || 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1a91da]',
      label: 'Twitter'
    },
    {
      id: 'email',
      name: t.share_email || 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      label: t.share_email || 'Envoyer par email'
    }
  ];

  // Simulate share count increase
  useEffect(() => {
    const interval = setInterval(() => {
      setShareCount(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(appUrl);
      } else {
        // Fallback robust
        const textArea = document.createElement('textarea');
        textArea.value = appUrl;
        textArea.style.position = 'fixed'; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
      }
      
      setCopied(true);
      setActivePlatform('copy');
      
      setTimeout(() => {
        setCopied(false);
        setActivePlatform(null);
      }, 3000);
      
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }, [appUrl]);

  const handleNativeShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: 'BALLAL ASBL',
          text: shareText,
          url: appUrl,
        });
        setShareCount(prev => prev + 1);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  };

  const handlePlatformShare = (platformId: string) => {
    setActivePlatform(platformId);
    // Visual feedback delay
    setTimeout(() => setActivePlatform(null), 800);
    setShareCount(prev => prev + 1);
  };

  const downloadQRCode = async () => {
    if (qrStatus === 'generating') return;
    
    setQrStatus('generating');
    
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(appUrl)}&format=png&color=009460&bgcolor=ffffff&margin=10`;
      
      // Fetch as blob to ensure download works (bypassing generic cross-origin link issues)
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = localUrl;
      link.download = 'ballal-qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Cleanup
      setTimeout(() => URL.revokeObjectURL(localUrl), 100);
      
      setQrStatus('success');
      setTimeout(() => setQrStatus('idle'), 3000);
      
    } catch (error) {
      console.error("Erreur lors du téléchargement du QR code:", error);
      setQrStatus('idle');
      alert("Le téléchargement a échoué. Veuillez réessayer.");
    }
  };

  const shareStats = [
    { value: shareCount.toLocaleString(), label: 'Partages totaux', icon: Share2, color: 'text-[#CE1126]' },
    { value: '98%', label: 'Engagement positif', icon: Heart, color: 'text-[#FCD116]' },
    { value: '24h', label: 'Temps de réponse', icon: MessageSquare, color: 'text-[#009460]' },
    { value: '10K+', label: 'Communauté', icon: Users, color: 'text-purple-600' }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 md:py-20"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="share-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-100 to-red-50 rounded-full mb-6 shadow-lg">
            <Share2 className="h-12 w-12 text-[#CE1126]" aria-hidden="true" />
          </div>
          <h1 
            id="share-title"
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            Partagez la <span className="text-[#CE1126]">Solidarité</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t.share_subtitle || "Aidez-nous à faire connaître notre mission en partageant avec votre communauté"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {shareStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow"
            >
              <div className={`text-3xl font-black mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: QR Code & Link */}
          <div className="space-y-8">
            {/* QR Code Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 transform transition-all hover:shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <QrCode className="h-6 w-6 text-[#009460]" aria-hidden="true" />
                  QR Code Instantané
                </h2>
                <button
                  onClick={downloadQRCode}
                  disabled={qrStatus === 'generating'}
                  className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-lg transition-colors ${
                    qrStatus === 'success' ? 'text-green-600 bg-green-50' : 'text-[#009460] hover:text-green-700 hover:bg-green-50'
                  } disabled:opacity-50`}
                >
                  {qrStatus === 'generating' ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : qrStatus === 'success' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" aria-hidden="true" />
                  )}
                  {qrStatus === 'generating' ? t.share_downloading : qrStatus === 'success' ? t.share_download_success : t.share_download_qr}
                </button>
              </div>
              
              <div className="flex flex-col items-center">
                <div 
                  className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-inner mb-6 relative group"
                  aria-label="QR Code de partage"
                >
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}&color=009460&bgcolor=ffffff&margin=10&format=png`}
                    alt="QR Code pour partager le site Ballal ASBL"
                    className="w-48 h-48 transition-opacity duration-300 group-hover:opacity-90"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#009460] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                      BALLAL ASBL
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
                  {t.share_qr_inst}
                </p>
              </div>
            </div>

            {/* Link Sharing Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 transform transition-all hover:shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                {t.share_link_label}
              </h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-400" aria-hidden="true" />
                    <label htmlFor="share-link-input" className="text-sm font-bold text-gray-700">
                      Copiez ce lien à partager
                    </label>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-grow relative">
                      <input
                        id="share-link-input"
                        type="text"
                        readOnly
                        value={appUrl}
                        onClick={(e) => e.currentTarget.select()}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700 font-mono text-sm focus:outline-none focus:border-[#CE1126] focus:ring-2 focus:ring-[#CE1126]/20"
                        aria-label="Lien à partager"
                      />
                    </div>
                    <button
                      onClick={handleCopy}
                      aria-label={copied ? t.share_copied : t.share_copy}
                      className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        copied
                          ? 'bg-green-600 text-white ring-green-500 transform scale-105'
                          : 'bg-slate-900 text-white hover:bg-black ring-slate-900'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-5 w-5" aria-hidden="true" />
                          {t.share_copied}
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" aria-hidden="true" />
                          {t.share_copy}
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-sm text-blue-800">
                      {t.share_privacy_warning}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Social Sharing */}
          <div className="space-y-8">
            {/* Native Share Button */}
            {canShare && (
              <div className="bg-gradient-to-r from-slate-900 to-black rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Share2 className="h-8 w-8 text-[#FCD116]" aria-hidden="true" />
                  <div>
                    <h3 className="text-2xl font-black">Partagez facilement</h3>
                    <p className="text-slate-300 text-sm">Utilisez le partage natif de votre appareil</p>
                  </div>
                </div>
                
                <button 
                  onClick={handleNativeShare}
                  className="w-full bg-gradient-to-r from-[#FCD116] to-yellow-500 text-slate-900 font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:brightness-110 flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-yellow-300/30"
                  aria-label="Partager via votre appareil"
                >
                  <Share2 className="h-6 w-6" aria-hidden="true" />
                  <span className="text-lg">Partager maintenant</span>
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Social Platforms */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Partagez sur les réseaux
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.id}
                    href={shareLinks[platform.id as keyof typeof shareLinks]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handlePlatformShare(platform.id)}
                    className={`${platform.color} text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex items-center justify-center gap-3 relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-gray-200 ${
                      activePlatform === platform.id ? 'scale-95 ring-4 ring-offset-2 ring-current' : ''
                    }`}
                    aria-label={platform.label}
                  >
                    <platform.icon className="h-6 w-6" aria-hidden="true" />
                    <span>{platform.name}</span>
                    {activePlatform === platform.id && (
                      <span className="absolute inset-0 bg-white/20 animate-pulse" />
                    )}
                  </a>
                ))}
              </div>
              
              {/* Additional Platforms */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">
                  Autres options
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={shareLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0088cc] text-white rounded-lg text-sm font-medium hover:bg-[#0077b5] transition-colors flex items-center gap-2 hover:shadow-md"
                    aria-label={t.share_telegram || "Partager sur Telegram"}
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Telegram
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:bg-[#004182] transition-colors flex items-center gap-2 hover:shadow-md"
                    aria-label={t.share_linkedin || "Partager sur LinkedIn"}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Share Tips */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-[#CE1126]" aria-hidden="true" />
                <h3 className="text-2xl font-black text-slate-900">Conseils de partage</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-[#CE1126] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                    1
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Personnalisez votre message</span> - Ajoutez pourquoi cette cause vous tient à cœur
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-[#FCD116] text-slate-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                    2
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Mentionnez des amis</span> - Taggez des personnes qui pourraient être intéressées
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-[#009460] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                    3
                  </div>
                  <p className="text-gray-700">
                    <span className="font-bold">Utilisez les hashtags</span> - #BallalASBL #Solidarité #JusticeSociale
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-900 to-black rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-black mb-6">
              Chaque partage compte
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              En partageant notre mission, vous contribuez à construire une communauté plus solidaire et juste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleNativeShare}
                className="px-8 py-4 bg-gradient-to-r from-[#CE1126] to-red-700 text-white font-bold rounded-xl hover:shadow-xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                <Share2 className="h-5 w-5" aria-hidden="true" />
                Partager maintenant
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors"
              >
                Explorer plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;