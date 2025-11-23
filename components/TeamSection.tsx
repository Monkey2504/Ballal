
import React from 'react';
import { Phone, Mail, User, Shield, Users } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface TeamSectionProps {
  language: LanguageCode;
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language];

  const teamMembers = [
    {
      name: "Thierno I. T. Diallo",
      role: "Administrateur",
      image: "https://i.imgur.com/T2LT1pB.jpg",
      phone: "", 
      email: "", 
      color: "border-[#CE1126]" // Rouge
    },
    {
      name: "Bah Ibrahim",
      role: "Administrateur",
      image: "https://i.imgur.com/l3UdDov.jpg",
      phone: "",
      email: "",
      color: "border-[#FCD116]" // Jaune
    },
    {
      name: "Kadiatou Sow",
      role: "Administratrice", 
      image: "https://i.imgur.com/THTzMBW.jpg",
      phone: "",
      email: "",
      color: "border-[#009460]" // Vert
    }
  ];

  return (
    <section id="team-section" className="py-16 relative bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER BUREAU EXÉCUTIF */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-full mb-4">
             <Shield className="h-6 w-6 text-slate-700" />
          </div>
          <h2 id="team-heading" className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.team_title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-medium">
            {t.team_subtitle}
          </p>
        </div>

        {/* GRILLE BUREAU EXÉCUTIF */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-4 ${member.color}`}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" 
                    src={member.image} 
                    alt={member.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-xl">{member.name}</p>
                    <p className="text-sm uppercase tracking-wider font-medium text-gray-300">{member.role}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                    {member.phone && (
                        <a href={`tel:${member.phone}`} className="flex items-center text-gray-600 hover:text-[#CE1126] transition-colors group">
                            <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-red-50">
                                <Phone className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-bold">{member.phone}</span>
                        </a>
                    )}
                    
                    {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-center text-gray-600 hover:text-[#009460] transition-colors group">
                            <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-green-50">
                                <Mail className="h-4 w-4" />
                            </div>
                            <span className="text-sm truncate">{member.email}</span>
                        </a>
                    )}
                </div>
                
                <button className="w-full mt-6 bg-slate-900 text-white py-2 rounded-lg font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center">
                    <User className="h-4 w-4 mr-2" />
                    {t.contact_btn}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION NOS MEMBRES (PHOTO DE GROUPE) */}
        <div className="border-t border-gray-100 pt-16">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-2 bg-red-50 rounded-full mb-4">
                    <Users className="h-6 w-6 text-[#CE1126]" />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900">
                    {t.members_title}
                </h3>
                <p className="mt-3 text-lg text-gray-500">
                    La force de Ballal, c'est son collectif.
                </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-5xl mx-auto group">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img 
                    src="https://i.imgur.com/CwnDz75.png" 
                    alt="Les membres de Ballal ASBL" 
                    className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 sm:p-10 z-20">
                    <p className="text-white font-medium text-center sm:text-left max-w-2xl">
                        Rejoignez une équipe dynamique et engagée pour le rayonnement de la communauté guinéenne en Belgique.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
