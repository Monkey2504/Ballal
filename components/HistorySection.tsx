import React from 'react';
import { BookOpen, Clock, ArrowDown, Star } from 'lucide-react';

const HistorySection: React.FC = () => {
  const timelineEvents = [
    {
      year: '1958',
      title: 'La Dignité et l\'Indépendance',
      description: 'Le 28 septembre, la Guinée dit "NON" au Général de Gaulle. Le 2 octobre, l\'indépendance est proclamée sous Ahmed Sékou Touré. Une fierté nationale qui marque l\'identité de chaque Guinéen, même en exil.',
      side: 'left',
      icon: '🇬🇳'
    },
    {
      year: '1960-1980',
      title: 'Premiers Liens Académiques',
      description: 'Bien que la Guinée se soit tournée vers l\'Est, des étudiants guinéens commencent à arriver en Belgique (ULB, UCL, Liège) pour des formations en médecine et ingénierie. Ils forment le noyau intellectuel de la diaspora.',
      side: 'right',
      icon: '🎓'
    },
    {
      year: 'Années 1990',
      title: 'L\'Exil Politique et Économique',
      description: 'L\'instabilité politique pousse de nombreux Guinéens à chercher refuge. La Belgique devient une terre d\'accueil majeure. Le quartier Matonge à Bruxelles commence à voir fleurir les commerces guinéens.',
      side: 'left',
      icon: '✈️'
    },
    {
      year: '2000-2010',
      title: '3ème Communauté Africaine',
      description: 'La communauté guinéenne grandit pour devenir la 3ème plus grande communauté subsaharienne de Belgique (après la RDC et le Rwanda). Création de nombreuses ASBL culturelles et sportives.',
      side: 'right',
      icon: '🏘️'
    },
    {
      year: '2024',
      title: 'Une Force Vive',
      description: 'Aujourd\'hui, les Belgo-Guinéens sont entrepreneurs, médecins, ouvriers, artistes. Ils contribuent à l\'économie belge tout en soutenant massivement le pays via les transferts de fonds.',
      side: 'left',
      icon: '🤝'
    }
  ];

  return (
    <div className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-center mb-4">
             <BookOpen className="h-12 w-12 text-red-600" />
          </div>
          {/* H1 SEO Optimization */}
          <h1 className="text-4xl font-extrabold text-gray-900">Notre Histoire : De Conakry à Bruxelles</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            L'histoire de la <span className="font-bold text-red-600">3ème communauté africaine de Belgique</span>. 
            Un parcours fait de courage, d'études, de travail et de solidarité.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-500 via-yellow-400 to-green-600 hidden md:block opacity-80"></div>

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="w-full md:w-5/12 mb-4 md:mb-0">
                  <div className={`bg-white p-6 rounded-xl shadow-md border-t-4 ${index % 2 === 0 ? 'border-red-500' : 'border-green-600'} hover:shadow-lg transition-all hover:-translate-y-1`}>
                    <div className="flex items-center mb-3 justify-between">
                        <div className="flex items-center">
                             <Clock className="h-4 w-4 text-gray-400 mr-2" />
                             <span className="font-black text-2xl text-gray-800">{event.year}</span>
                        </div>
                        <span className="text-2xl">{event.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">{event.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Center Dot (Desktop only) */}
                <div className="hidden md:flex items-center justify-center w-2/12 relative z-10">
                  <div className="h-10 w-10 rounded-full bg-white border-4 border-yellow-400 shadow-md flex items-center justify-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </div>

                 {/* Spacer Side (Desktop only) */}
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </div>
            ))}
          </div>
            
          <div className="text-center mt-20 bg-green-50 p-8 rounded-xl border border-green-100 shadow-sm">
            <h3 className="text-2xl font-bold text-green-800 mb-4">Saviez-vous ?</h3>
            <p className="text-gray-700 text-lg">
                Plus de <span className="font-bold">25.000</span> personnes d'origine guinéenne vivent officiellement en Belgique, sans compter les nombreux binationaux et les sans-papiers que nous soutenons au quotidien.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HistorySection;