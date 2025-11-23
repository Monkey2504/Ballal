
import { LanguageCode } from '../types';

interface Translation {
  nav_home: string;
  nav_directory: string;
  nav_news: string;
  nav_events: string;
  nav_legal: string;
  nav_history: string;
  nav_gallery: string;
  nav_forum: string;
  nav_share: string;
  hero_title: string;
  hero_subtitle: string;
  hero_desc: string;
  btn_assist: string;
  btn_donate: string;
  urgent_title: string;
  urgent_alert: string;
  health_title: string;
  health_desc: string;
  lawyer_title: string;
  lawyer_desc: string;
}

export const translations: Record<LanguageCode, Translation> = {
  fr: {
    nav_home: "Accueil",
    nav_directory: "Annuaire",
    nav_news: "Actualités",
    nav_events: "Agenda",
    nav_legal: "Aide & Droits",
    nav_history: "Histoire",
    nav_gallery: "Galerie",
    nav_forum: "Forum",
    nav_share: "Partager",
    hero_title: "Solidarité Guinée-Belgique",
    hero_subtitle: "Accueillir. Protéger. Unir.",
    hero_desc: "La structure de référence pour la communauté guinéenne en Belgique. Assistance juridique, soutien social et promotion de notre culture.",
    btn_assist: "J'ai besoin d'aide",
    btn_donate: "Faire un don",
    urgent_title: "Solidarité & Droits",
    urgent_alert: "En cas d'arrestation : Ne signez RIEN sans avocat. Demandez 'Pro Deo'.",
    health_title: "Santé & Urgence",
    health_desc: "Même sans papiers, vous avez droit aux soins médicaux (AMU). Allez au CPAS.",
    lawyer_title: "Défense Juridique",
    lawyer_desc: "Trouvez un avocat gratuit (Pro Deo) immédiatement."
  },
  pe: { // Pular (Peul)
    nav_home: "Jaɓɓagol",
    nav_directory: "Yimɓe Amen",
    nav_news: "Kibaruuji",
    nav_events: "Pottitte",
    nav_legal: "Ballal & Sariya",
    nav_history: "Tarikh",
    nav_gallery: "Natal",
    nav_forum: "Kaldal",
    nav_share: "Lollin",
    hero_title: "Ballal Ɠineyankooɓe",
    hero_subtitle: "Jaɓɓagol. Aarugol. Dental.",
    hero_desc: "Fedde mawnde ngam Ɠineyankooɓe e nder Beljik. Ballal sariya, wallitaare renndo e ɓamtaare pinal men.",
    btn_assist: "Miɗo hatoji Ballal",
    btn_donate: "Okku Dokkal",
    urgent_title: "Ballal & Hakke",
    urgent_alert: "Si a nangaama: Wata a siif gorko sariya (avocat) alaa. Ƴam 'Pro Deo'.",
    health_title: "Cellal & Kaaɗi",
    health_desc: "Hay si a alaa kaydi, aɗa jogii hakke e safaare (AMU). Yah CPAS.",
    lawyer_title: "Dandi hoore ma",
    lawyer_desc: "Ƴam gorko sariya (avocat) mo yoɓetaake kooni."
  },
  ma: { // Malinké
    nav_home: "Dalajɛ",
    nav_directory: "Mɔgɔw",
    nav_news: "Kibaru",
    nav_events: "Ɲɛnajɛ",
    nav_legal: "Dɛmɛ & Sariya",
    nav_history: "Tariku",
    nav_gallery: "Ja",
    nav_forum: "Baro",
    nav_share: "Jɛnsɛn",
    hero_title: "Ginɛkaw Dɛmɛ",
    hero_subtitle: "Lasòli. Kakan. Kelenya.",
    hero_desc: "Ginɛkaw ka tɔnba Bɛljiki kɔnɔ. Sariya dɛmɛ, mɔgɔ dɛmɛ ani an ka codo bonya.",
    btn_assist: "N mago bɛ dɛmɛ na",
    btn_donate: "Di li Kɛ",
    urgent_title: "Dɛmɛ & Jojɔ",
    urgent_alert: "Ni i minɛna: I kana sɛbɛn kɛ ni avocat tɛ yen. 'Pro Deo' ɲini.",
    health_title: "Kɛnɛya",
    health_desc: "Hali ni sɛbɛn tɛ i bolo, i bɛ se ka furakɛ (AMU). Ta CPAS.",
    lawyer_title: "Sariya Dɛmɛ",
    lawyer_desc: "Avocat glara ɲini joona joona."
  },
  su: { // Soussou
    nav_home: "Xina",
    nav_directory: "Muxué",
    nav_news: "Kibanyi",
    nav_events: "Lougoudjou",
    nav_legal: "Mali & Sariya",
    nav_history: "Tarix",
    nav_gallery: "Photo",
    nav_forum: "Wongni",
    nav_share: "Xayini",
    hero_title: "Mali Guinékaw Bè",
    hero_subtitle: "Xina. Kantaré. Kérêya.",
    hero_desc: "Guinékaw malima naxan na Belgique. Sariya mali, nun won ma aada bangué.",
    btn_assist: "N makola mali",
    btn_donate: "Hadiya",
    urgent_title: "Mali & Yangeré",
    urgent_alert: "Xa i suxu: I naxa sèbèli yo sa xa avocat mou na. 'Pro Deo' maxori.",
    health_title: "Yalanya",
    health_desc: "Hali kèdi mou na i yi, i noko yalandé (AMU). Siga CPAS.",
    lawyer_title: "Sariya Karamo",
    lawyer_desc: "Avocat naxan mou sarama fen keren na."
  }
};
