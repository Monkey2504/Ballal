
import React, { useState } from 'react';
import { MessageSquare, Heart, Handshake, Users, Send, AlertCircle, Sparkles } from 'lucide-react';

interface MutualAidRequest {
  id: string;
  user: string;
  type: 'need' | 'offer';
  content: string;
  date: string;
}

const SolidarityNetwork: React.FC = () => {
  const [requests, setRequests] = useState<MutualAidRequest[]>([
    { id: '1', user: 'Mamadou', type: 'need', content: 'Cherche quelqu\'un pour m\'accompagner à la commune de Schaerbeek pour traduire un document.', date: 'Il y a 2h' },
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
      date: 'À l\'instant'
    };
    setRequests([newReq, ...requests]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pb-20 pt-10 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#FFCC00]/15 text-[#8B7000] font-bold text-[10px] uppercase tracking-[0.3em] mb-6 border border-[#FFCC00]/25">
            <Users className="h-4 w-4" />
            Connecter la Communauté
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-black text-[#0F0F0F] tracking-tighter leading-none mb-6">
            Espace <span className="text-[#00843D]">Entraide</span>
          </h1>
          <p className="text-lg text-[#6B6B6B] font-medium max-w-xl mx-auto leading-relaxed">
            Mettez en relation vos besoins et vos ressources au sein de la communauté.
          </p>
        </header>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-soft-elegant border border-gray-100 mb-12">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMsgType('need')}
              className={`flex-1 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${msgType === 'need' ? 'bg-guinea-red text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}
            >
              J'ai besoin d'aide
            </button>
            <button
              onClick={() => setMsgType('offer')}
              className={`flex-1 py-3 rounded-xl font-black text-[10px] tracking-widest uppercase transition-all ${msgType === 'offer' ? 'bg-guinea-green text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}
            >
              Je peux aider
            </button>
          </div>
          <div className="relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={msgType === 'need' ? "Décrivez votre situation — nous trouverons quelqu'un." : "Précisez ce que vous pouvez apporter à la communauté."}
              className="w-full p-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-guinea-yellow/50 outline-none min-h-[120px] font-medium text-gray-700 transition-all"
            />
            <button 
              onClick={handlePost}
              className="absolute bottom-4 right-4 bg-[#0F0F0F] text-white p-3 rounded-xl hover:bg-guinea-red transition-all shadow-lg"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 flex items-center gap-4">
            <div className="h-px flex-grow bg-gray-200"></div>
            En ce moment dans la communauté
            <div className="h-px flex-grow bg-gray-200"></div>
          </h2>
          
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-8 rounded-[2rem] shadow-soft-elegant border border-gray-100 flex flex-col md:flex-row gap-6 hover:translate-x-1 transition-transform group">
              <div className={`p-4 rounded-2xl flex-shrink-0 flex items-center justify-center ${req.type === 'need' ? 'bg-guinea-red/10 text-guinea-red' : 'bg-guinea-green/10 text-guinea-green'}`}>
                {req.type === 'need' ? <AlertCircle className="h-8 w-8" /> : <Sparkles className="h-8 w-8" />}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-[#0F0F0F]">{req.user}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{req.date}</span>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-6">
                  {req.content}
                </p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-2 bg-gray-50 hover:bg-[#0F0F0F] hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                    <MessageSquare className="h-3 w-3" />
                    Je peux aider
                  </button>
                  <button className="flex items-center gap-2 px-6 py-2 bg-gray-50 hover:bg-guinea-red hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all">
                    <Heart className="h-3 w-3" />
                    Soutenir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SolidarityNetwork;
