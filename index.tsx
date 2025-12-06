import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// Fonction de gestion d'erreurs globale
const setupErrorHandling = () => {
  // Gestion des erreurs non capturées
  window.addEventListener('error', (event) => {
    console.error('Erreur non capturée:', event.error);
    // Ici, vous pourriez envoyer l'erreur à un service de monitoring
    // Ex: Sentry, LogRocket, etc.
  });

  // Gestion des promesses rejetées
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesse rejetée non gérée:', event.reason);
  });

  // Gestion des erreurs React
  const originalConsoleError = console.error;
  console.error = (...args) => {
    // Filtre les avertissements spécifiques à React si nécessaire
    if (typeof args[0] === 'string' && args[0].includes('React')) {
      // Vous pourriez filtrer certains avertissements ici
    }
    originalConsoleError.apply(console, args);
  };
};

// Composant d'écran de chargement
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
    <div className="relative">
      {/* Animation du drapeau guinéen */}
      <div className="flex items-center justify-center mb-8">
        <div className="w-12 h-20 bg-guinea-red animate-pulse rounded-l-lg"></div>
        <div className="w-12 h-20 bg-guinea-yellow animate-pulse"></div>
        <div className="w-12 h-20 bg-guinea-green animate-pulse rounded-r-lg"></div>
      </div>
      
      {/* Spinner de chargement */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-guinea-red/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-guinea-red rounded-full animate-spin"></div>
      </div>
      
      {/* Texte de chargement */}
      <p className="mt-6 text-lg font-poppins font-semibold text-guinea-red animate-pulse text-center">
        BALLAL ASBL
      </p>
      <p className="mt-2 text-sm text-gray-600 text-center">
        Chargement de l'application...
      </p>
    </div>
  </div>
);

// Composant d'erreur de limite (Error Boundary)
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Erreur React capturée:', error, errorInfo);
    // Ici, vous pourriez envoyer l'erreur à un service de monitoring
    // Ex: logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Oups ! Quelque chose s'est mal passé
            </h1>
            <p className="text-gray-600 mb-6">
              Nous rencontrons des difficultés techniques. Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3 px-4 bg-guinea-red text-white font-semibold rounded-lg hover:bg-[#B01020] transition-colors"
              >
                Rafraîchir la page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour à l'accueil
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Si le problème persiste, contactez-nous à{' '}
              <a href="mailto:support@ballal-asbl.org" className="text-guinea-red hover:underline">
                support@ballal-asbl.org
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Composant pour la détection du navigateur
const BrowserCheck = ({ children }: { children: React.ReactNode }) => {
  const [isSupported, setIsSupported] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkBrowserCompatibility = () => {
      const unsupportedFeatures = [];

      // Vérifier les APIs modernes nécessaires
      if (!('Promise' in window)) unsupportedFeatures.push('Promises');
      if (!('fetch' in window)) unsupportedFeatures.push('Fetch API');
      if (!('IntersectionObserver' in window)) unsupportedFeatures.push('Intersection Observer');
      if (!('CSS' in window) || !CSS.supports('display', 'grid')) {
        unsupportedFeatures.push('CSS Grid');
      }

      // Vérifier la version d'Internet Explorer
      // Utilisation d'un check sécurisé sans commentaires conditionnels
      const isIE = !!(document as any).documentMode;
      if (isIE) unsupportedFeatures.push('Internet Explorer');

      setIsSupported(unsupportedFeatures.length === 0);
      setIsLoading(false);
    };

    checkBrowserCompatibility();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-16 bg-guinea-red rounded-l-lg"></div>
              <div className="w-8 h-16 bg-guinea-yellow"></div>
              <div className="w-8 h-16 bg-guinea-green rounded-r-lg"></div>
            </div>
            <h1 className="ml-4 text-2xl font-bold text-gray-900">BALLAL ASBL</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Navigateur non supporté
          </h2>
          
          <p className="text-gray-600 mb-6">
            Votre navigateur ne prend pas en charge certaines fonctionnalités nécessaires au bon fonctionnement de notre application.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Pour une expérience optimale, veuillez utiliser une version récente de :
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <a 
              href="https://www.google.com/chrome/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img src="https://www.google.com/chrome/static/images/chrome-logo.svg" alt="Chrome" className="h-8 w-8 mr-3" />
              <span className="font-medium">Google Chrome</span>
            </a>
            <a 
              href="https://www.mozilla.org/firefox/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/logo.eb1324e44442.svg" alt="Firefox" className="h-8 w-8 mr-3" />
              <span className="font-medium">Mozilla Firefox</span>
            </a>
            <a 
              href="https://www.microsoft.com/edge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Edge" className="h-8 w-8 mr-3" />
              <span className="font-medium">Microsoft Edge</span>
            </a>
            <a 
              href="https://www.apple.com/safari/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" alt="Safari" className="h-8 w-8 mr-3" />
              <span className="font-medium">Apple Safari</span>
            </a>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Après avoir mis à jour votre navigateur,{' '}
            <button 
              onClick={() => window.location.reload()}
              className="text-guinea-red hover:underline font-medium"
            >
              rafraîchissez cette page
            </button>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Configuration de l'application
const AppWrapper = () => {
  const [isAppReady, setIsAppReady] = React.useState(false);

  React.useEffect(() => {
    // Configuration initiale
    setupErrorHandling();
    
    // Simuler un délai de chargement si nécessaire
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <BrowserCheck>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserCheck>
  );
};

// Point d'entrée principal
const initializeApp = () => {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    // Fallback si l'élément root n'existe pas
    const fallbackElement = document.createElement('div');
    fallbackElement.id = 'root';
    document.body.appendChild(fallbackElement);
    return ReactDOM.createRoot(fallbackElement);
  }
  
  return ReactDOM.createRoot(rootElement);
};

// Rendu de l'application
try {
  const root = initializeApp();
  
  root.render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  );
  
  // Notification de succès (pour le développement)
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Application BALLAL ASBL démarrée avec succès');
  }
} catch (error) {
  console.error('❌ Échec du démarrage de l\'application:', error);
  
  // Afficher un message d'erreur à l'utilisateur
  document.body.innerHTML = `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      text-align: center;
    ">
      <div style="max-width: 500px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); padding: 40px; border-radius: 20px;">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px; font-weight: bold;">
          ⚠️ Erreur Critique
        </h1>
        <p style="font-size: 1.1rem; margin-bottom: 30px; line-height: 1.6;">
          Nous sommes désolés, mais l'application BALLAL ASBL n'a pas pu démarrer.
          Veuillez rafraîchir la page ou contacter notre support technique.
        </p>
        <div style="display: flex; gap: 15px; justify-content: center;">
          <button onclick="window.location.reload()" style="
            padding: 12px 24px;
            background: white;
            color: #667eea;
            border: none;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
          " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            🔄 Rafraîchir
          </button>
          <button onclick="window.location.href='/'" style="
            padding: 12px 24px;
            background: transparent;
            color: white;
            border: 2px solid white;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
          " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
            🏠 Accueil
          </button>
        </div>
        <p style="margin-top: 30px; font-size: 0.9rem; opacity: 0.8;">
          Si le problème persiste, contactez : 
          <br>
          <a href="mailto:technical@ballal-asbl.org" style="color: #fff; text-decoration: underline;">
            technical@ballal-asbl.org
          </a>
        </p>
      </div>
    </div>
  `;
}