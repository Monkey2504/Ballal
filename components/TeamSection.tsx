
import React, { useState } from 'react';
import { Mail, User, Shield, Users, ExternalLink, Copy, Check } from 'lucide-react';
import { LanguageCode } from '../types.ts';
import { translations } from '../utils/translations.ts';

interface TeamSectionProps {
  language: LanguageCode;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  email?: string;
  color: string;
  bio?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const teamMembers: TeamMember[] = [
    {
      name: "Thierno I. T. Diallo",
      role: t.role_admin,
      image: "https://i.imgur.com/T2LT1pB.png",
      email: "admin@ballal.be",
      color: "bg-warm-red",
      bio: "Président fondateur"
    },
    {
      name: "Bah Ibrahim",
      role: t.role_admin,
      image: "https://i.imgur.com/l3UdDov.png",
      email: "Ibrahim@ballal.be",
      color: "bg-warm-gold",
      bio: "Responsable des opérations"
    },
    {
      name: "Kadiatou Sow",
      role: t.role_admin_f,
      image: "https://i.imgur.com/THTzMBW.png",
      email: "admin@ballal.be",
      color: "bg-warm-green",
      bio: "Secrétaire"
    },
    {
      name: "Cissé, Abdoulaye",
      role: t.role_admin,
      image: "https://i.imgur.com/7FduSwY.png",
      email: "admin@ballal.be",
      color: "bg-earth-black",
      bio: "Trésorier de Ballal ASBL"
    },
    {
      name: "Francois Halleux",
      role: "Conseiller",
      image: "https://i.imgur.com/1qqkroP.png",
      email: "Francois@ballal.be",
      color: "bg-blue-600",
      bio: "Conseiller stratégique"
    }
  ];

  return (
    <section className="py-32 relative bg-soft-paper border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER D'ENTREPRISE SOCIALE */}
        <div className="text-center mb-20">
          <span className="inline-block py-2 px-6 bg-earth-black text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 rounded-full">
            Gouvernance & Vision
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-black text-earth-black mb-8 tracking-tighter">
            {t.team_title}
          </h2>
          <div className="w-24 h-2 bg-warm-gold mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 font-medium italic">
            "{t.team_subtitle}"
          </p>
        </div>

        {/* GRILLE DU CA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <img 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  src={member.image} 
                  alt={member.name} 
                />
                <div className={`absolute top-0 left-0 w-full h-1.5 ${member.color}`}></div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-xl text-earth-black leading-tight mb-1">{member.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{member.role}</p>
                  <p className="text-sm text-gray-600 italic mb-6">"{member.bio}"</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter truncate max-w-[120px]">
                    {member.email}
                  </span>
                  <button
                    onClick={() => handleCopyEmail(member.email!)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {copiedEmail === member.email ? <Check className="h-4 w-4 text-warm-green" /> : <Mail className="h-4 w-4 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION COLLECTIF */}
        <div className="mt-32 bg-earth-black rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-brutal">
          <div className="absolute top-0 right-0 w-96 h-96 bg-warm-red/10 rounded-full blur-[100px]"></div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-warm-gold" />
                <h3 className="text-4xl md:text-5xl font-serif font-black">{t.members_title}</h3>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                {t.team_collective_strength}
              </p>
              <button className="bg-warm-red text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                {t.join_button}
              </button>
            </div>
            <div className="rounded-[2rem] overflow-hidden border-4 border-white/10 rotate-1 shadow-2xl">
              <img src="https://i.imgur.com/CwnDz75.png" className="w-full h-full object-cover" alt="Membres" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
