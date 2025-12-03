
import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Send, User, CornerDownRight, Flag, AlertCircle, Trash2, Lock } from 'lucide-react';
import { ForumPost, Comment, LanguageCode } from '../types';
import { translations } from '../utils/translations';
import { useAuth } from '../contexts/AuthContext';

interface ForumSectionProps {
  language: LanguageCode;
}

const STORAGE_KEY_POSTS = 'ballal_forum_posts_v2';

const MOCK_INITIAL_POSTS: ForumPost[] = [
  {
    id: '1',
    authorId: 'user-mock-1',
    author: 'Mamadou Bah',
    title: 'Cherche logement étudiant à Louvain-la-Neuve',
    content: 'Bonjour la famille, mon petit frère arrive en septembre pour ses études à l\'UCLouvain. Si vous avez des pistes pour un kot, merci de me contacter !',
    likes: 12,
    comments: 2,
    timeAgo: '2h',
    timestamp: Date.now() - 7200000,
    commentsList: [
        { id: 'c1', authorId: 'user-mock-2', author: 'Diallo Ousmane', content: 'Salut Mamadou, regarde sur le groupe Facebook "Guinéens de Belgique", il y a une annonce hier.', date: 'Il y a 1h' },
        { id: 'c2', authorId: 'user-mock-3', author: 'Sophie Traoré', content: 'Je connais un propriétaire à Ottignies, envoie-moi un MP.', date: 'Il y a 30 min' }
    ]
  },
  {
    id: '2',
    authorId: 'user-mock-4',
    author: 'Fatoumata Camara',
    title: 'Bonne adresse pour tissu Bazin ?',
    content: 'Je cherche un magasin à Bruxelles qui vend du Bazin riche de bonne qualité pour un mariage le mois prochain. Matonge ou ailleurs ?',
    likes: 8,
    comments: 1,
    timeAgo: '5h',
    timestamp: Date.now() - 18000000,
    commentsList: [
        { id: 'c3', authorId: 'user-mock-5', author: 'Aissatou Barry', content: 'Va chez Tantie Rose dans la galerie d\'Ixelles, elle a reçu du nouveau stock !', date: 'Il y a 2h' }
    ]
  },
  {
    id: '3',
    authorId: 'user-mock-6',
    author: 'Ibrahima Diallo',
    title: 'Offre d\'emploi : Livreur permis B',
    content: 'Mon entreprise cherche des livreurs sur la région de Charleroi. Envoyez-moi un MP si intéressé.',
    likes: 24,
    comments: 0,
    timeAgo: '1j',
    timestamp: Date.now() - 86400000,
    commentsList: []
  }
];

const ForumSection: React.FC<ForumSectionProps> = ({ language }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState(''); // Added Title field
  const t = translations[language];
  
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Load from Storage or Mock on init
  useEffect(() => {
    const storedPosts = localStorage.getItem(STORAGE_KEY_POSTS);
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      setPosts(MOCK_INITIAL_POSTS);
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(MOCK_INITIAL_POSTS));
    }
  }, []);

  // Helper to save to storage
  const savePosts = (updatedPosts: ForumPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updatedPosts));
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !user) return;

    const newPost: ForumPost = {
        id: Date.now().toString(),
        authorId: user.id,
        author: user.name,
        title: newPostTitle || 'Nouvelle discussion',
        content: newPostContent,
        likes: 0,
        comments: 0,
        timeAgo: 'À l\'instant',
        timestamp: Date.now(),
        commentsList: []
    };

    const updatedPosts = [newPost, ...posts];
    savePosts(updatedPosts);
    setNewPostContent('');
    setNewPostTitle('');
  };

  const toggleComments = (postId: string) => {
    if (expandedPostId === postId) {
        setExpandedPostId(null);
    } else {
        setExpandedPostId(postId);
        setNewCommentText('');
    }
  };

  const handleAddComment = (postId: string) => {
      if (!newCommentText.trim() || !user) return;

      const newComment: Comment = {
          id: Date.now().toString(),
          authorId: user.id,
          author: user.name,
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

      savePosts(updatedPosts);
      setNewCommentText('');
  };

  const handleLike = (postId: string) => {
      const updatedPosts = posts.map(post => {
          if (post.id === postId) {
              return { ...post, likes: post.likes + 1 };
          }
          return post;
      });
      savePosts(updatedPosts);
  };

  const handleDelete = (postId: string) => {
    if(!window.confirm("Supprimer ce post ?")) return;
    const updatedPosts = posts.filter(p => p.id !== postId);
    savePosts(updatedPosts);
  };

  const handleReport = (postId: string) => {
    if(!window.confirm("Signaler ce contenu pour non-respect des règles ?")) return;
    const updatedPosts = posts.map(p => {
        if(p.id === postId) return { ...p, isReported: true };
        return p;
    });
    savePosts(updatedPosts);
    alert("Merci. Le contenu a été signalé à l'administration.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{t.forum_title}</h1>
      <p className="text-gray-500 mb-8">{t.forum_subtitle}</p>

      {/* ZONE DE PUBLICATION */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-10 border border-gray-200 relative overflow-hidden">
        {!user && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center text-center p-6">
                <div className="bg-white p-6 rounded-2xl shadow-xl border border-red-100 max-w-sm">
                    <Lock className="h-8 w-8 text-[#CE1126] mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">Accès Membre Requis</h3>
                    <p className="text-sm text-gray-500 mb-4">Connectez-vous pour participer aux discussions de la communauté.</p>
                </div>
            </div>
        )}

        <form onSubmit={handlePost} className={!user ? 'opacity-20 pointer-events-none' : ''}>
            <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-[#CE1126] font-bold border border-red-100 flex-shrink-0">
                    {user ? user.avatar : <User className="h-6 w-6" />}
                </div>
                <div className="flex-grow space-y-3">
                    <input 
                        type="text"
                        placeholder="Titre du sujet (optionnel)"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none text-sm font-bold"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <textarea
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none bg-gray-50 focus:bg-white transition-colors"
                        placeholder={t.forum_placeholder}
                        rows={3}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400 font-medium">{t.forum_public_warning}</span>
                        <button 
                            type="submit" 
                            disabled={!newPostContent.trim()}
                            className="bg-[#CE1126] text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 flex items-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-red-100 shadow-lg"
                        >
                            <Send className="h-4 w-4 mr-2" />
                            {t.forum_publish_btn}
                        </button>
                    </div>
                </div>
            </div>
        </form>
      </div>

      {/* LISTE DES POSTS */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className={`bg-white rounded-2xl shadow-sm border ${post.isReported ? 'border-red-200 bg-red-50/10' : 'border-gray-100'} overflow-hidden`}>
            {post.isReported && (
                <div className="bg-red-50 text-red-600 px-4 py-1 text-xs font-bold flex items-center border-b border-red-100">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Contenu signalé - En attente de modération
                </div>
            )}
            
            <div className="p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FCD116] to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        {post.author.charAt(0)}
                        </div>
                    </div>
                    <div className="ml-4 w-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">{post.author}</h3>
                                <span className="text-xs text-gray-500 font-medium">{post.timeAgo}</span>
                            </div>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handleReport(post.id)}
                                    className="text-gray-300 hover:text-orange-500 transition-colors"
                                    title="Signaler"
                                >
                                    <Flag className="h-4 w-4" />
                                </button>
                                {user && user.id === post.authorId && (
                                    <button 
                                        onClick={() => handleDelete(post.id)}
                                        className="text-gray-300 hover:text-red-600 transition-colors"
                                        title="Supprimer"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {post.title && <h4 className="text-lg font-bold mt-2 text-slate-800">{post.title}</h4>}
                        <p className="mt-2 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                    </div>
                </div>

                {/* BOUTONS D'ACTION */}
                <div className="mt-6 flex items-center space-x-6 border-t border-gray-50 pt-4">
                    <button 
                        onClick={() => handleLike(post.id)}
                        className="flex items-center text-gray-500 hover:text-red-600 transition-colors text-sm font-bold group"
                    >
                        <ThumbsUp className="h-5 w-5 mr-2 group-active:scale-125 transition-transform" />
                        {post.likes} <span className="hidden sm:inline ml-1">{t.forum_like}</span>
                    </button>
                    <button 
                        onClick={() => toggleComments(post.id)}
                        className={`flex items-center transition-colors text-sm font-bold ${expandedPostId === post.id ? 'text-[#009460]' : 'text-gray-500 hover:text-[#009460]'}`}
                    >
                        <MessageSquare className="h-5 w-5 mr-2" />
                        {post.comments} <span className="hidden sm:inline ml-1">{t.forum_comments}</span>
                    </button>
                </div>
            </div>

            {/* SECTION COMMENTAIRES */}
            {expandedPostId === post.id && (
                <div className="bg-gray-50 p-6 border-t border-gray-100 animation-fade-in">
                    
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
                            {t.forum_no_comments}
                        </div>
                    )}

                    {/* Input nouveau commentaire */}
                    {user ? (
                        <div className="flex gap-3 items-start">
                            <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs flex-shrink-0 mt-1">
                                {user.avatar}
                            </div>
                            <div className="flex-grow relative">
                                <input
                                    type="text"
                                    value={newCommentText}
                                    onChange={(e) => setNewCommentText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                    placeholder={t.forum_write_comment}
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
                    ) : (
                        <div className="text-center text-xs text-gray-500 py-2">
                            Connectez-vous pour commenter.
                        </div>
                    )}
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumSection;
