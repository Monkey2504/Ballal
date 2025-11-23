
import React from 'react';
import { Phone, Mail, User, Shield } from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';

interface TeamSectionProps {
  language: LanguageCode;
}

const TeamSection: React.FC<TeamSectionProps> = ({ language }) => {
  const t = translations[language];

  // REMARQUE: Remplacez ces URLs par les vraies photos des administrateurs
  const teamMembers = [
    {
      name: "Mamadou Sow",
      role: t.role_president,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      phone: "+32 400 00 00 01",
      email: "president@ballal-asbl.be",
      color: "border-[#CE1126]" // Rouge
    },
    {
      name: "Aissatou Diallo",
      role: t.role_secretary,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      phone: "+32 400 00 00 02",
      email: "secretariat@ballal-asbl.be",
      color: "border-[#FCD116]" // Jaune
    },
    {
      name: "Ibrahima Barry",
      role: t.role_treasurer,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      phone: "+32 400 00 00 03",
      email: "tresorerie@ballal-asbl.be",
      color: "border-[#009460]" // Vert
    },
    {
      name: "Fatoumata Camara",
      role: t.role_social,
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
      phone: "+32 400 00 00 04",
      email: "social@ballal-asbl.be",
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
                    <a href={`tel:${member.phone}`} className="flex items-center text-gray-600 hover:text-[#CE1126] transition-colors group">
                        <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-red-50">
                            <Phone className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold">{member.phone}</span>
                    </a>
                    <a href={`mailto:${member.email}`} className="flex items-center text-gray-600 hover:text-[#009460] transition-colors group">
                        <div className="p-2 bg-gray-100 rounded-full mr-3 group-hover:bg-green-50">
                            <Mail className="h-4 w-4" />
                        </div>
                        <span className="text-sm truncate">{member.email}</span>
                    </a>
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
