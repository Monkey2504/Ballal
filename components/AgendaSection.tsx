import React from 'react';
import { Calendar, Clock, MapPin, Phone, Ticket } from 'lucide-react';

// Agenda culturel : événements portés par Ballal ASBL
const EVENEMENT = {
  titre: 'Hirdé Guinéen',
  sousTitre: 'La culture guinéenne, notre force',
  artiste: 'DJ Bangs',
  date: 'Vendredi 27 novembre 2026',
  horaire: 'De 20 h à 4 h',
  adresse: 'Rue Osseghem 53, 1080 Molenbeek',
  entree: 'Entrée gratuite, consommation obligatoire',
  cadre: 'Festival Guinée interculturel',
  affiche: '/affiches/hirde-guineen-27-novembre-2026.jpg',
  contacts: [
    { nom: 'Ibrahim', tel: '0467 65 99 70' },
    { nom: 'Bobo', tel: '0465 96 47 60' },
  ],
};

const AgendaSection: React.FC = () => {
  const infos = [
    { icon: Calendar, texte: EVENEMENT.date },
    { icon: Clock, texte: EVENEMENT.horaire },
    { icon: MapPin, texte: EVENEMENT.adresse },
    { icon: Ticket, texte: EVENEMENT.entree },
  ];

  return (
    <section className="bg-[#0F0F0F] text-white py-14 sm:py-20 px-4 sm:px-6" aria-labelledby="agenda-titre">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[minmax(0,340px)_1fr] gap-10 md:gap-14 items-center">
        <a href={EVENEMENT.affiche} target="_blank" rel="noopener noreferrer" className="block mx-auto w-full max-w-[340px]">
          <img
            src={EVENEMENT.affiche}
            alt={`Affiche de la soirée ${EVENEMENT.titre} avec ${EVENEMENT.artiste}, ${EVENEMENT.date}, ${EVENEMENT.adresse}`}
            width={900}
            height={1350}
            loading="eager"
            className="w-full h-auto rounded-[12px] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          />
        </a>

        <div>
          <div className="inline-block py-2 px-5 bg-[#FFCC00] text-[#0F0F0F] font-bold text-[10px] uppercase tracking-[0.3em] mb-6 rounded-full">
            À l'agenda
          </div>
          <h2 id="agenda-titre" className="text-4xl sm:text-6xl font-serif font-black tracking-tighter leading-none mb-3">
            {EVENEMENT.titre}
          </h2>
          <p className="text-lg sm:text-xl text-white/60 font-medium italic mb-8">
            {EVENEMENT.sousTitre} — avec {EVENEMENT.artiste}
          </p>

          <ul className="space-y-3 mb-8">
            {infos.map(({ icon: Icon, texte }) => (
              <li key={texte} className="flex items-start gap-3 text-base sm:text-lg font-medium">
                <Icon className="h-5 w-5 text-[#FFCC00] mt-1 shrink-0" aria-hidden="true" />
                <span>{texte}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm text-white/50 font-medium mb-4">
            Une soirée du {EVENEMENT.cadre}, portée par Ballal ASBL. Chicha disponible en espace VIP.
          </p>

          <div className="flex flex-wrap gap-3">
            {EVENEMENT.contacts.map((c) => (
              <a
                key={c.tel}
                href={`tel:${c.tel.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 px-4 py-3 min-h-[44px] bg-white/10 hover:bg-[#BE0000] rounded-[8px] text-sm font-bold transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {c.nom} · {c.tel}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgendaSection;
