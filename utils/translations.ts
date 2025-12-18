import { LanguageCode } from '../types.ts';

export interface Translation {
  nav_home: string;
  nav_legal: string;
  nav_history: string;
  nav_share: string;
  nav_team: string; 
  nav_solidarity: string;
  nav_member_access: string;
  nav_food_project: string; 
  nav_contact: string;
  nav_festival: string;
  nav_directory: string;
  nav_squat: string;
  hero_title: string;
  hero_subtitle: string;
  hero_desc: string;
  hero_asbl: string;
  btn_assist: string;
  btn_donate: string;
  team_title: string;
  team_subtitle: string;
  members_title: string;
  team_collective_strength: string;
  role_admin: string;
  role_admin_f: string;
  join_button: string;
  legal_intro: string;
  legal_school_title: string;
  legal_school_subtitle: string;
  legal_school_point1: string;
  legal_school_point2: string;
  legal_home_title: string;
  legal_home_warrant: string;
  legal_home_police: string;
  form_success_title: string;
  form_success_desc: string;
  form_error_required: string;
  form_error_email: string;
  form_error_consent: string;
  form_demo_warning: string;
  form_name_label: string;
  form_email_label: string;
  form_message_label: string;
  form_consent_gdpr: string;
  form_privacy_link: string;
  contact_form_title: string;
  contact_form_subtitle: string;
  contact_subject_label: string;
  contact_subject_general: string;
  contact_subject_partnership: string;
  contact_subject_support: string;
  contact_send_btn: string;
  email_subject_contact: string;
  footer_rights: string;
  [key: string]: string;
}

const fr: Translation = {
  nav_home: "Accueil",
  nav_legal: "Aide & Droits",
  nav_history: "Histoire",
  nav_share: "Partager",
  nav_team: "Équipe",
  nav_solidarity: "Solidarité",
  nav_member_access: "Accès Membre",
  nav_food_project: "Projet Alimentaire",
  nav_contact: "Contact",
  nav_festival: "Festival Sans-Papiers",
  nav_directory: "Annuaire",
  nav_squat: "Squat et Occupation",
  hero_title: "BALLAL ASBL",
  hero_subtitle: "Accueillir. Protéger. Unir.",
  hero_desc: "La structure de référence pour la communauté guinéenne en Belgique. Entraide, annuaire communautaire et promotion de notre culture.",
  hero_asbl: "Association de solidarité Guinée-Belgique",
  btn_assist: "J'ai besoin d'aide",
  btn_donate: "Faire un don",
  team_title: "Conseil d'Administration",
  team_subtitle: "Les administrateurs au service de la communauté.",
  members_title: "Membres & Militants",
  team_collective_strength: "La force de Ballal, c'est son collectif de militants engagés.",
  role_admin: "Administrateur",
  role_admin_f: "Administratrice",
  join_button: "Rejoindre la lutte",
  legal_intro: "Connaître vos droits est votre premier bouclier.",
  legal_school_title: "Droit à l'Éducation",
  legal_school_subtitle: "L'école est un sanctuaire.",
  legal_school_point1: "Tout enfant a droit à l'instruction.",
  legal_school_point2: "Les écoles ne peuvent pas dénoncer.",
  legal_home_title: "Protection du Domicile",
  legal_home_warrant: "Mandat obligatoire",
  legal_home_police: "La police ne peut entrer sans votre accord ou mandat.",
  form_success_title: "Message envoyé",
  form_success_desc: "Merci, nous vous répondrons bientôt.",
  form_error_required: "Ce champ est requis",
  form_error_email: "Email invalide",
  form_error_consent: "Consentement requis",
  form_demo_warning: "Ceci est une plateforme de démonstration.",
  form_name_label: "Nom complet",
  form_email_label: "Email",
  form_message_label: "Message",
  form_consent_gdpr: "J'accepte le traitement de mes données",
  form_privacy_link: "Confidentialité",
  contact_form_title: "Contactez-nous",
  contact_form_subtitle: "Une question ou un partenariat ?",
  contact_subject_label: "Objet",
  contact_subject_general: "Information générale",
  contact_subject_partnership: "Partenariat",
  contact_subject_support: "Demande d'aide",
  contact_send_btn: "Envoyer",
  email_subject_contact: "Contact Ballal ASBL",
  footer_rights: "Tous droits réservés.",
};

export const translations: Record<string, Translation> = {
  fr,
  en: { ...fr, nav_directory: "Directory" },
  nl: { ...fr, nav_directory: "Gids" }
};

export default translations;