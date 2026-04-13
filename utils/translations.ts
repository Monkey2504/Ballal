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
  hist_subtitle: string;
  hist_1958_title: string;
  hist_1958_desc: string;
  hist_1960_title: string;
  hist_1960_desc: string;
  hist_2024_title: string;
  hist_2024_desc: string;
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
  // Donation
  donate_title: string;
  donate_subtitle: string;
  donate_goal_annual: string;
  donate_goal_annual_desc: string;
  donate_goal_previous: string;
  donate_goal_previous_desc: string;
  donate_copy_success: string;
  // Share
  share_text: string;
  share_email_subject: string;
  share_subtitle: string;
  share_whatsapp: string;
  share_facebook: string;
  share_twitter: string;
  share_email: string;
  share_copied: string;
  share_copy: string;
  share_link_label: string;
  share_qr_inst: string;
  share_privacy_warning: string;
  share_downloading: string;
  share_download_success: string;
  share_download_qr: string;
  share_linkedin: string;
  share_telegram: string;
  // Privacy & Terms
  footer_privacy: string;
  footer_terms: string;
  privacy_updated: string;
  privacy_controller: string;
  privacy_sec1_title: string;
  privacy_sec1_desc: string;
  privacy_address: string;
  privacy_email: string;
  privacy_phone: string;
  privacy_sensitive_title: string;
  privacy_sensitive_desc: string;
  privacy_sec2_title: string;
  privacy_sec2_desc: string;
  privacy_form_contact: string;
  privacy_data_types: string;
  privacy_purpose: string;
  privacy_newsletter: string;
  privacy_legal_secrecy: string;
  privacy_legal_secrecy_desc: string;
  privacy_sec3_title: string;
  privacy_sec3_desc: string;
  privacy_sec4_title: string;
  privacy_sec4_desc: string;
  privacy_sec5_title: string;
  privacy_simplified_rights: string;
  privacy_contact_rights: string;
  terms_legal_warning_bold: string;
  // FoodForms
  form_back_btn: string;
  form_org_label: string;
  form_phone_label: string;
  form_donation_type_label: string;
  form_location_label: string;
  form_supplier_title: string;
  form_supplier_subtitle: string;
  form_network_title: string;
  form_network_subtitle: string;
  form_submit_btn: string;
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
  nav_squat: "Logement",
  hero_title: "BALLAL ASBL",
  hero_subtitle: "Accueillir. Défendre. Rassembler.",
  hero_desc: "Quand les institutions se taisent, Ballal agit. Nous défendons le droit au logement, à la justice et à la dignité pour chaque Guinéen de Belgique — sans condition, sans délai, depuis 2022.",
  hero_asbl: "Association de solidarité Guinée-Belgique",
  btn_assist: "Demander de l'aide",
  btn_donate: "Soutenir la cause",
  team_title: "Conseil d'Administration",
  team_subtitle: "Chaque administrateur est un militant de la dignité humaine.",
  members_title: "Membres & Militants",
  team_collective_strength: "Derrière chaque action Ballal, des femmes et des hommes qui ne lâchent pas.",
  role_admin: "Administrateur",
  role_admin_f: "Administratrice",
  join_button: "Rejoindre le combat",
  legal_intro: "La loi vous protège — même sans papiers. Connaître vos droits, c'est vous défendre.",
  legal_school_title: "Droit à l'Éducation",
  legal_school_subtitle: "Aucun enfant ne peut être refusé à l'école.",
  legal_school_point1: "Tout enfant a droit à l'instruction, quel que soit son statut administratif.",
  legal_school_point2: "Les établissements scolaires ne peuvent pas signaler les familles aux autorités.",
  legal_home_title: "Votre Domicile Vous Appartient",
  legal_home_warrant: "Ils ne peuvent pas entrer sans mandat. C'est la loi.",
  legal_home_police: "L'article 15 de la Constitution belge garantit l'inviolabilité de votre domicile. Refusez l'entrée. Exigez le mandat. Gardez le silence.",
  hist_subtitle: "Du courage de 1958 à la diaspora engagée d'aujourd'hui.",
  hist_1958_title: "Le jour où la Guinée a dit NON",
  hist_1958_desc: "28 septembre 1958. La Guinée refuse le référendum de De Gaulle et choisit l'indépendance immédiate — seule, première, sans filet. Un acte de courage sans précédent en Afrique subsaharienne francophone qui forge encore notre identité.",
  hist_1960_title: "Les Pionniers qui ont traversé",
  hist_1960_desc: "Dès les années 1960, les premiers étudiants guinéens rejoignent les universités belges. À l'ULB, à l'UCL, ils bâtissent les premières cellules de solidarité — les racines de ce qui deviendra Ballal.",
  hist_2024_title: "Ancrés. Actifs. Engagés.",
  hist_2024_desc: "Plus de 15 000 Guinéens vivent aujourd'hui en Belgique. Entrepreneurs, soignants, militants ou étudiants — nous sommes la troisième nationalité africaine du pays. Ballal est leur voix et leur bouclier.",
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
  contact_form_subtitle: "Urgence, partenariat ou question — nous répondons sous 48h.",
  contact_subject_label: "Objet",
  contact_subject_general: "Information générale",
  contact_subject_partnership: "Partenariat",
  contact_subject_support: "Demande d'aide",
  contact_send_btn: "Envoyer",
  email_subject_contact: "Contact Ballal ASBL",
  footer_rights: "Tous droits réservés.",
  // Donation
  donate_title: "Transformez votre geste en vie sauvée.",
  donate_subtitle: "Chaque euro finance un hébergement d'urgence, un repas ou un droit défendu. Ici, à Bruxelles, maintenant.",
  donate_goal_annual: "Objectif annuel",
  donate_goal_annual_desc: "Budget de fonctionnement 2025",
  donate_goal_previous: "Collecte 2024",
  donate_goal_previous_desc: "Réalisé grâce à votre engagement",
  donate_copy_success: "IBAN copié dans le presse-papier !",
  // Share
  share_text: "Ballal ASBL - Solidarité Guinée-Belgique • Justice, Culture, Autonomie Alimentaire",
  share_email_subject: "Découvrez Ballal ASBL",
  share_subtitle: "Chaque partage est un acte de solidarité. Faites connaître Ballal.",
  share_whatsapp: "WhatsApp",
  share_facebook: "Facebook",
  share_twitter: "Twitter",
  share_email: "Email",
  share_copied: "Copié !",
  share_copy: "Copier",
  share_link_label: "Partager le lien",
  share_qr_inst: "Scannez ce QR code pour accéder directement au site Ballal ASBL et le partager en un geste.",
  share_privacy_warning: "Ce lien ne contient aucune donnée personnelle. Vous pouvez le partager librement.",
  share_downloading: "Téléchargement...",
  share_download_success: "Téléchargé !",
  share_download_qr: "Télécharger le QR",
  share_linkedin: "Partager sur LinkedIn",
  share_telegram: "Partager sur Telegram",
  // Privacy & Terms
  footer_privacy: "Politique de confidentialité",
  footer_terms: "Conditions d'utilisation",
  privacy_updated: "Dernière mise à jour :",
  privacy_controller: "Responsable du traitement :",
  privacy_sec1_title: "1. Responsable du traitement",
  privacy_sec1_desc: "Le responsable du traitement de vos données personnelles est :",
  privacy_address: "Adresse :",
  privacy_email: "Email :",
  privacy_phone: "Téléphone :",
  privacy_sensitive_title: "Protection des données sensibles",
  privacy_sensitive_desc: "Dans le cadre de notre mission, nous sommes amenés à traiter des données à caractère particulièrement sensible (situation administrative, état de santé, données relatives à des procédures en cours). Ces données sont traitées avec la plus stricte confidentialité et ne sont jamais transmises à des tiers sans votre consentement explicite.",
  privacy_sec2_title: "2. Données collectées et finalités",
  privacy_sec2_desc: "Nous collectons uniquement les données nécessaires à nos missions de solidarité. Voici les principaux traitements :",
  privacy_form_contact: "Formulaire de contact",
  privacy_data_types: "Données collectées :",
  privacy_purpose: "Finalité :",
  privacy_newsletter: "Newsletter et communications",
  privacy_legal_secrecy: "Secret professionnel et confidentialité",
  privacy_legal_secrecy_desc: "Les informations partagées dans le cadre de consultations juridiques ou sociales sont couvertes par le secret professionnel de nos collaborateurs habilités. Elles ne peuvent en aucun cas être divulguées à des tiers, y compris aux autorités administratives, sauf obligation légale impérieuse.",
  privacy_sec3_title: "3. Partage de vos données",
  privacy_sec3_desc: "Nous ne vendons jamais vos données. Elles ne sont partagées qu'avec :",
  privacy_sec4_title: "4. Cookies et technologies similaires",
  privacy_sec4_desc: "Ce site utilise uniquement des cookies techniques essentiels au fonctionnement de l'application (session utilisateur). Aucun cookie publicitaire ou de traçage tiers n'est utilisé.",
  privacy_sec5_title: "5. Vos droits",
  privacy_simplified_rights: "En clair : vous pouvez nous demander à tout moment de voir, corriger ou supprimer vos données.",
  privacy_contact_rights: "Pour exercer vos droits, contactez-nous directement :",
  terms_legal_warning_bold: "Ces informations juridiques sont fournies à titre indicatif et ne remplacent pas l'avis d'un avocat. En cas de situation d'urgence, contactez immédiatement le 0493 43 43 83.",
  // FoodForms
  form_back_btn: "Retour",
  form_org_label: "Organisation / Structure",
  form_phone_label: "Téléphone",
  form_donation_type_label: "Type de don",
  form_location_label: "Localisation du collectif",
  form_supplier_title: "Fournisseur alimentaire",
  form_supplier_subtitle: "Rejoignez le réseau de dons alimentaires Ballal pour éviter le gaspillage et nourrir les communautés solidaires.",
  form_network_title: "Collectif ou occupation",
  form_network_subtitle: "Inscrivez votre collectif pour recevoir des denrées alimentaires via le réseau Ballal.",
  form_submit_btn: "Envoyer ma candidature",
};

export const translations: Record<string, Translation> = {
  fr,
  en: { ...fr, nav_directory: "Directory" },
  nl: { ...fr, nav_directory: "Gids" }
};

export default translations;