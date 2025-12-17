import React, { useState, useEffect } from 'react';
import { 
  Home, Key, Zap, AlertTriangle, Scale, Users, 
  Siren, Eye, Hammer, DoorOpen, Lightbulb, 
  FileText, Download, Mic, X, CheckCircle, 
  Clock, ShieldAlert, ChevronRight, Gavel, 
  HandMetal, Megaphone, Landmark, FileCheck
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface SquatSectionProps {
  language: LanguageCode;
}

// Type pour les infos détaillées (Modal)
interface DetailItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  summary: string;
  fullContent: React.ReactNode; 
  legalRef?: string;
  proTip?: string;
}

const SquatSection: React.FC<SquatSectionProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'manual' | 'legal' | 'network'>('manual');
  const [selectedItem, setSelectedItem] = useState<DetailItem | null>(null);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const t = translations[language] || translations['fr'];

  // --- COMPOSANTS UI DÉCORATIFS PUNK ---
  const DuctTape = ({ className = "", color = "bg-slate-800/80" }) => (
    <div className={`absolute h-8 backdrop-blur-sm -rotate-3 z-20 shadow-sm border-x border-white/10 ${color} ${className}`} style={{ width: '120px' }}></div>
  );

  const SectionTitle = ({ icon, text, accent }: { icon: any, text: string, accent: string }) => (
    <h3 className={`text-2xl md:text-4xl font-black uppercase mb-10 flex items-center gap-4 border-b-8 border-black pb-4 leading-none`}>
      <span className={`p-2 ${accent} text-white border-4 border-black rotate-3`}>{icon}</span> {text}
    </h3>
  );

  // --- SOS OVERLAY ---
  const EmergencyOverlay = () => {
    if (!emergencyMode) return null;
    return (
      <div className="fixed inset-0 z-[200] bg-black text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-200">
        <button onClick={() => setEmergencyMode(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
          <X className="h-12 w-12" />
        </button>
        
        <Siren className="h-24 w-24 text-[#CE1126] animate-[pulse_0.5s_ease-in-out_infinite] mb-8" />
        
        <h2 className="text-5xl md:text-8xl font-black uppercase text-center mb-10 tracking-tighter text-[#CE1126] drop-shadow-[0_0_20px_rgba(206,17,38,0.8)]">
          NE PAS OUVRIR
        </h2>

        <div className="bg-white text-black p-8 md:p-12 max-w-3xl w-full font-mono text-xl md:text-3xl font-black leading-tight border-l-[16px] border-[#FCD116] shadow-[20px_20px_0_0_rgba(206,17,38,1)]">
          "Bonjour. <br/><br/>
          Ceci est notre domicile privé. <br/>
          Nous y habitons effectivement.<br/>
          Nous refusons l'entrée.<br/><br/>
          Avez-vous un mandat signé d'un juge d'instruction ?"
        </div>

        <p className="mt-12 text-gray-400 font-black uppercase text-sm tracking-widest animate-pulse text-center">
          GARDEZ LA PORTE FERMÉE. FILMEZ TOUTE L'INTERVENTION DEPUIS L'INTÉRIEUR.
        </p>
      </div>
    );
  };

  // --- DATA CONTENU ---

  const manualItems: DetailItem[] = [
    {
      id: 'reperage',
      title: "1. L'ENQUÊTE (Repérage)",
      icon: <Eye className="h-6 w-6" />,
      summary: "Ne jamais brûler une adresse. Identifier le propriétaire est la priorité absolue.",
      proTip: "Utilisez l'appli 'Who Owns Brussels' ou le site CADGIS (Cadastre) pour savoir si c'est Public ou Privé.",
      fullContent: (
        <div className="space-y-4">
          <p>Le succès d'un squat dépend à 80% du repérage. Un bâtiment public est souvent plus facile à négocier politiquement.</p>
          <ul className="list-disc pl-4 space-y-2 font-bold uppercase text-sm">
            <li><span className="text-[#CE1126]">Signes d'abandon :</span> Boîtes aux lettres pleines, pas de rideaux, jardin en friche.</li>
            <li><span className="text-[#CE1126]">L'Astuce du Voisin :</span> Dites que vous cherchez un appart. Ils vous diront tout sur le proprio.</li>
            <li><span className="text-[#CE1126]">Le test du scotch :</span> Mettez un bout de scotch invisible sur la fente. S'il est intact après 3 jours, personne n'est entré.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'ouverture',
      title: "2. L'OUVERTURE & SERRURE",
      icon: <Key className="h-6 w-6" />,
      summary: "Entrer sans effraction visible. Changer le barillet est l'acte fondateur juridique.",
      legalRef: "Art. 15 Constitution (Inviolabilité du domicile)",
      fullContent: (
        <div className="space-y-4">
          <p>C'est le moment critique. Si la police arrive pendant l'entrée, c'est le <strong>flagrant délit</strong>.</p>
          <div className="bg-slate-900 text-white p-6 border-l-8 border-[#CE1126]">
            <h5 className="font-black underline mb-2 uppercase text-[#FCD116]">LA RÈGLE D'OR :</h5>
            <p className="font-bold">Une fois dedans, la PREMIÈRE chose à faire est de remplacer le barillet. Gardez l'ancien.</p>
            <p className="mt-2 text-sm">Si la clé du proprio ne rentre plus, la police ne peut plus entrer sans mandat.</p>
          </div>
        </div>
      )
    },
    {
      id: 'utilities',
      title: "3. EAU & ÉLECTRICITÉ",
      icon: <Zap className="h-6 w-6" />,
      summary: "Ouvrir un compteur sans bail est possible en Belgique. C'est vital pour prouver le domicile.",
      proTip: "Prenez en photo les index des compteurs DÈS l'entrée ! Preuve de votre bonne foi.",
      fullContent: (
        <div className="space-y-4">
          <p>Appelez Sibelga (Gaz/Elec) et Vivaqua (Eau). Dites : "Je viens d'emménager, je veux reprendre les compteurs".</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Ils demandent rarement le bail immédiatement. Ils veulent être payés.</li>
            <li>Si les compteurs sont scellés, NE LES BRISEZ PAS (délit pénal).</li>
            <li>Passez par le CPAS pour demander le statut de "Client Protégé".</li>
          </ul>
        </div>
      )
    },
    {
      id: 'domicile',
      title: "4. PREUVE DE VIE",
      icon: <Home className="h-6 w-6" />,
      summary: "Constituer un dossier de preuves pour empêcher l'expulsion administrative.",
      fullContent: (
        <div className="space-y-4">
          <p>La police doit constater que c'est votre <strong>domicile effectif</strong>.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="bg-white border-2 border-black p-3 rotate-1">
               <span className="font-black block text-[#CE1126]">LIVRAISON PIZZA</span>
               <span className="text-xs font-bold">Le ticket avec date/heure et adresse est une preuve juridique.</span>
             </div>
             <div className="bg-white border-2 border-black p-3 -rotate-1">
               <span className="font-black block text-[#009460]">COURRIER RECOMMANDÉ</span>
               <span className="text-xs font-bold">Envoyez-vous une lettre recommandée à cette adresse immédiatement.</span>
             </div>
          </div>
        </div>
      )
    }
  ];

  const legalItems: DetailItem[] = [
    {
      id: 'penal',
      title: "PROCÉDURE PÉNALE",
      icon: <Scale className="h-6 w-6" />,
      summary: "Le danger immédiat : l'expulsion par le Procureur du Roi.",
      legalRef: "Loi Anti-Squat 2017",
      fullContent: (
        <div className="space-y-4">
          <p>C'est la méthode "forte". Si le proprio porte plainte pour "occupation sans titre ni droit", le Procureur peut ordonner l'évacuation rapide (quelques semaines).</p>
          <p className="font-black bg-[#FCD116] p-2 inline-block">DÉFENSE : Prouvez que vous y habitez depuis plus de 48h et que vous n'êtes pas des cambrioleurs.</p>
        </div>
      )
    },
    {
      id: 'civil',
      title: "PROCÉDURE CIVILE",
      icon: <Gavel className="h-6 w-6" />,
      summary: "La voie normale : le Juge de Paix. C'est ici qu'on gagne du temps.",
      fullContent: (
        <div className="space-y-4">
          <p>Le proprio demande une audience. Vous êtes convoqués. Vous pouvez demander des délais (Trêve hivernale, enfants scolarisés, état de santé).</p>
          <p className="font-bold">L'expulsion prend alors plusieurs mois. C'est l'objectif pour stabiliser le logement.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF0] font-sans pb-20 relative overflow-hidden">
      <EmergencyOverlay />
      
      {/* BOUTON SOS PUNK */}
      <button 
        onClick={() => setEmergencyMode(true)}
        className="fixed bottom-8 right-8 z-[150] bg-[#CE1126] text-white p-6 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-110 active:scale-90 transition-all group overflow-hidden"
      >
        <Siren className="h-10 w-10 group-hover:rotate-12 transition-transform" />
        <span className="absolute inset-0 bg-white/20 animate-ping rounded-full pointer-events-none"></span>
      </button>

      {/* HEADER ZINE PUNK */}
      <div className="relative bg-slate-900 text-white pt-24 pb-20 border-b-[12px] border-black">
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-block bg-[#CE1126] text-white font-black text-2xl uppercase px-6 py-2 -rotate-2 mb-8 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            UNITÉ & RÉSISTANCE
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-10">
            <span className="block text-[#FCD116] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">OCCUPER</span>
            <span className="block -mt-4 drop-shadow-[6px_6px_0px_rgba(206,17,38,1)]">POUR VIVRE</span>
          </h1>
          
          <div className="max-w-3xl border-l-[12px] border-[#009460] pl-8 py-4 backdrop-blur-sm bg-white/5">
            <p className="text-2xl md:text-4xl font-black italic leading-tight uppercase">
              "Le logement est un droit, <br/> pas une marchandise."
            </p>
            <p className="mt-4 text-gray-400 font-bold uppercase tracking-widest text-sm">
              Guide technique pour les occupants et les collectifs solidaires.
            </p>
          </div>
        </div>

        {/* TIMELINE VISUALIZER DE DANGER */}
        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="bg-black/50 border-4 border-white/20 p-8 rounded-3xl relative">
            <h4 className="absolute -top-4 left-8 bg-white text-black px-4 py-1 font-black uppercase text-xs border-2 border-black">Statut Légal vs Temps</h4>
            <div className="w-full h-8 bg-gray-800 border-2 border-white/20 rounded-full relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-[#CE1126] animate-pulse"></div>
                <div className="absolute left-1/4 top-0 bottom-0 w-1/4 bg-gradient-to-r from-[#CE1126] to-[#FCD116]"></div>
                <div className="absolute left-2/4 top-0 bottom-0 w-1/2 bg-[#009460]"></div>
            </div>
            <div className="flex justify-between mt-4 text-[10px] md:text-xs font-black uppercase tracking-tighter">
                <div className="text-[#CE1126] max-w-[80px]">0-48H: FLAGRANT DÉLIT</div>
                <div className="text-[#FCD116] text-center px-4">ZONE GRISE: CONSTITUTION DU DOMICILE</div>
                <div className="text-[#009460] text-right max-w-[80px]">+72H: DOMICILE EFFECTIF</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
        
        {/* TABS STYLE 'FOLDER' */}
        <div className="flex flex-wrap gap-4 mb-16 justify-center lg:justify-start">
            <button 
                onClick={() => setActiveTab('manual')}
                className={`py-5 px-10 font-black uppercase tracking-widest text-lg transition-all border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${activeTab === 'manual' ? 'bg-black text-white -rotate-1' : 'bg-white text-black hover:bg-gray-100 rotate-1'}`}
            >
                1. PRATIQUE
            </button>
            <button 
                onClick={() => setActiveTab('legal')}
                className={`py-5 px-10 font-black uppercase tracking-widest text-lg transition-all border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${activeTab === 'legal' ? 'bg-[#FCD116] text-black rotate-2' : 'bg-white text-black hover:bg-gray-100 -rotate-1'}`}
            >
                2. DROIT & LOI
            </button>
            <button 
                onClick={() => setActiveTab('network')}
                className={`py-5 px-10 font-black uppercase tracking-widest text-lg transition-all border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${activeTab === 'network' ? 'bg-[#009460] text-white -rotate-2' : 'bg-white text-black hover:bg-gray-100 rotate-1'}`}
            >
                3. RÉSEAU
            </button>
        </div>

        {/* ZONE DE CONTENU */}
        <div className="bg-white border-4 border-black p-6 md:p-12 min-h-[600px] relative shadow-[16px_16px_0px_0px_rgba(0,0,0,0.1)] mb-20">
            <DuctTape className="-top-4 right-10 rotate-12 bg-slate-400" />
            
            {activeTab === 'manual' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <SectionTitle icon={<Hammer className="h-10 w-10" />} text="Manuel de l'Occupant" accent="bg-[#CE1126]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {manualItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="group text-left bg-[#FFFBF0] border-4 border-black p-8 hover:bg-[#FCD116] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 relative"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-black text-white p-3 rounded-full group-hover:bg-[#CE1126] transition-colors border-2 border-black">
                          {item.icon}
                        </div>
                        <span className="bg-black text-white text-[10px] font-black px-3 py-1 uppercase opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">
                          Lire le dossier +
                        </span>
                      </div>
                      <h4 className="font-black text-2xl uppercase mb-3 leading-tight">{item.title}</h4>
                      <p className="font-bold text-sm text-gray-600 group-hover:text-black">
                        {item.summary}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'legal' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <SectionTitle icon={<Scale className="h-10 w-10" />} text="Justice & Procédures" accent="bg-[#009460]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {legalItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className="group text-left bg-[#FFFBF0] border-4 border-black p-8 hover:bg-[#009460] hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                    >
                      <h4 className="font-black text-2xl uppercase mb-4 flex items-center gap-4">
                        <span className="p-2 bg-black text-white rounded-lg group-hover:bg-white group-hover:text-[#009460] transition-colors">{item.icon}</span>
                        {item.title}
                      </h4>
                      <p className="font-bold text-sm opacity-80 mb-6">{item.summary}</p>
                      <div className="inline-flex items-center gap-2 text-xs font-black uppercase border-2 border-current px-4 py-2">
                        <FileCheck className="h-4 w-4" /> Détails juridiques
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-16 bg-slate-900 text-white p-10 border-l-[20px] border-[#FCD116]">
                   <h4 className="font-black text-3xl uppercase mb-6 flex items-center gap-4">
                     <Landmark className="h-8 w-8 text-[#FCD116]" /> Constitution Belge : Art. 23
                   </h4>
                   <p className="italic font-serif text-2xl md:text-3xl leading-tight text-gray-200">
                     "Chacun a le droit de mener une vie conforme à la dignité humaine... notamment le droit à un logement décent."
                   </p>
                   <p className="text-xs font-black mt-8 text-gray-500 uppercase tracking-[0.3em]">C'est votre base morale suprême. Affichez-le en grand sur la porte.</p>
                </div>
              </div>
            )}

            {activeTab === 'network' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <SectionTitle icon={<Users className="h-10 w-10" />} text="Le Réseau Solidaire" accent="bg-[#FCD116]" />
                <div className="space-y-12">
                  <div className="bg-[#CE1126] text-white p-10 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                        <HandMetal className="h-48 w-48" />
                     </div>
                     <h4 className="text-4xl font-black uppercase mb-6 tracking-tighter">ASBL BALLAL : LE BOUCLIER</h4>
                     <p className="font-bold text-xl mb-8 max-w-2xl">La structure de soutien technique et logistique pour les collectifs d'occupation.</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        <ul className="text-base space-y-3 font-mono bg-black/30 p-6 border-2 border-white/20">
                           <li>[+] Aide juridique (Pro-Deo)</li>
                           <li>[+] Colis alimentaires d'urgence</li>
                        </ul>
                        <ul className="text-base space-y-3 font-mono bg-black/30 p-6 border-2 border-white/20">
                           <li>[+] Médiation propriétaires</li>
                           <li>[+] Visibilité médiatique</li>
                        </ul>
                     </div>
                     <a href="mailto:admin@ballal.be" className="inline-flex items-center gap-4 bg-white text-black px-10 py-5 font-black uppercase text-lg tracking-widest hover:bg-[#FCD116] transition-colors shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        Demander un soutien <ChevronRight className="h-6 w-6" />
                     </a>
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* FOOTER MANIFESTE */}
        <div className="mt-20 border-t-[10px] border-black pt-16 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-shrink-0 group relative">
                <div className="w-48 h-48 bg-black text-[#FCD116] border-8 border-[#CE1126] flex items-center justify-center font-black text-6xl transform rotate-6 group-hover:rotate-0 transition-transform cursor-crosshair">
                   BLL
                </div>
            </div>
            <div className="flex-grow">
                <h3 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none tracking-tighter">AGIR LÀ OÙ <br/><span className="text-[#CE1126]">L'ÉTAT ÉCHOUE</span></h3>
                <p className="text-xl md:text-2xl font-bold text-slate-700 leading-tight max-w-4xl uppercase italic">
                  Nous fournissons les armes juridiques et le soutien humain aux collectifs qui osent briser le froid pour sauver des vies.
                </p>
                <div className="mt-10 flex flex-wrap gap-6">
                  <div className="bg-black h-4 w-24"></div>
                  <div className="bg-[#CE1126] h-4 w-24"></div>
                  <div className="bg-[#FCD116] h-4 w-24"></div>
                  <div className="bg-[#009460] h-4 w-24"></div>
                </div>
            </div>
        </div>
      </div>

      {/* MODALE DE DÉTAIL */}
      {selectedItem && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#FFFBF0] w-full max-w-2xl max-h-[90vh] overflow-y-auto border-8 border-black shadow-[20px_20px_0px_0px_rgba(206,17,38,1)] relative">
            <div className="sticky top-0 bg-slate-900 text-white p-6 border-b-8 border-black flex justify-between items-center z-10">
               <h3 className="text-xl font-black uppercase flex items-center gap-3">
                  {selectedItem.icon} {selectedItem.title}
               </h3>
               <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors border-2 border-white/20">
                  <X className="h-8 w-8" />
               </button>
            </div>
            <div className="p-8">
               {selectedItem.legalRef && (
                 <div className="mb-8 inline-block bg-slate-200 px-4 py-2 text-xs font-mono font-black border-4 border-black uppercase tracking-widest">
                   RÉFÉRENCE LÉGALE : {selectedItem.legalRef}
                 </div>
               )}
               <div className="text-gray-800 font-bold text-lg md:text-xl leading-relaxed font-serif italic mb-10">
                 {selectedItem.fullContent}
               </div>
               {selectedItem.proTip && (
                 <div className="mt-12 bg-[#FCD116] p-6 border-8 border-black rotate-1 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                   <h5 className="font-black text-xl uppercase mb-3 flex items-center gap-3">
                     <Lightbulb className="h-6 w-6" /> CONSEIL MILITANT
                   </h5>
                   <p className="font-bold text-base leading-tight text-slate-900 uppercase tracking-tight">{selectedItem.proTip}</p>
                 </div>
               )}
            </div>
            <div className="p-6 bg-gray-100 border-t-8 border-black text-center">
               <button onClick={() => setSelectedItem(null)} className="font-black uppercase text-sm tracking-[0.3em] underline hover:text-[#CE1126] transition-colors">
                 FERMER LE DOSSIER
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquatSection;