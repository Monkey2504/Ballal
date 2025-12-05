import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, User, Lock, LogIn, ArrowRight, AlertTriangle, Eye, EyeOff, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  switchTo: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, switchTo }) => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Focus management
  const modalRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (isOpen) {
      // Reset form state
      setError(null);
      if (mode === 'login') {
        setPassword('');
      }
      setAcceptTerms(false);
      
      // Focus the first input
      setTimeout(() => {
        emailRef.current?.focus();
      }, 100);
    } else {
      // Clear form when closing
      setEmail('');
      setName('');
      setPassword('');
    }
  }, [isOpen, mode]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Trap focus inside modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modalRef.current.addEventListener('keydown', handleTabKey);
    return () => modalRef.current?.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  if (!isOpen) return null;

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    if (mode === 'register') {
      return password.length >= 6;
    }
    return password.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide.");
      emailRef.current?.focus();
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError("Veuillez entrer votre nom complet.");
        return;
      }
      
      if (!validatePassword(password)) {
        setError("Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }
      
      if (!acceptTerms) {
        setError("Veuillez accepter les conditions d'utilisation.");
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        // Simulated login - use name if provided, otherwise default
        await login(email, name.trim() || 'Membre');
      } else {
        // Register with email and name
        await register(email, name.trim());
      }
      onClose();
    } catch (error: any) {
      console.error('Auth error:', error);
      setError(
        error.message || 
        "Échec de l'authentification. Veuillez vérifier vos informations et réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login';
    setError(null);
    setPassword('');
    setAcceptTerms(false);
    switchTo(newMode);
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Demo warning banner */}
        <div 
          className="bg-amber-100 text-amber-900 px-4 py-2 text-xs font-bold text-center flex items-center justify-center border-b border-amber-200"
          role="alert"
        >
          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
          MODE DÉMO : Authentification locale uniquement.
        </div>

        {/* Header */}
        <div className="bg-[#CE1126] p-6 text-white text-center relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#CE1126]"
            aria-label="Fermer la fenêtre de connexion"
            autoFocus={false}
          >
            <X className="h-5 w-5" />
          </button>
          <h2 id="modal-title" className="text-2xl font-black uppercase tracking-tight">
            {mode === 'login' ? 'Connexion' : 'Rejoindre Ballal'}
          </h2>
          <p className="text-red-100 text-sm mt-1 font-medium">
            {mode === 'login' ? 'Heureux de vous revoir !' : 'Créez votre compte membre.'}
          </p>
        </div>

        {/* Form content */}
        <div className="p-6 overflow-y-auto">
          {/* Error message */}
          {error && (
            <div 
              className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded-r text-red-700 text-sm font-medium flex items-start animate-in slide-in-from-top-2"
              role="alert"
              aria-live="assertive"
            >
              <Info className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (register only) */}
            {mode === 'register' && (
              <div>
                <label htmlFor="auth-name" className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Nom complet <span className="text-red-500" aria-hidden="true">*</span>
                  <span className="sr-only">(obligatoire)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all font-medium"
                    placeholder="Ex: Mamadou Diallo"
                    autoComplete="name"
                    aria-required="true"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="auth-email" className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Adresse E-mail <span className="text-red-500" aria-hidden="true">*</span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={emailRef}
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all font-medium"
                  placeholder="exemple@email.com"
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="auth-password" className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                <span>
                  Mot de passe 
                  <span className="text-gray-400 font-normal normal-case ml-1">(Simulé)</span>
                  {mode === 'register' && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
                </span>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    className="text-[#CE1126] hover:underline text-xs font-normal"
                    onClick={() => alert('Fonctionnalité désactivée en mode démo.')}
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  required={mode === 'register'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all font-medium"
                  placeholder={mode === 'register' ? "Minimum 6 caractères" : "Votre mot de passe"}
                  autoComplete={mode === 'login' ? "current-password" : "new-password"}
                  aria-required={mode === 'register'}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CE1126] focus:ring-inset rounded"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {mode === 'register' && (
                <p className="text-[10px] text-gray-400 mt-1">
                  ⚠️ Ne saisissez pas votre véritable mot de passe. Ceci est une démonstration.
                </p>
              )}
            </div>

            {/* Terms checkbox (register only) */}
            {mode === 'register' && (
              <div className="flex items-start pt-2">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="focus:ring-[#CE1126] h-4 w-4 text-[#CE1126] border-gray-300 rounded"
                    required
                    aria-required="true"
                  />
                </div>
                <label htmlFor="terms" className="ml-3 text-xs cursor-pointer">
                  <span className="font-medium text-gray-700">
                    J'accepte que ce compte soit une{' '}
                    <span className="font-bold">démonstration locale</span>{' '}
                    et que mes données soient stockées uniquement dans mon navigateur.
                    <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                  </span>
                </label>
              </div>
            )}

            {/* Submit button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                  <span>Chargement...</span>
                </>
              ) : (
                <>
                  {mode === 'login' ? (
                    <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="mr-2 h-5 w-5" aria-hidden="true" />
                  )}
                  {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                </>
              )}
            </button>
          </form>

          {/* Switch mode */}
          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 font-medium">
              {mode === 'login' ? "Pas encore de compte ?" : "Déjà membre ?"}
              <button 
                onClick={handleSwitchMode}
                className="ml-2 font-black text-[#CE1126] hover:underline focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1"
              >
                {mode === 'login' ? "S'inscrire" : "Se connecter"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};