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
  nav_news: string;
  nav_directory: string;
  
  // SEO Meta Descriptions
  meta_desc_home: string;
  meta_desc_legal: string;
  meta_desc_history: string;
  meta_desc_share: string;
  meta_desc_food: string;
  meta_desc_contact: string;
  meta_desc_festival: string;

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
  // Food Goals (New)
  food_goal_squats: string;
  food_goal_people: string;
  food_goal_growth: string;
  food_goal_partners: string;

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
  // Donation Goals (New)
  donate_goal_annual: string;
  donate_goal_annual_desc: string;
  donate_goal_previous: string;
  donate_goal_previous_desc: string;

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
  share_twitter: string;
  share_linkedin: string;
  share_telegram: string;
  share_text?: string;
  share_email_subject?: string;
  share_email?: string;
  share_privacy_warning: string;
  share_qr_alt: string;
  share_qr_inst: string;
  share_copy_error: string;
  share_download_qr: string;
  share_downloading: string;
  share_download_success: string;

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
  member_bio_placeholder: string;
  join_button: string;
  learn_more_button: string;

  // News
  news_title: string;
  news_subtitle: string;
  news_search_placeholder: string;
  news_filter_all: string;
  news_no_results: string;
  news_read_more: string;
  news_stats_articles: string;
  news_stats_views: string;
  news_subscribe_title: string;
  news_subscribe_desc: string;
  news_subscribe_btn: string;

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

  // Privacy Policy (New)
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
    nav_legal: "Aide & Droits",
    nav_history: "Histoire",
    nav_share: "Partager",
    nav_team: "Équipe",
    nav_solidarity: "Solidarité",
    nav_member_access: "Accès Membre",
    nav_food_project: "Projet Alimentaire",
    nav_contact: "Contact",
    nav_festival: "Festival Sans-Papiers",
    nav_news: "Actualités",
    nav_directory: "Communauté",
    meta_desc_home: "La structure de référence pour la communauté guinéenne en Belgique.",
    meta_desc_legal: "Assistance juridique urgente et droits des étrangers en Belgique.",
    meta_desc_history: "Découvrez l'histoire de la communauté guinéenne en Belgique, de 1958 à nos jours.",
    meta_desc_share: "Partagez l'application Ballal ASBL pour renforcer notre communauté.",
    meta_desc_food: "Projet d'autonomie et de sécurité alimentaire pour les collectifs et squats.",
    meta_desc_contact: "Contactez l'ASBL Ballal pour toute question ou demande de partenariat.",
    meta_desc_festival: "Festival des Sans-Papiers : Célébrer l'identité, revendiquer les droits.",
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
    legal_9bis_title: "Art. 9bis (Humanitaire - Une brèche nécessaire",
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
    food_goal_squats: "Objectif Squats (2025)",
    food_goal_people: "Bénéficiaires / jour",
    food_goal_growth: "Ambition de croissance",
    food_goal_partners: "Partenaires requis",
    
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
    donate_goal_annual: "Objectif Annuel",
    donate_goal_annual_desc: "Pour financer nos actions 2024",
    donate_goal_previous: "Collecté en 2023",
    donate_goal_previous_desc: "Merci pour votre générosité",

    share_title: "Faites grandir la communauté",
    share_subtitle: "Partagez l'application avec vos proches.",
    share_scan: "Scanner pour rejoindre",
    share_link_label: "Lien direct",
    share_copy: "Copier",
    share_copied: "Copié !",
    share_via: "Partager via...",
    share_whatsapp: "WhatsApp",
    share_facebook: "Facebook",
    share_twitter: "Twitter",
    share_linkedin: "LinkedIn",
    share_telegram: "Telegram",
    share_text: "Ballal ASBL - Solidarité Guinée-Belgique • Justice, Culture, Autonomie Alimentaire",
    share_email_subject: "Découvrez Ballal ASBL",
    share_email: "Envoyer par email",
    share_privacy_warning: "Note de confidentialité : Le partage direct via les réseaux sociaux permet à ces plateformes de suivre votre activité.",
    share_qr_alt: "Code QR pour accéder au site Ballal ASBL",
    share_qr_inst: "Scannez ce code avec votre appareil photo pour ouvrir le site.",
    share_copy_error: "Impossible de copier. Veuillez sélectionner le texte manuellement.",
    share_download_qr: "Télécharger",
    share_downloading: "Génération...",
    share_download_success: "Téléchargé !",

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
    member_bio_placeholder: "Membre actif de la communauté.",
    join_button: "Rejoindre l'équipe",
    learn_more_button: "En savoir plus",

    // News
    news_title: "Actualités & Événements",
    news_subtitle: "Restez informé des dernières nouvelles, événements et succès de notre communauté",
    news_search_placeholder: "Rechercher des actualités...",
    news_filter_all: "Toutes les actualités",
    news_no_results: "Aucun article trouvé",
    news_read_more: "Lire la suite",
    news_stats_articles: "Articles publiés",
    news_stats_views: "Vues totales",
    news_subscribe_title: "Restez informé",
    news_subscribe_desc: "Inscrivez-vous à notre newsletter pour recevoir les dernières actualités directement dans votre boîte mail",
    news_subscribe_btn: "S'abonner",

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

    // Privacy Policy
    privacy_updated: "Dernière mise à jour :",
    privacy_controller: "Responsable du traitement :",
    privacy_sec1_title: "1. Identité et Coordonnées",
    privacy_sec1_desc: "Le présent site web est géré par l'association sans but lucratif BALLAL ASBL.",
    privacy_address: "Adresse du siège social :",
    privacy_email: "Email de contact :",
    privacy_phone: "Téléphone :",
    privacy_sec2_title: "2. Données collectées et Finalités",
    privacy_sec2_desc: "Nous collectons et traitons vos données personnelles uniquement dans la mesure nécessaire pour remplir nos missions associatives :",
    privacy_form_contact: "Formulaires de Contact & Aide",
    privacy_data_types: "Données :",
    privacy_purpose: "Finalité :",
    privacy_newsletter: "Newsletter",
    privacy_sec3_title: "3. Partage des données",
    privacy_sec3_desc: "Vos données sont traitées de manière confidentielle. Elles ne sont jamais vendues à des tiers.",
    privacy_sec4_title: "4. Cookies et Stockage Local",
    privacy_sec4_desc: "Ce site utilise un stockage local (localStorage) pour améliorer votre expérience.",
    privacy_sec5_title: "5. Vos droits (RGPD)",
    privacy_sec5_desc: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :",
    privacy_contact_rights: "Pour exercer ces droits, veuillez nous contacter :",

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
    ...fr, 
    nav_home: "Home",
    nav_legal: "Rights & Aid",
    nav_history: "History",
    nav_share: "Share",
    nav_team: "Team",
    nav_solidarity: "Solidarity",
    nav_member_access: "Member Access",
    nav_food_project: "Food Project",
    nav_contact: "Contact",
    nav_festival: "Festival Sans-Papiers",
    nav_news: "News",
    nav_directory: "Community",
    meta_desc_home: "The reference for the Guinean community in Belgium.",
    meta_desc_legal: "Urgent legal assistance and rights of foreigners in Belgium.",
    meta_desc_history: "Discover the history of the Guinean community in Belgium, from 1958 to today.",
    meta_desc_share: "Share the Ballal ASBL app to strengthen our community.",
    meta_desc_food: "Food autonomy and security project for collectives and squats.",
    meta_desc_contact: "Contact Ballal ASBL for any questions or partnership requests.",
    meta_desc_festival: "Festival des Sans-Papiers: Celebrating identity, claiming rights.",
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
    legal_9bis_desc: "Regularisation request based on exceptional circumstances.",
    legal_9ter_title: "Art. 9ter (Medical)",
    legal_9ter_desc: "Regularisation request based on serious illness and risk to life.",
    food_goal_squats: "Target Squats (2025)",
    food_goal_people: "Beneficiaries / day",
    food_goal_growth: "Growth ambition",
    food_goal_partners: "Partners required",
    donate_goal_annual: "Annual Goal",
    donate_goal_annual_desc: "To fund our 2024 actions",
    donate_goal_previous: "Collected in 2023",
    donate_goal_previous_desc: "Thank you for your generosity",
    share_download_qr: "Download",
    share_downloading: "Generating...",
    share_download_success: "Downloaded!",
    news_title: "News & Events",
    news_subtitle: "Stay informed about the latest news, events, and successes of our community",
    news_search_placeholder: "Search news...",
    news_filter_all: "All news",
    news_no_results: "No articles found",
    news_read_more: "Read more",
    news_stats_articles: "Articles published",
    news_stats_views: "Total views",
    news_subscribe_title: "Stay informed",
    news_subscribe_desc: "Subscribe to our newsletter to receive the latest news directly in your mailbox",
    news_subscribe_btn: "Subscribe",
};

const nl: Translation = {
    ...fr,
    nav_home: "Startpagina",
    nav_legal: "Hulp & Rechten",
    nav_history: "Geschiedenis",
    nav_share: "Delen",
    nav_team: "Team",
    nav_solidarity: "Solidariteit",
    nav_member_access: "Leden Toegang",
    nav_food_project: "Voedselproject",
    nav_contact: "Contact",
    nav_festival: "Festival zonder Papieren",
    nav_news: "Nieuws",
    nav_directory: "Gemeenschap",
    hero_title: "Solidariteit Guinee-België",
    hero_subtitle: "Verwelkomen. Beschermen. Verenigen.",
    hero_desc: "De referentieorganisatie voor de Guinese gemeenschap in België. Juridische bijstand, sociale steun en culturele promotie.",
    hero_asbl: "Vereniging zonder winstoogmerk",
    btn_assist: "Ik heb hulp nodig",
    btn_donate: "Doneer",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Brussel",
    hero_city_liege: "Luik",
    urgent_title: "Solidariteit & Rechten",
    urgent_alert: "Bij arrestatie: Teken NIETS zonder advocaat.",
    legal_intro: "Bij arrestatie is zwijgen uw beste bescherming. Ken uw rechten.",
    legal_disclaimer_title: "Juridische Disclaimer",
    legal_disclaimer_text: "Deze inhoud is uitsluitend informatief en vervangt geen professioneel juridisch advies. Raadpleeg altijd een gespecialiseerde advocaat.",
    flash_title: "IK BEROEP ME OP MIJN ZWIJGRECHT.\nIK WIL EEN ADVOCAAT.",
    flash_msg_title: "BERICHT AAN POLITIE (Salduz-wet)",
    flash_msg_body: "\"Ik verklaar niets. Ik beroep me op mijn zwijgrecht. Ik verzoek om onmiddellijk vertrouwelijk overleg met een advocaat voorafgaand aan elk verhoor, overeenkomstig de Salduz-wet.\"",
    flash_close: "Sluiten",
    click_for_flash: "Klik voor Noodmodus",
    legal_flash_btn: "KLIK HIER VOOR POLITIE NOODGEVAL",
    legal_flash_protection: "Deze tekst is uw juridisch schild.",
    legal_strategy_title: "Verblijfsstrategie: 9bis vs 9ter",
    legal_warning: "Waarschuwing! Verwar deze procedures niet. Ze hebben verschillende strikte criteria.",
    legal_9bis_title: "Art. 9bis (Humanitair)",
    legal_9bis_desc: "Aanvraag tot regularisatie op basis van uitzonderlijke omstandigheden.",
    legal_9ter_title: "Art. 9ter (Medisch)",
    legal_9ter_desc: "Aanvraag tot regularisatie op basis van ernstige ziekte en levensgevaar.",
    food_goal_squats: "Doel Kraakpanden (2025)",
    food_goal_people: "Begunstigden / dag",
    food_goal_growth: "Groeiambitie",
    food_goal_partners: "Partners gezocht",
    donate_goal_annual: "Jaarlijks Doel",
    donate_goal_annual_desc: "Om onze acties in 2024 te financieren",
    donate_goal_previous: "Ingezameld in 2023",
    donate_goal_previous_desc: "Dank voor uw vrijgevigheid",
    share_download_qr: "Downloaden",
    share_downloading: "Genereren...",
    share_download_success: "Gedownload!",
    news_title: "Nieuws & Evenementen",
    news_subtitle: "Blijf op de hoogte van het laatste nieuws, evenementen en successen van onze gemeenschap",
    news_search_placeholder: "Zoek nieuws...",
    news_filter_all: "Alle nieuws",
    news_no_results: "Geen artikelen gevonden",
    news_read_more: "Lees meer",
    news_stats_articles: "Gepubliceerde artikelen",
    news_stats_views: "Totaal aantal weergaven",
    news_subscribe_title: "Blijf op de hoogte",
    news_subscribe_desc: "Schrijf u in op onze nieuwsbrief om het laatste nieuws direct in uw mailbox te ontvangen",
    news_subscribe_btn: "Abonneren",
};

const de: Translation = {
    ...fr,
    nav_home: "Startseite",
    nav_legal: "Rechtshilfe",
    nav_history: "Geschichte",
    nav_share: "Teilen",
    nav_team: "Team",
    nav_solidarity: "Solidarität",
    nav_member_access: "Mitgliederzugang",
    nav_food_project: "Ernährungsprojekt",
    nav_contact: "Kontakt",
    nav_festival: "Festival der Papierlosen",
    nav_news: "Nachrichten",
    nav_directory: "Gemeinschaft",
    hero_title: "Solidarität Guinea-Belgien",
    hero_subtitle: "Willkommen. Schützen. Vereinen.",
    hero_desc: "Die Referenzorganisation für die guineische Gemeinschaft in Belgien. Rechtshilfe, soziale Unterstützung und kulturelle Förderung.",
    hero_asbl: "Gemeinnütziger Verein",
    btn_assist: "Ich brauche Hilfe",
    btn_donate: "Spenden",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Brüssel",
    hero_city_liege: "Lüttich",
    urgent_title: "Solidarität & Rechte",
    urgent_alert: "Im Falle einer Festnahme: Unterschreiben Sie NICHTS ohne Anwalt.",
    legal_intro: "Bei einer Festnahme ist Schweigen Ihr bester Schutz. Kennen Sie Ihre Rechte.",
    legal_disclaimer_title: "Rechtlicher Hinweis",
    legal_disclaimer_text: "Dieser Inhalt dient nur zu Informationszwecken und ersetzt keine professionelle Rechtsberatung. Konsultieren Sie immer einen spezialisierten Anwalt.",
    flash_title: "ICH MACHE VON MEINEM SCHWEIGERECHT GEBRAUCH.\nICH WILL EINEN ANWALT.",
    flash_msg_title: "NACHRICHT AN DIE POLIZEI (Salduz-Gesetz)",
    flash_msg_body: "\"Ich sage nichts aus. Ich berufe mich auf mein Schweigerecht. Ich fordere eine sofortige vertrauliche Beratung mit einem Anwalt vor jeder Befragung, gemäß dem Salduz-Gesetz.\"",
    flash_close: "Schließen",
    click_for_flash: "Klicken für Notfallmodus",
    legal_flash_btn: "HIER KLICKEN FÜR POLIZEINOTFALL",
    legal_flash_protection: "Dieser Text ist Ihr juristischer Schutzschild.",
    legal_strategy_title: "Aufenthaltsstrategie: 9bis vs 9ter",
    legal_warning: "Warnung! Verwechseln Sie diese Verfahren nicht. Sie haben unterschiedliche strenge Kriterien.",
    legal_9bis_title: "Art. 9bis (Humanitär)",
    legal_9bis_desc: "Antrag auf Regularisierung aufgrund außergewöhnlicher Umstände.",
    legal_9ter_title: "Art. 9ter (Medizinisch)",
    legal_9ter_desc: "Antrag auf Regularisierung aufgrund schwerer Krankheit und Lebensgefahr.",
    food_goal_squats: "Ziel Besetzungen (2025)",
    food_goal_people: "Begünstigte / Tag",
    food_goal_growth: "Wachstumsziel",
    food_goal_partners: "Benötigte Partner",
    donate_goal_annual: "Jahresziel",
    donate_goal_annual_desc: "Zur Finanzierung unserer Aktionen 2024",
    donate_goal_previous: "Gesammelt 2023",
    donate_goal_previous_desc: "Danke für Ihre Großzügigkeit",
    share_download_qr: "Herunterladen",
    share_downloading: "Generieren...",
    share_download_success: "Heruntergeladen!",
    news_title: "Nachrichten & Veranstaltungen",
    news_subtitle: "Bleiben Sie informiert über die neuesten Nachrichten, Veranstaltungen und Erfolge unserer Gemeinschaft",
    news_search_placeholder: "Nachrichten suchen...",
    news_filter_all: "Alle Nachrichten",
    news_no_results: "Keine Artikel gefunden",
    news_read_more: "Mehr lesen",
    news_stats_articles: "Veröffentlichte Artikel",
    news_stats_views: "Gesamtansichten",
    news_subscribe_title: "Bleiben Sie informiert",
    news_subscribe_desc: "Abonnieren Sie unseren Newsletter, um die neuesten Nachrichten direkt in Ihr Postfach zu erhalten",
    news_subscribe_btn: "Abonnieren",
};

const es: Translation = {
    ...fr,
    nav_home: "Inicio",
    nav_legal: "Ayuda y Derechos",
    nav_history: "Historia",
    nav_share: "Compartir",
    nav_team: "Equipo",
    nav_solidarity: "Solidaridad",
    nav_member_access: "Acceso Miembros",
    nav_food_project: "Proyecto Alimentario",
    nav_contact: "Contacto",
    nav_festival: "Festival Sin Papeles",
    nav_news: "Noticias",
    nav_directory: "Comunidad",
    hero_title: "Solidaridad Guinea-Bélgica",
    hero_subtitle: "Acoger. Proteger. Unir.",
    hero_desc: "La organización de referencia para la comunidad guineana en Bélgica. Asistencia legal, apoyo social y promoción cultural.",
    hero_asbl: "Asociación sin ánimo de lucro",
    btn_assist: "Necesito ayuda",
    btn_donate: "Donar",
    hero_city_conakry: "Conakry",
    hero_city_brussels: "Bruselas",
    hero_city_liege: "Lieja",
    urgent_title: "Solidaridad y Derechos",
    urgent_alert: "En caso de arresto: NO firme NADA sin un abogado.",
    legal_intro: "En caso de arresto, el silencio es su mejor protección. Conozca sus derechos.",
    legal_disclaimer_title: "Aviso Legal",
    legal_disclaimer_text: "Este contenido es solo para fines informativos y no reemplaza el asesoramiento legal profesional. Consulte siempre a un abogado especializado.",
    flash_title: "INVOCO MI DERECHO\nA GUARDAR SILENCIO.\nQUIERO UN ABOGADO.",
    flash_msg_title: "MENSAJE A LA POLICÍA (Ley Salduz)",
    flash_msg_body: "\"No declaro nada. Invoco mi derecho a guardar silencio. Solicito consulta confidencial inmediata con un abogado antes de cualquier interrogatorio, de acuerdo con la ley Salduz.\"",
    flash_close: "Cerrar",
    click_for_flash: "Clic para Modo Emergencia",
    legal_flash_btn: "CLIC AQUÍ PARA EMERGENCIA POLICIAL",
    legal_flash_protection: "Este texto es su escudo legal.",
    legal_strategy_title: "Estrategia de Residencia: 9bis vs 9ter",
    legal_warning: "¡Advertencia! No confunda estos procedimientos. Tienen criterios estrictos diferentes.",
    legal_9bis_title: "Art. 9bis (Humanitario)",
    legal_9bis_desc: "Solicitud de regularización basada en circunstancias excepcionales.",
    legal_9ter_title: "Art. 9ter (Médico)",
    legal_9ter_desc: "Solicitud de regularización basada en enfermedad grave y riesgo para la vida.",
    food_goal_squats: "Objetivo Okupas (2025)",
    food_goal_people: "Beneficiarios / día",
    food_goal_growth: "Ambición de crecimiento",
    food_goal_partners: "Socios requeridos",
    donate_goal_annual: "Objetivo Anual",
    donate_goal_annual_desc: "Para financiar nuestras acciones 2024",
    donate_goal_previous: "Recaudado en 2023",
    donate_goal_previous_desc: "Gracias por su generosidad",
    share_download_qr: "Descargar",
    share_downloading: "Generando...",
    share_download_success: "¡Descargado!",
    news_title: "Noticias y Eventos",
    news_subtitle: "Manténgase informado sobre las últimas noticias, eventos y éxitos de nuestra comunidad",
    news_search_placeholder: "Buscar noticias...",
    news_filter_all: "Todas las noticias",
    news_no_results: "No se encontraron artículos",
    news_read_more: "Leer más",
    news_stats_articles: "Artículos publicados",
    news_stats_views: "Vistas totales",
    news_subscribe_title: "Manténgase informado",
    news_subscribe_desc: "Suscríbase a nuestro boletín para recibir las últimas noticias directamente en su correo",
    news_subscribe_btn: "Suscribirse",
};

const ar: Translation = {
    ...fr,
    nav_home: "الرئيسية",
    nav_legal: "المساعدة والحقوق",
    nav_history: "تاريخنا",
    nav_share: "مشاركة",
    nav_team: "الفريق",
    nav_solidarity: "تضامن",
    nav_member_access: "دخول الأعضاء",
    nav_food_project: "مشروع الغذاء",
    nav_contact: "اتصل بنا",
    nav_festival: "مهرجان بلا أوراق",
    nav_news: "أخبار",
    nav_directory: "المجتمع",
    meta_desc_home: "المرجع للجالية الغينية في بلجيكا.",
    hero_title: "تضامن غينيا-بلجيكا",
    hero_subtitle: "ترحيب. حماية. اتحاد.",
    hero_desc: "المنظمة المرجعية للجالية الغينية في بلجيكا. مساعدة قانونية، دعم اجتماعي، وتعزيز ثقافي.",
    hero_asbl: "جمعية غير ربحية",
    btn_assist: "أحتاج مساعدة",
    btn_donate: "تبرع",
    hero_city_conakry: "كوناكري",
    hero_city_brussels: "بروكسل",
    hero_city_liege: "لييج",
    urgent_title: "تضامن وحقوق",
    urgent_alert: "في حالة الاعتقال: لا توقع على أي شيء بدون محام.",
    legal_intro: "في حالة الاعتقال، الصمت هو أفضل حماية لك. اعرف حقوقك.",
    legal_disclaimer_title: "إخلاء مسؤولية قانوني",
    legal_disclaimer_text: "هذا المحتوى لأغراض إعلامية فقط ولا يحل محل المشورة القانونية المهنية. استشر دائما محاميا متخصصا.",
    flash_title: "أتمسك بحقي في الصمت.\nأريد محاميا.",
    flash_msg_title: "رسالة للشرطة (قانون سالدوز)",
    flash_msg_body: "\"أنا لا أصرح بشيء. أتمسك بحقي في الصمت. أطلب استشارة سرية فورية مع محام قبل أي استجواب، وفقا لقانون سالدوز.\"",
    flash_close: "إغلاق",
    click_for_flash: "اضغط لوضع الطوارئ",
    legal_flash_btn: "اضغط هنا لطوارئ الشرطة",
    legal_flash_protection: "هذا النص هو درعك القانوني.",
    legal_strategy_title: "استراتيجية الإقامة: 9bis مقابل 9ter",
    legal_warning: "تحذير! لا تخلط بين هذه الإجراءات. لديها معايير صارمة مختلفة.",
    legal_9bis_title: "المادة 9bis (إنساني)",
    legal_9bis_desc: "طلب تسوية الوضع بناءً على ظروف استثنائية.",
    legal_9ter_title: "المادة 9ter (طبي)",
    legal_9ter_desc: "طلب تسوية الوضع بناءً على مرض خطير وخطر على الحياة.",
    food_goal_squats: "الأهداف (2025)",
    food_goal_people: "المستفيدون / يوم",
    food_goal_growth: "طموح النمو",
    food_goal_partners: "الشركاء المطلوبون",
    donate_goal_annual: "الهدف السنوي",
    donate_goal_annual_desc: "لتمويل أعمالنا لعام 2024",
    donate_goal_previous: "تم جمعه في 2023",
    donate_goal_previous_desc: "شكرا لكرمكم",
    share_download_qr: "تحميل",
    share_downloading: "جاري الإنشاء...",
    share_download_success: "تم التحميل!",
    news_title: "أخبار وأحداث",
    news_subtitle: "ابق على اطلاع بآخر الأخبار والأحداث ونجاحات مجتمعنا",
    news_search_placeholder: "بحث في الأخبار...",
    news_filter_all: "كل الأخبار",
    news_no_results: "لم يتم العثور على مقالات",
    news_read_more: "اقرأ المزيد",
    news_stats_articles: "مقالات منشورة",
    news_stats_views: "إجمالي المشاهدات",
    news_subscribe_title: "ابق على اطلاع",
    news_subscribe_desc: "اشترك في نشرتنا الإخبارية لتلقي آخر الأخبار مباشرة في بريدك الوارد",
    news_subscribe_btn: "اشترك",
};

// --- Langues Guinéennes & Fallbacks ---
// Note: Le contenu juridique reste en français pour la précision administrative en Belgique/Guinée.
// L'interface de navigation est prête pour une traduction future par des locuteurs natifs.

const pe: Translation = { ...fr }; // Pular (Peul) - Placeholder structure
const ma: Translation = { ...fr }; // Malinké - Placeholder structure
const su: Translation = { ...fr }; // Soussou - Placeholder structure
const ru: Translation = { ...en }; // Russian - Fallback to English
const it: Translation = { ...fr }; // Italian - Fallback to French
const pt: Translation = { ...es }; // Portuguese - Fallback to Spanish

// Export translations object
export const translations: Record<string, Translation> = {
  fr,
  en,
  nl,
  de,
  es,
  ar,
  pe,
  ma,
  su,
  ru,
  it,
  pt
};