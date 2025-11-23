import React from 'react';
import { Image as ImageIcon, Heart, MapPin } from 'lucide-react';

const GallerySection: React.FC = () => {
  // Using picsum as placeholders
  const images = [
    { id: 1, src: 'https://picsum.photos/seed/guinea1/400/300', title: 'Fête de l\'Indépendance 2023', location: 'Bruxelles', description: 'Rassemblement place du Luxembourg.', size: 'col-span-1 md:col-span-2 row-span-2' },
    { id: 2, src: 'https://picsum.photos/seed/guinea_market/400/500', title: 'Saveurs du pays', location: 'Matonge', description: 'Marché local avec produits frais.', size: 'col-span-1 row-span-2' },
    { id: 3, src: 'https://picsum.photos/seed/guinea_wedding/400/300', title: 'Mariage Traditionnel', location: 'Liège', description: 'Cérémonie en tenue traditionnelle.', size: 'col-span-1' },
    { id: 4, src: 'https://picsum.photos/seed/guinea_food/400/300', title: 'Gastronomie', location: 'Anvers', description: 'Préparation du riz au gras collectif.', size: 'col-span-1' },
    { id: 5, src: 'https://picsum.photos/seed/guinea_music/400/300', title: 'Concert de la Fraternité', location: 'Mons', description: 'Artistes guinéens et belges sur scène.', size: 'col-span-1' },
    { id: 6, src: 'https://picsum.photos/seed/guinea_youth/400/400', title: 'La Jeunesse', location: 'Charleroi', description: 'Tournoi de football inter-quartiers.', size: 'col-span-1 md:col-span-2' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
        <div>
            <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
                <span className="text-red-600 mr-1">G</span>
                <span className="text-yellow-500 mr-1">u</span>
                <span className="text-green-600 mr-2">i</span>
                <span>Galerie</span>
            </h2>
            <p className="mt-2 text-lg text-gray-600">
                Le visage vibrant de notre communauté. Entre tradition et modernité belge.
            </p>
        </div>
        <button className="mt-4 md:mt-0 bg-gray-900 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-red-600 transition-all shadow-md">
            + Ajouter une photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {images.map((img) => (
          <div key={img.id} className={`relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer ${img.size}`}>
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-white font-bold text-xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{img.title}</h3>
                <p className="text-gray-300 text-sm mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{img.description}</p>
                <div className="flex justify-between items-center mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                    <span className="text-yellow-400 text-xs uppercase tracking-wider flex items-center font-bold">
                        <MapPin className="h-3 w-3 mr-1" /> {img.location}
                    </span>
                    <button className="text-white hover:text-red-500 transition-colors bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <Heart className="h-4 w-4" />
                    </button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;