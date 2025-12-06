import React, { useState, useEffect } from 'react';
import { 
  Wheat, Handshake, ShieldCheck, Users, Mail, ArrowRight, 
  ExternalLink, HeartHandshake, Leaf, Truck, Award, Globe,
  Calendar, BarChart, CheckCircle, Target
} from 'lucide-react';
import { LanguageCode, ViewState } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface FoodAutonomySectionProps {
  language: LanguageCode;
  setView?: (view: ViewState) => void;
}

const FoodAutonomySection: React.FC<FoodAutonomySectionProps> = ({ language, setView }) => {
  const t = translations[language] || translations['fr'];
  const [imgError, setImgError] = useState(false);
  const [metrics, setMetrics] = useState({
    foodSaved: 0,
    mealsProvided: 0,
    partners: 0,
    communities: 0
  });

  // Animated counter effect for metrics
  useEffect(() => {
    const targetMetrics = {
      foodSaved: 12500, // kg
      mealsProvided: 25000,
      partners: 47,
      communities: 12
    };

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames
    const stepDuration = duration / steps;

    const animateCounters = () => {
      let currentStep = 0;
      
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setMetrics({
          foodSaved: Math.floor(targetMetrics.foodSaved * progress),
          mealsProvided: Math.floor(targetMetrics.mealsProvided * progress),
          partners: Math.floor(targetMetrics.partners * progress),
          communities: Math.floor(targetMetrics.communities * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Contact links
  const donorContactLink = `mailto:Admin@ballal.be?subject=${encodeURIComponent(t.email_subject_food_donor)}&body=${encodeURIComponent(t.email_body_food_donor)}`;
  const collectiveContactLink = `mailto:Admin@ballal.be?subject=${encodeURIComponent(t.email_subject_food_network)}&body=${encodeURIComponent(t.email_body_food_network)}`;
  const generalContactLink = `mailto:Admin@ballal.be?subject=${encodeURIComponent(t.nav_food_project)}`;

  const benefits = [
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Réduction du gaspillage",
      description: "Valorisation des surplus alimentaires en circuits courts"
    },
    {
      icon: <Handshake className="h-6 w-6" />,
      title: "Solidarité territoriale",
      description: "Renforcement des liens entre acteurs locaux"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Impact environnemental",
      description: "Réduction de l'empreinte carbone alimentaire"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Reconnaissance",
      description: "Certification de votre engagement social"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Identification",
      description: "Repérage des surplus alimentaires chez nos partenaires",
      icon: <Target className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Collecte",
      description: "Logistique optimisée pour la récupération",
      icon: <Truck className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Distribution",
      description: "Redistribution aux collectifs et associations",
      icon: <Users className="h-5 w-5" />
    },
    {
      step: 4,
      title: "Suivi",
      description: "Traçabilité complète et reporting",
      icon: <BarChart className="h-5 w-5" />
    }
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      role="main"
      aria-labelledby="food-autonomy-title"
    >
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-700 text-white py-16 md:py-24 relative overflow-hidden border-b-8 border-[#FCD116]">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
          aria-hidden="true"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div 
            className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-8 backdrop-blur-sm animate-pulse"
            aria-hidden="true"
          >
            <Wheat className="h-12 w-12 text-[#FCD116]" />
          </div>
          
          <h1 
            id="food-autonomy-title"
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6"
          >
            {t.food_title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto font-medium italic mb-12">
            "{t.food_slogan}"
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: metrics.foodSaved, label: "Kg de nourriture sauvés", icon: <Leaf className="h-5 w-5" /> },
              { value: metrics.mealsProvided, label: "Repas distribués", icon: <HeartHandshake className="h-5 w-5" /> },
              { value: metrics.partners, label: "Partenaires engagés", icon: <Handshake className="h-5 w-5" /> },
              { value: metrics.communities, label: "Communautés soutenues", icon: <Users className="h-5 w-5" /> }
            ].map((metric, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {metric.icon}
                  <span className="text-2xl md:text-3xl font-black">{metric.value.toLocaleString()}</span>
                </div>
                <div className="text-sm text-white/80">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 -mt-8 relative z-20">
        
        {/* Introduction */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16 border-t-8 border-[#009460]">
          <div className="flex items-start gap-6 mb-8">
            <div className="h-12 w-2 bg-[#009460] rounded-full" aria-hidden="true" />
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">
                {t.food_intro_title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.food_intro_text}
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                  <div className="text-green-600">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 text-center">
            Notre Processus en 4 Étapes
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 transform -translate-y-1/2" aria-hidden="true" />
            
            <div className="grid md:grid-cols-4 gap-6 md:gap-8">
              {processSteps.map((step, index) => (
                <div 
                  key={step.step}
                  className="relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute -top-3 -left-3 h-8 w-8 bg-[#009460] text-white rounded-full flex items-center justify-center font-black text-sm">
                    {step.step}
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-green-600">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance & Transparency */}
        <section className="bg-gradient-to-r from-slate-900 to-black rounded-3xl p-8 md:p-12 text-white mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-1/3">
              <div className="bg-white/10 p-8 rounded-2xl border border-white/20 backdrop-blur-sm">
                <ShieldCheck className="h-24 w-24 text-[#00C853]" />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-black uppercase tracking-wide">
                  {t.food_compliance_title}
                </h3>
                <span className="bg-[#00C853] text-xs px-3 py-1 rounded-full text-white font-bold tracking-widest">
                  CERTIFIÉ
                </span>
              </div>
              
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {t.food_compliance_text}
              </p>
              
              <div className="space-y-4">
                {[
                  "Traçabilité complète des dons",
                  "Conformité réglementaire stricte",
                  "Rapports d'impact transparents",
                  "Protection des données (RGPD)"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#00C853]" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Action Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          
          {/* Partners Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">{t.food_partners_title}</h3>
                <Handshake className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-8">
                {t.food_partners_text}
              </p>
              
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-900 mb-2">Avantages partenaires</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Réduction des coûts de gestion des surplus</li>
                    <li>• Impact RSE mesurable</li>
                    <li>• Certification de donateur engagé</li>
                  </ul>
                </div>
                
                {setView ? (
                  <button 
                    onClick={() => setView(ViewState.FOOD_SUPPLIER)}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    {t.food_partners_btn}
                  </button>
                ) : (
                  <a 
                    href={donorContactLink}
                    className="w-full inline-flex items-center justify-center bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-colors gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    {t.food_partners_btn}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Collectives Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-red-600 to-rose-600 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-white">{t.food_collectives_title}</h3>
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-8">
                {t.food_collectives_text}
              </p>
              
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-900 mb-2">Services inclus</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Accès aux surplus alimentaires</li>
                    <li>• Support logistique adapté</li>
                    <li>• Formation aux bonnes pratiques</li>
                  </ul>
                </div>
                
                {setView ? (
                  <button 
                    onClick={() => setView(ViewState.FOOD_NETWORK)}
                    className="w-full border-2 border-[#CE1126] text-[#CE1126] font-bold py-4 rounded-xl hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    {t.food_collectives_btn}
                  </button>
                ) : (
                  <a 
                    href={collectiveContactLink}
                    className="w-full inline-flex items-center justify-center border-2 border-[#CE1126] text-[#CE1126] font-bold py-4 rounded-xl hover:bg-red-50 transition-colors gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    {t.food_collectives_btn}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-8 md:p-12 text-center border border-emerald-100">
          <div className="max-w-2xl mx-auto">
            <Calendar className="h-16 w-16 text-[#009460] mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Prêt à faire la différence ?
            </h3>
            <p className="text-gray-600 mb-8">
              Rejoignez notre réseau et contribuez à construire un système alimentaire plus juste et durable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={generalContactLink}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#009460] text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg gap-2"
              >
                Nous contacter <ArrowRight className="h-5 w-5" />
              </a>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#009460] text-[#009460] font-bold rounded-xl hover:bg-green-50 transition-colors gap-2">
                Télécharger la brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodAutonomySection;