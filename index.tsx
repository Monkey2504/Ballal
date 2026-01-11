import React, { ReactNode, ErrorInfo, Component } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ShieldAlert, RefreshCcw, Home } from 'lucide-react';

interface GlobalErrorBoundaryProps {
  children?: ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erreur critique BALLAL App:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-soft-paper p-6 font-sans text-center overflow-hidden relative">
          {/* Décoration d'arrière-plan */}
          <div className="absolute top-0 left-0 w-full h-2 bg-guinea-red"></div>
          <div className="absolute top-2 left-0 w-full h-2 bg-guinea-yellow"></div>
          <div className="absolute top-4 left-0 w-full h-2 bg-guinea-green"></div>
          
          <div className="max-w-xl w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-soft-elegant border border-gray-100 relative z-10">
            <div className="inline-flex p-5 bg-red-50 rounded-3xl mb-8">
              <ShieldAlert className="h-12 w-12 text-guinea-red" />
            </div>
            
            <h1 className="text-4xl font-serif font-black text-earth-black mb-4 tracking-tighter">
              Une interruption <br/>est survenue.
            </h1>
            
            <p className="text-gray-500 mb-8 text-lg font-medium leading-relaxed italic">
              "L'important n'est pas de ne jamais tomber, mais de se relever ensemble."
            </p>
            
            <div className="bg-gray-50 p-6 rounded-2xl text-left mb-10 overflow-auto max-h-40 text-xs font-mono text-gray-400 border border-gray-100">
              <span className="font-bold text-guinea-red uppercase mb-2 block">Détails techniques :</span>
              {this.state.error?.message || "Erreur inconnue de rendu React"}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center justify-center gap-3 px-8 py-4 bg-earth-black text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-guinea-red transition-all shadow-lg"
              >
                <RefreshCcw className="h-4 w-4" /> Recharger la page
              </button>
              
              <button 
                onClick={() => window.location.href = '/'} 
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-earth-black border-2 border-earth-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-gray-50 transition-all"
              >
                <Home className="h-4 w-4" /> Retour Accueil
              </button>
            </div>
          </div>
          
          {/* Filigrane décoratif */}
          <div className="absolute -bottom-20 -right-20 opacity-5 pointer-events-none">
            <ShieldAlert className="h-96 w-96 text-guinea-red" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GlobalErrorBoundary>
        <App />
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error("Élément #root introuvable. L'application BALLAL n'a pas pu démarrer.");
}