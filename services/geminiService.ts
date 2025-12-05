
// --- BANQUE D'IMAGES STATIQUES (OPTIMISÉE) ---
const FALLBACK_HERO = {
  imageUrl: "https://images.unsplash.com/photo-1547619292-240402b5ae5d?q=80&w=1600&auto=format&fit=crop",
  label: null
};

export interface HeroImageResult {
    imageUrl: string;
    label: string | null;
}

// --- STATIC SERVICE METHODS (NO API) ---

export const fetchHeroImage = async (): Promise<HeroImageResult> => {
    return FALLBACK_HERO;
};
