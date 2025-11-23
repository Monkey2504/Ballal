
import React, { useState } from 'react';
import { Share2, Copy, Smartphone, Facebook, Check, Link } from 'lucide-react';

const ShareSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const appUrl = typeof window !== 'undefined' ? window.location.href : 'https://ballal-asbl.be';
  const shareText = "Retrouvez BALLAL, la plateforme d'entraide pour la communauté guinéenne en Belgique !";
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  
  // Utilisation de wa.me pour un support mobile/desktop universel
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + appUrl)}`;
  // URL pour Facebook
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`;

  const handleCopy = async () => {
    const input = document.getElementById('share-link-input') as HTMLInputElement;
    
    // Tentative 1 : API Clipboard Moderne
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Tentative 2 : Fallback classique (essentiel pour certains contextes ou vieux mobiles)
      if (input) {
        input.select();
        input.setSelectionRange(0, 99999); // Pour iOS
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            alert('Impossible de copier automatiquement. Veuillez copier le lien manuellement.');
        }
      }
    }
  };

  const handleNativeShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: 'BALLAL ASBL',
          text: shareText,
          url: appUrl,
        });
      } catch (err) {
        console.log('Share canceled', err);
      }
    }
  };

  return (
    <div className="py-12 min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
             <Share2 className="h-8 w-8 text-[#CE1126]" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Faites grandir la communauté
          </h2>
          <p className="mt-4 text-xl text-gray-600 font-medium">
            Ballal existe grâce à vous. Partagez l'application avec vos proches.
          </p>
        </div>

        {/* QR Code Card */}
        <div className="bg-white rounded-2xl shadow-lg border-t-8 border-[#FCD116] overflow-hidden mb-8">
            <div className="p-8 flex flex-col items-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Scanner pour rejoindre</p>
                
                <div className="bg-white p-4 rounded-xl border-2 border-gray-100 shadow-inner mb-6">
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(appUrl)}&color=009460`} 
                        alt="QR Code BALLAL" 
                        className="w-48 h-48"
                    />
                </div>
                
                {/* Input visible pour copie manuelle - Solution au problème "je n'arrive pas à partager" */}
                <div className="w-full max-w-md">
                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase text-left">Lien direct (cliquez pour sélectionner)</label>
                    <div className="flex rounded-md shadow-sm">
                        <div className="relative flex-grow focus-within:z-10">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link className="h-4 w-4 text-gray-400" />
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
                            className={`-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors ${copied ? 'text-green-600' : 'text-gray-700'}`}
                        >
                            {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                            <span>{copied ? 'Copié !' : 'Copier'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Actions Grid */}
        <div className="grid gap-4">
            
            {/* Native Share (Mobile) - En premier si dispo */}
            {canShare && (
                <button 
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gray-900 text-white rounded-xl shadow-md hover:bg-black transition-all hover:-translate-y-1 font-bold text-lg mb-2"
                >
                    <Share2 className="h-6 w-6 mr-3" />
                    Partager via...
                </button>
            )}

            {/* WhatsApp */}
            <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-full px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-md transition-all hover:-translate-y-1 font-bold text-lg"
            >
                <div className="mr-3 p-1 bg-white/20 rounded-full">
                    <Smartphone className="h-6 w-6" />
                </div>
                Envoyer sur WhatsApp
            </a>

            <div className="grid grid-cols-1 gap-4">
                <a 
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center px-4 py-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl shadow-sm font-bold transition-all hover:-translate-y-1"
                >
                    <Facebook className="h-5 w-5 mr-2" />
                    Partager sur Facebook
                </a>
            </div>

        </div>

      </div>
    </div>
  );
};

export default ShareSection;
