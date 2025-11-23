
import React, { useState, useEffect, useCallback } from 'react';
import { fetchGalleryMemories } from '../services/geminiService';
import { GalleryItem } from '../types';
import { Image as ImageIcon, MapPin, Maximize2, X, Aperture } from 'lucide-react';

const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Tout");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const loadMemories = useCallback(async (theme: string) => {
    setLoading(true);
    try {
      const data = await fetchGalleryMemories(theme);
      setItems(data);
    } catch (error) {
      console.error("Gallery Error", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMemories("Tout");
  }, [loadMemories]);

  // Gestion du scroll et de la touche Echap pour la modale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };

    if (selectedImage) {
      document.body.style.overflow = 'hidden'; // Empêcher le scroll
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const handleFilter = (newFilter: string) => {
    setFilter(newFilter);
    loadMemories(newFilter);
  };

  // Fallback image infaillible
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=800&auto=format&fit=crop";
    e.currentTarget.className = "w-full h-full object-cover opacity-50 grayscale"; 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Galerie & Souvenirs</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Découvrez la beauté de la Guinée à travers notre collection d'images sélectionnées. Du Fouta Djallon à la Forêt, plongez dans l'ambiance du pays.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {['Tout', 'Conakry', 'Basse-Guinée', 'Fouta Djallon', 'Haute-Guinée', 'Forêt'].map((f) => (
            <button
                key={f}
                onClick={() => handleFilter(f)}
                disabled={loading}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    filter === f 
                    ? 'bg-gray-900 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
                {f}
            </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-[16/9] bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, idx) => (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedImage(item)}
                  className="group relative rounded-xl overflow-hidden shadow-md bg-gray-900 aspect-[16/9] cursor-pointer hover:shadow-xl transition-all duration-300"
                >
                    <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        onError={handleImageError}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-full">
                            <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-[#FCD116] text-black text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">
                                {item.tags[0] || 'Guinée'}
                            </span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h3>
                        <p className="text-gray-300 text-xs flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-red-500" /> {item.location}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      )}
      
      <div className="mt-12 flex justify-center text-xs text-gray-400">
        <span className="flex items-center bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            <ImageIcon className="h-3 w-3 mr-2" />
            Collection permanente BALLAL ASBL
        </span>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8 transition-opacity duration-300" onClick={() => setSelectedImage(null)}>
            <button 
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
                onClick={() => setSelectedImage(null)}
            >
                <X className="h-8 w-8" />
            </button>

            <div 
                className="max-w-6xl w-full max-h-full flex flex-col md:flex-row bg-gray-900 rounded-2xl overflow-hidden shadow-2xl" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Container */}
                <div className="flex-grow relative bg-black flex items-center justify-center min-h-[40vh] md:h-[80vh]">
                    <img 
                        src={selectedImage.imageUrl} 
                        alt={selectedImage.title}
                        className="max-w-full max-h-full object-contain"
                        onError={handleImageError}
                    />
                </div>

                {/* Details Side Panel */}
                <div className="w-full md:w-80 lg:w-96 bg-white p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <span className="bg-[#CE1126] text-white text-xs font-bold px-2 py-1 rounded uppercase">
                                {selectedImage.tags[0] || 'Souvenir'}
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">{selectedImage.title}</h3>
                        <div className="flex items-center text-gray-500 mb-6 text-sm">
                            <MapPin className="h-4 w-4 mr-1 text-[#CE1126]" />
                            {selectedImage.location}
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            {selectedImage.description}
                        </p>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span className="italic">Collection BALLAL ASBL</span>
                        <Aperture className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
