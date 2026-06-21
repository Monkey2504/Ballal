
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

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
      color: "bg-ink",
      bio: "Trésorier de Ballal ASBL"
    },
    {
      name: "Francois Halleux",
      role: "Conseiller",
      image: "https://i.imgur.com/1qqkroP.png",
      email: "Francois@ballal.be",
      color: "bg-guinea-green",
      bio: "Conseiller stratégique"
    }
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-ivory paper-grain border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-2xl mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="flag-line w-8 shrink-0" aria-hidden="true">
              <span /><span /><span />
            </span>
            <p className="dateline text-[11px] text-guinea-red">Gouvernance et vision</p>
          </div>
          <h2 className="font-serif font-black text-[2rem] sm:text-[2.75rem] text-ink leading-[1.02] tracking-tight">
            {t.team_title}
          </h2>
          <p className="mt-5 text-body-lg text-ink-muted leading-relaxed max-w-xl">
            {t.team_subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              className="bg-white rounded-[4px] overflow-hidden border border-ink/10 shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300 group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-border-subtle">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                />
                <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${member.color}`} aria-hidden="true"></div>
              </div>

              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-black text-body-sm text-ink leading-tight">{member.name}</h3>
                  <p className="dateline text-[9px] text-ink-muted mt-1.5 normal-case tracking-[0.1em]">{member.bio}</p>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-ink/10">
                  <span className="dateline text-[8px] text-ink-muted normal-case tracking-[0.08em] truncate max-w-[110px]">
                    {member.email}
                  </span>
                  <button
                    onClick={() => handleCopyEmail(member.email!)}
                    className="p-2 hover:bg-ink/[0.05] rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/40"
                    aria-label={`Copier l'adresse e-mail de ${member.name}`}
                  >
                    {copiedEmail === member.email ? <Check className="h-4 w-4 text-guinea-green" /> : <Mail className="h-4 w-4 text-ink-muted" />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 bg-ink rounded-[4px] p-10 md:p-16 text-ivory relative overflow-hidden shadow-soft-xl"
        >
          <div className="flag-line" aria-hidden="true"><span /><span /><span /></div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-7">
              <div className="flex items-center gap-4">
                <Users className="h-9 w-9 text-guinea-yellow" aria-hidden="true" />
                <h3 className="font-serif font-black text-3xl md:text-4xl">{t.members_title}</h3>
              </div>
              <p className="text-body-lg text-ivory/70 leading-relaxed">
                {t.team_collective_strength}
              </p>
              <button className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-guinea-red text-white font-mono text-[12px] font-bold uppercase tracking-[0.08em] rounded-[3px] hover:bg-guinea-red-dark transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-guinea-red/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ink">
                {t.join_button}
              </button>
            </div>
            <figure className="rounded-[4px] overflow-hidden border border-ivory/10">
              <img src="https://i.imgur.com/CwnDz75.png" className="w-full h-full object-cover" alt="Membres et militants de Ballal ASBL" loading="lazy" />
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
