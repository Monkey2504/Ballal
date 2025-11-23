import React from 'react';
import { Phone, Mail, User, Shield } from 'lucide-react';
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
    },
    {
      name: "Membre à Ajouter",
      role: t.role_treasurer, 
      image: "https://i.imgur.com/CwnDz75.png", // Image mise à jour
      phone: "+32 400 00 00 04",
      email: "a_remplacer@ballal-asbl.be",
      color: "border-gray-800"
    }
  ];

  return (
    <div className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center p-2 bg-slate-100 rounded-full mb-4">
             <Shield className="h-6 w-6 text-slate-700" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t.team_title}
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 font-medium">
            {t.team_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
                key={index} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-t-4 ${member.color}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" 
                    src={member.image} 
                    alt={member.name} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-lg">{member.name}</p>
                    <p className="text-xs uppercase tracking-wider font-medium text-gray-200">{member.role}</p>
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
      </div>
    </div>
  );
};

export default TeamSection;