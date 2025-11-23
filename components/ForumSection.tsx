import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { ForumPost } from '../types';

const MOCK_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Mamadou Bah',
    title: 'Cherche logement étudiant à Louvain-la-Neuve',
    content: 'Bonjour la famille, mon petit frère arrive en septembre pour ses études à l\'UCLouvain. Si vous avez des pistes pour un kot, merci de me contacter !',
    likes: 12,
    comments: 4,
    timeAgo: '2h'
  },
  {
    id: '2',
    author: 'Fatoumata Camara',
    title: 'Bonne adresse pour tissu Bazin ?',
    content: 'Je cherche un magasin à Bruxelles qui vend du Bazin riche de bonne qualité pour un mariage le mois prochain. Matonge ou ailleurs ?',
    likes: 8,
    comments: 15,
    timeAgo: '5h'
  },
  {
    id: '3',
    author: 'Ibrahima Diallo',
    title: 'Offre d\'emploi : Livreur permis B',
    content: 'Mon entreprise cherche des livreurs sur la région de Charleroi. Envoyez-moi un MP si intéressé.',
    likes: 24,
    comments: 2,
    timeAgo: '1j'
  }
];

const ForumSection: React.FC = () => {
  const [posts] = useState<ForumPost[]>(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Fonctionnalité de publication à venir dans la version complète !');
    setNewPost('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Entraide & Discussions</h2>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
        <form onSubmit={handlePost}>
            <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    Moi
                </div>
                <div className="flex-grow">
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        placeholder="Posez une question, partagez une info..."
                        rows={3}
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                    ></textarea>
                    <div className="mt-2 flex justify-end">
                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 flex items-center transition-colors">
                            <Send className="h-4 w-4 mr-2" />
                            Publier
                        </button>
                    </div>
                </div>
            </div>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
              </div>
              <div className="ml-4 w-full">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-gray-900">{post.author}</h3>
                    <span className="text-xs text-gray-500">{post.timeAgo}</span>
                </div>
                <h4 className="text-lg font-semibold mt-1">{post.title}</h4>
                <p className="mt-2 text-gray-600 text-sm">{post.content}</p>
                
                <div className="mt-4 flex items-center space-x-6 border-t border-gray-100 pt-4">
                    <button className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm">
                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                        {post.likes} J'aime
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-green-600 transition-colors text-sm">
                        <MessageSquare className="h-4 w-4 mr-1.5" />
                        {post.comments} Commentaires
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumSection;