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
    console.error("Critical Error detected in BALLAL App:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F6] p-6 text-center relative overflow-hidden font-sans">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#CE1126]"></div>
          <div className="absolute top-2 left-0 w-full h-2 bg-[#FCD116]"></div>
          <div className="absolute top-4 left-0 w-full h-2 bg-[#009460]"></div>
          
          <div className="max-w-xl w-full bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-gray-100 relative z-10">
            <div className="inline-flex p-5 bg-red-50 rounded-3xl mb-8">
              <ShieldAlert className="h-12 w-12 text-[#CE1126]" />
            </div>
            
            <h1 className="text-4xl font-serif font-black text-[#333333] mb-4 tracking-tight">
              Oups, une erreur...
            </h1>
            
            <p className="text-gray-500 mb-8 font-medium">
              L'application a rencontré un problème technique lors du chargement.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-2xl text-left mb-10 overflow-auto max-h-40 text-xs font-mono text-gray-400 border border-gray-100">
              {this.state.error?.message || "Erreur de rendu inconnue"}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()} 
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#333333] text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-[#CE1126] transition-all shadow-lg"
              >
                <RefreshCcw className="h-4 w-4" /> Recharger le site
              </button>
              
              <button 
                onClick={() => window.location.href = '/'} 
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#333333] border-2 border-[#333333] font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-gray-50 transition-all"
              >
                <Home className="h-4 w-4" /> Accueil
              </button>
            </div>
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
  console.error("FATAL ERROR: #root element not found in DOM.");
}