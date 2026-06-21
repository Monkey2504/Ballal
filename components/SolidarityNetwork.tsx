
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Users, Send, AlertCircle, Sparkles } from 'lucide-react';

interface MutualAidRequest {
  id: string;
  user: string;
  type: 'need' | 'offer';
  content: string;
  date: string;
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const SolidarityNetwork: React.FC = () => {
  const [requests, setRequests] = useState<MutualAidRequest[]>([
    { id: '1', user: 'Mamadou', type: 'need', content: "Cherche quelqu'un pour m'accompagner à la commune de Schaerbeek pour traduire un document.", date: 'Il y a 2h' },
    { id: '2', user: 'Fatoumata', type: 'offer', content: 'Je propose mon aide pour les devoirs de français le mercredi après-midi à Molenbeek.', date: 'Il y a 4h' },
    { id: '3', user: 'Ibrahim', type: 'need', content: 'Cherche des informations sur le renouvellement de ma carte A.', date: 'Il y a 1j' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [msgType, setMsgType] = useState<'need' | 'offer'>('need');

  const handlePost = () => {
    if (!newMessage.trim()) return;
    const newReq: MutualAidRequest = {
      id: Date.now().toString(),
      user: 'Moi',
      type: msgType,
      content: newMessage,
      date: "À l'instant",
    };
    setRequests([newReq, ...requests]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-ivory paper-grain pb-16 sm:pb-20 pt-8 sm:pt-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative z-10">

        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 sm:mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="flag-line w-8 shrink-0" aria-hidden="true">
              <span /><span /><span />
            </span>
            <p className="dateline text-[11px] text-guinea-red">
              Connecter la communauté
            </p>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-ink tracking-tight leading-[0.95] mb-5">
            Espace <span className="italic text-guinea-green">entraide</span>
          </h1>
          <p className="text-body-lg text-ink-muted max-w-xl mx-auto leading-relaxed">
            Mettez en relation vos besoins et vos ressources au sein de la communauté.
          </p>
        </motion.header>

        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="bg-white p-6 sm:p-8 rounded-[4px] shadow-soft-elegant border border-ink/10 mb-10 sm:mb-12"
        >
          <div className="flex gap-3 sm:gap-4 mb-6">
            <button
              onClick={() => setMsgType('need')}
              className={`flex-1 h-11 rounded-[3px] font-mono font-bold text-[11px] tracking-[0.08em] uppercase transition-colors ${msgType === 'need' ? 'bg-guinea-red text-white' : 'bg-paper text-ink-muted hover:bg-border-subtle'}`}
            >
              J'ai besoin d'aide
            </button>
            <button
              onClick={() => setMsgType('offer')}
              className={`flex-1 h-11 rounded-[3px] font-mono font-bold text-[11px] tracking-[0.08em] uppercase transition-colors ${msgType === 'offer' ? 'bg-guinea-green text-white' : 'bg-paper text-ink-muted hover:bg-border-subtle'}`}
            >
              Je peux aider
            </button>
          </div>
          <div className="relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={msgType === 'need' ? "Décrivez votre situation — nous trouverons quelqu'un." : 'Précisez ce que vous pouvez apporter à la communauté.'}
              className="w-full p-5 sm:p-6 rounded-[4px] bg-paper border-2 border-transparent focus:border-guinea-yellow/60 focus:ring-2 focus:ring-guinea-yellow/20 outline-none min-h-[120px] text-ink text-sm sm:text-base transition-all resize-none"
            />
            <button
              onClick={handlePost}
              aria-label="Publier"
              className="absolute bottom-4 right-4 bg-ink text-ivory p-3 rounded-[3px] hover:bg-guinea-red transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        <div className="space-y-5 sm:space-y-6">
          <h2 className="dateline text-[11px] text-ink-muted flex items-center gap-4">
            <div className="h-px flex-grow bg-border-subtle" aria-hidden="true" />
            En ce moment dans la communauté
            <div className="h-px flex-grow bg-border-subtle" aria-hidden="true" />
          </h2>

          {requests.map((req, i) => (
            <motion.div
              key={req.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              variants={fadeUp}
              className="bg-white p-6 sm:p-8 rounded-[4px] shadow-soft-elegant border border-ink/10 flex flex-col sm:flex-row gap-5 sm:gap-6"
            >
              <div className={`p-4 rounded-[4px] flex-shrink-0 flex items-center justify-center self-start ${req.type === 'need' ? 'bg-guinea-red/10 text-guinea-red' : 'bg-guinea-green/10 text-guinea-green'}`}>
                {req.type === 'need' ? <AlertCircle className="h-7 w-7" aria-hidden="true" /> : <Sparkles className="h-7 w-7" aria-hidden="true" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-black text-ink">{req.user}</h3>
                  <span className="dateline text-[9px] text-ink-muted shrink-0">{req.date}</span>
                </div>
                <p className="text-ink-muted leading-relaxed mb-5 text-sm sm:text-base">
                  {req.content}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-paper hover:bg-ink hover:text-ivory rounded-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-colors">
                    <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                    Je peux aider
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-paper hover:bg-guinea-red hover:text-white rounded-[3px] font-mono text-[11px] font-bold uppercase tracking-[0.08em] transition-colors">
                    <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                    Soutenir
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SolidarityNetwork;
