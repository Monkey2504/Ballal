
import React, { useState } from 'react';
// Fix: Removed 'Tool' from imports as it is not exported by 'lucide-react' and not used in this component
import { 
  Home, Key, ShieldCheck, Scale, Siren, Hammer, DoorOpen, 
  CheckCircle, ShieldAlert, X, Mic
} from 'lucide-react';
import { LanguageCode } from '../types.ts';

interface SquatSectionProps { language: LanguageCode; }

const SquatSection: React.FC<SquatSectionProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'legal' | 'manual'>('legal');
  const [emergencyMode, setEmergencyMode] = useState(false);

  return (
    <div className="min-h-screen pb-24 relative bg-soft-paper overflow-hidden">
      {/* BOUCLIER LÉGAL OVERLAY */}
      {emergencyMode && (
        <div className="fixed inset-0 z-[300] bg-earth-black/98 backdrop-blur-xl text-white flex flex-col items-center p-6 overflow-y-auto animate-in fade-in duration-200">
          <button onClick={() => setEmergencyMode(false)} className="absolute top-8 right-8 p-4 bg-white/10 rounded-full"><X className="h-8 w-8" /></button>
          <div className="max-w-3xl w-full pt-20 space-y-8">
            <div className="text-center space-y-4">
              <ShieldAlert className="h-20 w-20 text-warm-red mx-auto animate-pulse" />
              <h2 className="text-5xl font-serif font-black uppercase">Bouclier Légal</h2>
              <p className="text-warm-gold font-bold tracking-widest uppercase">Action de Défense Immédiate</p>
            </div>
            <div className="bg-white text-earth-black p-8 rounded-[2rem] border-l-[12px] border-warm-red shadow-2xl">
              <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2"><ShieldCheck className="h-6 w-6 text-warm-red" /> 1. SCRIPT DE PORTE</h3>
              <p className="text-2xl font-bold italic">"Bonjour. Ceci est notre domicile privé. Nous y habitons effectivement et nous refusons l'entrée. Avez-vous un mandat de perquisition ?"</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="bg-white text-earth-black py-5 rounded-2xl font-black flex justify-center gap-3 items-center"><Mic className="h-6 w-6" /> ENREGISTRER L'AUDIO</button>
              <button className="bg-warm-red text-white py-5 rounded-2xl font-black flex justify-center gap-3 items-center"><Siren className="h-6 w-6" /> ALERTE BALLAL</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="pt-40 pb-20 px-6 text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-serif font-black text-earth-black tracking-tighter">
          Habitat <span className="text-warm-green italic">Solidaire</span>
        </h1>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">Le domicile est inviolable (Art. 15). Guide militant pour la sécurisation et la défense du logement.</p>
        <button onClick={() => setEmergencyMode(true)} className="bg-warm-red text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl border-4 border-warm-gold">MON BOUCLIER LÉGAL</button>
      </div>

      {/* CONTENU TECHNIQUE */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex gap-4 mb-12 justify-center">
          <button onClick={() => setActiveTab('legal')} className={`px-8 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'legal' ? 'bg-earth-black text-white' : 'bg-white text-gray-400'}`}>DROITS & LOI</button>
          <button onClick={() => setActiveTab('manual')} className={`px-8 py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${activeTab === 'manual' ? 'bg-earth-black text-white' : 'bg-white text-gray-400'}`}>SÉCURISATION TECHNIQUE</button>
        </div>

        {activeTab === 'legal' ? (
          <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-black flex items-center gap-4"><Scale className="h-8 w-8 text-terracotta" /> Inviolabilité</h3>
              <p className="text-gray-600 text-lg leading-relaxed">"Le domicile est inviolable ; aucune visite domiciliaire ne peut avoir lieu que dans les cas prévus par la loi." (Art. 15 Const.)</p>
              <div className="bg-warm-gold/10 p-4 border-l-4 border-warm-gold font-bold text-sm">Si vous y dormez et y avez vos affaires, c'est votre domicile légal.</div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-black flex items-center gap-4"><DoorOpen className="h-8 w-8 text-warm-green" /> Expulsion Sauvage</h3>
              <p className="text-gray-600 text-lg leading-relaxed">Un propriétaire ne peut pas vous expulser lui-même. Il doit obtenir un jugement du Juge de Paix. Toute expulsion de force est un crime.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-warm-red/5 p-6 rounded-2xl border-l-4 border-warm-red italic text-sm text-gray-700">Information documentaire sur les pratiques de terrain pour prévenir les intrusions illégales.</div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                <h3 className="text-2xl font-serif font-black mb-6 flex items-center gap-3"><Hammer className="h-6 w-6 text-warm-gold" /> Changer le Barillet</h3>
                <p className="text-gray-600 mb-6">Pour garantir l'inviolabilité physique, les collectifs remplacent immédiatement le cylindre (barillet) de la porte d'entrée.</p>
                <ul className="space-y-4 font-bold text-sm">
                  <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-warm-green shrink-0" /> Dévisser la vis de blocage sur la tranche de la porte.</li>
                  <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-warm-green shrink-0" /> Insérer la clé, tourner légèrement et retirer le cylindre.</li>
                  <li className="flex gap-3"><CheckCircle className="h-5 w-5 text-warm-green shrink-0" /> Installer un nouveau cylindre de même dimension.</li>
                </ul>
                <p className="mt-6 text-[10px] text-gray-400 font-black uppercase tracking-widest">Note : Conservez l'original pour le Juge de Paix ou le départ.</p>
              </div>
              <div className="bg-earth-black text-white p-10 rounded-[2.5rem] shadow-2xl space-y-6">
                <h3 className="text-2xl font-serif font-black text-warm-gold flex items-center gap-3"><Key className="h-6 w-6" /> Preuves de Vie</h3>
                <p className="text-gray-300">Indispensable pour prouver que le lieu est votre domicile effectif :</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-xl text-xs font-bold border border-white/10">Courrier à votre nom</div>
                  <div className="bg-white/5 p-4 rounded-xl text-xs font-bold border border-white/10">Ticket de livraison</div>
                  <div className="bg-white/5 p-4 rounded-xl text-xs font-bold border border-white/10">Contrat d'énergie</div>
                  <div className="bg-white/5 p-4 rounded-xl text-xs font-bold border border-white/10">Attestation CPAS</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SquatSection;
