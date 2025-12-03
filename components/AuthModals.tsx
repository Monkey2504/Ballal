
import React, { useState } from 'react';
import { X, Mail, User, Lock, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  switchTo: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, switchTo }) => {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // Only for register or simple login name
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, name); // In a real app, name wouldn't be here for login
      } else {
        await register(email, name);
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#CE1126] p-6 text-white text-center relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-black uppercase tracking-tight">
            {mode === 'login' ? 'Connexion' : 'Rejoindre Ballal'}
          </h2>
          <p className="text-red-100 text-sm mt-1">
            {mode === 'login' ? 'Heureux de vous revoir !' : 'Créez votre compte membre.'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name field (simulated for login to have a display name) */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                {mode === 'register' ? 'Nom complet' : 'Votre Prénom (Simulé)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all"
                  placeholder="Ex: Mamadou Diallo"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Adresse E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all"
                  placeholder="exemple@email.com"
                />
              </div>
            </div>

            {/* Fake Password Field for UI realism */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300" />
                </div>
                <input
                  type="password"
                  required={mode === 'register'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#CE1126] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-black transition-all flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
              ) : (
                mode === 'login' ? <LogIn className="mr-2 h-5 w-5" /> : <ArrowRight className="mr-2 h-5 w-5" />
              )}
              {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {mode === 'login' ? "Pas encore de compte ?" : "Déjà membre ?"}
              <button 
                onClick={() => switchTo(mode === 'login' ? 'register' : 'login')}
                className="ml-2 font-bold text-[#CE1126] hover:underline"
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
