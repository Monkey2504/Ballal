

import { LanguageCode } from '../types';

export interface Translation {
  // Navigation
  nav_home: string;
  nav_directory: string;
  nav_news: string;
  nav_events: string;
  nav_legal: string;
  nav_history: string;
  nav_forum: string;
  nav_share: string;
  nav_team: string; 
  nav_solidarity: string;
  nav_member_access: string;
  nav_food_project: string; 
  nav_contact: string;
  
  // SEO Meta Descriptions
  meta_desc_home: string;
  meta_desc_news: string;
  meta_desc_events: string;
  meta_desc_forum: string;
  meta_desc_directory: string;
  meta_desc_legal: string;
  meta_desc_history: string;
  meta_desc_share: string;
  meta_desc_food: string;
  meta_desc_contact: string;

  // Hero
  hero_title: string;
  hero_subtitle: string;
  hero_desc: string;
  hero_asbl: string;
  btn_assist: string;
  btn_donate: string;
  hero_city_conakry: string;
  hero_city_brussels: string;
  hero_city_liege: string;
  
  // Urgent / Legal Aid
  urgent_title: string;
  urgent_alert: string;
  legal_intro: string;
  legal_disclaimer_title: string;
  legal_disclaimer_text: string;
  flash_title: string;
  flash_msg_title: string;
  flash_msg_body: string;
  flash_close: string;
  click_for_flash: string;
  legal_flash_btn: string;
  legal_flash_protection: string;
  legal_flash_screenshot: string;
  legal_strategy_title: string;
  legal_warning: string;
  legal_9bis_title: string;
  legal_9bis_desc: string;
  legal_9ter_title: string;
  legal_9ter_desc: string;
  legal_school_title: string;
  legal_school_subtitle: string;
  legal_school_desc: string;
  legal_school_point1: string;
  legal_school_point2: string;
  legal_school_point3: string;
  legal_home_title: string;
  legal_home_subtitle: string;
  legal_home_warrant: string;
  legal_home_police: string;
  legal_home_oqt: string;
  legal_home_action: string;
  health_title: string;
  health_desc: string;
  health_steps_title: string;
  health_step1: string;
  health_step2: string;
  health_step3: string;
  health_step4: string;
  allies_title: string;
  allies_desc: string;
  legal_ally_cire: string;
  legal_ally_adde: string;
  legal_ally_ldh: string;

  // News
  news_section_title: string;
  news_section_subtitle: string;
  read_article: string;
  verified_sources: string;
  refresh_btn: string;

  // Events
  events_title: string;
  events_subtitle: string;
  events_refresh: string;
  events_participate: string;
  events_empty: string;
  events_empty_desc: string;
  events_ai_disclaimer: string;
  
  // Forum
  forum_title: string;
  forum_subtitle: string;
  forum_placeholder: string;
  forum_public_warning: string;
  forum_publish_btn: string;
  forum_like: string;
  forum_comments: string;
  forum_no_comments: string;
  forum_write_comment: string;

  // Directory
  dir_title: string;
  dir_subtitle: string;
  dir_search_placeholder: string;
  dir_filter_all: string;
  dir_filters: string;
  dir_verified: string;
  dir_visit_site: string;
  dir_map: string;
  dir_empty_title: string;
  dir_empty_desc: string;
  dir_reset_btn: string;
  dir_contrib_title: string;
  dir_contrib_desc: string;
  dir_suggest_btn: string;
  dir_cat_gastronomy: string;
  dir_cat_beauty: string;
  dir_cat_services: string;
  dir_cat_artisanat: string;
  dir_cat_health: string;

  // History
  hist_title: string;
  hist_subtitle: string;
  hist_did_you_know: string;
  hist_stat_text: string;
  hist_1958_title?: string;
  hist_1958_desc?: string;
  hist_1960_title?: string;
  hist_1960_desc?: string;
  hist_1990_year?: string;
  hist_1990_title?: string;
  hist_1990_desc?: string;
  hist_2000_title?: string;
  hist_2000_desc?: string;
  hist_2024_title?: string;
  hist_2024_desc?: string;

  // Food Autonomy
  food_title: string;
  food_slogan: string;
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
  food_contact_cta: string;
  food_image_alt: string;

  // Food Forms
  form_supplier_title: string;
  form_supplier_subtitle: string;
  form_network_title: string;
  form_network_subtitle: string;
  form_name_label: string;
  form_org_label: string;
  form_email_label: string;
  form_phone_label: string;
  form_donation_type_label: string;
  form_location_label: string;
  form_quantity_label: string;
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

  // Contact Form (New)
  contact_form_title: string;
  contact_form_subtitle: string;
  contact_subject_label: string;
  contact_subject_general: string;
  contact_subject_partnership: string;
  contact_subject_press: string;
  contact_subject_support: string;
  contact_send_btn: string;
  
  // Donation
  donate_title: string;
  donate_subtitle: string;
  donate_iban_label: string;
  donate_communication_label: string;
  donate_communication_value: string;
  donate_copy_success: string;
  donate_impact_title: string;
  donate_impact_1: string;
  donate_impact_2: string;
  donate_impact_3: string;
  donate_secure_msg: string;

  // Share
  share_title: string;
  share_subtitle: string;
  share_scan: string;
  share_link_label: string;
  share_copy: string;
  share_copied: string;
  share_via: string;
  share_whatsapp: string;
  share_facebook: string;
  share_privacy_warning: string;
  share_qr_alt: string;
  share_qr_inst: string;
  share_copy_error: string;

  // Team
  team_title: string;
  team_subtitle: string;
  members_title: string;
  members_desc: string;
  team_collective_strength: string;
  team_join_desc: string;
  contact_btn: string;
  role_admin: string;
  role_admin_f: string;

  // Footer
  footer_quick_links: string;
  footer_contact: string;
  footer_statutes: string;
  footer_rights: string;
  footer_resources: string;
  footer_report: string;
  footer_member: string;
  footer_bce: string;
  footer_privacy: string;
  footer_terms: string;

  // EMAILS & ACTIONS
  email_subject_member: string;
  email_body_member: string;
  email_subject_food_donor: string;
  email_body_food_donor: string;
  email_subject_food_network: string;
  email_body_food_network: string;
  email_subject_contact: string;
  action_copied: string;
}

const fr: Translation = {
    nav_home: "Accueil",
    nav_directory: "Annuaire",
    nav_news: "Actualités",
    nav_events: "Agenda",
    nav_legal: "Aide & Droits",
    nav_history: "Histoire",
    nav_forum: "Forum",
    nav_share: "Partager",
    nav_team: "Équipe",
    nav_solidarity: "Solidarité",
    nav_member_access: "Accès Membre",
    nav_food_project: "Projet Alimentaire",
    nav_contact: "Contact",
    meta_desc_home: "La structure de référence pour la communauté guinéenne en Belgique.",
    meta_desc_news: "Actualités vérifiées de la Guinée et de la diaspora en Belgique.",
    meta_desc_events: "Agenda des événements culturels, fêtes et meetups de la communauté guinéenne.",
    meta_desc_forum: "Espace de discussion, d'entraide et de partage pour les Guinéens de Belgique.",
    meta_desc_directory: "Annuaire des commerces, entrepreneurs et services guinéens en Belgique.",
    meta_desc_legal: "Assistance juridique urgente et droits des étrangers en Belgique.",
    meta_desc_history: "Découvrez l'histoire de la communauté guinéenne en Belgique, de 1958 à nos jours.",
    meta_desc_share: "Partagez l'application Ballal ASBL pour renforcer notre communauté.",
    meta_desc_food: "Projet d'autonomie et de sécurité alimentaire pour les collectifs et squats.",
    meta_desc_contact: "Contactez l'ASBL Ballal pour toute question ou demande de partenariat.",
    hero_title: "Solidarité Guinée-Belgique",
    hero_subtitle: "Accueillir. Protéger. Unir.",
    hero_desc: "La structure de référence pour la communauté guinéenne en Belgique. Assistance juridique, soutien social et promotion de notre culture.",
    hero_asbl: "Association Sans But Lucratif",
    btn_assist: "J'ai besoin d'aide",
    btn_donate: "Faire un don",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Bruxelles",
    hero_city_liege: "Liège",
    urgent_title: "Solidarité & Droits : Protéger nos vies, Conquérir nos papiers !",
    urgent_alert: "En cas d'arrestation : Ne signez RIEN sans avocat.",
    legal_intro: "En Belgique, les droits fondamentaux sont souvent bafoués. Cette section est votre guide de survie et votre arme légale. Connaître vos droits est le premier pas vers l'émancipation et la résistance face aux politiques d'enfermement et de précarisation.",
    legal_disclaimer_title: "Avis de non-responsabilité",
    legal_disclaimer_text: "Ce contenu est fourni à titre informatif uniquement et ne remplace pas un conseil juridique professionnel. Consultez toujours un avocat spécialisé.",
    flash_title: "DANGER IMMÉDIAT :\nGardez le silence et exigez un avocat.",
    flash_msg_title: "⚠️ Droit Fondamental : Silence et Assistance Légale",
    flash_msg_body: "Vous avez le droit constitutionnel de garder le silence. Ne signez aucun document. N'acceptez pas d'être filmé. Exigez IMMÉDIATEMENT la présence d’un avocat. L'article 47bis du Code d'Instruction Criminelle protège ce droit inaliénable.",
    flash_close: "CLIQUEZ POUR FERMER ET RETOURNER À L'INFO",
    click_for_flash: "CLIQUEZ POUR AFFICHER LE TEXTE LÉGAL DE PROTECTION",
    legal_flash_btn: "ACTIVER LE MODE URGENCE POLICE",
    legal_flash_protection: "Votre droit à la protection est notre priorité.",
    legal_flash_screenshot: "Prenez une capture d'écran, le texte est votre bouclier légal.",
    legal_strategy_title: "La Stratégie Papiers : Différencier vos recours (9bis vs 9ter)",
    legal_warning: "Attention ! Les procédures '9bis' et '9ter' sont des recours distincts avec des objectifs et des risques différents. Les confondre ou mal les documenter peut anéantir vos chances de régularisation.",
    legal_9bis_title: "Art. 9bis : L'Humanitaire - Une brèche nécessaire",
    legal_9bis_desc: "Ce recours vise à obtenir une régularisation pour raisons humanitaires exceptionnelles (liens familiaux intenses, maladie grave, attaches locales profondes et irréversibles). Il ne doit pas être utilisé comme une solution par défaut.",
    legal_9ter_title: "Art. 9ter : L'État de Santé - L'Urgence Vitale",
    legal_9ter_desc: "Réservé aux cas où votre état de santé nécessite des soins en Belgique non disponibles dans votre pays d'origine, entraînant un risque réel et imminent pour votre vie. Les preuves médicales doivent être récentes, détaillées et incontestables.",
    legal_school_title: "L'École, Espace Sanctuaire : Protégeons nos enfants",
    legal_school_subtitle: "L'inviolabilité du milieu éducatif : Une résistance légale",
    legal_school_desc: "L'école n'est pas un lieu de traque ou de contrôle pour les forces de l'ordre. Elle est un espace de protection pour l'enfant, où les poursuites visant les parents sans-papiers doivent être suspendues.",
    legal_school_point1: "Les services de police n'ont pas le droit d'entrer dans une école sans autorisation du Directeur ou sans Mandat de Perquisition spécifique.",
    legal_school_point2: "Si une intervention a lieu, l'école DOIT garantir la présence d'un responsable désigné et d'un avocat pour l'enfant ou les parents concernés.",
    legal_school_point3: "Rappel aux directeurs : Toute collaboration active à une interpellation met en péril le statut de sanctuaire.",
    legal_home_title: "Le Domicile, Notre Forteresse",
    legal_home_subtitle: "L'inviolabilité du domicile : La Constitution est de notre côté.",
    legal_home_warrant: "Aucune intrusion sans Mandat de Perquisition Spécifique !",
    legal_home_police: "La police ne peut pénétrer chez vous que sous certaines conditions très strictes : avec votre consentement (que vous pouvez REFUSER), ou avec un mandat de perquisition délivré par un juge.",
    legal_home_oqt: "Si l'Office des Étrangers (OE) vous présente un 'Ordre de Quitter le Territoire' (OQT), ne cédez pas à la panique. Consultez immédiatement un allié juridique.",
    legal_home_action: "Refusez toute entrée non justifiée légalement ! Filmez l'intervention depuis l'intérieur (sans ouvrir).",
    health_title: "Droit à la Santé : Un Combat pour la Dignité",
    health_desc: "L'accès aux soins est un droit humain inaliénable. L'Aide Médicale Urgente (AMU) est la porte d'entrée pour la prise en charge des personnes sans titre de séjour.",
    health_steps_title: "Protocole d'Action - Aide Médicale Urgente (AMU)",
    health_step1: "Contactez un Centre Public d'Action Sociale (CPAS) de votre commune. Ils sont légalement obligés d'examiner votre demande.",
    health_step2: "Présentez un Certificat Médical Urgent (CMU) délivré par un médecin attestant de la nécessité et de l'urgence des soins.",
    health_step3: "Le CPAS doit vous fournir une attestation 'preuve de demande AMU'. Gardez-la précieusement.",
    health_step4: "Ne vous découragez pas face aux refus illégaux ! Insistez, faites-vous accompagner par une association militante (comme le CIRÉ ou l'ADDE).",
    allies_title: "Nos Allié.e.s, Nos Forces",
    allies_desc: "Le combat pour les droits et la régularisation est collectif. Voici les organisations qui travaillent sans relâche à vos côtés.",
    legal_ally_cire: "Expert en régularisation 9bis/9ter, accompagnement juridique pour les demandeurs d'asile et lutte contre les discriminations.",
    legal_ally_adde: "Avocats pour les Droits des Étrangers. Action en justice, formation et défense des libertés individuelles.",
    legal_ally_ldh: "Ligue des Droits Humains. Veille politique, dénonciation des abus et plaidoyer pour une société plus juste.",
    news_section_title: "Les Nouvelles du Pays",
    news_section_subtitle: "Actualités vérifiées en provenance de Conakry",
    read_article: "Lire l'article",
    verified_sources: "Sources vérifiées :",
    refresh_btn: "Actualiser",
    events_title: "Agenda de la Communauté",
    events_subtitle: "Les événements incontournables : Fêtes, Business et Culture.",
    events_refresh: "Actualiser l'agenda",
    events_participate: "Je participe",
    events_empty: "Aucun événement trouvé",
    events_empty_desc: "Revenez plus tard ou proposez le vôtre.",
    events_ai_disclaimer: "Résultats agrégés via IA.",
    forum_title: "Entraide & Discussions",
    forum_subtitle: "Posez vos questions et échangez avec la communauté.",
    forum_placeholder: "Quoi de neuf ? Posez une question...",
    forum_public_warning: "Votre message sera visible par tous.",
    forum_publish_btn: "Publier",
    forum_like: "J'aime",
    forum_comments: "Commentaires",
    forum_no_comments: "Aucun commentaire.",
    forum_write_comment: "Écrivez un commentaire...",
    dir_title: "Annuaire Pro",
    dir_subtitle: "Retrouvez les commerces et services de la communauté.",
    dir_search_placeholder: "Ex: Restaurant, Coiffeur, Avocat...",
    dir_filter_all: "Tout",
    dir_filters: "Filtres",
    dir_verified: "Vérifié",
    dir_visit_site: "Visiter",
    dir_map: "Plan",
    dir_empty_title: "Aucune adresse",
    dir_empty_desc: "Essayez une autre recherche.",
    dir_reset_btn: "Réinitialiser",
    dir_contrib_title: "Vous connaissez une pépite ?",
    dir_contrib_desc: "Aidez-nous à compléter cet annuaire.",
    dir_suggest_btn: "Suggérer une adresse",
    dir_cat_gastronomy: "Gastronomy",
    dir_cat_beauty: "Beauté & Mode",
    dir_cat_services: "Services",
    dir_cat_artisanat: "Artisanat",
    dir_cat_health: "Santé",
    hist_title: "Notre Histoire",
    hist_subtitle: "De la dignité de 1958 à l'intégration d'aujourd'hui : l'épopée d'une communauté résiliente au cœur de l'Europe.",
    hist_did_you_know: "Le saviez-vous ?",
    hist_stat_text: "Plus de 25.000 personnes d'origine guinéenne vivent en Belgique, formant l'une des diasporas d'Afrique de l'Ouest les plus dynamiques du Benelux.",
    hist_1958_title: "1958 : L'Audace de la Dignité",
    hist_1958_desc: "Tout commence par un 'NON' retentissant. Le 28 septembre 1958, la Guinée marque l'histoire mondiale en étant la seule colonie française à refuser la communauté proposée par le Général de Gaulle, choisissant l'indépendance immédiate.",
    hist_1960_title: "1960-1980 : L'Élite Intellectuelle",
    hist_1960_desc: "Les premiers ponts avec la Belgique ne furent pas construits par l'exil, mais par le savoir. Durant les deux premières décennies de l'indépendance, des accords bilatéraux ont permis à l'élite étudiante guinéenne de rejoindre les prestigieuses universités belges.",
    hist_1990_year: "Années 90",
    hist_1990_title: "L'Exil et la Survie",
    hist_1990_desc: "Les années 90 marquent une rupture douloureuse. L'instabilité politique chronique et les crises économiques à Conakry poussent des milliers de Guinéens sur les routes de l'exil. La Belgique devient une terre de refuge.",
    hist_2000_title: "2000s : L'Enracinement à Matonge",
    hist_2000_desc: "Le tournant du millénaire voit la communauté changer de visage. On ne fait plus que passer ; on s'installe. Les familles se regroupent, les premiers enfants naissent sur le sol belge.",
    hist_2024_title: "2024 : Une Force Vive et Incontournable",
    hist_2024_desc: "Aujourd'hui, la communauté guinéenne de Belgique est une réussite d'intégration et de dynamisme. Médecins, avocats, entrepreneurs, artistes, ouvriers qualifiés : les Belgo-Guinéens sont partout.",
    food_title: "Projet d'Autonomie Alimentaire",
    food_slogan: "Vers l'indépendance alimentaire des squats.",
    food_intro_title: "Notre Vision",
    food_intro_text: "Notre projet vise à transformer la gestion de l'aide alimentaire dans les lieux de vie informels (squats). Nous cherchons à dépasser le modèle d'assistance externe pour mettre en place une auto-organisation complète.",
    food_compliance_title: "Transparence et Conformité",
    food_compliance_text: "Pour garantir la traçabilité des dons, l'équité de la distribution et répondre aux exigences de nos partenaires comme les Banques Alimentaires, nous tenons un registre précis des bénéficiaires.",
    food_partners_title: "Partenaires Donateurs",
    food_partners_text: "Dons alimentaires (produits secs, frais, invendus) ou soutien financier direct pour l'achat de provisions gérées par le collectif.",
    food_partners_btn: "J'ai des produits à donner",
    food_collectives_title: "Collectifs et Squats",
    food_collectives_text: "Mise en relation pour intégrer le réseau d'auto-gestion, partage d'expérience et formation aux méthodes d'approvisionnement indépendantes.",
    food_collectives_btn: "Intégrer le réseau",
    food_contact_cta: "Contactez-nous aujourd'hui pour bâtir l'autonomie de demain.",
    food_image_alt: "Solidarité alimentaire et distribution",
    
    // NEW FORM TRANSLATIONS
    form_supplier_title: "Espace Fournisseur & Donateur",
    form_supplier_subtitle: "Proposez vos produits et participez à l'autonomie.",
    form_network_title: "Rejoindre le Réseau d'Autonomie",
    form_network_subtitle: "Inscrivez votre collectif ou squat pour bénéficier du programme.",
    form_name_label: "Nom complet",
    form_org_label: "Organisation / Entreprise",
    form_email_label: "Adresse E-mail",
    form_phone_label: "Téléphone",
    form_donation_type_label: "Type de Don (Sec, Frais, Matériel...)",
    form_location_label: "Localisation (Commune / Adresse)",
    form_quantity_label: "Nombre de personnes / Quantité estimée",
    form_message_label: "Message / Détails supplémentaires",
    form_submit_btn: "Ouvrir mon client mail",
    form_success_title: "Action Initiée !",
    form_success_desc: "Votre client mail va s'ouvrir avec les informations pré-remplies. Veuillez cliquer sur 'Envoyer' pour finaliser.",
    form_back_btn: "Retour",
    form_demo_warning: "MODE DÉMO : Ce formulaire prépare un email sur votre appareil. Aucune donnée n'est envoyée à un serveur tiers.",
    form_consent_gdpr: "Je consens à l'utilisation de mon client de messagerie pour envoyer ces informations à l'ASBL Ballal.",
    form_error_required: "Ce champ est requis.",
    form_error_email: "Adresse email invalide.",
    form_error_consent: "Votre consentement est obligatoire.",
    form_privacy_link: "Politique de confidentialité",
    
    // Contact Form (New)
    contact_form_title: "Contactez-nous",
    contact_form_subtitle: "Une question, une proposition ou une demande d'aide ? N'hésitez pas.",
    contact_subject_label: "Sujet de votre message",
    contact_subject_general: "Information générale",
    contact_subject_partnership: "Partenariat / Presse",
    contact_subject_press: "Presse / Média",
    contact_subject_support: "Demande d'aide sociale",
    contact_send_btn: "Envoyer le message",

    donate_title: "Soutenir Ballal ASBL",
    donate_subtitle: "Votre générosité est le moteur de nos actions. Chaque euro versé renforce notre capacité à défendre, aider et unir la communauté.",
    donate_iban_label: "Compte Bancaire (IBAN)",
    donate_communication_label: "Communication",
    donate_communication_value: "Don Ballal ASBL",
    donate_copy_success: "IBAN copié !",
    donate_impact_title: "Votre impact est immédiat :",
    donate_impact_1: "Financer les frais d'avocats et les démarches administratives pour les sans-papiers en situation d'urgence.",
    donate_impact_2: "Organiser des événements culturels majeurs pour faire rayonner la Guinée en Belgique.",
    donate_impact_3: "Fournir une aide alimentaire et logistique aux familles nouvellement arrivées ou en grande précarité.",
    donate_secure_msg: "Scannez pour copier l'IBAN ou utilisez votre application bancaire.",
    share_title: "Faites grandir la communauté",
    share_subtitle: "Partagez l'application avec vos proches.",
    share_scan: "Scanner pour rejoindre",
    share_link_label: "Lien direct",
    share_copy: "Copier",
    share_copied: "Copié !",
    share_via: "Partager via...",
    share_whatsapp: "Envoyer sur WhatsApp",
    share_facebook: "Partager sur Facebook",
    share_privacy_warning: "Note de confidentialité : Le partage direct via les réseaux sociaux permet à ces plateformes de suivre votre activité.",
    share_qr_alt: "Code QR pour accéder au site Ballal ASBL",
    share_qr_inst: "Scannez ce code avec votre appareil photo pour ouvrir le site.",
    share_copy_error: "Impossible de copier. Veuillez sélectionner le texte manuellement.",

    // Team
    team_title: "Le Conseil d'Administration",
    team_subtitle: "Les administrateurs au service de la communauté.",
    members_title: "Nos Membres",
    members_desc: "Rejoignez une équipe dynamique.",
    team_collective_strength: "La force de Ballal, c'est son collectif.",
    team_join_desc: "Rejoignez une équipe dynamique et engagée pour le rayonnement de la communauté.",
    contact_btn: "Contacter",
    role_admin: "Administrateur",
    role_admin_f: "Administratrice",

    // Footer
    footer_quick_links: "Liens Rapides",
    footer_contact: "Nous Contacter",
    footer_statutes: "Statuts de l'ASBL (PDF)",
    footer_rights: "Tous droits réservés.",
    footer_resources: "Ressources",
    footer_report: "Rapport Annuel",
    footer_member: "Devenir Membre",
    footer_bce: "BCE : 1016.925.333 (Numéro d'entreprise)",
    footer_privacy: "Politique de confidentialité",
    footer_terms: "Conditions d'utilisation",

    // EMAILS & ACTIONS
    email_subject_member: "Demande d'adhésion à l'ASBL Ballal",
    email_body_member: "Bonjour,\n\nJe souhaite devenir membre de l'ASBL Ballal.\n\nNom :\nPrénom :\nTéléphone :",
    email_subject_food_donor: "Don Alimentaire - Partenariat",
    email_body_food_donor: "Bonjour,\n\nJe souhaite proposer un don ou un partenariat alimentaire.\n\nNom :\nOrganisation :\nType de don :\nContact :",
    email_subject_food_network: "Intégration Réseau Autonomie Alimentaire",
    email_body_food_network: "Bonjour,\n\nNous sommes un collectif/squat et souhaitons rejoindre le projet.\n\nLieu :\nNombre de personnes :\nContact :",
    email_subject_contact: "Contact via ballal.be",
    action_copied: "Copié !"
};

const en: Translation = {
    nav_home: "Home",
    nav_directory: "Directory",
    nav_news: "News",
    nav_events: "Events",
    nav_legal: "Rights & Aid",
    nav_history: "History",
    nav_forum: "Forum",
    nav_share: "Share",
    nav_team: "Team",
    nav_solidarity: "Solidarity",
    nav_member_access: "Member Access",
    nav_food_project: "Food Project",
    nav_contact: "Contact",
    meta_desc_home: "The reference for the Guinean community in Belgium.",
    meta_desc_news: "Verified news from Guinea and the diaspora in Belgium.",
    meta_desc_events: "Agenda of cultural events, parties and meetups of the Guinean community.",
    meta_desc_forum: "Discussion, mutual aid and sharing space for Guineans in Belgium.",
    meta_desc_directory: "Directory of Guinean businesses, entrepreneurs and services in Belgium.",
    meta_desc_legal: "Urgent legal assistance and rights of foreigners in Belgium.",
    meta_desc_history: "Discover the history of the Guinean community in Belgium, from 1958 to today.",
    meta_desc_share: "Share the Ballal ASBL app to strengthen our community.",
    meta_desc_food: "Food autonomy and security project for collectives and squats.",
    meta_desc_contact: "Contact Ballal ASBL for any questions or partnership requests.",
    hero_title: "Guinea-Belgium Solidarity",
    hero_subtitle: "Welcome. Protect. Unite.",
    hero_desc: "The reference for the Guinean community in Belgium. Legal assistance, social support, and cultural promotion.",
    hero_asbl: "Non-Profit Organization",
    btn_assist: "I need help",
    btn_donate: "Donate",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Brussels",
    hero_city_liege: "Liege",
    urgent_title: "Solidarity & Rights",
    urgent_alert: "In case of arrest: Sign NOTHING without a lawyer.",
    legal_intro: "In case of arrest, silence is your best protection. Know your rights.",
    legal_disclaimer_title: "Legal Disclaimer",
    legal_disclaimer_text: "This content is for informational purposes only and does not replace professional legal advice. Always consult a specialized lawyer.",
    flash_title: "I INVOKE MY RIGHT\nTO REMAIN SILENT.\nI WANT A LAWYER.",
    flash_msg_title: "MESSAGE TO POLICE (Salduz Law)",
    flash_msg_body: "\"I declare nothing. I invoke my right to remain silent. I request immediate confidential consultation with a lawyer before any questioning, in accordance with the Salduz law.\"",
    flash_close: "Close",
    click_for_flash: "Click for Emergency Mode",
    legal_flash_btn: "CLICK HERE FOR POLICE EMERGENCY",
    legal_flash_protection: "This text is your legal shield.",
    legal_flash_screenshot: "Take a screenshot now.",
    legal_strategy_title: "Residence Strategy: 9bis vs 9ter",
    legal_warning: "Warning! Do not confuse these procedures. They have different strict criteria.",
    legal_9bis_title: "Art. 9bis (Humanitarian)",
    legal_9bis_desc: "Regularisation request based on exceptional humanitarian circumstances (long stay, deep integration). Must prove why you cannot return to Guinea.",
    legal_9ter_title: "Art. 9ter (Medical)",
    legal_9ter_desc: "Strictly for serious illness where treatment is unavailable in Guinea, posing a life threat. Requires solid, recent medical certificates.",
    legal_school_title: "School: A Safe Zone",
    legal_school_subtitle: "Education is a fundamental right.",
    legal_school_desc: "Schools are protected spaces. Enrollment is mandatory and safe, regardless of residence status.",
    legal_school_point1: "Police generally do not enter schools to arrest parents/children.",
    legal_school_point2: "If they do, the school must ensure a lawyer is present.",
    legal_school_point3: "School attendance is proof of integration for 9bis applications.",
    legal_home_title: "Your Home is Protected",
    legal_home_subtitle: "Inviolability of the domicile",
    legal_home_warrant: "\"DO YOU HAVE A SEARCH WARRANT?\"",
    legal_home_police: "Police cannot enter your home without a specific search warrant signed by a Judge.",
    legal_home_oqt: "An 'Order to Leave the Territory' (OQT) is NOT a warrant to enter your home.",
    legal_home_action: "Do not open the door. Speak through the closed door. Demand to see the warrant.",
    health_title: "Right to Health (AMU)",
    health_desc: "Urgent Medical Aid (AMU) ensures access to healthcare for undocumented persons.",
    health_steps_title: "CPAS / AMU Procedure:",
    health_step1: "Go to the CPAS (Social Welfare Centre) of your municipality.",
    health_step2: "Request 'Urgent Medical Aid' (AMU) with a doctor's certificate.",
    health_step3: "The CPAS will check that you are in need (social inquiry).",
    health_step4: "The CPAS pays the doctor directly. They do not report you to immigration.",
    allies_title: "Strategic Allies",
    allies_desc: "For legal defense, contact these organizations:",
    legal_ally_cire: "Coordination for refugees and foreigners. Experts in regularisation.",
    legal_ally_adde: "Association for the Law of Foreigners. Legal expertise and defense.",
    legal_ally_ldh: "League of Human Rights. Fighting police violence and abuse.",
    news_section_title: "News from Home",
    news_section_subtitle: "Verified news from Conakry",
    read_article: "Read article",
    verified_sources: "Verified sources:",
    refresh_btn: "Refresh",
    events_title: "Community Agenda",
    events_subtitle: "Key events: Parties, Business, and Culture.",
    events_refresh: "Refresh Agenda",
    events_participate: "Join",
    events_empty: "No events found",
    events_empty_desc: "Come back later or suggest yours.",
    events_ai_disclaimer: "Results aggregated via AI.",
    forum_title: "Help & Discussions",
    forum_subtitle: "Ask questions and chat with the community.",
    forum_placeholder: "What's new? Ask a question...",
    forum_public_warning: "Your message will be visible to all.",
    forum_publish_btn: "Post",
    forum_like: "Like",
    forum_comments: "Comments",
    forum_no_comments: "No comments.",
    forum_write_comment: "Write a comment...",
    dir_title: "Pro Directory",
    dir_subtitle: "Find community businesses and services.",
    dir_search_placeholder: "Ex: Restaurant, Barber, Lawyer...",
    dir_filter_all: "All",
    dir_filters: "Filters",
    dir_verified: "Verified",
    dir_visit_site: "Visit",
    dir_map: "Map",
    dir_empty_title: "No address",
    dir_empty_desc: "Try another search.",
    dir_reset_btn: "Reset",
    dir_contrib_title: "Know a hidden gem?",
    dir_contrib_desc: "Help us complete this directory.",
    dir_suggest_btn: "Suggest an address",
    dir_cat_gastronomy: "Gastronomy",
    dir_cat_beauty: "Beauty & Fashion",
    dir_cat_services: "Services",
    dir_cat_artisanat: "Crafts",
    dir_cat_health: "Health",
    hist_title: "Our History",
    hist_subtitle: "From the struggle for independence to integration in Belgium: the epic of a resilient community.",
    hist_did_you_know: "Did you know?",
    hist_stat_text: "Over 25,000 people of Guinean origin live in Belgium.",
    hist_1958_title: "1958: The Audacity of Freedom",
    hist_1958_desc: "On September 28, Guinea marked African history by voting 'NO' to General de Gaulle's referendum, choosing immediate independence.",
    hist_1960_title: "1960-1980: The Era of Intellect",
    hist_1960_desc: "The first links with Belgium were forged through universities (ULB, Liège). Guinean students arrived to become the engineers and doctors of the future.",
    hist_1990_year: "1990s",
    hist_1990_title: "Exile and Resilience",
    hist_1990_desc: "Political instability in Conakry pushed a new wave of Guineans to seek refuge in Europe. Belgium became a land of asylum.",
    hist_2000_title: "2000s: Putting Down Roots",
    hist_2000_desc: "Families reunited. The Matonge district in Brussels became a cultural hub. We moved from transit to settlement.",
    hist_2024_title: "Today: A Vital Force",
    hist_2024_desc: "Belgian-Guineans are now entrepreneurs, doctors, lawyers, and skilled workers. Ballal ASBL embodies this success.",
    food_title: "Food Autonomy Project",
    food_slogan: "Towards food independence for squats.",
    food_intro_title: "Our Vision",
    food_intro_text: "We aim to establish complete self-organization for undocumented people in informal living spaces, enabling independent food supply management.",
    food_compliance_title: "Transparency & Compliance",
    food_compliance_text: "To ensure traceability and meet Food Bank requirements, we maintain a precise register of beneficiaries, respecting GDPR and confidentiality.",
    food_partners_title: "Donor Partners",
    food_partners_text: "Donations of food (dry, fresh, unsold) or financial support.",
    food_partners_btn: "I have products to donate",
    food_collectives_title: "Collectives & Squats",
    food_collectives_text: "Join the self-management network and receive training.",
    food_collectives_btn: "Join the network",
    food_contact_cta: "Contact us to build autonomy.",
    food_image_alt: "Food solidarity and distribution",
    
    // FORMS
    form_supplier_title: "Supplier & Donor Space",
    form_supplier_subtitle: "Offer your products and participate in autonomy.",
    form_network_title: "Join the Autonomy Network",
    form_network_subtitle: "Register your collective or squat.",
    form_name_label: "Full Name",
    form_org_label: "Organization / Company",
    form_email_label: "Email Address",
    form_phone_label: "Phone",
    form_donation_type_label: "Donation Type (Dry, Fresh...)",
    form_location_label: "Location",
    form_quantity_label: "Estimated quantity / People",
    form_message_label: "Message",
    form_submit_btn: "Open Email Client",
    form_success_title: "Action Initiated!",
    form_success_desc: "Your email client will open with pre-filled info. Please click 'Send' to finalize.",
    form_back_btn: "Back to Project",
    form_demo_warning: "DEMO MODE: This form prepares an email on your device. No data is sent to a third-party server.",
    form_consent_gdpr: "I consent to using my email client to send this information to Ballal ASBL.",
    form_error_required: "This field is required.",
    form_error_email: "Invalid email address.",
    form_error_consent: "Your consent is mandatory.",
    form_privacy_link: "Privacy Policy",
    
    // Contact Form
    contact_form_title: "Contact Us",
    contact_form_subtitle: "A question, proposal or request? Do not hesitate.",
    contact_subject_label: "Subject",
    contact_subject_general: "General Information",
    contact_subject_partnership: "Partnership / Press",
    contact_subject_press: "Press / Media",
    contact_subject_support: "Social Support Request",
    contact_send_btn: "Send Message",

    donate_title: "Support Ballal ASBL",
    donate_subtitle: "Your generosity funds our legal, social, and cultural actions.",
    donate_iban_label: "Bank Account (IBAN)",
    donate_communication_label: "Communication",
    donate_communication_value: "Donation Ballal ASBL",
    donate_copy_success: "IBAN copied!",
    donate_impact_title: "What is your donation used for?",
    donate_impact_1: "Legal fees for undocumented people in emergencies.",
    donate_impact_2: "Cultural events to promote Guinea.",
    donate_impact_3: "Food aid and housing support.",
    donate_secure_msg: "Scan or copy the IBAN.",
    share_title: "Grow the Community",
    share_subtitle: "Share the app with your loved ones.",
    share_scan: "Scan to join",
    share_link_label: "Direct Link",
    share_copy: "Copy",
    share_copied: "Copied!",
    share_via: "Share via...",
    share_whatsapp: "Send on WhatsApp",
    share_facebook: "Share on Facebook",
    share_privacy_warning: "Privacy Note: Direct sharing via social networks allows these platforms to track your activity.",
    share_qr_alt: "QR Code to access Ballal ASBL website",
    share_qr_inst: "Scan this code with your camera to open the site.",
    share_copy_error: "Unable to copy. Please select text manually.",

    // Team
    team_title: "Board of Directors",
    team_subtitle: "Administrators serving the community.",
    members_title: "Our Members",
    members_desc: "Join a dynamic team.",
    team_collective_strength: "Ballal's strength is its collective.",
    team_join_desc: "Join a dynamic team committed to the community's radiance.",
    contact_btn: "Contact",
    role_admin: "Administrator",
    role_admin_f: "Administrator",

    // Footer
    footer_quick_links: "Quick Links",
    footer_contact: "Contact Us",
    footer_statutes: "ASBL Statutes (PDF)",
    footer_rights: "All rights reserved.",
    footer_resources: "Resources",
    footer_report: "Annual Report",
    footer_member: "Become a Member",
    footer_bce: "BCE: 1016.925.333 (Business Number)",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms of Use",

    // EMAILS & ACTIONS
    email_subject_member: "Ballal ASBL Membership Request",
    email_body_member: "Hello,\n\nI wish to become a member of Ballal ASBL.\n\nName:\nFirst Name:\nPhone:",
    email_subject_food_donor: "Food Donation - Partnership",
    email_body_food_donor: "Hello,\n\nI wish to offer a donation or food partnership.\n\nName:\nOrganization:\nDonation Type:\nContact:",
    email_subject_food_network: "Food Autonomy Network Integration",
    email_body_food_network: "Hello,\n\nWe are a collective/squat and wish to join the project.\n\nLocation:\nNumber of people:\nContact:",
    email_subject_contact: "Contact via ballal.be",
    action_copied: "Copied!"
};

const nl: Translation = {
    ...fr, // Fallback safe
    nav_home: "Startpagina",
    nav_directory: "Gids",
    nav_news: "Nieuws",
    nav_events: "Agenda",
    nav_legal: "Rechtshulp",
    nav_history: "Geschiedenis",
    nav_forum: "Forum",
    nav_share: "Delen",
    nav_team: "Team",
    nav_solidarity: "Solidariteit",
    nav_member_access: "Leden",
    nav_food_project: "Voedselproject",
    nav_contact: "Contact",
    meta_desc_home: "De referentie voor de Guineese gemeenschap in België.",
    meta_desc_news: "Geverifieerd nieuws uit Guinee en de diaspora.",
    meta_desc_events: "Agenda van culturele evenementen.",
    meta_desc_forum: "Discussie- en hulpruimte.",
    meta_desc_directory: "Gids van Guineese ondernemingen.",
    meta_desc_legal: "Dringende juridische bijstand.",
    meta_desc_history: "Geschiedenis van de gemeenschap.",
    meta_desc_share: "Deel de Ballal-app.",
    meta_desc_food: "Voedselautonomie project.",
    hero_title: "Solidariteit Guinee-België",
    hero_subtitle: "Onthalen. Beschermen. Verenigen.",
    hero_desc: "De referentie voor de Guineese gemeenschap in België. Juridische bijstand, sociale steun en culturele promotie.",
    hero_asbl: "VZW (Vereniging Zonder Winstoogmerk)",
    btn_assist: "Ik heb hulp nodig",
    btn_donate: "Doneer",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Brussel",
    hero_city_liege: "Luik",
    urgent_title: "Solidariteit & Rechten",
    urgent_alert: "Bij arrestatie: Teken NIETS zonder advocaat.",
    legal_intro: "In België is zwijgen uw beste bescherming bij arrestatie. Ken uw rechten.",
    legal_disclaimer_title: "Wettelijke disclaimer",
    legal_disclaimer_text: "Deze inhoud is uitsluitend ter informatie en vervangt geen professioneel juridisch advies. Raadpleeg altijd een gespecialiseerde advocaat.",
    flash_title: "IK BEROEP ME OP\nMIJN ZWIJGRECHT.\nIK WIL EEN ADVOCAAT.",
    flash_msg_title: "BERICHT AAN POLITIE (Salduz-wet)",
    flash_msg_body: "\"Ik verklaar niets. Ik beroep me op mijn zwijgrecht. Ik vraag om onmiddellijke vertrouwelijke bijstand van een advocaat voorafgaand aan elk verhoor, conform de Salduz-wet.\"",
    flash_close: "Sluiten",
    click_for_flash: "Klik voor Noodmodus",
    legal_flash_btn: "KLIK HIER VOOR POLITIE-NOODGEVAL",
    legal_flash_protection: "Deze tekst is uw wettelijke bescherming.",
    legal_flash_screenshot: "Maak nu een screenshot.",
    legal_strategy_title: "Verblijfsstrategie: 9bis vs 9ter",
    legal_warning: "Opgelet! Verwar deze procedures niet. De criteria zijn strikt verschillend.",
    legal_9bis_title: "Art. 9bis (Humanitair)",
    legal_9bis_desc: "Aanvraag tot regularisatie op basis van buitengewone omstandigheden (lang verblijf, integratie). Bewijs waarom terugkeer onmogelijk is.",
    legal_9ter_title: "Art. 9ter (Medisch)",
    legal_9ter_desc: "Enkel bij ernstige ziekte waarvoor geen behandeling bestaat in Guinee (levensgevaar). Recente medische attesten vereist.",
    legal_school_title: "School: Een Veilige Zone",
    legal_school_subtitle: "Onderwijs is een basisrecht.",
    legal_school_desc: "Scholen zijn beschermde plaatsen. Inschrijving is verplicht en veilig, ongeacht verblijfsstatus.",
    legal_school_point1: "De politie gaat doorgaans geen scholen binnen om ouders/kinderen op te pakken.",
    legal_school_point2: "Indien wel, moet de school een advocaat voorzien.",
    legal_school_point3: "Schoolgaande kinderen zijn bewijs van integratie voor 9bis.",
    legal_home_title: "Uw Woning is Beschermd",
    legal_home_subtitle: "Onschendbaarheid van de woning",
    legal_home_warrant: "\"HEEFT U EEN HUISZOEKINGSBEVEL?\"",
    legal_home_police: "De politie mag uw woning niet betreden zonder specifiek huiszoekingsbevel van een onderzoeksrechter.",
    legal_home_oqt: "Een 'Bevel om het Grondgebied te Verlaten' (BGV) is GEEN huiszoekingsbevel.",
    legal_home_action: "Doe niet open. Spreek door de gesloten deur. Vraag naar het bevel.",
    health_title: "Recht op Gezondheid (DMH)",
    health_desc: "Dringende Medische Hulp (DMH) garandeert zorg voor mensen zonder papieren.",
    health_steps_title: "OCMW / DMH Procedure:",
    health_step1: "Ga naar het OCMW van uw gemeente.",
    health_step2: "Vraag 'Dringende Medische Hulp' (DMH) met een doktersattest.",
    health_step3: "Het OCMW voert een sociaal onderzoek uit (behoeftigheid).",
    health_step4: "Het OCMW betaalt de dokter rechtstreeks. Ze melden u niet aan Vreemdelingenzaken.",
    allies_title: "Strategische Bondgenoten",
    allies_desc: "Voor juridische verdediging, contacteer deze organisaties:",
    legal_ally_cire: "Coördinatie en initiatieven voor vluchtelingen en vreemdelingen.",
    legal_ally_adde: "Vereniging voor Vreemdelingenrecht. Juridische expertise.",
    legal_ally_ldh: "Liga voor Mensenrechten.",
    news_section_title: "Nieuws uit het Land",
    news_section_subtitle: "Geverifieerd nieuws uit Conakry",
    read_article: "Lees artikel",
    verified_sources: "Geverifieerde bronnen:",
    refresh_btn: "Verversen",
    events_title: "Gemeenschapsagenda",
    events_subtitle: "Belangrijke evenementen: Feesten, Business en Cultuur.",
    events_refresh: "Agenda verversen",
    events_participate: "Deelnemen",
    events_empty: "Geen evenementen gevonden",
    events_empty_desc: "Kom later terug of stel er een voor.",
    events_ai_disclaimer: "Resultaten via AI.",
    forum_title: "Hulp & Discussies",
    forum_subtitle: "Stel vragen en chat met de gemeenschap.",
    forum_placeholder: "Wat is er nieuw? Stel een vraag...",
    forum_public_warning: "Uw bericht is zichtbaar voor iedereen.",
    forum_publish_btn: "Plaatsen",
    forum_like: "Vind ik leuk",
    forum_comments: "Reacties",
    forum_no_comments: "Geen reacties.",
    forum_write_comment: "Schrijf een reactie...",
    dir_title: "Pro Gids",
    dir_subtitle: "Vind bedrijven en diensten.",
    dir_search_placeholder: "Bv: Restaurant, Kapper, Advocaat...",
    dir_filter_all: "Alles",
    dir_filters: "Filtres",
    dir_verified: "Geverifieerd",
    dir_visit_site: "Bezoek",
    dir_map: "Kaart",
    dir_empty_title: "Geen adres",
    dir_empty_desc: "Probeer een andere zoekopdracht.",
    dir_reset_btn: "Reset",
    dir_contrib_title: "Ken je een verborgen parel?",
    dir_contrib_desc: "Help ons deze gids aan te vullen.",
    dir_suggest_btn: "Adres voorstellen",
    dir_cat_gastronomy: "Gastronomie",
    dir_cat_beauty: "Schoonheid & Mode",
    dir_cat_services: "Diensten",
    dir_cat_artisanat: "Ambacht",
    dir_cat_health: "Gezondheid",
    hist_title: "Onze Geschiedenis",
    hist_subtitle: "Van onafhankelijkheidsstrijd tot integratie.",
    hist_did_you_know: "Wist je dat?",
    hist_stat_text: "Meer dan 25.000 mensen van Guineese afkomst wonen in België.",
    food_title: "Voedselautonomie Project",
    food_slogan: "Naar voedselonafhankelijkheid voor kraakpanden.",
    food_intro_title: "Onze Visie",
    food_intro_text: "Zelforganisatie van voedselhulp in informele leefruimtes.",
    food_compliance_title: "Transparantie",
    food_compliance_text: "Wij houden een register bij van begunstigden conform AVG.",
    food_partners_title: "Donateurs",
    food_partners_text: "Voedseldonaties of financiële steun.",
    food_partners_btn: "Ik heb producten te doneren",
    food_collectives_title: "Collectieven",
    food_collectives_text: "Sluit je aan bij het netwerk.",
    food_collectives_btn: "Netwerk integreren",
    food_contact_cta: "Contacteer ons.",
    food_image_alt: "Voedsel solidariteit en distributie",
    form_supplier_title: "Leveranciersruimte",
    form_supplier_subtitle: "Bied uw producten aan.",
    form_network_title: "Netwerk Vervolledigen",
    form_network_subtitle: "Registreer uw collectief.",
    form_name_label: "Volledige naam",
    form_org_label: "Organisatie",
    form_email_label: "E-mailadres",
    form_phone_label: "Telefoon",
    form_donation_type_label: "Type donatie",
    form_location_label: "Locatie",
    form_quantity_label: "Aantal personen",
    form_message_label: "Bericht",
    form_submit_btn: "E-mailclient openen",
    form_success_title: "Actie Gestart!",
    form_success_desc: "Uw e-mailclient wordt geopend. Klik op 'Verzenden' om te voltooien.",
    form_back_btn: "Terug",
    form_demo_warning: "DEMO MODUS: Dit formulier opent uw e-mailclient. Er worden geen gegevens opgeslagen.",
    form_consent_gdpr: "Ik stem in met het gebruik van mijn e-mailclient om deze gegevens te verzenden.",
    form_error_required: "Dit veld is verplicht.",
    form_error_email: "Ongeldig e-mailadres.",
    form_error_consent: "Uw toestemming is verplicht.",
    form_privacy_link: "Privacybeleid",
    contact_form_title: "Contacteer Ons",
    contact_form_subtitle: "Heeft u een vraag? Aarzel niet.",
    contact_subject_label: "Onderwerp",
    contact_subject_general: "Algemene info",
    contact_subject_partnership: "Partnerschap / Pers",
    contact_subject_press: "Pers / Media",
    contact_subject_support: "Sociale hulp",
    contact_send_btn: "Bericht verzenden",
    donate_title: "Steun Ballal VZW",
    donate_subtitle: "Uw vrijgevigheid financiert onze acties.",
    donate_iban_label: "Bankrekening (IBAN)",
    donate_communication_label: "Mededeling",
    donate_communication_value: "Gift Ballal VZW",
    donate_copy_success: "IBAN gekopieerd!",
    donate_impact_title: "Waarvoor dient uw gift?",
    donate_impact_1: "Juridische kosten.",
    donate_impact_2: "Culturele evenementen.",
    donate_impact_3: "Voedselhulp.",
    donate_secure_msg: "Scan of kopieer de IBAN.",
    share_title: "Deel de App",
    share_subtitle: "Verspreid de boodschap.",
    share_scan: "Scan om deel te nemen",
    share_link_label: "Directe link",
    share_copy: "Kopiëren",
    share_copied: "Gekopieerd!",
    share_via: "Delen via...",
    share_whatsapp: "Verzenden via WhatsApp",
    share_facebook: "Delen op Facebook",
    share_privacy_warning: "Privacy: Direct delen via sociale netwerken stelt platforms in staat uw activiteit te volgen.",
    share_qr_alt: "QR-code om toegang te krijgen tot de Ballal ASBL-website",
    share_qr_inst: "Scan deze code met uw camera om de site te openen.",
    share_copy_error: "Kan niet kopiëren. Selecteer de tekst handmatig.",
    team_title: "Raad van Bestuur",
    team_subtitle: "Bestuurders ten dienste van de gemeenschap.",
    members_title: "Onze Leden",
    members_desc: "Sluit je aan bij een dynamisch team.",
    team_collective_strength: "De kracht van Ballal is het collectief.",
    team_join_desc: "Word lid van een geëngageerd team.",
    contact_btn: "Contact",
    role_admin: "Bestuurder",
    role_admin_f: "Bestuurster",
    footer_quick_links: "Snelle Links",
    footer_contact: "Contacteer Ons",
    footer_statutes: "Statuten VZW (PDF)",
    footer_rights: "Alle rechten voorbehouden.",
    footer_resources: "Bronnen",
    footer_report: "Jaarverslag",
    footer_member: "Lid Worden",
    footer_bce: "KBO: 1016.925.333",
    footer_privacy: "Privacybeleid",
    footer_terms: "Gebruiksvoorwaarden",
    email_subject_member: "Aanvraag Lidmaatschap Ballal VZW",
    email_body_member: "Hallo,\n\nIk wil graag lid worden van Ballal VZW.\n\nNaam:\nVoornaam:\nTelefoon:",
    email_subject_food_donor: "Voedseldonatie",
    email_body_food_donor: "Hallo,\n\nIk wil een donatie doen.\n\nNaam:\nOrganisatie:\nType:\nContact:",
    email_subject_food_network: "Integratie Voedselnetwerk",
    email_body_food_network: "Hallo,\n\nWij zijn een collectief.\n\nLocatie:\nAantal personen:\nContact:",
    email_subject_contact: "Contact via ballal.be",
    action_copied: "Gekopieerd!"
};

const de: Translation = {
    ...fr, // Fallback safe
    nav_home: "Startseite",
    nav_directory: "Verzeichnis",
    nav_news: "Nachrichten",
    nav_events: "Veranstaltungen",
    nav_legal: "Rechtshilfe",
    nav_history: "Geschichte",
    nav_forum: "Forum",
    nav_share: "Teilen",
    nav_team: "Team",
    nav_solidarity: "Solidarität",
    nav_member_access: "Mitglieder",
    nav_food_project: "Ernährungsprojekt",
    nav_contact: "Kontakt",
    meta_desc_home: "Die Referenz für die guineische Gemeinschaft in Belgien.",
    meta_desc_news: "Verifizierte Nachrichten aus Guinea und der Diaspora.",
    meta_desc_events: "Kulturveranstaltungskalender.",
    meta_desc_forum: "Diskussions- und Hilfeforum.",
    meta_desc_directory: "Verzeichnis guineischer Unternehmen.",
    meta_desc_legal: "Dringende Rechtshilfe.",
    meta_desc_history: "Geschichte der Gemeinschaft.",
    meta_desc_share: "Teilen Sie die Ballal-App.",
    meta_desc_food: "Projekt für Ernährungssouveränität.",
    hero_title: "Solidarität Guinea-Belgien",
    hero_subtitle: "Aufnehmen. Schützen. Vereinen.",
    hero_desc: "Die Referenz für die guineische Gemeinschaft in Belgien. Rechtshilfe, soziale Unterstützung und Kulturförderung.",
    hero_asbl: "VoG (Vereinigung ohne Gewinnerzielungsabsicht)",
    btn_assist: "Ich brauche Hilfe",
    btn_donate: "Spenden",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Brüssel",
    hero_city_liege: "Lüttich",
    urgent_title: "Solidarität & Rechte",
    urgent_alert: "Bei Festnahme: Unterschreiben Sie NICHTS ohne Anwalt.",
    legal_intro: "In Belgien ist Schweigen Ihr bester Schutz bei einer Festnahme. Kennen Sie Ihre Rechte.",
    legal_disclaimer_title: "Haftungsausschluss",
    legal_disclaimer_text: "Dieser Inhalt dient nur zu Informationszwecken und ersetzt keine professionelle Rechtsberatung. Konsultieren Sie immer einen spezialisierten Anwalt.",
    flash_title: "ICH BERUFE MICH AUF MEIN\nSCHWEIGERECHT.\nICH WILL EINEN ANWALT.",
    flash_msg_title: "NACHRICHT AN DIE POLIZEI (Salduz-Gesetz)",
    flash_msg_body: "\"Ich sage nichts aus. Ich berufe mich auf mein Schweigerecht. Ich verlange sofortigen vertraulichen Beistand eines Anwalts vor jeder Vernehmung, gemäß dem Salduz-Gesetz.\"",
    flash_close: "Schließen",
    click_for_flash: "Klicken für Notfallmodus",
    legal_flash_btn: "HIER KLICKEN FÜR POLIZEI-NOTFALL",
    legal_flash_protection: "Dieser Text ist Ihr rechtlicher Schutz.",
    legal_flash_screenshot: "Machen Sie jetzt einen Screenshot.",
    legal_strategy_title: "Aufenthaltsstrategie: 9bis vs 9ter",
    legal_warning: "Achtung! Verwechseln Sie diese Verfahren nicht. Die Kriterien sind streng unterschiedlich.",
    legal_9bis_title: "Art. 9bis (Humanitär)",
    legal_9bis_desc: "Antrag auf Regularisierung aufgrund außergewöhnlicher Umstände (langer Aufenthalt, Integration). Beweisen Sie, warum eine Rückkehr unmöglich ist.",
    legal_9ter_title: "Art. 9ter (Medizinisch)",
    legal_9ter_desc: "Nur bei schwerer Krankheit, die in Guinea nicht behandelbar ist (Lebensgefahr). Aktuelle medizinische Atteste erforderlich.",
    legal_school_title: "Schule: Eine sichere Zone",
    legal_school_subtitle: "Bildung ist ein Grundrecht.",
    legal_school_desc: "Schulen sind geschützte Orte. Die Einschreibung ist obligatorisch und sicher, unabhängig vom Aufenthaltsstatus.",
    legal_school_point1: "Die Polizei betritt Schulen in der Regel nicht, um Eltern/Kinder festzunehmen.",
    legal_school_point2: "Falls doch, muss die Schule einen Anwalt stellen.",
    legal_school_point3: "Der Schulbesuch ist ein Integrationsnachweis für 9bis.",
    legal_home_title: "Ihr Zuhause ist geschützt",
    legal_home_subtitle: "Unverletzlichkeit der Wohnung",
    legal_home_warrant: "\"HABEN SIE EINEN DURCHSUCHUNGSBEFEHL?\"",
    legal_home_police: "Die Polizei darf Ihre Wohnung nicht ohne richterlichen Durchsuchungsbefehl betreten.",
    legal_home_oqt: "Ein Ausweisungsbefehl (OQT) ist KEIN Durchsuchungsbefehl.",
    legal_home_action: "Öffnen Sie nicht. Sprechen Sie durch die geschlossene Tür. Verlangen Sie den Befehl.",
    health_title: "Recht auf Gesundheit (DMH)",
    health_desc: "Dringende Medizinische Hilfe (DMH) garantiert Versorgung für Menschen ohne Papiere.",
    health_steps_title: "ÖSHZ / DMH Verfahren:",
    health_step1: "Gehen Sie zum ÖSHZ (Öffentliches Sozialhilfezentrum) Ihrer Gemeinde.",
    health_step2: "Beantragen Sie 'Dringende Medizinische Hilfe' (DMH) mit einem ärztlichen Attest.",
    health_step3: "Das ÖSHZ prüft die Bedürftigkeit (Sozialuntersuchung).",
    health_step4: "Das ÖSHZ zahlt den Arzt direkt. Keine Meldung an die Ausländerbehörde.",
    allies_title: "Strategische Verbündete",
    allies_desc: "Für rechtliche Verteidigung kontaktieren Sie:",
    legal_ally_cire: "Koordination für Flüchtlinge und Ausländer. Experten für Regularisierung.",
    legal_ally_adde: "Verband für Ausländerrecht. Juristische Expertise.",
    legal_ally_ldh: "Liga für Menschenrechte.",
    news_section_title: "Nachrichten aus der Heimat",
    news_section_subtitle: "Verifizierte Nachrichten aus Conakry",
    read_article: "Artikel lesen",
    verified_sources: "Verifizierte Quellen:",
    refresh_btn: "Aktualisieren",
    events_title: "Gemeinschaftsagenda",
    events_subtitle: "Wichtige Ereignisse: Feiern, Business und Kultur.",
    events_refresh: "Agenda aktualisieren",
    events_participate: "Teilnehmen",
    events_empty: "Keine Veranstaltungen gefunden",
    events_empty_desc: "Kommen Sie später wieder.",
    events_ai_disclaimer: "Ergebnisse via KI.",
    forum_title: "Hilfe & Diskussionen",
    forum_subtitle: "Stellen Sie Fragen und chatten Sie.",
    forum_placeholder: "Was gibt es Neues? Stellen Sie eine Frage...",
    forum_public_warning: "Ihre Nachricht ist für alle sichtbar.",
    forum_publish_btn: "Posten",
    forum_like: "Gefällt mir",
    forum_comments: "Kommentare",
    forum_no_comments: "Keine Kommentare.",
    forum_write_comment: "Schreiben Sie einen Kommentar...",
    dir_title: "Pro Verzeichnis",
    dir_subtitle: "Finden Sie Unternehmen und Dienstleistungen.",
    dir_search_placeholder: "Bsp: Restaurant, Friseur, Anwalt...",
    dir_filter_all: "Alle",
    dir_filters: "Filter",
    dir_verified: "Verifiziert",
    dir_visit_site: "Besuchen",
    dir_map: "Karte",
    dir_empty_title: "Keine Adresse",
    dir_empty_desc: "Versuchen Sie eine andere Suche.",
    dir_reset_btn: "Zurücksetzen",
    dir_contrib_title: "Kennen Sie einen Geheimtipp?",
    dir_contrib_desc: "Helfen Sie uns, dieses Verzeichnis zu vervollständigen.",
    dir_suggest_btn: "Adresse vorschlagen",
    dir_cat_gastronomy: "Gastronomie",
    dir_cat_beauty: "Schönheit & Mode",
    dir_cat_services: "Dienstleistungen",
    dir_cat_artisanat: "Handwerk",
    dir_cat_health: "Gesundheit",
    hist_title: "Unsere Geschichte",
    hist_subtitle: "Vom Unabhängigkeitskampf zur Integration.",
    hist_did_you_know: "Wussten Sie schon?",
    hist_stat_text: "Über 25.000 Menschen guineischer Herkunft leben in Belgien.",
    food_title: "Projekt Ernährungssouveränität",
    food_slogan: "Zur Ernährungsunabhängigkeit für besetzte Häuser.",
    food_intro_title: "Unsere Vision",
    food_intro_text: "Selbstorganisation der Nahrungsmittelhilfe in informellen Lebensräumen.",
    food_compliance_title: "Transparenz",
    food_compliance_text: "Wir führen ein Empfängerregister gemäß DSGVO.",
    food_partners_title: "Spender",
    food_partners_text: "Lebensmittelspenden oder finanzielle Unterstützung.",
    food_partners_btn: "Ich habe Produkte zu spenden",
    food_collectives_title: "Kollektive",
    food_collectives_text: "Treten Sie dem Netzwerk bei.",
    food_collectives_btn: "Netzwerk beitreten",
    food_contact_cta: "Kontaktieren Sie uns.",
    food_image_alt: "Lebensmittelsolidarität und Verteilung",
    form_supplier_title: "Lieferantenbereich",
    form_supplier_subtitle: "Bieten Sie Ihre Produkte an.",
    form_network_title: "Netzwerk beitreten",
    form_network_subtitle: "Registrieren Sie Ihr Kollektiv.",
    form_name_label: "Vollständiger Name",
    form_org_label: "Organisation",
    form_email_label: "E-Mail-Adresse",
    form_phone_label: "Telefon",
    form_donation_type_label: "Spendenart",
    form_location_label: "Standort",
    form_quantity_label: "Anzahl der Personen",
    form_message_label: "Nachricht",
    form_submit_btn: "E-Mail-Client öffnen",
    form_success_title: "Aktion gestartet!",
    form_success_desc: "Ihr E-Mail-Client wird mit vorausgefüllten Infos geöffnet.",
    form_back_btn: "Zurück",
    form_demo_warning: "DEMO-MODUS: Dieses Formular bereitet eine E-Mail auf Ihrem Gerät vor. Keine Daten werden gespeichert.",
    form_consent_gdpr: "Ich stimme der Nutzung meines E-Mail-Clients zu.",
    form_error_required: "Dies ist ein Pflichtfeld.",
    form_error_email: "Ungültige E-Mail-Adresse.",
    form_error_consent: "Ihre Zustimmung ist erforderlich.",
    form_privacy_link: "Datenschutzrichtlinie",
    contact_form_title: "Kontakt",
    contact_form_subtitle: "Eine Frage? Zögern Sie nicht.",
    contact_subject_label: "Betreff",
    contact_subject_general: "Allgemeine Info",
    contact_subject_partnership: "Partnerschaft / Presse",
    contact_subject_press: "Presse",
    contact_subject_support: "Sozialhilfe",
    contact_send_btn: "Nachricht senden",
    donate_title: "Unterstützen Sie Ballal VoG",
    donate_subtitle: "Ihre Großzügigkeit finanziert unsere Aktionen.",
    donate_iban_label: "Bankkonto (IBAN)",
    donate_communication_label: "Mitteilung",
    donate_communication_value: "Spende Ballal VoG",
    donate_copy_success: "IBAN kopiert!",
    donate_impact_title: "Wofür dient Ihre Spende?",
    donate_impact_1: "Rechtskosten.",
    donate_impact_2: "Kulturveranstaltungen.",
    donate_impact_3: "Nahrungsmittelhilfe.",
    donate_secure_msg: "Scannen oder kopieren Sie die IBAN.",
    share_title: "Teilen Sie die App",
    share_subtitle: "Verbreiten Sie die Botschaft.",
    share_scan: "Scannen zum Beitreten",
    share_link_label: "Direktlink",
    share_copy: "Kopieren",
    share_copied: "Kopiert!",
    share_via: "Teilen via...",
    share_whatsapp: "Senden via WhatsApp",
    share_facebook: "Auf Facebook teilen",
    share_privacy_warning: "Datenschutzhinweis: Direktes Teilen über soziale Netzwerke ermöglicht diesen Plattformen, Ihre Aktivität zu verfolgen.",
    share_qr_alt: "QR-Code für den Zugriff auf die Website von Ballal VoG",
    share_qr_inst: "Scannen Sie diesen Code mit Ihrer Kamera, um die Website zu öffnen.",
    share_copy_error: "Kopieren nicht möglich. Bitte Text manuell auswählen.",
    team_title: "Verwaltungsrat",
    team_subtitle: "Verwalter im Dienste der Gemeinschaft.",
    members_title: "Unsere Mitglieder",
    members_desc: "Treten Sie einem dynamischen Team bei.",
    team_collective_strength: "Die Stärke von Ballal ist das Kollektiv.",
    team_join_desc: "Werden Sie Mitglied eines engagierten Teams.",
    contact_btn: "Kontakt",
    role_admin: "Verwalter",
    role_admin_f: "Verwalterin",
    footer_quick_links: "Schnelllinks",
    footer_contact: "Kontaktieren Sie uns",
    footer_statutes: "VoG-Satzung (PDF)",
    footer_rights: "Alle Rechte vorbehalten.",
    footer_resources: "Ressourcen",
    footer_report: "Jahresbericht",
    footer_member: "Mitglied werden",
    footer_bce: "ZNE: 1016.925.333",
    footer_privacy: "Datenschutz",
    footer_terms: "Nutzungsbedingungen",
    email_subject_member: "Antrag auf Mitgliedschaft Ballal VoG",
    email_body_member: "Hallo,\n\nIch möchte Mitglied werden.\n\nName:\nVorname:\nTelefon:",
    email_subject_food_donor: "Lebensmittelspende",
    email_body_food_donor: "Hallo,\n\nIch möchte spenden.\n\nName:\nOrganisation:\nArt:\nKontakt:",
    email_subject_food_network: "Integration Lebensmittelnetzwerk",
    email_body_food_network: "Hallo,\n\nWir sind ein Kollektiv.\n\nOrt:\nPersonenanzahl:\nKontakt:",
    email_subject_contact: "Kontakt via ballal.be",
    action_copied: "Kopiert!"
};

const es: Translation = {
    ...en,
    nav_home: "Inicio",
    nav_directory: "Directorio",
    nav_news: "Noticias",
    nav_legal: "Derechos",
    nav_food_project: "Proyecto Alimentario",
    hero_title: "Solidaridad Guinea-Bélgica",
    hero_subtitle: "Acoger. Proteger. Unir.",
    btn_assist: "Necesito ayuda",
    btn_donate: "Donar",
    flash_title: "INVOCO MI DERECHO\nA GUARDAR SILENCIO.\nQUIERO UN ABOGADO.",
    legal_flash_btn: "EMERGENCIA POLICIAL",
    health_title: "Derecho a la Salud (AMU)",
    form_submit_btn: "Enviar solicitud",
    form_demo_warning: "MODO DEMO: Este formulario prepara un correo. No se guardan datos.",
    form_consent_gdpr: "Acepto usar mi cliente de correo.",
    nav_contact: "Contacto",
    footer_bce: "BCE: 1016.925.333",
    legal_disclaimer_title: "Descargo de responsabilidad legal",
    legal_disclaimer_text: "Este contenido es solo para fines informativos y no reemplaza el asesoramiento legal profesional. Consulte siempre a un abogado especializado.",
    share_privacy_warning: "Nota de privacidad: Compartir directamente a través de redes sociales permite a estas plataformas rastrear su actividad.",
    share_qr_alt: "Código QR para acceder al sitio web de Ballal ASBL",
    share_qr_inst: "Escanee este código con su cámara para abrir el sitio.",
};

// FALLBACK SAFEGUARD: African languages default to FRENCH for legal safety
const safeFallback = fr;

export const translations: Record<LanguageCode, Translation> = {
  fr,
  en,
  nl,
  de,
  es,
  ar: { ...safeFallback },
  pe: { ...safeFallback },
  ma: { ...safeFallback },
  su: { ...safeFallback }
};