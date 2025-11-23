
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, CornerDownRight } from 'lucide-react';
import { ForumPost, Comment } from '../types';

const MOCK_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Mamadou Bah',
    title: 'Cherche logement étudiant à Louvain-la-Neuve',
    content: 'Bonjour la famille, mon petit frère arrive en septembre pour ses études à l\'UCLouvain. Si vous avez des pistes pour un kot, merci de me contacter !',
    likes: 12,
    comments: 2,
    timeAgo: '2h',
    commentsList: [
        { id: 'c1', author: 'Diallo Ousmane', content: 'Salut Mamadou, regarde sur le groupe Facebook "Guinéens de Belgique", il y a une annonce hier.', date: 'Il y a 1h' },
        { id: 'c2', author: 'Sophie Traoré', content: 'Je connais un propriétaire à Ottignies, envoie-moi un MP.', date: 'Il y a 30 min' }
    ]
  },
  {
    id: '2',
    author: 'Fatoumata Camara',
    title: 'Bonne adresse pour tissu Bazin ?',
    content: 'Je cherche un magasin à Bruxelles qui vend du Bazin riche de bonne qualité pour un mariage le mois prochain. Matonge ou ailleurs ?',
    likes: 8,
    comments: 1,
    timeAgo: '5h',
    commentsList: [
        { id: 'c3', author: 'Aissatou Barry', content: 'Va chez Tantie Rose dans la galerie d\'Ixelles, elle a reçu du nouveau stock !', date: 'Il y a 2h' }
    ]
  },
  {
    id: '3',
    author: 'Ibrahima Diallo',
    title: 'Offre d\'emploi : Livreur permis B',
    content: 'Mon entreprise cherche des livreurs sur la région de Charleroi. Envoyez-moi un MP si intéressé.',
    likes: 24,
    comments: 0,
    timeAgo: '1j',
    commentsList: []
  }
];

const ForumSection: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  
  // État pour gérer quel post a ses commentaires ouverts
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  // État pour gérer le texte du nouveau commentaire en cours de rédaction
  const [newCommentText, setNewCommentText] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: ForumPost = {
        id: Date.now().toString(),
        author: 'Moi (Membre)',
        title: 'Nouvelle discussion',
        content: newPostContent,
        likes: 0,
        comments: 0,
        timeAgo: 'À l\'instant',
        commentsList: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const toggleComments = (postId: string) => {
    if (expandedPostId === postId) {
        setExpandedPostId(null);
    } else {
        setExpandedPostId(postId);
        setNewCommentText(''); // Reset input
    }
  };

  const handleAddComment = (postId: string) => {
      if (!newCommentText.trim()) return;

      const newComment: Comment = {
          id: Date.now().toString(),
          author: 'Moi',
          content: newCommentText,
          date: 'À l\'instant'
      };

      const updatedPosts = posts.map(post => {
          if (post.id === postId) {
              return {
                  ...post,
                  comments: post.comments + 1,
                  commentsList: [...(post.commentsList || []), newComment]
              };
          }
          return post;
      });

      setPosts(updatedPosts);
      setNewCommentText('');
  };

  const handleLike = (postId: string) => {
      const updatedPosts = posts.map(post => {
          if (post.id === postId) {
              return { ...post, likes: post.likes + 1 };
          }
          return post;
      });
      setPosts(updatedPosts);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* H1 SEO Optimization */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Entraide & Discussions</h1>
      <p className="text-gray-500 mb-8">Posez vos questions, partagez vos bons plans et échangez avec la communauté.</p>

      {/* ZONE DE PUBLICATION */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-10 border border-gray-200">
        <form onSubmit={handlePost}>
            <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-[#CE1126] font-bold border border-red-100 flex-shrink-0">
                    <User className="h-6 w-6" />
                </div>
                <div className="flex-grow">
                    <textarea
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder="Quoi de neuf ? Posez une question ou partagez une info..."
                        rows={3}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    ></textarea>
                    <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">Votre message sera visible par tous.</span>
                        <button 
                            type="submit" 
                            disabled={!newPostContent.trim()}
                            className="bg-[#CE1126] text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 flex items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-red-100 shadow-lg"
                        >
                            <Send className="h-4 w-4 mr-2" />
                            Publier
                        </button>
                    </div>
                </div>
            </div>
        </form>
      </div>

      {/* LISTE DES POSTS */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#FCD116] to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {post.author.charAt(0)}
                        </div>
                    </div>
                    <div className="ml-4 w-full">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-gray-900">{post.author}</h3>
                                <span className="text-xs text-gray-500 font-medium">{post.timeAgo}</span>
                            </div>
                        </div>
                        <h4 className="text-lg font-bold mt-2 text-slate-800">{post.title}</h4>
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed">{post.content}</p>
                    </div>
                </div>

                {/* BOUTONS D'ACTION */}
                <div className="mt-6 flex items-center space-x-6 border-t border-gray-50 pt-4">
                    <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm font-bold group"
                    >
                        <ThumbsUp className="h-5 w-5 mr-2 group-active:scale-125 transition-transform" />
                        {post.likes} <span className="hidden sm:inline ml-1">J'aime</span>
                    </button>
                    <button 
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center transition-colors text-sm font-bold ${expandedPostId === post.id ? 'text-[#009460]' : 'text-gray-500 hover:text-[#009460]'}`}
                    >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        {post.comments} <span className="hidden sm:inline ml-1">Commentaires</span>
                    </button>
                </div>
            </div>

            {/* SECTION COMMENTAIRES (EXPANDABLE) */}
            {expandedPostId === post.id && (
                <div className="bg-gray-50 p-6 border-t border-gray-100 animation-fade-in">
                    
                    {/* Liste des commentaires */}
                    {post.commentsList && post.commentsList.length > 0 ? (
                        <div className="space-y-4 mb-6">
                            {post.commentsList.map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                    <div className="mt-1">
                                        <div className="h-8 w-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {comment.author.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex-grow">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-bold text-gray-900">{comment.author}</span>
                                            <span className="text-[10px] text-gray-400">{comment.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-4 text-gray-400 text-sm italic mb-4">
                            Aucun commentaire pour l'instant. Soyez le premier !
                        </div>
                    )}

                    {/* Input nouveau commentaire */}
                    <div className="flex gap-3 items-start">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0 mt-1">
                            Moi
                        </div>
                        <div className="flex-grow relative">
                            <input
                                type="text"
                                value={newCommentText}
                                onChange={(e) => setNewCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                placeholder="Écrivez un commentaire..."
                                className="w-full pl-4 pr-12 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-[#009460] focus:ring-1 focus:ring-[#009460] text-sm bg-white"
                            />
                            <button 
                                onClick={() => handleAddComment(post.id)}
                                disabled={!newCommentText.trim()}
                                className="absolute right-1 top-1 p-1.5 bg-[#009460] text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-300 transition-colors"
                            >
                                <CornerDownRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumSection;
