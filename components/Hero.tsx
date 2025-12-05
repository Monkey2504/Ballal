import React, { useState, useEffect } from 'react';
import { ShieldCheck, Heart, Share2, Sparkles, Target, Users, Globe, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface HeroProps {
  onExplore: () => void;
  language?: LanguageCode;
  onShare: () => void;
  onDonate?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore, language = 'fr', onShare, onDonate }) => {
  const t = translations[language];
  
  // Multiple background images for rotation
  const heroImages = [
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Auto-rotate images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      setImgLoaded(false);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  // Trigger animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: "50+", label: "Personnes aidées mensuellement", icon: <Users className="h-4 w-4" /> },
    { value: "1000+", label: "Kg de nourriture sauvés", icon: <Target className="h-4 w-4" /> },
    { value: "3", label: "Villes actives", icon: <Globe className="h-4 w-4" /> }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "BALLAL ASBL",
    "url": "https://ballal-asbl.be",
    "logo": "https://ballal-asbl.be/logo.png",
    "description": t.hero_desc,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Chaussée de Gand 645",
      "addressLocality": "Molenbeek-Saint-Jean",
      "postalCode": "1080",
      "addressCountry": "BE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+32493434383",
      "contactType": "customer service",
      "email": "admin@ballal.be"
    },
    "foundingDate": "2023",
    "legalName": "BALLAL Association Sans But Lucratif"
  };

  return (
    <div 
      className="relative bg-gradient-to-br from-[#FFFBF0] via-white to-amber-50 overflow-hidden border-b border-orange-100"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Structured Data for SEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23CE1126' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
        aria-hidden="true"
      />

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="relative z-10 py-12 md:py-16 lg:py-20 backdrop-blur-sm">
          
          {/* Main Content */}
          <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column - Text Content */}
              <div className={`space-y-8 transform transition-all duration-1000 ${
                animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 text-[#009460] text-sm font-bold uppercase tracking-wider shadow-sm animate-pulse">
                  <span className="w-2 h-2 bg-[#009460] rounded-full animate-ping"></span>
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {t.hero_asbl}
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 
                    id="hero-title"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight"
                  >
                    <span className="block">BALLAL ASBL</span>
                    <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 lg:mt-4 bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460] bg-clip-text text-transparent">
                      {t.hero_subtitle}
                    </span>
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl font-medium">
                    {t.hero_desc}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  {stats.map((stat, index) => (
                    <div 
                      key={index}
                      className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center">
                          <span className="text-[#CE1126]">{stat.icon}</span>
                        </div>
                        <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={onExplore}
                      className="group flex-1 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-[#CE1126] to-red-700 hover:from-red-700 hover:to-[#CE1126] shadow-lg shadow-red-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-red-300"
                      aria-label={t.btn_assist}
                    >
                      <ShieldCheck className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      {t.btn_assist}
                      <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" aria-hidden="true" />
                    </button>
                    
                    {onDonate && (
                      <button
                        onClick={onDonate}
                        className="group flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-base font-bold rounded-xl text-slate-700 bg-white hover:bg-gray-50 hover:border-[#FCD116] hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-300"
                        aria-label={t.btn_donate}
                      >
                        <Heart className="mr-3 h-5 w-5 text-[#CE1126] group-hover:scale-110 transition-transform" aria-hidden="true" />
                        {t.btn_donate}
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-start gap-4">
                    <button
                      onClick={onShare}
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-xl text-gray-600 bg-white hover:bg-gray-50 hover:text-slate-900 shadow-sm hover:shadow-md transition-all duration-300 group"
                      aria-label={t.nav_share}
                    >
                      <Share2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                      {t.nav_share}
                    </button>
                    
                    <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CE1126] animate-pulse"></span>
                      <span className="font-medium">{t.hero_city_conakry}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FCD116]"></span>
                      <span className="font-medium">{t.hero_city_brussels}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#009460]"></span>
                      <span className="font-medium">{t.hero_city_liege}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Association reconnue d'utilité publique • Transparence certifiée
                  </p>
                </div>
              </div>

              {/* Right Column - Image */}
              <div className={`relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white transform transition-all duration-1000 ${
                animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                {/* Image with rotation */}
                <img
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                    imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  src={heroImages[currentImageIndex]}
                  alt={t.hero_subtitle}
                  loading="eager"
                  fetchPriority="high"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgLoaded(true)}
                />
                
                {/* Loading overlay */}
                {!imgLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                )}
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10" />
                
                {/* Image navigation dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImgLoaded(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
                        index === currentImageIndex
                          ? 'bg-white scale-125'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Voir l'image ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 right-6">
                  <div className="bg-gradient-to-br from-[#CE1126]/90 to-red-700/90 backdrop-blur-sm p-4 rounded-xl text-white">
                    <div className="text-sm font-bold uppercase tracking-wider">Solidarité</div>
                    <div className="text-2xl font-black">Active</div>
                  </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-3xl pointer-events-none" />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#CE1126] via-[#FCD116] to-[#009460] animate-gradient"></div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block">
        <div className="animate-bounce">
          <div className="h-8 w-px bg-gradient-to-b from-[#CE1126] to-transparent mx-auto"></div>
          <div className="text-xs text-gray-400 mt-2 text-center">Découvrir</div>
        </div>
      </div>
    </div>
  );
};

export default Hero;