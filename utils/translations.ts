
import { LanguageCode } from '../types.ts';

export interface Translation {
  // Navigation
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
  
  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_desc: string;
  hero_asbl: string;
  btn_assist: string;
  btn_donate: string;
  
  // Team
  team_title: string;
  team_subtitle: string;
  members_title: string;
  team_collective_strength: string;
  role_admin: string;
  role_admin_f: string;
  join_button: string;

  // Legal Aid
  legal_intro: string;
  legal_school_title: string;
  legal_school_subtitle: string;
  legal_school_point1: string;
  legal_school_point2: string;
  legal_home_title: string;
  legal_home_warrant: string;
  legal_home_police: string;
  legal_strategy_title: string;
  legal_9bis_desc: string;
  legal_9ter_desc: string;
  legal_warning: string;

  // History
  hist_subtitle: string;
  hist_1958_title: string;
  hist_1958_desc: string;
  hist_1960_title: string;
  hist_1960_desc: string;
  hist_2024_title: string;
  hist_2024_desc: string;

  // Share
  share_subtitle: string;
  share_text: string;
  share_email_subject: string;
  share_whatsapp: string;
  share_facebook: string;
  share_twitter: string;
  share_email: string;
  share_telegram: string;
  share_linkedin: string;
  share_downloading: string;
  share_download_success: string;
  share_download_qr: string;
  share_qr_inst: string;
  share_link_label: string;
  share_copied: string;
  share_copy: string;
  share_privacy_warning: string;

  // Donation
  donate_title: string;
  donate_subtitle: string;
  donate_goal_annual: string;
  donate_goal_annual_desc: string;
  donate_goal_previous: string;
  donate_goal_previous_desc: string;
  donate_copy_success: string;

  // Food Autonomy
  food_title: string;
  food_slogan: string;
  food_goal_squats: string;
  food_goal_people: string;
  food_goal_growth: string;
  food_goal_partners: string;
  food_intro_title: string;
  food_intro_text: string;
  food_compliance_title: string;
  food_compliance_text: string;
  food_partners_title: string;
  food_partners_text: string;
  food_partners_btn: string;
  food_collectives_title: string;
  food_collectives_text: string;
  food_collectives_btn: string;
  email_subject_food_donor: string;
  email_body_food_donor: string;
  email_subject_food_network: string;
  email_body_food_network: string;

  // Forms
  form_supplier_title: string;
  form_network_title: string;
  form_supplier_subtitle: string;
  form_network_subtitle: string;
  form_name_label: string;
  form_org_label: string;
  form_email_label: string;
  form_phone_label: string;
  form_donation_type_label: string;
  form_location_label: string;
  form_message_label: string;
  form_submit_btn: string;
  form_success_title: string;
  form_success_desc: string;
  form_back_btn: string;
  form_demo_warning: string;
  form_consent_gdpr: string;
  form_error_required: string;
  form_error_email: string;
  form_error_consent: string;
  form_privacy_link: string;

  // Contact
  contact_form_title: string;
  contact_form_subtitle: string;
  contact_subject_label: string;
  contact_subject_general: string;
  contact_subject_partnership: string;
  contact_subject_support: string;
  contact_send_btn: string;
  email_subject_contact: string;

  // Footer & Legal Docs
  footer_rights: string;
  footer_bce: string;
  footer_quick_links: string;
  footer_resources: string;
  footer_member: string;
  footer_privacy: string;
  footer_terms: string;
  footer_contact: string;
  privacy_updated: string;
  privacy_controller: string;
  privacy_sec1_title: string;
  privacy_sec1_desc: string;
  privacy_address: string;
  privacy_email: string;
  privacy_phone: string;
  privacy_sec2_title: string;
  privacy_sec2_desc: string;
  privacy_form_contact: string;
  privacy_data_types: string;
  privacy_purpose: string;
  privacy_newsletter: string;
  privacy_sec3_title: string;
  privacy_sec3_desc: string;
  privacy_sec4_title: string;
  privacy_sec4_desc: string;
  privacy_sec5_title: string;
  privacy_sec5_desc: string;
  privacy_contact_rights: string;
  team_subtitle_original: string;
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
    nav_directory: "Communauté",
    nav_squat: "Squat",
    hero_title: "BALLAL ASBL",
    hero_subtitle: "Accueillir. Protéger. Unir.",
    hero_desc: "La structure de référence pour la communauté guinéenne en Belgique. Assistance juridique, soutien social et promotion de notre culture.",
    hero_asbl: "Association de solidarité Guinée-Belgique",
    btn_assist: "J'ai besoin d'aide",
    btn_donate: "Faire un don",
    team_title: "Conseil d'Administration",
    team_subtitle: "Les administrateurs au service de la communauté.",
    team_subtitle_original: "La structure de référence pour la communauté guinéenne en Belgique.",
    members_title: "Membres & Militants",
    team_collective_strength: "La force de Ballal, c'est son collectif de militants engagés derrière une institution solide.",
    role_admin: "Administrateur",
    role_admin_f: "Administratrice",
    join_button: "Rejoindre la lutte",
    
    // Legal Aid
    legal_intro: "Connaître vos droits est votre premier bouclier.",
    legal_school_title: "Droit à l'Éducation",
    legal_school_subtitle: "L'école est un sanctuaire.",
    legal_school_point1: "Tout enfant a droit à l'instruction, quel que soit son statut.",
    legal_school_point2: "Les écoles ne sont pas autorisées à dénoncer les élèves sans-papiers.",
    legal_home_title: "Protection du Domicile",
    legal_home_warrant: "Mandat de perquisition obligatoire",
    legal_home_police: "La police ne peut entrer chez vous sans votre accord ou sans mandat.",
    legal_strategy_title: "Stratégies de Régularisation",
    legal_9bis_desc: "Régularisation pour raisons humanitaires exceptionnelles.",
    legal_9ter_desc: "Régularisation pour raisons médicales graves.",
    legal_warning: "Attention : ces procédures sont complexes et nécessitent un accompagnement juridique.",

    // History
    hist_subtitle: "Quatre vagues, une seule communauté résiliente.",
    hist_1958_title: "L'An de l'Indépendance",
    hist_1958_desc: "La Guinée choisit son destin face à la France.",
    hist_1960_title: "La Première Vague",
    hist_1960_desc: "Les pionniers et étudiants s'installent en Belgique.",
    hist_2024_title: "Aujourd'hui : Une Force Unie",
    hist_2024_desc: "La communauté guinéenne participe activement à la vie sociale belge.",

    // Share
    share_subtitle: "Aidez-nous à faire connaître notre mission en partageant avec votre communauté",
    share_text: "Ballal ASBL - Solidarité Guinée-Belgique • Justice, Culture, Autonomie Alimentaire",
    share_email_subject: "Découvrez Ballal ASBL",
    share_whatsapp: "WhatsApp",
    share_facebook: "Facebook",
    share_twitter: "Twitter",
    share_email: "Email",
    share_telegram: "Telegram",
    share_linkedin: "LinkedIn",
    share_downloading: "Téléchargement...",
    share_download_success: "QR Code téléchargé",
    share_download_qr: "Télécharger le QR Code",
    share_qr_inst: "Scannez ce code pour accéder au site instantanément.",
    share_link_label: "Lien de partage",
    share_copied: "Lien copié",
    share_copy: "Copier le lien",
    share_privacy_warning: "Partagez ce lien uniquement sur des plateformes sécurisées.",

    // Donation
    donate_title: "Soutenir Ballal ASBL",
    donate_subtitle: "Vos dons permettent de financer nos actions juridiques et sociales au quotidien.",
    donate_goal_annual: "Objectif annuel",
    donate_goal_annual_desc: "Pour assurer la permanence juridique et sociale.",
    donate_goal_previous: "Collecté précédemment",
    donate_goal_previous_desc: "Grâce à votre générosité l'an dernier.",
    donate_copy_success: "Coordonnées copiées avec succès !",

    // Food Autonomy
    food_title: "Autonomie Alimentaire",
    food_slogan: "Personne ne doit avoir faim dans notre communauté.",
    food_goal_squats: "Lieux de distribution",
    food_goal_people: "Personnes aidées",
    food_goal_growth: "Croissance",
    food_goal_partners: "Partenaires actifs",
    food_intro_title: "Notre Réseau de Solidarité",
    food_intro_text: "Nous connectons les surplus alimentaires avec ceux qui en ont le plus besoin.",
    food_compliance_title: "Sécurité & Traçabilité",
    food_compliance_text: "Tous nos dons respectent les normes d'hygiène et de sécurité alimentaire.",
    food_partners_title: "Devenir Donateur",
    food_partners_text: "Vous êtes un commerçant ou un producteur avec des surplus ?",
    food_partners_btn: "Proposer un don",
    food_collectives_title: "Rejoindre le Réseau",
    food_collectives_text: "Vous gérez un collectif ou un habitat groupé ?",
    food_collectives_btn: "S'inscrire comme partenaire",
    email_subject_food_donor: "Proposition de don alimentaire",
    email_body_food_donor: "Bonjour, je souhaite proposer des surplus alimentaires pour votre réseau.",
    email_subject_food_network: "Demande d'adhésion au réseau alimentaire",
    email_body_food_network: "Bonjour, nous souhaiterions rejoindre votre réseau de distribution.",

    // Forms
    form_supplier_title: "Devenir Fournisseur Solidaire",
    form_network_title: "Rejoindre le Réseau Collectif",
    form_supplier_subtitle: "Aidez-nous à lutter contre le gaspillage.",
    form_network_subtitle: "Mutualisons nos ressources alimentaires.",
    form_name_label: "Nom Complet",
    form_org_label: "Organisation / ASBL",
    form_email_label: "Adresse E-mail",
    form_phone_label: "Numéro de Téléphone",
    form_donation_type_label: "Type de Don",
    form_location_label: "Localisation / Secteur",
    form_message_label: "Message / Précisions",
    form_submit_btn: "Envoyer ma demande",
    form_success_title: "Message envoyé",
    form_success_desc: "Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.",
    form_back_btn: "Retour",
    form_demo_warning: "Ceci est une plateforme de démonstration.",
    form_consent_gdpr: "J'accepte le traitement de mes données.",
    form_error_required: "Ce champ est requis.",
    form_error_email: "Email invalide.",
    form_error_consent: "Consentement requis.",
    form_privacy_link: "Confidentialité",

    // Contact
    contact_form_title: "Contactez Ballal",
    contact_form_subtitle: "Une question, une demande d'aide ou un partenariat ?",
    contact_subject_label: "Objet de votre message",
    contact_subject_general: "Information générale",
    contact_subject_partnership: "Partenariat",
    contact_subject_support: "Demande d'aide",
    contact_send_btn: "Envoyer le message",
    email_subject_contact: "Contact via le site Ballal ASBL",

    // Footer & Legal Docs
    footer_rights: "Tous droits réservés.",
    footer_bce: "BCE : 1016.925.333",
    footer_quick_links: "Navigation rapide",
    footer_resources: "Ressources",
    footer_member: "Devenir Membre",
    footer_privacy: "Confidentialité",
    footer_terms: "Conditions",
    footer_contact: "Contact",
    privacy_updated: "Dernière mise à jour :",
    privacy_controller: "Responsable du traitement :",
    privacy_sec1_title: "Collecte des données",
    privacy_sec1_desc: "Nous collectons les données strictement nécessaires à nos missions sociales.",
    privacy_address: "Adresse :",
    privacy_email: "E-mail :",
    privacy_phone: "Téléphone :",
    privacy_sec2_title: "Utilisation des données",
    privacy_sec2_desc: "Vos données ne sont jamais vendues à des tiers.",
    privacy_form_contact: "Formulaires de contact",
    privacy_data_types: "Types de données :",
    privacy_purpose: "Finalité :",
    privacy_newsletter: "Newsletter",
    privacy_sec3_title: "Partage des données",
    privacy_sec3_desc: "Nous ne partageons vos données qu'avec votre accord explicite.",
    privacy_sec4_title: "Cookies",
    privacy_sec4_desc: "Nous utilisons uniquement des cookies techniques essentiels.",
    privacy_sec5_title: "Vos droits",
    privacy_sec5_desc: "Vous disposez d'un droit d'accès et de suppression de vos données.",
    privacy_contact_rights: "Pour exercer vos droits, contactez-nous :"
};

export const translations: Record<string, Translation> = {
  fr,
  en: { ...fr },
  nl: { ...fr }
};
