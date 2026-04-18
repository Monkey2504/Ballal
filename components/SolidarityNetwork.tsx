
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
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
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
    <div className="min-h-screen bg-[#FAFAF8] pb-16 sm:pb-20 pt-8 sm:pt-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-10 sm:mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#FFCC00]/15 text-[#8B7000] font-bold text-[10px] uppercase tracking-[0.3em] mb-6 border border-[#FFCC00]/25">
            <Users className="h-4 w-4" aria-hidden="true" />
            Connecter la Communauté
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-[#0F0F0F] tracking-tighter leading-none mb-5">
            Espace <span className="text-[#00843D]">Entraide</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B6B6B] font-medium max-w-xl mx-auto leading-relaxed">
            Mettez en relation vos besoins et vos ressources au sein de la communauté.
          </p>
        </motion.header>

        {/* Post form */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.06)] border border-[#E8E8E6] mb-10 sm:mb-12"
        >
          <div className="flex gap-3 sm:gap-4 mb-6">
            <button
              onClick={() => setMsgType('need')}
              className={`flex-1 h-11 rounded-[8px] font-black text-[10px] tracking-widest uppercase transition-all ${msgType === 'need' ? 'bg-[#BE0000] text-white shadow-lg' : 'bg-[#F5F5F3] text-[#6B6B6B]'}`}
            >
              J'ai besoin d'aide
            </button>
            <button
              onClick={() => setMsgType('offer')}
              className={`flex-1 h-11 rounded-[8px] font-black text-[10px] tracking-widest uppercase transition-all ${msgType === 'offer' ? 'bg-[#00843D] text-white shadow-lg' : 'bg-[#F5F5F3] text-[#6B6B6B]'}`}
            >
              Je peux aider
            </button>
          </div>
          <div className="relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={msgType === 'need' ? "Décrivez votre situation — nous trouverons quelqu'un." : 'Précisez ce que vous pouvez apporter à la communauté.'}
              className="w-full p-5 sm:p-6 rounded-[12px] bg-[#F5F5F3] border-2 border-transparent focus:border-[#FFCC00]/50 focus:ring-2 focus:ring-[#FFCC00]/20 outline-none min-h-[120px] font-medium text-[#0F0F0F] text-sm sm:text-base transition-all resize-none"
            />
            <button
              onClick={handlePost}
              aria-label="Publier"
              className="absolute bottom-4 right-4 bg-[#0F0F0F] text-white p-3 rounded-[8px] hover:bg-[#BE0000] transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Feed */}
        <div className="space-y-5 sm:space-y-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6B6B6B] flex items-center gap-4">
            <div className="h-px flex-grow bg-[#E8E8E6]" aria-hidden="true" />
            En ce moment dans la communauté
            <div className="h-px flex-grow bg-[#E8E8E6]" aria-hidden="true" />
          </h2>

          {requests.map((req, i) => (
            <motion.div
              key={req.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              custom={i}
              variants={fadeUp}
              className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.06)] border border-[#E8E8E6] flex flex-col sm:flex-row gap-5 sm:gap-6"
            >
              <div className={`p-4 rounded-[12px] flex-shrink-0 flex items-center justify-center self-start ${req.type === 'need' ? 'bg-[#BE0000]/10 text-[#BE0000]' : 'bg-[#00843D]/10 text-[#00843D]'}`}>
                {req.type === 'need' ? <AlertCircle className="h-7 w-7" aria-hidden="true" /> : <Sparkles className="h-7 w-7" aria-hidden="true" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-black text-[#0F0F0F]">{req.user}</h3>
                  <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest shrink-0">{req.date}</span>
                </div>
                <p className="text-[#6B6B6B] font-medium leading-relaxed mb-5 text-sm sm:text-base">
                  {req.content}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-[#F5F5F3] hover:bg-[#0F0F0F] hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                    <MessageSquare className="h-3 w-3" aria-hidden="true" />
                    Je peux aider
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 min-h-[44px] bg-[#F5F5F3] hover:bg-[#BE0000] hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                    <Heart className="h-3 w-3" aria-hidden="true" />
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
