
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

interface GlobalErrorBoundaryProps {
  children?: React.ReactNode;
}

interface GlobalErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Composant de sécurité global (ErrorBoundary)
// Si une erreur grave survient n'importe où dans l'app, ceci s'affichera à la place d'un écran blanc.
// Fix: Use property initializer for state and ensure generic types are correctly applied to React.Component to fix missing 'props' property error
class GlobalErrorBoundary extends React.Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
  state: GlobalErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erreur critique Ballal App:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFFBF0] p-4 font-sans text-center">
          <div className="max-w-lg bg-white p-8 rounded-2xl shadow-xl border-t-8 border-[#CE1126]">
            <h1 className="text-3xl font-black text-[#CE1126] mb-4">Oups !</h1>
            <p className="text-gray-600 mb-6 text-lg">
              Une petite erreur technique est survenue. L'équipe Ballal a été notifiée.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg text-left mb-6 overflow-auto max-h-32 text-xs font-mono text-gray-500">
              {this.state.error?.toString()}
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 bg-[#009460] text-white font-bold rounded-full hover:bg-green-700 transition-colors shadow-lg"
            >
              Recharger la page
            </button>
          </div>
        </div>
      );
    }

    // Accessing children from this.props now works as inheritance is correctly inferred
    return this.props.children;
  }
}

// Initialisation de l'application
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Impossible de trouver l'élément #root pour démarrer l'application.");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <App />
    </GlobalErrorBoundary>
  </React.StrictMode>
);
