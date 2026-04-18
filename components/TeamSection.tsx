
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Users, Check } from 'lucide-react';
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
      color: "bg-guinea-red",
      bio: "Président fondateur"
    },
    {
      name: "Bah Ibrahim",
      role: t.role_admin,
      image: "https://i.imgur.com/l3UdDov.png",
      email: "Ibrahim@ballal.be",
      color: "bg-guinea-yellow",
      bio: "Responsable des opérations"
    },
    {
      name: "Kadiatou Sow",
      role: t.role_admin_f,
      image: "https://i.imgur.com/THTzMBW.png",
      email: "admin@ballal.be",
      color: "bg-guinea-green",
      bio: "Secrétaire"
    },
    {
      name: "Cissé, Abdoulaye",
      role: t.role_admin,
      image: "https://i.imgur.com/7FduSwY.png",
      email: "admin@ballal.be",
      color: "bg-[#0F0F0F]",
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative bg-[#FAFAF8] border-t border-[#E8E8E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="inline-block py-2 px-6 bg-[#0F0F0F] text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 rounded-full">
            Gouvernance et vision
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-[#0F0F0F] mb-6 sm:mb-8 tracking-tighter">
            {t.team_title}
          </h2>
          <div className="w-24 h-1.5 bg-[#FFCC00] mx-auto mb-6 sm:mb-8" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#6B6B6B] font-medium italic">
            «&nbsp;{t.team_subtitle}&nbsp;»
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              className="bg-white rounded-[16px] sm:rounded-[2rem] overflow-hidden border border-[#E8E8E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
                <div className={`absolute top-0 left-0 w-full h-1.5 ${member.color}`} aria-hidden="true" />
              </div>

              <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-sm sm:text-base lg:text-lg text-[#0F0F0F] leading-tight mb-1">{member.name}</h3>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] mb-3 sm:mb-4">{member.role}</p>
                  <p className="text-xs sm:text-sm text-[#6B6B6B] italic mb-4 sm:mb-6">«&nbsp;{member.bio}&nbsp;»</p>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-[#F0F0EE]">
                  <span className="text-[9px] font-black text-[#6B6B6B] uppercase tracking-tighter truncate max-w-[100px] sm:max-w-[120px]">
                    {member.email}
                  </span>
                  <button
                    onClick={() => handleCopyEmail(member.email!)}
                    aria-label={`Copier l'email de ${member.name}`}
                    className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-[#FAFAF8] rounded-[8px] transition-colors"
                  >
                    {copiedEmail === member.email
                      ? <Check className="h-4 w-4 text-[#00843D]" aria-hidden="true" />
                      : <Mail className="h-4 w-4 text-[#6B6B6B]" aria-hidden="true" />
                    }
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collectif section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 sm:mt-24 lg:mt-32 bg-[#0F0F0F] rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-20 text-white relative overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.10)]"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#BE0000]/10 rounded-full blur-[100px]" aria-hidden="true" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-4">
                <Users className="h-8 w-8 sm:h-10 sm:w-10 text-[#FFCC00]" aria-hidden="true" />
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black">{t.members_title}</h3>
              </div>
              <p className="text-base sm:text-xl text-white/70 leading-relaxed font-medium">
                {t.team_collective_strength}
              </p>
              <button className="h-12 sm:h-auto px-8 sm:px-10 sm:py-5 bg-[#BE0000] text-white rounded-[8px] sm:rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-[#9B0000] transition-colors">
                {t.join_button}
              </button>
            </div>
            <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden border-4 border-white/10 sm:rotate-1 shadow-2xl">
              <img
                src="https://i.imgur.com/CwnDz75.png"
                className="w-full h-full object-cover"
                alt="Membres et militants de Ballal ASBL"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
