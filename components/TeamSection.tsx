import React, { useState } from 'react';
import { Phone, Mail, User, Shield, Users, ExternalLink, Copy, Check } from 'lucide-react';
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
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language] || translations['fr'];
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback vers une image abstraite neutre si la photo ne charge pas
    e.currentTarget.src = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=800&auto=format&fit=crop";
  };

  // Membres de l'équipe avec bios et emails spécifiques demandés
  const teamMembers: TeamMember[] = [
    {
      name: "Thierno I. T. Diallo",
      role: t.role_admin,
      image: "https://i.imgur.com/T2LT1pB.png",
      email: "admin@ballal.be",
      color: "border-[#CE1126]",
      bio: "Président fondateur",
      social: { linkedin: "#" }
    },
    {
      name: "Bah Ibrahim",
      role: t.role_admin,
      image: "https://i.imgur.com/l3UdDov.png",
      email: "Ibrahim@ballal.be",
      color: "border-[#FCD116]",
      bio: "Responsable des opérations"
    },
    {
      name: "Kadiatou Sow",
      role: t.role_admin_f,
      image: "https://i.imgur.com/THTzMBW.png",
      email: "admin@ballal.be",
      color: "border-[#009460]",
      bio: "Secrétaire"
    },
    {
      name: "Cissé, Abdoulaye",
      role: t.role_admin,
      image: "https://i.imgur.com/7FduSwY.png",
      email: "admin@ballal.be",
      color: "border-slate-800",
      bio: "Trésorier de Ballal ASBL"
    },
    {
      name: "Francois Halleux",
      role: "Conseiller",
      image: "https://i.imgur.com/1qqkroP.png",
      email: "Francois@ballal.be",
      color: "border-blue-600",
      bio: "Conseiller stratégique",
      social: { linkedin: "#" }
    }
  ];

  // Responsive grid calculations
  const getCardWidth = () => {
    if (teamMembers.length <= 2) {
      return "lg:w-[calc(50%-2rem)]";
    }
    if (teamMembers.length <= 4) {
      return "lg:w-[calc(33.333%-2rem)]";
    }
    return "lg:w-[calc(25%-2rem)]";
  };

  return (
    <section 
      id="team-section" 
      className="py-16 md:py-24 relative bg-[#FFFBF0] overflow-hidden" 
      aria-labelledby="team-heading"
    >
      {/* Pattern de fond subtil */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER BUREAU EXÉCUTIF */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block py-1 px-3 border-2 border-black font-black text-xs uppercase tracking-[0.2em] mb-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-slate-900">
            Gouvernance
          </span>
          <h2 
            id="team-heading" 
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            {t.team_title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-serif italic border-l-4 border-[#FCD116] pl-6 text-left">
            "{t.team_subtitle}"
          </p>
        </div>

        {/* GRILLE BUREAU EXÉCUTIF */}
        <div className="flex flex-wrap justify-center gap-8 mb-24">
          {teamMembers.map((member, index) => {
            const cardWidth = getCardWidth();
            
            return (
              <div 
                key={index} 
                className={`
                  bg-white rounded-2xl overflow-hidden 
                  transform transition-all duration-300 
                  hover:-translate-y-2 hover:shadow-2xl 
                  border-2 border-slate-900
                  shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]
                  w-full sm:w-[calc(100%-3rem)] 
                  md:w-[calc(50%-1.5rem)] 
                  ${cardWidth}
                  max-w-sm
                  flex-shrink-0
                  group
                `}
                role="article"
                aria-labelledby={`member-name-${index}`}
              >
                <div className="relative h-72 lg:h-80 overflow-hidden bg-gray-200">
                  <img 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                    src={member.image} 
                    alt={`Portrait de ${member.name}`} 
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Bandeau de couleur selon le rôle */}
                  <div className={`absolute top-0 left-0 w-full h-2 ${member.color.replace('border-', 'bg-')}`}></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 
                      id={`member-name-${index}`}
                      className="font-black text-xl md:text-2xl mb-1 leading-none"
                    >
                      {member.name}
                    </h3>
                    <p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-2">
                      {member.role}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 bg-white">
                  <div className="space-y-4">
                    {member.bio && (
                      <p className="text-sm text-gray-600 line-clamp-2 italic border-l-2 border-gray-200 pl-3 font-medium">
                        {member.bio}
                      </p>
                    )}

                    {member.email && (
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center flex-1 min-w-0">
                          <Mail className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" aria-hidden="true" />
                          <span className="text-xs truncate font-bold text-gray-700">{member.email}</span>
                        </div>
                        
                        <div className="flex gap-2 ml-2">
                          <button
                            onClick={() => handleCopyEmail(member.email!)}
                            className="p-1.5 text-gray-400 hover:text-[#009460] hover:bg-green-50 rounded transition-colors"
                            aria-label={`Copier l'email de ${member.name}`}
                          >
                            {copiedEmail === member.email ? (
                              <Check className="h-4 w-4" aria-hidden="true" />
                            ) : (
                              <Copy className="h-4 w-4" aria-hidden="true" />
                            )}
                          </button>
                          
                          <a
                            href={`mailto:${member.email}`}
                            className="p-1.5 text-gray-400 hover:text-[#CE1126] hover:bg-red-50 rounded transition-colors"
                            aria-label={`Envoyer un email à ${member.name}`}
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION NOS MEMBRES (PHOTO DE GROUPE) */}
        <div className="border-t-2 border-slate-200 pt-16 lg:pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
            <div className="md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-[#009460]" aria-hidden="true" />
                <h3 className="text-3xl md:text-4xl font-black text-slate-900">
                  {t.members_title}
                </h3>
              </div>
              <p className="text-lg text-gray-700 font-serif leading-relaxed">
                {t.team_collective_strength}
              </p>
            </div>
            
            <div className="md:w-auto">
               <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 bg-[#CE1126] text-white font-black uppercase tracking-wider text-sm rounded-none hover:bg-slate-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                >
                  {t.join_button || "Rejoindre l'équipe"}
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[16/9] lg:aspect-[21/9] relative overflow-hidden">
              <img 
                src="https://i.imgur.com/CwnDz75.png" 
                alt="Les membres de Ballal ASBL réunis" 
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white text-lg font-medium italic max-w-3xl">
                  "{t.team_join_desc}"
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;