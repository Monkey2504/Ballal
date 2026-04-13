import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, LogIn, ChevronDown, LogOut } from 'lucide-react';
import { ViewState, LanguageCode } from '../types.ts';
import { MAIN_NAV_ITEMS } from '../constants/navigation.ts';
import { useAuth } from '../contexts/AuthContext.tsx';

interface NavbarProps {
  setView: (view: ViewState) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  onOpenAuth: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setView, onOpenAuth }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled]             = useState(false);
  const [userMenuOpen, setUserMenuOpen]          = useState(false);
  const userMenuRef                              = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout }        = useAuth();
  const location                                 = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const isActive = (path: string): boolean =>
    location.pathname === path ||
    (path !== '/' && location.pathname.startsWith(path));

  return (
    <>
      {/* Skip to content (WCAG 2.1) */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#BE0000] focus:text-white focus:rounded-lg focus:font-bold">
        Aller au contenu
      </a>

      <header className="fixed top-0 w-full z-[150]">
        {/* Flag line — 3px ultra-fine, anchors the header */}
        <div className="flag-line" aria-hidden="true">
          <span /><span /><span />
        </div>

        {/* Main nav */}
        <motion.nav
          aria-label="Navigation principale"
          initial={false}
          animate={{
            backgroundColor: '#FAFAF8',
            boxShadow: isScrolled
              ? '0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.07)'
              : '0 1px 0 rgba(0,0,0,0.06)',
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between h-[68px]">

              {/* Logo */}
              <button
                onClick={() => handleNavClick(ViewState.HOME)}
                className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
                aria-label="Aller à l'accueil — Ballal ASBL"
              >
                {/* Guinea flag micro-strip */}
                <div className="flex flex-col gap-[2px] shrink-0" aria-hidden="true">
                  <span className="block w-1 h-3.5 bg-[#BE0000] rounded-full" />
                  <span className="block w-1 h-3.5 bg-[#FFCC00] rounded-full" />
                  <span className="block w-1 h-3.5 bg-[#00843D] rounded-full" />
                </div>
                <div>
                  <span className="block font-serif font-black text-xl leading-none text-[#0F0F0F] tracking-tight group-hover:text-[#BE0000] transition-colors duration-200">
                    BALLAL
                  </span>
                  <span className="block text-[9px] font-bold tracking-[0.25em] text-[#BE0000]/70 uppercase leading-none mt-0.5">
                    ASBL · BCE 1016.925.333
                  </span>
                </div>
              </button>

              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Liens principaux">
                {MAIN_NAV_ITEMS.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleNavClick(item.value)}
                      aria-current={active ? 'page' : undefined}
                      className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE0000]/40 ${
                        active
                          ? 'text-[#BE0000]'
                          : 'text-[#6B6B6B] hover:text-[#0F0F0F]'
                      }`}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-[#BE0000] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Right: emergency + auth */}
              <div className="hidden lg:flex items-center gap-3">
                <a
                  href="tel:0493434383"
                  className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-[#BE0000] hover:text-[#0F0F0F] transition-colors duration-200 uppercase"
                  aria-label="Numéro d'urgence 24h : 0493 43 43 83"
                >
                  <Phone className="h-3 w-3" aria-hidden="true" />
                  <span className="hidden xl:inline">Urgence 24h ·</span> 0493 43 43 83
                </a>

                <div className="w-px h-4 bg-[#E8E8E6]" aria-hidden="true" />

                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-token-lg border border-[#E8E8E6] hover:border-[#0F0F0F]/20 transition-colors text-[11px] font-bold text-[#0F0F0F] focus:outline-none"
                      aria-expanded={userMenuOpen}
                      aria-haspopup="menu"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#BE0000] flex items-center justify-center text-white text-[10px] font-black" aria-hidden="true">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{user?.name}</span>
                      <ChevronDown className={`h-3 w-3 text-[#6B6B6B] transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.97 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          role="menu"
                          className="absolute right-0 mt-1.5 w-44 bg-white rounded-token-lg border border-[#E8E8E6] shadow-soft-elegant py-1 z-50"
                        >
                          <button
                            role="menuitem"
                            onClick={() => { logout(); setUserMenuOpen(false); }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-[12px] text-[#BE0000] hover:bg-[#BE0000]/5 transition-colors font-bold"
                          >
                            <LogOut className="h-4 w-4" aria-hidden="true" />
                            Déconnexion
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={onOpenAuth}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0F0F0F] text-white text-[11px] font-black uppercase tracking-widest rounded-token-lg hover:bg-[#BE0000] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE0000]/40"
                  >
                    <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
                    Connexion
                  </button>
                )}
              </div>

              {/* Mobile burger */}
              <button
                className="lg:hidden p-2 rounded-token-lg border border-[#E8E8E6] hover:border-[#0F0F0F]/20 transition-colors focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {isMobileMenuOpen
                  ? <X className="h-5 w-5 text-[#0F0F0F]" aria-hidden="true" />
                  : <Menu className="h-5 w-5 text-[#0F0F0F]" aria-hidden="true" />
                }
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                className="lg:hidden border-t border-[#E8E8E6] bg-[#FAFAF8] overflow-hidden"
              >
                <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                  {MAIN_NAV_ITEMS.map((item, i) => {
                    const active = isActive(item.path);
                    return (
                      <motion.button
                        key={item.value}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.2, ease: 'easeOut' }}
                        onClick={() => handleNavClick(item.value)}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-3 w-full px-4 py-3 rounded-token-lg text-[12px] font-bold uppercase tracking-widest transition-colors ${
                          active
                            ? 'bg-[#BE0000]/8 text-[#BE0000]'
                            : 'text-[#6B6B6B] hover:bg-[#0F0F0F]/5 hover:text-[#0F0F0F]'
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {item.label}
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#BE0000]" aria-hidden="true" />}
                      </motion.button>
                    );
                  })}

                  <div className="pt-3 mt-3 border-t border-[#E8E8E6] space-y-2">
                    <a
                      href="tel:0493434383"
                      className="flex items-center gap-2 w-full px-4 py-3 text-[12px] font-black text-[#BE0000] uppercase tracking-widest"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      Urgence 24h — 0493 43 43 83
                    </a>
                    {isAuthenticated ? (
                      <button
                        onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3 text-[12px] font-bold text-[#BE0000] hover:bg-[#BE0000]/5 rounded-token-lg transition-colors"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Déconnexion ({user?.name})
                      </button>
                    ) : (
                      <button
                        onClick={() => { onOpenAuth(); setIsMobileMenuOpen(false); }}
                        className="flex items-center gap-2 w-full px-4 py-3 bg-[#0F0F0F] text-white text-[12px] font-black rounded-token-lg hover:bg-[#BE0000] transition-colors uppercase tracking-widest"
                      >
                        <LogIn className="h-4 w-4" aria-hidden="true" />
                        Connexion / Accès Membre
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
    </>
  );
};

export default Navbar;
