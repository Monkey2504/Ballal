
import React, { useState } from 'react';
import { 
  Home, Key, Zap, ShieldCheck, Scale, Users, 
  Siren, Eye, Hammer, DoorOpen, Lightbulb, 
  Download, Mic, X, CheckCircle, 
  Gavel, Heart, Info, ChevronRight, BookOpen
} from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface SquatSectionProps {
  language: LanguageCode;
}

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

  // --- SOS OVERLAY (Version Adoucie mais Ferme) ---
  const EmergencyOverlay = () => {
    if (!emergencyMode) return null;
    return (
      <div className="fixed inset-0 z-[200] bg-earth-black/95 backdrop-blur-md text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
        <button onClick={() => setEmergencyMode(false)} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors">
          <X className="h-10 w-10" />
        </button>
        
        <div className="bg-white text-earth-black p-8 md:p-12 max-w-2xl w-full rounded-[2rem] shadow-2xl border-t-[12px] border-terracotta">
          <div className="flex items-center gap-4 mb-8 text-terracotta">
            <ShieldCheck className="h-12 w-12" />
            <h2 className="text-3xl font-serif font-black uppercase tracking-tight">Protocole de Sécurité</h2>
          </div>

          <div className="font-sans text-xl md:text-2xl font-bold leading-relaxed space-y-6">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-2 font-black">Script à lire à travers la porte :</p>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 italic">
              "Bonjour. Ceci est notre domicile privé. Nous y habitons effectivement et nous refusons l'entrée. Avez-vous un mandat signé d'un juge d'instruction ?"
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-earth-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3">
              <Mic className="h-5 w-5" /> Enregistrer l'audio
            </button>
            <button className="bg-terracotta text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3">
              <Siren className="h-5 w-5" /> Alerte réseau
            </button>
          </div>
        </div>
        
        <p className="mt-8 text-gray-400 font-medium text-center max-w-md">
          Restez calme. Ne déverrouillez pas la porte. Filmez avec votre téléphone.
        </p>
      </div>
    );
  };

  const manualItems: DetailItem[] = [
    {
      id: 'reperage',
      title: "Choisir un lieu adapté",
      icon: <Eye className="h-6 w-6 text-warm-gold" />,
      summary: "Identifier un bâtiment vide avec éthique et précision.",
      fullContent: (
        <div className="space-y-4">
          <p>Le choix du bâtiment est déterminant pour la pérennité de l'occupation. Nous privilégions les bâtiments publics ou appartenant à des sociétés immobilières majeures.</p>
          <ul className="space-y-3">
            <li className="flex gap-3 items-start"><CheckCircle className="h-5 w-5 text-warm-green shrink-0" /> Vérifiez le cadastre (CADGIS) pour confirmer le propriétaire.</li>
            <li className="flex gap-3 items-start"><CheckCircle className="h-5 w-5 text-warm-green shrink-0" /> Observez les signes de vacance prolongée (courrier, compteurs).</li>
          </ul>
        </div>
      )
    },
    {
      id: 'domicile',
      title: "Établir le domicile",
      icon: <Home className="h-6 w-6 text-warm-green" />,
      summary: "Comment transformer techniquement un bâtiment en foyer légal.",
      legalRef: "Art. 15 Constitution Belge",
      fullContent: (
        <div className="space-y-4">
          <p>Dès l'entrée, le lieu devient votre domicile. Pour le protéger juridiquement, deux actions sont immédiates :</p>
          <div className="bg-warm-green/5 p-6 rounded-2xl border border-warm-green/10">
            <p className="font-bold text-warm-green">1. Remplacer le barillet :</p>
            <p className="text-sm">Cela prouve votre contrôle exclusif sur les lieux.</p>
            <p className="font-bold text-warm-green mt-4">2. Créer des preuves de vie :</p>
            <p className="text-sm">Commandez un repas, envoyez-vous un recommandé, invitez un voisin.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <EmergencyOverlay />
      
      {/* BOUTON SOS ÉLÉGANT */}
      <button 
        onClick={() => setEmergencyMode(true)}
        className="fixed bottom-8 right-8 z-[150] bg-terracotta text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all group"
        title="Besoin d'aide immédiate ?"
      >
        <ShieldCheck className="h-8 w-8" />
        <span className="absolute -top-12 right-0 bg-earth-black text-white text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-bold">MODE PROTECTION</span>
      </button>

      {/* HEADER DOUX */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-earth-black">
            Habitat <span className="text-warm-green italic">Solidaire</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Le logement est un droit fondamental. Nous accompagnons les collectifs pour assurer une occupation digne, stable et respectueuse.
          </p>
          
          {/* Indicateur de Statut */}
          <div className="inline-flex flex-col items-center gap-2 pt-8">
            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden flex">
              <div className="w-1/3 bg-terracotta"></div>
              <div className="w-1/3 bg-warm-gold"></div>
              <div className="w-1/3 bg-warm-green"></div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Progression de la sécurité juridique</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* TABS ÉLÉGANTS */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
            {[
                { id: 'manual', label: 'Guide Pratique', icon: BookOpen },
                { id: 'legal', label: 'Droits & Loi', icon: Scale },
                { id: 'network', label: 'Notre Soutien', icon: Heart }
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id ? 'bg-earth-black text-white shadow-xl' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
                >
                    <tab.icon className="h-5 w-5" />
                    {tab.label}
                </button>
            ))}
        </div>

        {/* CONTENU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {activeTab === 'manual' && manualItems.map(item => (
                <div 
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="bg-white p-8 rounded-[2rem] border border-gray-100 soft-shadow cursor-pointer hover:border-warm-green/20 transition-all group"
                >
                    <div className="mb-6 flex justify-between items-start">
                        <div className="p-4 rounded-2xl bg-gray-50 group-hover:bg-warm-green/10 transition-colors">
                            {item.icon}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-warm-green" />
                    </div>
                    <h3 className="text-2xl font-serif font-black mb-3">{item.title}</h3>
                    <p className="text-gray-500 font-medium leading-relaxed">{item.summary}</p>
                </div>
            ))}

            {activeTab === 'legal' && (
                <div className="md:col-span-2 bg-white p-10 rounded-[2.5rem] border border-gray-100 soft-shadow">
                    <div className="flex items-center gap-4 mb-8">
                        <Scale className="h-10 w-10 text-terracotta" />
                        <h3 className="text-3xl font-serif font-black">Comprendre le Droit Belge</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center text-sm">1</span>
                                Protection du Domicile
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                En Belgique, le domicile est inviolable. Même sans bail, dès lors que vous vivez dans un lieu, nul ne peut y entrer sans votre accord ou mandat d'un juge.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-bold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-warm-green/10 text-warm-green flex items-center justify-center text-sm">2</span>
                                Procédure de Paix
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                                Le propriétaire doit passer par le Juge de Paix pour demander votre départ. Cela vous permet de demander des délais pour vous reloger dignement.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'network' && (
                <div className="md:col-span-2 bg-warm-green text-white p-10 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <Heart className="h-64 w-64 fill-white" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-4xl md:text-5xl font-serif font-black mb-6">L'ASBL Ballal à vos côtés</h3>
                        <p className="text-xl text-white/80 font-medium mb-10 leading-relaxed">
                            Nous ne nous contentons pas de donner des conseils. Nous agissons comme médiateurs entre les collectifs et les autorités pour assurer une vie sereine.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 font-bold text-sm">Aide Juridique Pro-Deo</div>
                            <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 font-bold text-sm">Logistique & Énergie</div>
                            <div className="px-6 py-3 rounded-full bg-white/10 border border-white/20 font-bold text-sm">Médiation de Voisinage</div>
                        </div>
                        <button className="mt-12 bg-white text-warm-green px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl">
                            Demander un accompagnement
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* MODALE DÉTAIL DANS LE MÊME STYLE */}
      {selectedItem && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-earth-black/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
               <h3 className="text-2xl font-serif font-black flex items-center gap-3">
                  {selectedItem.icon} {selectedItem.title}
               </h3>
               <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-6 w-6 text-gray-400" />
               </button>
            </div>
            <div className="p-10 space-y-8">
               <div className="prose prose-slate max-w-none text-gray-600 font-medium leading-relaxed italic text-lg">
                 {selectedItem.fullContent}
               </div>
               
               {selectedItem.proTip && (
                 <div className="p-6 bg-warm-gold/5 rounded-2xl border-l-4 border-warm-gold">
                   <h5 className="font-bold text-warm-gold mb-2 flex items-center gap-2">
                     <Lightbulb className="h-5 w-5" /> Conseil de terrain
                   </h5>
                   <p className="text-sm font-medium text-gray-700">{selectedItem.proTip}</p>
                 </div>
               )}
            </div>
            <div className="p-8 bg-gray-50 text-center">
               <button onClick={() => setSelectedItem(null)} className="text-earth-black font-black uppercase tracking-widest text-xs hover:text-terracotta transition-colors">
                 Fermer le dossier
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SquatSection;
