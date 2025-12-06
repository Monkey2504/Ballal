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
  phone: string;
  email: string;
  color: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language];
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=800&q=80";
  };

  // Enhanced team members with contact info
  const teamMembers: TeamMember[] = [
    {
      name: "Thierno I. T. Diallo",
      role: t.role_admin,
      image: "https://i.imgur.com/T2LT1pB.jpg",
      phone: "+224 123 456 789",
      email: "thierno.diallo@ballal-asbl.org",
      color: "border-[#CE1126]",
      bio: t.member_bio_placeholder || "Président de Ballal ASBL",
      social: {
        linkedin: "https://linkedin.com/in/thierno-diallo",
        twitter: "https://twitter.com/thierno_diallo"
      }
    },
    {
      name: "Bah Ibrahim",
      role: t.role_admin,
      image: "https://i.imgur.com/l3UdDov.jpg",
      phone: "+224 987 654 321",
      email: "bah.ibrahim@ballal-asbl.org",
      color: "border-[#FCD116]",
      bio: t.member_bio_placeholder || "Vice-président de Ballal ASBL"
    },
    {
      name: "Kadiatou Sow",
      role: t.role_admin_f,
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=800",
      phone: "+224 555 123 456",
      email: "kadiatou.sow@ballal-asbl.org",
      color: "border-[#009460]",
      bio: t.member_bio_placeholder || "Secrétaire générale de Ballal ASBL"
    },
    {
      name: "Cissé, Abdoulaye",
      role: t.role_admin,
      image: "https://i.imgur.com/7FduSwY.jpg",
      phone: "+224 111 222 333",
      email: "abdoulaye.cisse@ballal-asbl.org",
      color: "border-slate-800",
      bio: t.member_bio_placeholder || "Trésorier de Ballal ASBL"
    },
    {
      name: "Francois Halleux",
      role: "Conseiller en stratégie & Innovation sociale",
      image: "https://i.imgur.com/1qqkroP.jpg",
      phone: "+224 444 555 666",
      email: "francois.halleux@ballal-asbl.org",
      color: "border-blue-600",
      bio: t.member_bio_placeholder || "Conseiller en stratégie et innovation sociale",
      social: {
        linkedin: "https://linkedin.com/in/francois-halleux",
        website: "https://example.com"
      }
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
      className="py-16 md:py-20 relative bg-gradient-to-b from-white to-slate-50" 
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER BUREAU EXÉCUTIF */}
        <div className="text-center mb-12 lg:mb-16 relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-[#CE1126] to-[#FCD116] rounded-full mb-6 shadow-lg">
            <Shield className="h-8 w-8 text-white" aria-hidden="true" />
          </div>
          <h2 
            id="team-heading" 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
          >
            {t.team_title}
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 font-medium leading-relaxed">
            {t.team_subtitle}
          </p>
        </div>

        {/* GRILLE BUREAU EXÉCUTIF */}
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-20">
          {teamMembers.map((member, index) => {
            const isAdmin = member.role === t.role_admin || member.role === t.role_admin_f;
            const cardWidth = getCardWidth();
            
            return (
              <div 
                key={index} 
                className={`
                  bg-white rounded-2xl shadow-xl overflow-hidden 
                  transform transition-all duration-300 
                  hover:-translate-y-3 hover:shadow-2xl 
                  border-t-4 ${member.color} 
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
                <div className="relative h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    src={member.image} 
                    alt={`Portrait de ${member.name}`} 
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 
                      id={`member-name-${index}`}
                      className="font-bold text-xl md:text-2xl mb-1"
                    >
                      {member.name}
                    </h3>
                    <p className={`
                      text-sm uppercase tracking-wider font-semibold
                      ${isAdmin ? 'text-white bg-gradient-to-r from-[#CE1126] to-[#FCD116] bg-clip-text' : 'text-blue-200'}
                    `}>
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="mt-3 text-sm text-gray-200 hidden group-hover:block transition-all duration-300">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {member.phone && (
                      <div className="flex items-center justify-between">
                        <a 
                          href={`tel:${member.phone.replace(/\s/g, '')}`}
                          className="flex items-center text-gray-700 hover:text-[#CE1126] transition-colors group/contact flex-1"
                          aria-label={`Appeler ${member.name} au ${member.phone}`}
                        >
                          <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover/contact:bg-red-50 transition-colors">
                            <Phone className="h-4 w-4" aria-hidden="true" />
                          </div>
                          <span className="text-sm font-semibold truncate">{member.phone}</span>
                        </a>
                      </div>
                    )}
                    
                    {member.email && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1 min-w-0">
                          <div className="p-2 bg-gray-100 rounded-full mr-3">
                            <Mail className="h-4 w-4 text-gray-600" aria-hidden="true" />
                          </div>
                          <span className="text-sm truncate font-medium">{member.email}</span>
                        </div>
                        
                        <div className="flex gap-2 ml-3">
                          <button
                            onClick={() => handleCopyEmail(member.email)}
                            className="p-2 text-gray-500 hover:text-[#009460] transition-colors relative"
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
                            className="p-2 text-gray-500 hover:text-[#CE1126] transition-colors"
                            aria-label={`Envoyer un email à ${member.name}`}
                          >
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    )}

                    {member.social && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex gap-3">
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[#0077B5] transition-colors"
                              aria-label={`Profil LinkedIn de ${member.name}`}
                            >
                              <span className="sr-only">LinkedIn</span>
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </a>
                          )}
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                              aria-label={`Profil Twitter de ${member.name}`}
                            >
                              <span className="sr-only">Twitter</span>
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </a>
                          )}
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
        <div className="border-t border-gray-200 pt-16 lg:pt-20">
          <div className="text-center mb-10 lg:mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-[#009460]/10 rounded-full mb-6">
              <Users className="h-8 w-8 text-[#009460]" aria-hidden="true" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.members_title}
            </h3>
            <p className="mt-3 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.team_collective_strength}
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white max-w-6xl mx-auto group bg-gray-100">
            <div className="aspect-[16/9] lg:aspect-[21/9] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#CE1126]/20 via-transparent to-[#009460]/20 z-10 pointer-events-none"></div>
              <img 
                src="https://i.imgur.com/CwnDz75.png" 
                alt="Les membres de Ballal ASBL réunis pour une photo de groupe" 
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
                onError={handleImageError}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 sm:p-8 lg:p-10 z-20">
                <p className="text-white text-lg md:text-xl font-medium text-center sm:text-left max-w-4xl mx-auto leading-relaxed">
                  {t.team_join_desc}
                </p>
                <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center px-6 py-3 bg-[#CE1126] text-white font-semibold rounded-lg hover:bg-[#B01020] transition-colors shadow-lg hover:shadow-xl"
                  >
                    {t.join_button || "Rejoindre l'équipe"}
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#about"
                    className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/30"
                  >
                    {t.learn_more_button || "En savoir plus"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;