import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, User, Lock, LogIn, ArrowRight, AlertTriangle, Eye, EyeOff, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { isValidEmail, isValidPassword } from '../utils/validation.ts';

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

  const validateEmail = isValidEmail;

  const validatePassword = (password: string): boolean => {
    if (mode === 'register') return isValidPassword(password);
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
        setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.");
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
        await register(email, password, name.trim());
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
        className="bg-ivory rounded-[8px] shadow-soft-xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Demo warning banner */}
        <div
          className="bg-guinea-yellow text-ink px-4 py-2 dateline text-[10px] text-center flex items-center justify-center border-b border-border-subtle"
          role="alert"
        >
          <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
          Mode démo : authentification locale uniquement.
        </div>

        {/* Header */}
        <div className="bg-guinea-red p-6 text-white text-center relative shrink-0">
          <div className="flag-line absolute top-0 left-0 right-0" aria-hidden="true"><span /><span /><span /></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-[3px] p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-guinea-red"
            aria-label="Fermer la fenêtre de connexion"
            autoFocus={false}
          >
            <X className="h-5 w-5" />
          </button>
          <h2 id="modal-title" className="font-serif font-black text-3xl tracking-tight">
            {mode === 'login' ? 'Connexion' : 'Rejoindre Ballal'}
          </h2>
          <p className="text-red-100 text-body-sm mt-1.5 font-medium">
            {mode === 'login' ? 'Heureux de vous revoir.' : 'Créez votre compte membre.'}
          </p>
        </div>

        {/* Form content */}
        <div className="p-6 overflow-y-auto">
          {/* Error message */}
          {error && (
            <div
              className="mb-4 bg-guinea-red/5 border-l-4 border-guinea-red p-3 rounded-r text-guinea-red text-body-sm font-medium flex items-start animate-in slide-in-from-top-2"
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
                <label htmlFor="auth-name" className="block dateline text-[10px] text-ink-muted mb-1.5">
                  Nom complet <span className="text-guinea-red" aria-hidden="true">*</span>
                  <span className="sr-only">(obligatoire)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-ink-muted" />
                  </div>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-[4px] border border-border-subtle bg-white focus:ring-2 focus:ring-guinea-red focus:border-transparent outline-none transition-all font-medium"
                    placeholder="Ex: Mamadou Diallo"
                    autoComplete="name"
                    aria-required="true"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="auth-email" className="block dateline text-[10px] text-ink-muted mb-1.5">
                Adresse e-mail <span className="text-guinea-red" aria-hidden="true">*</span>
                <span className="sr-only">(obligatoire)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-ink-muted" />
                </div>
                <input
                  ref={emailRef}
                  id="auth-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-[4px] border border-border-subtle bg-white focus:ring-2 focus:ring-guinea-red focus:border-transparent outline-none transition-all font-medium"
                  placeholder="exemple@email.com"
                  autoComplete="email"
                  aria-required="true"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="auth-password" className="dateline text-[10px] text-ink-muted mb-1.5 flex justify-between">
                <span>
                  Mot de passe
                  <span className="text-ink-muted font-normal normal-case ml-1 tracking-normal">(simulé)</span>
                  {mode === 'register' && <span className="text-guinea-red ml-1" aria-hidden="true">*</span>}
                </span>
                {mode === 'login' && (
                  <button
                    type="button"
                    className="text-guinea-red hover:underline text-[10px] font-normal tracking-normal normal-case"
                    onClick={() => alert('Fonctionnalité désactivée en mode démo.')}
                  >
                    Mot de passe oublié ?
                  </button>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ink-muted" />
                </div>
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  required={mode === 'register'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-[4px] border border-border-subtle bg-white focus:ring-2 focus:ring-guinea-red focus:border-transparent outline-none transition-all font-medium"
                  placeholder={mode === 'register' ? "Min. 8 car. + majuscule + chiffre" : "Votre mot de passe"}
                  autoComplete={mode === 'login' ? "current-password" : "new-password"}
                  aria-required={mode === 'register'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ink-muted hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red focus:ring-inset rounded"
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
                <p className="text-[10px] text-ink-muted mt-1.5 flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 shrink-0 text-guinea-red" aria-hidden="true" />
                  Min. 8 caractères, 1 majuscule, 1 chiffre. Ne saisissez pas votre vrai mot de passe (démo).
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
                    className="focus:ring-guinea-red h-4 w-4 text-guinea-red border-border-subtle rounded"
                    required
                    aria-required="true"
                  />
                </div>
                <label htmlFor="terms" className="ml-3 text-xs cursor-pointer">
                  <span className="font-medium text-ink-muted">
                    J'accepte que ce compte soit une{' '}
                    <span className="font-bold text-ink">démonstration locale</span>{' '}
                    et que mes données soient stockées uniquement dans mon navigateur.
                    <span className="text-guinea-red ml-1" aria-hidden="true">*</span>
                  </span>
                </label>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ink text-ivory font-mono text-[12px] font-bold uppercase tracking-[0.08em] py-4 rounded-[3px] hover:bg-guinea-red transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2"
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
          <div className="mt-6 text-center pt-4 border-t border-border-subtle">
            <p className="text-body-sm text-ink-muted font-medium">
              {mode === 'login' ? "Pas encore de compte ?" : "Déjà membre ?"}
              <button
                onClick={handleSwitchMode}
                className="ml-2 font-black text-guinea-red hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red rounded px-1"
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