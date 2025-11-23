
import React from 'react';
import { Shield, HeartPulse, Scale, AlertTriangle, Phone, Gavel, Siren, Eye, FileWarning, Users, BookOpen, Home, Camera } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface LegalAidSectionProps {
  language?: LanguageCode;
}

const LegalAidSection: React.FC<LegalAidSectionProps> = ({ language = 'fr' }) => {
  const t = translations[language];

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* HEADER ACTIVISTE */}
      <div className="bg-slate-900 text-white py-12 relative overflow-hidden border-b-8 border-[#CE1126]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#CE1126] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-[#CE1126] rounded-full mb-6 shadow-lg animate-pulse">
                <Shield className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                Vos Droits sont vos Armes
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
                En collaboration (spirituelle) avec la <span className="text-white font-bold">Ligue des Droits Humains</span> et le <span className="text-white font-bold">CIRÉ</span>.
                <br/>Ici, on ne demande pas. On exige le respect des droits fondamentaux.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        
        {/* LA FLASH CARD - À SCREENSHOTER */}
        <div className="mb-16 transform md:-rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-gray-900 relative max-w-2xl mx-auto">
                <div className="bg-[#CE1126] text-white p-4 text-center font-black uppercase tracking-widest flex items-center justify-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Capturez cet écran • Montrez ceci à la Police
                </div>
                <div className="p-8 md:p-12 text-center space-y-6">
                    <h3 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                        "JE NE DÉCLARE RIEN.<br/>
                        JE NE SIGNE RIEN.<br/>
                        JE VEUX MON AVOCAT."
                    </h3>
                    <div className="w-full h-1 bg-gray-200 my-4"></div>
                    <p className="text-gray-500 font-bold text-sm uppercase">
                        En cas de contrôle ou d'arrestation
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div>
                            <span className="text-xs text-gray-400 uppercase font-bold">Français</span>
                            <p className="font-bold text-gray-900 leading-tight">Je demande l'assistance d'un avocat pro-deo.</p>
                        </div>
                        <div>
                            <span className="text-xs text-gray-400 uppercase font-bold">English</span>
                            <p className="font-bold text-gray-900 leading-tight">I ask for a free lawyer. I remain silent.</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-900 text-white p-3 text-center text-xs font-mono">
                    Article 47bis du Code d'instruction criminelle belge
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* 9bis vs 9ter - CLARIFICATION */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-blue-600 overflow-hidden group hover:shadow-lg transition-all">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <Scale className="h-8 w-8 text-blue-600 mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">La Régularisation</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <p className="text-gray-700 font-medium">
                            Ne confondez pas les procédures. Chaque dossier est unique.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-200 pl-4">
                                <h4 className="font-bold text-blue-900 text-lg">9bis (Humanitaire)</h4>
                                <p className="text-sm text-gray-600">
                                    Pour des circonstances exceptionnelles (long séjour, attaches sociales, scolarité des enfants).
                                    <br/><span className="font-bold text-red-600">Attention :</span> Il faut une carte d'identité nationale valide.
                                </p>
                            </div>
                            <div className="border-l-4 border-blue-200 pl-4">
                                <h4 className="font-bold text-blue-900 text-lg">9ter (Médical)</h4>
                                <p className="text-sm text-gray-600">
                                    Si vous êtes trop malade pour être soigné en Guinée. Le seuil de gravité exigé est très élevé.
                                </p>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 font-bold flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                            N'introduisez jamais une demande sans l'avis d'un avocat spécialisé ou d'une association (ADDE, CIRE).
                        </div>
                    </div>
                </div>
            </div>

            {/* L'ÉCOLE - SANCTUAIRE */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-[#FCD116] overflow-hidden group hover:shadow-lg transition-all">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <BookOpen className="h-8 w-8 text-yellow-500 mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">L'École est un Droit</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <p className="font-bold text-gray-900 mb-2">Aucun papier n'est requis pour inscrire un enfant.</p>
                            <p className="text-sm text-gray-700">
                                L'école est obligatoire et gratuite pour tous les mineurs, <strong>même sans papiers</strong>.
                            </p>
                        </div>

                        <ul className="text-sm space-y-3 text-gray-600">
                            <li className="flex items-start">
                                <CheckShieldIcon className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span>L'école ne dénonce JAMAIS les parents. C'est un sanctuaire.</span>
                            </li>
                            <li className="flex items-start">
                                <CheckShieldIcon className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                <span>La scolarité d'un enfant est une preuve d'intégration majeure pour une future régularisation (9bis).</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bg-[#FCD116] px-6 py-3 text-black font-bold text-sm flex justify-between items-center">
                    <span>Protégez l'avenir de vos enfants.</span>
                </div>
            </div>

            {/* SANTÉ & AMU - LE PIÈGE À ÉVITER */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-[#009460] overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <HeartPulse className="h-8 w-8 text-[#009460] mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">Santé (AMU)</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            L'Aide Médicale Urgente (AMU) est un droit, pas une faveur. Elle couvre les soins préventifs et curatifs (pas juste "l'urgence" vitale).
                        </p>
                        
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <h4 className="font-bold text-green-800 mb-1">La procédure exacte :</h4>
                            <ol className="list-decimal list-inside text-sm text-green-800 space-y-1">
                                <li>Allez au CPAS de la commune où vous habitez (fictivement).</li>
                                <li>Demandez une enquête sociale pour l'AMU.</li>
                                <li>Le CPAS <strong>vérifie que vous êtes indigent</strong> (sans ressources) et en séjour illégal.</li>
                            </ol>
                        </div>
                        
                        <p className="text-xs text-red-500 font-bold italic mt-2">
                            * Le médecin est tenu au secret professionnel absolu. Il ne parle pas à la police.
                        </p>
                    </div>
                </div>
            </div>

            {/* LOGEMENT & DOMICILE */}
            <div className="bg-white rounded-xl shadow-md border-l-8 border-slate-800 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <Home className="h-8 w-8 text-slate-800 mr-3" />
                        <h3 className="text-2xl font-black text-gray-900">Votre Domicile</h3>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-100 rounded-lg border border-slate-200">
                            <p className="font-bold text-slate-900 text-lg mb-2">"Avez-vous un mandat ?"</p>
                            <p className="text-sm text-slate-700">
                                La police ne peut pas entrer chez vous (même en séjour illégal) sans un mandat signé par un <strong>Juge d'Instruction</strong>. Un ordre de l'Office des Étrangers ne suffit pas pour forcer la porte.
                            </p>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-2">
                            Si la police frappe : ne parlez pas, n'ouvrez pas, demandez le mandat à travers la porte.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* ALLIÉS & EXPERTS */}
        <div className="bg-slate-800 rounded-xl p-8 text-slate-200">
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Les Alliés Stratégiques</h3>
                <p className="text-slate-400">Ne faites jamais confiance aux rumeurs. Faites confiance aux experts.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                <a href="https://www.cire.be/" target="_blank" rel="noreferrer" className="bg-slate-700 p-5 rounded hover:bg-red-900 transition-colors border border-slate-600 hover:border-red-500 group">
                    <h4 className="font-bold text-white text-lg group-hover:text-red-100">CIRÉ</h4>
                    <p className="text-xs mt-2 text-slate-300">Coordination et Initiatives pour Réfugiés et Étrangers. La référence politique et juridique.</p>
                </a>
                <a href="https://www.adde.be/" target="_blank" rel="noreferrer" className="bg-slate-700 p-5 rounded hover:bg-blue-900 transition-colors border border-slate-600 hover:border-blue-500 group">
                    <h4 className="font-bold text-white text-lg group-hover:text-blue-100">ADDE</h4>
                    <p className="text-xs mt-2 text-slate-300">Association pour le Droit des Étrangers. Fiches juridiques très précises.</p>
                </a>
                <a href="https://www.liguedh.be/" target="_blank" rel="noreferrer" className="bg-slate-700 p-5 rounded hover:bg-[#FCD116] hover:text-black transition-colors border border-slate-600 hover:border-white group">
                    <h4 className="font-bold text-white text-lg group-hover:text-black">Ligue des Droits Humains</h4>
                    <p className="text-xs mt-2 text-slate-300 group-hover:text-black">Surveillance des violences policières et des centres fermés.</p>
                </a>
            </div>

            <div className="mt-8 bg-white/5 border border-white/10 p-4 rounded text-center text-xs text-slate-400">
                <Users className="h-4 w-4 inline mr-2" />
                Rejoignez les comités de soutien aux Sans-Papiers (La Voix des Sans-Papiers, Comité des Femmes...). L'union fait la force politique.
            </div>
        </div>

      </div>
    </div>
  );
};

// Petite icone helper pour éviter la redondance
const CheckShieldIcon = ({className}: {className: string}) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default LegalAidSection;
