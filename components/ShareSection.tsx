import React, { useState, useCallback, useEffect } from 'react';
import {
  Share2, Copy, Smartphone, Facebook, Check, Link as LinkIcon, Info,
  Twitter, Mail, QrCode, Download, Globe, Users,
  ExternalLink, Heart, MessageSquare, Loader
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
      color: 'bg-ink hover:bg-guinea-red',
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
    { value: shareCount.toLocaleString(), label: 'Partages totaux', icon: Share2, color: 'text-guinea-red' },
    { value: '98%', label: 'Engagement positif', icon: Heart, color: 'text-ink' },
    { value: '24h', label: 'Temps de réponse', icon: MessageSquare, color: 'text-guinea-green' },
    { value: '10K+', label: 'Communauté', icon: Users, color: 'text-guinea-red' }
  ];

  return (
    <div
      className="min-h-screen bg-ivory paper-grain py-12 md:py-20"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="share-title"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="flag-line w-8 shrink-0" aria-hidden="true"><span /><span /><span /></span>
            <span className="dateline text-[11px] text-guinea-red">Faire circuler</span>
          </div>
          <h1
            id="share-title"
            className="font-serif font-black text-4xl md:text-5xl text-ink mb-4 tracking-tight"
          >
            Partagez la <span className="text-guinea-red italic">solidarité</span>
          </h1>
          <p className="text-body-lg text-ink-muted leading-relaxed">
            {t.share_subtitle || "Aidez-nous à faire connaître notre mission en partageant avec votre communauté"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {shareStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-[4px] shadow-soft-sm border border-border-subtle text-center hover:shadow-soft-elegant transition-shadow"
            >
              <div className={`font-serif font-black text-3xl mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="dateline text-[9px] text-ink-muted normal-case tracking-[0.1em]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: QR Code & Link */}
          <div className="space-y-8">
            {/* QR Code Card */}
            <div className="bg-white rounded-[4px] shadow-soft-elegant border border-border-subtle p-8 transition-shadow hover:shadow-soft-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-black text-2xl text-ink flex items-center gap-3">
                  <QrCode className="h-6 w-6 text-guinea-green" aria-hidden="true" />
                  QR code instantané
                </h2>
                <button
                  onClick={downloadQRCode}
                  disabled={qrStatus === 'generating'}
                  className={`flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-2 rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-green/40 ${
                    qrStatus === 'success' ? 'text-guinea-green bg-guinea-green/10' : 'text-guinea-green hover:bg-guinea-green/10'
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
                  className="bg-white p-6 rounded-[4px] border border-border-subtle shadow-inner mb-6 relative group"
                  aria-label="QR Code de partage"
                >
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}&color=009460&bgcolor=ffffff&margin=10&format=png`}
                    alt="QR Code pour partager le site Ballal ASBL"
                    className="w-48 h-48"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-guinea-green text-white dateline text-[9px] px-3 py-1 rounded-[3px] shadow-soft-sm whitespace-nowrap">
                      BALLAL ASBL
                    </div>
                  </div>
                </div>

                <p className="text-body-sm text-ink-muted text-center max-w-sm mb-6">
                  {t.share_qr_inst}
                </p>
              </div>
            </div>

            {/* Link Sharing Card */}
            <div className="bg-white rounded-[4px] shadow-soft-elegant border border-border-subtle p-8 transition-shadow hover:shadow-soft-lg">
              <h3 className="font-serif font-black text-xl text-ink mb-6 flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-ink-muted" aria-hidden="true" />
                {t.share_link_label}
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-ink-muted" aria-hidden="true" />
                    <label htmlFor="share-link-input" className="dateline text-[10px] text-ink-muted">
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
                        className="w-full px-4 py-3 bg-paper border border-border-subtle rounded-[4px] text-ink font-mono text-sm focus:outline-none focus:border-guinea-red focus:ring-2 focus:ring-guinea-red/20"
                        aria-label="Lien à partager"
                      />
                    </div>
                    <button
                      onClick={handleCopy}
                      aria-label={copied ? t.share_copied : t.share_copy}
                      className={`px-6 py-3 rounded-[3px] font-mono text-[12px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        copied
                          ? 'bg-guinea-green text-white focus-visible:ring-guinea-green/50'
                          : 'bg-ink text-ivory hover:bg-guinea-red focus-visible:ring-guinea-red/50'
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

                <div className="bg-paper p-4 rounded-[4px] border border-border-subtle">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-guinea-red flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-body-sm text-ink-muted">
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
              <div className="bg-ink rounded-[4px] p-8 text-ivory shadow-soft-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Share2 className="h-8 w-8 text-guinea-yellow" aria-hidden="true" />
                  <div>
                    <h3 className="font-serif font-black text-2xl">Partagez facilement</h3>
                    <p className="text-ivory/60 text-body-sm">Utilisez le partage natif de votre appareil</p>
                  </div>
                </div>

                <button
                  onClick={handleNativeShare}
                  className="w-full bg-guinea-yellow text-ink font-mono text-[12px] font-bold uppercase tracking-[0.08em] py-4 px-6 rounded-[3px] hover:bg-guinea-red hover:text-white transition-colors duration-200 flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-yellow/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  aria-label="Partager via votre appareil"
                >
                  <Share2 className="h-5 w-5" aria-hidden="true" />
                  <span>Partager maintenant</span>
                </button>
              </div>
            )}

            {/* Social Platforms */}
            <div className="bg-white rounded-[4px] shadow-soft-elegant border border-border-subtle p-8">
              <h3 className="font-serif font-black text-2xl text-ink mb-6">
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
                    className={`${platform.color} text-white font-mono text-[12px] font-bold uppercase tracking-[0.08em] py-4 px-6 rounded-[3px] transition-colors duration-200 hover:shadow-soft-sm flex items-center justify-center gap-3 relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ink/30 ${
                      activePlatform === platform.id ? 'ring-2 ring-offset-2 ring-current' : ''
                    }`}
                    aria-label={platform.label}
                  >
                    <platform.icon className="h-5 w-5" aria-hidden="true" />
                    <span>{platform.name}</span>
                  </a>
                ))}
              </div>

              {/* Additional Platforms */}
              <div className="mt-6 pt-6 border-t border-border-subtle">
                <h4 className="dateline text-[10px] text-ink-muted mb-4">
                  Autres options
                </h4>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={shareLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0088cc] text-white rounded-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] hover:bg-[#0077b5] transition-colors flex items-center gap-2"
                    aria-label={t.share_telegram || "Partager sur Telegram"}
                  >
                    <MessageSquare className="h-4 w-4" aria-hidden="true" />
                    Telegram
                  </a>
                  <a
                    href={shareLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#0A66C2] text-white rounded-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] hover:bg-[#004182] transition-colors flex items-center gap-2"
                    aria-label={t.share_linkedin || "Partager sur LinkedIn"}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Share Tips */}
            <div className="bg-paper rounded-[4px] p-8 border border-border-subtle">
              <div className="flex items-center gap-3 mb-6">
                <span className="flag-line w-8 shrink-0" aria-hidden="true"><span /><span /><span /></span>
                <h3 className="font-serif font-black text-2xl text-ink">Conseils de partage</h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-guinea-red text-white rounded-[3px] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-ink-muted">
                    <span className="font-bold text-ink">Personnalisez votre message</span> - Ajoutez pourquoi cette cause vous tient à cœur
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-guinea-yellow text-ink rounded-[3px] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-ink-muted">
                    <span className="font-bold text-ink">Mentionnez des amis</span> - Taggez des personnes qui pourraient être intéressées
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 bg-guinea-green text-white rounded-[3px] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-ink-muted">
                    <span className="font-bold text-ink">Utilisez les hashtags</span> - #BallalASBL #Solidarité #JusticeSociale
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-ink rounded-[4px] p-8 md:p-12 text-ivory shadow-soft-xl">
            <h3 className="font-serif font-black text-2xl md:text-3xl mb-6">
              Chaque partage compte
            </h3>
            <p className="text-body-lg text-ivory/70 mb-8 max-w-2xl mx-auto">
              En partageant notre mission, vous contribuez à construire une communauté plus solidaire et juste.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleNativeShare}
                className="px-8 py-4 bg-guinea-red text-white font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-guinea-red-dark transition-colors flex items-center justify-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                <Share2 className="h-5 w-5" aria-hidden="true" />
                Partager maintenant
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-white/10 text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
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
