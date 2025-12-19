import React, { useState } from 'react';
import {
  Siren, Hammer, X, ChevronDown, Search, Home, Shield, FileText, AlertTriangle, Lightbulb, MapPin,
  Clock, Users, Download, Copy, Phone, BookOpen, Camera, Lock, AlertCircle, CheckCircle, Globe,
  Megaphone, BarChart, Eye, Zap, Flame, RotateCcw, Scale, LayoutList
} from 'lucide-react';
import { LanguageCode } from '../types.ts';

// Types
type TabType = 'manual' | 'checklists' | 'insides';
type PhaseType = 'scouting' | 'entry' | 'anchoring' | 'defense' | 'nego_legal' | 'post'; 
type EmergencyStatus = 'safe' | 'warning' | 'danger';
type InsideCategory = 'general' | 'refugee' | 'negotiation' | 'daily_life' | 'ot';

interface SquatSectionProps {
  language?: LanguageCode;
}

interface ChecklistItem {
  id: number;
  text: string;
  done: boolean;
}

interface Checklists {
  scouting: ChecklistItem[];
  entry: ChecklistItem[];
  anchoring: ChecklistItem[];
  defense: ChecklistItem[];
  nego_legal: ChecklistItem[]; 
  post: ChecklistItem[];
}

interface Inside {
  id: number;
  text: string;
  details: string;
  source?: string;
  icon: React.ReactNode;
  category: InsideCategory;
}

interface PhaseInfo {
  phase: PhaseType;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: string;
  detail: {
    objective: string;
    tips: string[];
    insidesKeys: InsideCategory[];
  };
}

// Data: Insides (kept originals + 50, added details to all, adjusted for federal targeting and squat->OT strategy, added 'ot' category for balance)
const insidesData: Inside[] = [
  { id: 1, text: "Vérifie le statut du bâtiment via le cadastre gratuit (cadastre.brussels) pour identifier le propriétaire et si c'est vide.", details: "Utilise le cadastre pour repérer les gros bâtiments fédéraux vides – cibles prioritaires à Bruxelles avec élus de gauche (PS/Ecolo) qui facilitent les reports. Stratégie : repère, ouvre squat, pivote vers OT. Concret : cherche 'propriétaire : État belge', vérifie vide >1 an, prépare contact post-entrée pour convention. Ex: Evere 2025, squat fédéral transformé en OT humanitaire pour migrants (report via CEDH). Squat = entrée illégale tactique, OT = légalisation avec contrat précaire (entretien gratuit, durée flexible, évite taxes). Plus d'explications : Le cadastre donne propriétaire, taxes, plans – utilise pour argumenter inoccupation longue lors négo OT, cite loi régionale pour amendes évitées. Pour fédéraux, ajoute angle CEDH Art.8 (droit domicile) pour migrants. Avancé : Télécharge données cadastre en CSV pour analyse batch, croise avec urban.brussels pour permis.", source: "Cadastre BXL", icon: <MapPin size={18} />, category: 'general' },
  { id: 2, text: "Si le bâtiment est un bien de spéculateur (vide pour revendre), propose une occupation temporaire légale pour lui éviter les taxes sur inoccupation (jusqu'à 3.000€/an).", details: "Pour spéculateurs ou fédéraux, ouvre squat puis négocie OT rapide. À Bruxelles, majorité gauche au parlement (41/72 sièges francophones PS/PTB/Ecolo) aide pour humanitaire. Concret : post-entrée, envoie lettre au propriétaire (via cadastre) avec proposition OT, argumente taxes évitées + no dégradations. Ex: squat spéculateur à Molenbeek 2025, OT signée en 2 semaines. Différence clé : squat risque pénal mais base négo, OT = stable, légal, possible subventions CPAS. Plus d'explications : Taxes inoccupation : 3k€ base, x4 récidive – propose OT comme solution win-win, ajoute photos avant/après pour montrer valeur ajoutée, implique avocat pro-bono pour contrat. Avancé : Use modèle FéBUL avec clauses escalade taxes.", source: "Région BXL", icon: <RotateCcw size={18} />, category: 'negotiation' },
  { id: 3, text: "Pivote vers l'occupation temporaire (OT) dès le repérage. Contacte le propriétaire via cadastre pour une convention précaire (3-24 mois). 70% des propriétaires acceptent si tu gères l'entretien gratuit.", details: "Cible fédéraux vides pour victoires : repérage, squat, OT. Concret : prépare dossier avec stats Fedasil (7k sans-abri 2025), contacte propriétaire/Guichet OT post-entrée. Ex: bâtiment EU vide à Ixelles, squat 2025 -> OT via bourgmestre Ecolo. OT vs squat : OT légalise (contrat signé par asso comme Communa), squat = phase initiale illégale mais efficace pour pression. Plus d'explications : 70% acceptation via Guichet OT – prépare pitch : entretien gratuit, surveillance, usages tests (préfiguration). Pour migrants, ajoute clauses protection expulsion. Avancé : Stats Perspective : 70% via intermédiaires, use API cadastre pour auto-queries.", source: "Guichet OT/Perspective", icon: <Scale size={18} />, category: 'negotiation' },
  { id: 4, text: "Cible les bâtiments fédéraux ou EU (victoires avec reports d'expulsion, comme à Evere en nov 2025). Préfère sites privés mais fédéraux OK pour humanitaire.", details: "À Bruxelles, élus gauche (gouvernement régional en négos PS-Ecolo) tolèrent souvent pour migrants. Stratégie : ouvre squat, mobilise (pétitions Voix SP), signe OT. Concret : vise vides fédéraux (rue de Genève), entre, installe, négocie via CPAS. Ex: report expulsion nov 2025 grâce à angle 'État ne loge pas, on occupe'. Squat = illégal start, OT = légal end (différence : OT évite cour, ajoute clauses humanitaires). Plus d'explications : Fédéraux vides : milliers m² inutilisés, CEDH condamne Belgique pour non-logement – use pour report, pivote OT avec appui bourgmestre (ex: PS Bruxelles-Ville). Avancé : Liste fédéraux via questions parlementaires (ex: Régie des Bâtiments).", source: "Rapports d'asso", icon: <AlertTriangle size={18} />, category: 'general' },
  { id: 5, text: "Vérifie conformité incendie/hygiène avant entrée avec une app comme 'Habitools' (checklist gratuite). Si pas safe, abandonne.", details: "Pour fédéraux, check crucial pour tenir squat jusqu'à OT. Concret : app Habitools liste extincteurs/ventilation, fixe low-cost post-entrée (extincteur 20€ Action). Ex: squat fédéral sécurisé 2025 pour convention. OT vs squat : en OT, propriétaire/CPAS co-finance améliorations. Plus d'explications : Checklist : sorties urgence, détecteurs fumée – si fail, abandonne ; post-OT, subventions 5k€ Perspective pour upgrades. Avancé : SIAMU avis pour dispenses temporaires.", source: "Habitools/FéBUL", icon: <Flame size={18} />, category: 'general' },
  { id: 6, text: "Prépare un kit urgence : Eau (jerrycans 20L), nourriture non-périssable (banques alimentaires à Molenbeek), et Signal app pour comms sécurisées (la police scanne souvent les phones).", details: "Kit pour phase squat initiale, avant OT. Concret : jerrycans Decathlon, nourriture Samusocial, Signal pour coordonner négo propriétaire. Ex: utilisé Evere 2025 pour tenir jusqu'à convention. Différence : OT permet aides permanentes CPAS/Fedasil. Plus d'explications : Ajoute trousse médicale MSF, chargeurs solaires – pour migrants, distribue via Plateforme Citoyenne. Avancé : Apps offline pour stock management.", source: "Expérience terrain", icon: <Lock size={18} />, category: 'general' },
  { id: 7, text: "Explosion du sans-abrisme : +7.000 demandeurs d'asile sans-abri à BXL en 2025 (attente moyenne de 112 jours). Utilise ce chiffre pour négocier un angle humanitaire.", details: "Pour fédéraux, stats Fedasil renforcent squat->OT. Concret : cite en négo, implique CIRÉ pour appui. Ex: squat migrants reporté août 2025 via FEANTSA. OT légalise humanitaire. Plus d'explications : Stats : attente 112 jours, saturation 34k places – use pour pétition, lettre propriétaire, appui élus PTB. Avancé : Croise avec Myria rapports pour data 2025.", source: "FEANTSA/Fedasil 2025", icon: <BarChart size={18} />, category: 'refugee' },
  { id: 8, text: "Mentionne la saturation de Fedasil (34k places, 3.900 en attente août 2025) pour appuyer la nécessité de l'occupation solidaire.", details: "Angle pour squat fédéral, pivote OT. Concret : envoie stats à propriétaire/bourgmestre gauche. Ex: utilisé pour OT Liège 2025. Plus d'explications : Saturation mène condamnations CEDH – cite pour clauses OT protectrices migrants. Avancé : Use Fedasil API pour stats live.", source: "Fedasil Août 2025", icon: <Users size={18} />, category: 'refugee' },
  { id: 9, text: "Les sans-papiers peuvent signer des conventions précaires (OT) : fournis des preuves de précarité au CPAS (attestation Fedasil) pour obtenir leur appui.", details: "Après squat, OT pour sans-papiers. Concret : attestation Fedasil + CPAS appui négo. Ex: OT signée BXL 2025 pour Afghans. Plus d'explications : Preuves : attestation attente asile – CPAS co-signe pour subventions. Avancé : PICUM guide pour droits sans-papiers en OT.", source: "PICUM/CIRÉ", icon: <FileText size={18} />, category: 'refugee' },
  { id: 10, text: "Hotline CIRÉ (+32 2 629 77 10) pour conseils gratuits en FR/EN/AR sur les droits des étrangers et sans-papiers.", details: "Appelle post-squat pour négo OT. Concret : conseils sur clauses humanitaires. Plus d'explications : Hotline aide rédaction contrats OT avec droits migrants. Avancé : Sessions AR pour migrants spécifiques.", source: "CIRÉ", icon: <Phone size={18} />, category: 'refugee' },
  { id: 11, text: "Pour Palestiniens/Afghans/Syriens : Priorise occupations près de Fedasil (Rue des Champs, Anderlecht) pour accès aux aides.", details: "Squat près Fedasil, pivote OT. Concret : aides rapides pour négo. Plus d'explications : Proximité facilite attestations pour clauses OT. Avancé : Map Fedasil sites pour scouting.", source: "Réseaux d'asso", icon: <MapPin size={18} />, category: 'refugee' },
  { id: 12, text: "Plateforme Citoyenne (+32 473 323 289) organise hébergements citoyens (40% des sans-abri asylum seekers en 2025).", details: "Soutien pour squat->OT migrants. Plus d'explications : Organise hébergements temporaires pendant négo OT. Avancé : Réseau pour mobilisation rapide.", source: "Plateforme Citoyenne", icon: <Users size={18} />, category: 'refugee' },
  { id: 13, text: "Femmes/enfants vulnérables : Contacte Pierre d'Angle (+32 2 513 38 01) ou Open Deur (familles) pour abri d'urgence. Évite les squats mixtes pour la sécurité.", details: "Pour squat initial, puis OT sécurisée. Plus d'explications : Assos appuient OT avec clauses sécurité familles. Avancé : Protocoles genre pour OT.", source: "Associations", icon: <Shield size={18} />, category: 'refugee' },
  { id: 14, text: "Santé hiver 2025 : Samusocial (0800 99 340) pour nuits gratuites (appeler lundi 10h). MSF Brussels offre des check-ups walk-in pour PTSD (vendredis).", details: "Soutien pendant phase squat, avant OT stable. Plus d'explications : MSF aide pour rapports santé en négo OT. Avancé : Partenariats MSF pour OT santé.", source: "Samusocial/MSF", icon: <AlertCircle size={18} />, category: 'refugee' },
  { id: 15, text: "Communa (communa.be) peut signer la convention légale d'occupation (pas squat) pour toi, moyenne 2.5 ans de durée.", details: "Idéal post-squat fédéral. Concret : contacte-les après entrée, ils négocient OT. Ex: squat 123 rue Royale -> OT depuis 2013. Plus d'explications : Communa gère paperasse, ajoute projets socio pour extensions. Avancé : Modèles Communa pour fédéraux.", source: "Communa", icon: <Home size={18} />, category: 'negotiation' },
  { id: 16, text: "Toestand.be facilite les négociations gratuites pour projets socio-culturels impliquant des réfugiés.", details: "Pour OT après squat. Concret : projets culturels renforcent négo. Plus d'explications : Facilite OT avec clauses communautaires. Avancé : Ateliers Toestand pour subventions.", source: "Toestand", icon: <Globe size={18} />, category: 'negotiation' },
  { id: 17, text: "Argumente sur les taxes : le propriétaire évite des amendes d'inoccupation (jusqu'à 12.500€ si récidive) et des dégradations.", details: "Pour fédéraux, ajoute humanitaire. Concret : cite en lettre post-squat. Plus d'explications : Amendes x4 récidive – OT évite, ajoute valeur surveillance. Avancé : Calcul taxes via Région BXL tool.", source: "Région BXL", icon: <FileText size={18} />, category: 'negotiation' },
  { id: 18, text: "Propose de la 'préfiguration' : tester des usages futurs (logement social) pour le quartier avant le projet définitif du propriétaire.", details: "En OT post-squat, teste usages. Concret : pour fédéraux, implique quartier. Plus d'explications : Préfiguration renforce OT longue durée. Avancé : Partenariats Perspective pour tests.", source: "Perspective BXL", icon: <Eye size={18} />, category: 'negotiation' },
  { id: 19, text: "Deux bâtiments fédéraux ouverts pour sans-abri hiver 2025 (BXL/Liège) : contacte Guichet OT (perspective.brussels) pour obtenir des subventions liées.", details: "Cible-les pour squat->OT. Concret : subventions 5k€ pour aménagements. Plus d'explications : Guichet aide négo fédéraux. Avancé : Stratégie Régie 2025 pour OT.", source: "Guichet OT", icon: <Hammer size={18} />, category: 'negotiation' },
  { id: 20, text: "Implique le CPAS dans la négociation pour l'appui aux réfugiés : ils peuvent aider à co-financer de petites améliorations.", details: "Post-squat, CPAS appui OT. Concret : attestation pour migrants. Plus d'explications : CPAS co-finance hygiène/incendie. Avancé : Protocoles CPAS pour OT humanitaire.", source: "CPAS", icon: <Users size={18} />, category: 'negotiation' },
  { id: 21, text: "La mobilisation collective (pétitions + manifs) reporte les expulsions (ex: squat asylum seekers reporté août 2025). Rejoins Voix des Sans-Papiers (voixsp1@hotmail.com).", details: "Pour tenir squat jusqu'à OT. Concret : Change.org pétition, manifs avec PTB. Plus d'explications : Mobilisation avec élus gauche report expulsions. Avancé : Templates pétitions Voix SP.", source: "Collectif Voix SP", icon: <Megaphone size={18} />, category: 'negotiation' },
  { id: 22, text: "Télécharge le guide FéBUL (PDF 2020, valable 2025) pour des modèles de contrats précaires incluant des clauses humanitaires.", details: "Use pour OT post-squat. Concret : modèles avec clauses migrants. Plus d'explications : PDF inclut templates OT avec protections CEDH. Avancé : Adaptations 2025 pour fédéraux.", source: "FéBUL", icon: <Download size={18} />, category: 'negotiation' },
  { id: 23, text: "Mets en place l'inclusion anti-racisme : quotas diversité et formations (via Pigment vzw : +32 466 247 278).", details: "Pour vie en OT après squat. Concret : formations gratuites. Plus d'explications : Quotas pour migrants, formations Pigment renforcent OT communautaire. Avancé : Protocoles Pigment pour OT.", source: "Pigment vzw", icon: <CheckCircle size={18} />, category: 'daily_life' },
  { id: 24, text: "Finances hybrides : utilise les dons et le 'pay what you can' lors d'événements publics pour couvrir les coûts (via Toestand pour la visibilité).", details: "En OT, événements financent. Concret : via Toestand. Plus d'explications : Dons + PWYC couvrent entretien OT. Avancé : Crowdfunding pour OT extensions.", source: "Toestand/Expérience", icon: <Lightbulb size={18} />, category: 'daily_life' },
  { id: 25, text: "Utilise l'OT (3-6 mois) pour faire des demandes de logements sociaux (liste d'attente via CAW Brussels : 0800 13 500).", details: "Après squat->OT, prépare relogement. Plus d'explications : OT temps pour listes CAW. Avancé : Priorité migrants via CPAS.", source: "CAW Brussels", icon: <Home size={18} />, category: 'daily_life' },
  { id: 26, text: "Pour l'emploi, utilise le guide PICUM 2025 qui aide les immigrants et réfugiés sans-papiers.", details: "En OT, aide emploi. Plus d'explications : Guide jobs pour migrants en OT. Avancé : Partenariats Actiris pour OT.", source: "PICUM 2025", icon: <BookOpen size={18} />, category: 'daily_life' },
  { id: 27, text: "Évite la gentrification : choisis des quartiers populaires et implique les voisins pour des projets communautaires.", details: "Pour squats/OT durables. Plus d'explications : Implication voisins renforce OT. Avancé : Projets anti-gentri pour subventions.", source: "Analyse urbaine", icon: <Users size={18} />, category: 'daily_life' },
  { id: 28, text: "Réseaux extra : Myria (+32 2 212 30 00) pour les droits ; Vluchtelingenwerk (+32 2 225 44 00) pour l'asile.", details: "Soutien pour OT humanitaire. Plus d'explications : Myria aide droits en négo OT. Avancé : Rapports Myria pour dossiers.", source: "Institutions", icon: <Phone size={18} />, category: 'daily_life' },
  { id: 29, text: "Utilise des cartes interactives comme OpenStreetMap pour identifier les bâtiments potentiellement vacants dans des zones ciblées.", details: "Cible fédéraux vides via tags 'abandoned'. Concret : filtre, note, squat puis OT. Ex: spot Evere 2025. Plus d'explications : OSM + cadastre pour plans détaillés, vise tags fédéral. Avancé : Édite OSM pour community tips.", source: "OpenStreetMap", icon: <MapPin size={18} />, category: 'general' },
  { id: 30, text: "Observe les boîtes aux lettres : si elles sont pleines de pub non ramassée, le bâtiment est probablement vide.", details: "Signe pour cible fédéral. Concret : check discret, entre squat, négocie OT. Plus d'explications : Plein pub = inoccupation >mois, bon pour argument OT. Avancé : Photo proof pour dossier.", source: "Expérience terrain", icon: <AlertTriangle size={18} />, category: 'general' },
  { id: 31, text: "Vérifie les annonces immobilières en ligne pour repérer les propriétés listées comme vacantes ou à rénover.", details: "Pour fédéraux, cherche 'État belge'. Squat start, OT end. Plus d'explications : Sites comme Immoweb listent fédéraux, use pour contact propriétaire. Avancé : Alerts Immoweb pour new listings.", source: "Sites immo", icon: <Search size={18} />, category: 'general' },
  { id: 32, text: "Marche dans le quartier à différents horaires pour noter l'absence d'activité (lumières, mouvements).", details: "Idéal pour spot fédéral. Timing entrée nuit pour squat. Plus d'explications : Horaires variés confirment vide, prépare alibi joggeur. Avancé : Log horaires pour patterns police.", source: "Observation", icon: <Clock size={18} />, category: 'general' },
  { id: 34, text: "Parle aux voisins de manière casual pour glaner des infos sur la durée d'inoccupation du bâtiment.", details: "Pour confirm fédéral vide. Implique-les post-OT. Plus d'explications : Casual talk : 'Beau bâtiment, vide depuis quand?' – gagne soutien pour OT. Avancé : Échange contacts pour alliance.", source: "Réseaux locaux", icon: <Users size={18} />, category: 'general' },
  { id: 35, text: "Vérifie les permis d'urbanisme sur urban.brussels pour voir si le bâtiment est abandonné légalement.", details: "Pas de travaux = bonne cible fédéral. Squat puis OT. Plus d'explications : No permis = inoccupation, argument pour OT sans conflit projets. Avancé : Alerts urban pour updates.", source: "Urban BXL", icon: <FileText size={18} />, category: 'general' },
  { id: 36, text: "Évite les bâtiments avec des affiches 'À vendre' récentes : risque de visites d'agents immobiliers.", details: "Mais pour fédéraux vieux, go squat->OT. Plus d'explications : Récentes = risque spot, vieux = opportunité OT longue. Avancé : Check dates affiches pour timing.", source: "Risques repérage", icon: <AlertTriangle size={18} />, category: 'general' },
  { id: 37, text: "Note les numéros de téléphone sur les pancartes pour contacter discrètement les propriétaires en amont.", details: "Pour négo OT post-squat fédéral. Plus d'explications : Appel anonyme pré-entrée pour sonder, full négo post. Avancé : Use burner phone.", source: "Contact indirect", icon: <Phone size={18} />, category: 'general' },
  { id: 38, text: "Utilise des apps comme Geopunt pour cartes détaillées des bâtiments en Flandre/Bruxelles.", details: "Repère fédéraux, plan entrée. Plus d'explications : Geopunt + OSM pour 3D views, identifie accès. Avancé : Export KML pour GPS.", source: "Geopunt", icon: <MapPin size={18} />, category: 'general' },
  { id: 39, text: "Prépare un alibi : pose comme joggeur ou promeneur pour éviter suspicions lors du repérage.", details: "Discrétion pour cible fédéral. Plus d'explications : Joggeur avec phone notes, évite police questions. Avancé : Vêtements sport, route planifiée.", source: "Discrétion", icon: <Shield size={18} />, category: 'general' },
  { id: 40, text: "Vérifie les compteurs extérieurs (eau, élec) : s'ils n'ont pas bougé, le lieu est vide.", details: "Confirme pour squat fédéral. Plus d'explications : Compteurs Sibelga, no mouvement = vide >mois. Avancé : Note numéros pour check historique.", source: "Sibelga tips", icon: <Zap size={18} />, category: 'general' },
  { id: 41, text: "Repère les accès secondaires (ruelles, jardins) pour une entrée potentielle non visible.", details: "Pour entrée squat discrète. Plus d'explications : Ruelles pour no vue rue, idéal fédéraux grands. Avancé : Photos geo-tagged.", source: "Planification entrée", icon: <Lock size={18} />, category: 'general' },
  { id: 42, text: "Utilise Google Street View pour un repérage virtuel avant de te déplacer sur site.", details: "Repère fédéraux sans risque. Plus d'explications : Views historiques confirment vide longue durée. Avancé : Timeline pour changements.", source: "Google Maps", icon: <Eye size={18} />, category: 'general' },
  { id: 43, text: "Évalue la visibilité depuis la rue : préfère bâtiments avec entrées cachées pour discrétion.", details: "Pour squat safe. Plus d'explications : Entrées cachées réduisent risque spot police. Avancé : Calcule angles vue.", source: "Sécurité entrée", icon: <Shield size={18} />, category: 'general' },
  { id: 44, text: "Prépare des outils basiques : lampe torche, gants, pour inspection rapide lors du repérage.", details: "Kit pour repérage fédéral. Plus d'explications : Torche LED, gants no traces. Avancé : Multi-tool pour checks.", source: "Kit repérage", icon: <Lightbulb size={18} />, category: 'general' },
  { id: 45, text: "Vérifie la présence de squatteurs précédents via graffitis ou signes extérieurs.", details: "Évite conflits, go OT. Plus d'explications : Graffitis = histoire, contacte-les pour alliance OT. Avancé : Recherche online graff.", source: "Histoire lieu", icon: <AlertCircle size={18} />, category: 'general' },
  { id: 46, text: "Note les horaires de patrouilles policières dans le quartier pour timing optimal.", details: "Pour entrée squat fédéral. Plus d'explications : Observe 1 semaine, entre hors patrouilles. Avancé : Apps police reports.", source: "Observation sécurité", icon: <Siren size={18} />, category: 'general' },
  { id: 47, text: "Utilise des forums comme Reddit (r/squatting) pour infos sur bâtiments vides à BXL.", details: "Repère fédéraux via communauté. Plus d'explications : Threads BXL pour tips. Avancé : VPN pour anonymat.", source: "Communauté en ligne", icon: <Globe size={18} />, category: 'general' },
  { id: 48, text: "Évalue la structure : évite bâtiments en ruine visible (risque effondrement).", details: "Pour squat safe avant OT. Plus d'explications : Check fissures, toits – si OK, proceed. Avancé : Apps structure check.", source: "Sécurité structurale", icon: <Hammer size={18} />, category: 'general' },
  { id: 49, text: "Prépare un groupe de repérage : un observe, un note, pour efficacité.", details: "Équipe pour cible fédéral. Plus d'explications : Binôme : un watch, un map. Avancé : Rôles rotatifs.", source: "Travail équipe", icon: <Users size={18} />, category: 'general' },
  { id: 50, text: "Vérifie les zones inondables via cartes RIS pour éviter risques saisonniers.", details: "Pour squats durables. Plus d'explications : RIS maps Région BXL, évite Senne. Avancé : Croise avec météo historique.", source: "Région BXL", icon: <AlertTriangle size={18} />, category: 'general' },
  { id: 51, text: "Utilise des jumelles pour observer de loin sans approcher trop près.", details: "Discrétion repérage fédéral. Plus d'explications : Jumelles 10x, de parc opposé. Avancé : Jumelles night vision.", source: "Outils optiques", icon: <Eye size={18} />, category: 'general' },
  { id: 52, text: "Note les types de serrures visibles pour préparer les outils d'ouverture.", details: "Pour entrée squat non destructrice. Plus d'explications : Cylindre euro = bump key facile. Avancé : Recherche models online.", source: "Prépa entrée", icon: <Lock size={18} />, category: 'general' },
  { id: 53, text: "Évite repérage en voiture : plus discret à pied ou vélo.", details: "Mobilité pour repérage. Plus d'explications : Vélo Villo pour blending in. Avancé : Électrique pour vitesse.", source: "Mobilité discrète", icon: <RotateCcw size={18} />, category: 'general' },
  { id: 54, text: "Vérifie les réseaux sociaux locaux pour mentions de bâtiments abandonnés.", details: "Repère via FB groups BXL. Plus d'explications : Groups 'Abandoned Brussels' pour tips. Avancé : Alerts groups.", source: "Réseaux sociaux", icon: <Globe size={18} />, category: 'general' },
  { id: 55, text: "Prépare une carte mentale des accès et sorties pour plan d'entrée.", details: "Plan squat fédéral. Plus d'explications : App MindMeister pour map. Avancé : Share via Signal.", source: "Planification", icon: <MapPin size={18} />, category: 'general' },
  { id: 56, text: "Observe les animaux errants : signe d'ouverture possible ou inoccupation longue.", details: "Signe pour vide. Plus d'explications : Chats errants = accès ouverts. Avancé : No animaux = récent vide.", source: "Signes naturels", icon: <AlertCircle size={18} />, category: 'general' },
  { id: 57, text: "Utilise apps météo pour repérage par temps pluvieux : moins de passants.", details: "Timing repérage. Plus d'explications : Pluie = rues vides, idéal observation. Avancé : Apps radar pluie.", source: "Timing météo", icon: <Clock size={18} />, category: 'general' },
  { id: 58, text: "Vérifie les fenêtres : volets fermés depuis longtemps indiquent vide.", details: "Signe visuel pour cible. Plus d'explications : Poussière volets = vide >année. Avancé : Check condensation.", source: "Signes visuels", icon: <Eye size={18} />, category: 'general' },
  { id: 59, text: "Prépare un change de vêtements pour blending in lors du repérage.", details: "Camouflage repérage. Plus d'explications : Habits locaux pour no suspicions. Avancé : Multi sets pour jours.", source: "Camouflage", icon: <Shield size={18} />, category: 'general' },
  { id: 60, text: "Note les caméras de surveillance voisines pour éviter angles morts.", details: "Sécurité tech repérage. Plus d'explications : Map caméras, approche angles morts. Avancé : Apps cam detect.", source: "Sécurité tech", icon: <Camera size={18} />, category: 'general' },
  { id: 61, text: "Utilise Signal pour coordonner le groupe de repérage en temps réel.", details: "Comms sécurisées. Plus d'explications : Group chat encrypted pour updates live. Avancé : Location sharing.", source: "Comms sécurisées", icon: <Phone size={18} />, category: 'general' },
  { id: 62, text: "Évalue l'accès à l'eau/élec extérieur pour connexion rapide post-entrée.", details: "Utilitaires squat. Plus d'explications : Compteurs extérieurs pour hook-up temporaire. Avancé : Check voltage.", source: "Utilitaires", icon: <Zap size={18} />, category: 'general' },
  { id: 63, text: "Vérifie les toits pour accès via échelles ou bâtiments adjacents.", details: "Entrées alternatives. Plus d'explications : Échelle pliable pour toit entrée. Avancé : Drone pour toit check.", source: "Exploration", icon: <Lock size={18} />, category: 'general' },
  { id: 64, text: "Note les odeurs : moisissure ou abandon confirmant inoccupation.", details: "Sens olfactif repérage. Plus d'explications : Odeur humide = vide longue, check hygiène. Avancé : Masque pour safe.", source: "Sens olfactif", icon: <AlertTriangle size={18} />, category: 'general' },
  { id: 65, text: "Prépare un kit d'ouverture non destructif : picks, bump keys.", details: "Outils entrée squat. Plus d'explications : Kit lockpicking Amazon, pratique légal. Avancé : Training YouTube.", source: "Outils entrée", icon: <Hammer size={18} />, category: 'general' },
  { id: 66, text: "Repère les points faibles : fenêtres mal fermées, portes secondaires.", details: "Vulnérabilités pour entrée. Plus d'explications : Fenêtres loose = entrée facile no break. Avancé : Test distant.", source: "Vulnérabilités", icon: <Eye size={18} />, category: 'general' },
  { id: 67, text: "Utilise nuits sans lune pour entrée plus discrète.", details: "Timing nocturne squat. Plus d'explications : App lune phases pour plan. Avancé : Météo + lune combo.", source: "Timing nocturne", icon: <Clock size={18} />, category: 'general' },
  { id: 68, text: "Vérifie les alarmes extérieures : stickers ou boîtiers visibles.", details: "Systèmes sécurité repérage. Plus d'explications : Stickers faux souvent, check réel. Avancé : Scan fréquences.", source: "Systèmes sécurité", icon: <Siren size={18} />, category: 'general' },
  { id: 69, text: "Prépare un véhicule de getaway discret à proximité pour évac rapide.", details: "Plan évac entrée. Plus d'explications : Voiture banalisée, clé prête. Avancé : Multi options évac.", source: "Plan évac", icon: <RotateCcw size={18} />, category: 'general' },
  { id: 70, text: "Note les itinéraires d'évacuation piétons en cas de spot.", details: "Sécurité sortie squat. Plus d'explications : Multi sorties, mémorise. Avancé : Map offline.", source: "Sécurité sortie", icon: <Shield size={18} />, category: 'general' },
  { id: 71, text: "Utilise masques et capuches pour anonymat lors de l'entrée.", details: "Anonymat entrée. Plus d'explications : Masques COVID style, no trace. Avancé : Gants anti-ADN.", source: "Anonymat", icon: <Lock size={18} />, category: 'general' },
  { id: 72, text: "Vérifie la solidité des portes avant tentative d'ouverture.", details: "Évaluation physique. Plus d'explications : Test doux, si solide cherche alternatif. Avancé : Outils mesure force.", source: "Évaluation physique", icon: <Hammer size={18} />, category: 'general' },
  { id: 73, text: "Prépare des cales pour bloquer portes après entrée temporaire.", details: "Sécurisation rapide squat. Plus d'explications : Cales bois, sécurise immediate. Avancé : Alarmes porte DIY.", source: "Sécurisation rapide", icon: <Shield size={18} />, category: 'general' },
  { id: 74, text: "Utilise lampe UV pour détecter alarmes invisibles ou marques.", details: "Tech avancée repérage. Plus d'explications : UV révèle stickers sécurité. Avancé : Combo IR pour heat.", source: "Tech avancée", icon: <Lightbulb size={18} />, category: 'general' },
  { id: 75, text: "Note les numéros d'urgence locaux pour appel rapide si besoin.", details: "Prépa urgence entrée. Plus d'explications : 112 police, mais use scripts urgence. Avancé : App emergency auto.", source: "Prépa urgence", icon: <Phone size={18} />, category: 'general' },
  { id: 76, text: "Évite entrée seul : toujours en binôme pour sécurité.", details: "Règle équipe squat. Plus d'explications : Binôme : un ouvre, un watch. Avancé : Training duo.", source: "Règle équipe", icon: <Users size={18} />, category: 'general' },
  { id: 77, text: "Vérifie les sous-sols via grilles pour accès alternatif.", details: "Exploration accès. Plus d'explications : Grilles loose = entrée sous-sol. Avancé : Endoscope pour check.", source: "Exploration", icon: <MapPin size={18} />, category: 'general' },
  { id: 78, text: "Prépare un signal de détresse pour le groupe lors de l'entrée.", details: "Comms urgence squat. Plus d'explications : Sifflet ou Signal code pour évac. Avancé : App distress button.", source: "Comms urgence", icon: <AlertCircle size={18} />, category: 'general' },

  // Added new 'ot' insiders for balance (10+ for bible feel)
  { id: 79, text: "Différence squat/OT : Squat illégal initial pour pression, OT légalise via convention précaire.", details: "Concret : squat = entrée sans permission, risque expulsion mais tactique BXL (élus gauche aident). OT = contrat signed (3-24 mois), entretien gratuit, clauses humanitaires. Ex: squat rue Royale -> OT 2.5 ans via Communa. Pour fédéraux, use angle 'État inutilise, on occupe solidaire'. Guide : FéBUL PDF pour modèles. Plus d'explications : Squat phase 1-3 jours, OT phase négo 1-4 sem, diff : OT no pénal, subventions possibles. Avancé : Requalification risques, use sui generis clauses.", source: "FéBUL/Communa", icon: <Scale size={18} />, category: 'ot' },
  { id: 80, text: "Négocie OT avec propriétaire fédéral : Argumente inutilisation + humanitaire migrants.", details: "Post-squat, contacte via cadastre. Concret : lettre avec stats Fedasil, implique bourgmestre gauche. Ex: OT BXL 2025 pour sans-abri. Subventions Perspective.brussels. Plus d'explications : Argument : CEDH condamnations, taxes évitées. Avancé : Régie Gebouwen stratégie 2025.", source: "Guichet OT", icon: <Megaphone size={18} />, category: 'ot' },
  { id: 81, text: "Use assos intermédiaires pour signer OT : Communa gère pour toi.", details: "Concret : après entrée squat, appelle Communa, ils négocient contrat. Ex: projets socio pour réfugiés, durée moyenne 2.5 ans. À BXL, facilite avec élus PS. Plus d'explications : Communa signe à ta place, ajoute légitimité. Avancé : Mandat gestion déléguée.", source: "Communa", icon: <Home size={18} />, category: 'ot' },
  { id: 82, text: "Inclut clauses humanitaires dans OT pour protéger migrants.", details: "Concret : modèle FéBUL ajoute protection expulsion hiver, appui CPAS. Ex: OT Evere 2025 pour Palestiniens. Plus d'explications : Clauses : no expulsion sans relogement, santé MSF. Avancé : Opposabilité enregistrement.", source: "FéBUL", icon: <Shield size={18} />, category: 'ot' },
  { id: 83, text: "Subventions pour OT : Demande aides régionales pour aménagements (5k€+).", details: "Post-squat, via Guichet OT. Concret : pour sécurité/incendie, co-financé propriétaire/CPAS. Plus d'explications : Demande Perspective, pour OT fédéraux. Avancé : Procurement exemptions.", source: "Perspective BXL", icon: <Hammer size={18} />, category: 'ot' },
  { id: 84, text: "Transforme squat en projet socio-culturel pour OT longue.", details: "Concret : ateliers via Toestand, implique quartiers populaires. Ex: OT Molenbeek 2025. Plus d'explications : Projets = extensions OT. Avancé : Éval impact pour renew.", source: "Toestand", icon: <Globe size={18} />, category: 'ot' },
  { id: 85, text: "Mobilise élus gauche pour appui OT (PS/PTB/Ecolo majoritaires BXL).", details: "Concret : contacte bourgmestre, pétition pour report expulsion. Ex: report août 2025. Plus d'explications : Élus PS aident humanitaire. Avancé : Questions parlementaires.", source: "Parlement BXL", icon: <Users size={18} />, category: 'ot' },
  { id: 86, text: "Prépare dossier OT : Stats sans-abrisme + plan entretien.", details: "Concret : cite 7k demandeurs asile, budget low-cost. Pour fédéraux, angle CEDH. Plus d'explications : Dossier photo avant/après. Avancé : Templates sui generis.", source: "Expérience", icon: <FileText size={18} />, category: 'ot' },
  { id: 87, text: "OT pour migrants : Implique Fedasil/CPAS pour co-signature.", details: "Concret : attestation précarité renforce contrat. Ex: OT Liège 2025. Plus d'explications : Co-signature = légitimité extra. Avancé : Attestations pour domiciliation.", source: "Fedasil", icon: <CheckCircle size={18} />, category: 'ot' },
  { id: 88, text: "Durée OT : Négocie extensions (jusqu'à 5 ans avec projets).", details: "Concret : clauses renouvelables, ex: squat 123 étendu. Plus d'explications : Projets socio = arguments extensions. Avancé : Événement fin pour précarité.", source: "Communa", icon: <Clock size={18} />, category: 'ot' },
];

const initialChecklists: Checklists = {
  scouting: [
    { id: 1, text: "Repère un bâtiment vide depuis longtemps (priorise fédéraux gros vides).", done: false },
    { id: 2, text: "Vérifie si y'a pas de caméras ou alarmes visibles.", done: false },
    { id: 3, text: "Vérifie l'adresse et le propriétaire via le cadastre (cadastre.brussels).", done: false },
    { id: 4, text: "Vérifie la sécurité et la conformité incendie/hygiène (via 'Habitools' si possible).", done: false },
    { id: 5, text: "Planifie le pivot squat -> OT légale dès le repérage.", done: false }
  ],
  entry: [
    { id: 1, text: "Prépare un petit groupe discret (3-5 personnes max).", done: false },
    { id: 2, text: "Entre la nuit, sans casser quoi que ce soit de visible (très important pour OT future).", done: false },
    { id: 3, text: "Change la serrure proprement (uniquement le barillet) et garde l'ancienne.", done: false },
    { id: 4, text: "Prépare le kit urgence (eau, nourriture, Signal app) juste après l'entrée.", done: false }
  ],
  anchoring: [
    { id: 1, text: "Installe une boîte aux lettres immédiatement avec les noms des occupants.", done: false },
    { id: 2, text: "Mets des lettres à ton nom dans la boîte tout de suite (preuve de domiciliation/habitation).", done: false },
    { id: 3, text: "Rends le lieu habitable : nettoie, range, aménage (aspect 'maison' pour OT).", done: false },
    { id: 4, text: "Rédige une charte de vie collective et des règles claires (ex: anti-racisme, tâches).", done: false },
    { id: 5, text: "Contacte un réseau solidaire (Communa, Toestand, Chez Nous) pour appui OT.", done: false }
  ],
  defense: [
    { id: 1, text: "Prépare un plan si police arrive : reste calme, filme tout (témoin légal pour OT).", done: false },
    { id: 2, text: "Bloque les entrées avec des meubles sans détruire le lieu.", done: false },
    { id: 3, text: "Affiche le script 'policeArrival' bien en vue.", done: false },
    { id: 4, text: "Tiens un registre d'occupation (qui est là, depuis quand) pour négo OT.", done: false }
  ],
  nego_legal: [
    { id: 1, text: "Contacte le propriétaire avec une proposition d'Occupation Temporaire (OT).", done: false },
    { id: 2, text: "Passe par une asso intermédiaire (Communa, Toestand) pour signer la convention.", done: false },
    { id: 3, text: "Implique le CPAS et/ou Fedasil pour renforcer le dossier humanitaire.", done: false },
    { id: 4, text: "Utilise le guide FéBUL pour le modèle de contrat si tu négocies seul(e).", done: false },
    { id: 5, text: "Fais pression via les réseaux sociaux / pétitions pour éviter une expulsion et forcer OT.", done: false }
  ],
  post: [
    { id: 1, text: "Maintiens une vie collective organisée (réunions hebdo, tâches partagées en OT).", done: false },
    { id: 2, text: "Organise des événements publics ('pay what you can') pour les finances hybrides.", done: false },
    { id: 3, text: "Utilise le temps de l'OT pour faire les démarches de logement social (CAW).", done: false },
    { id: 4, text: "Contacte Myria ou Vluchtelingenwerk pour le suivi des droits et demandes d'asile en OT.", done: false }
  ]
};

const phases: PhaseInfo[] = [
  {
    phase: 'scouting',
    title: 'PHASE 1 : REPÉRAGE',
    description: "Trouve le bon spot sans te faire remarquer, cible fédéraux vides pour victoires humanitaires, prépare pivot vers OT.",
    icon: <Search size={24} />,
    duration: '2-7 jours',
    detail: {
      objective: "Repérer un bâtiment abandonné (fédéral prioritaire), vérifier statut, planifier squat initial puis OT légale.",
      tips: [
        "Marche dans le quartier, note les adresses discrètement, vise fédéraux pour angle humanitaire avec élus gauche BXL.",
        "Vise quartiers solidaires comme Molenbeek, prépare contact propriétaire pour OT post-entrée.",
        "Cible privé ou fédéral via Guichet OT pour aide négo.",
      ],
      insidesKeys: ['general', 'negotiation', 'ot']
    }
  },
  {
    phase: 'entry',
    title: 'PHASE 2 : ENTRÉE',
    description: 'Accès au lieu comme squat initial, sécurisation pour pivot OT.',
    icon: <Lock size={24} />,
    duration: '1 nuit',
    detail: {
      objective: "Entrer sans dégradation et changer serrure, préparer négo OT immédiate.",
      tips: [
        "Travaille en petit groupe silencieux. Discrétion clé pour tenir jusqu'à convention.",
        "Accès intacts pour preuve non-effraction, essentiel pour OT légale.",
        "Installe kit urgence, contacte asso pour appui OT.",
      ],
      insidesKeys: ['general', 'ot']
    }
  },
  {
    phase: 'anchoring',
    title: 'PHASE 3 : ANCRAGE',
    description: 'Établir la preuve d’habitation et organiser la vie collective pour OT.',
    icon: <Home size={24} />,
    duration: '1-3 jours',
    detail: {
      objective: "Créer espace vie visible, preuves occupation pour négo OT (boîte lettres, charte).",
      tips: [
        "Boîte lettres première preuve pour OT. Fais-la immédiatement.",
        "Rends intérieur 'habité' vite (meubles, déco) pour photos négo.",
        "Contacte voisins pour soutien, renforce dossier OT.",
      ],
      insidesKeys: ['daily_life', 'ot']
    }
  },
  {
    phase: 'defense',
    title: 'PHASE 4 : DÉFENSE',
    description: 'Préparer réponse police/proprio, viser report pour OT.',
    icon: <Shield size={24} />,
    duration: 'Constant',
    detail: {
      objective: "Éviter expulsion immédiate via loi domicile, pivoter vers OT.",
      tips: [
        "Calme, non agressif avec autorités. Use scripts, mobilise pour report.",
        "Scripts urgence mode app sans hésiter.",
        "Si juge, demande avocat pro-OT, implique élus gauche.",
      ],
      insidesKeys: ['negotiation', 'ot']
    }
  },
  {
    phase: 'nego_legal',
    title: 'PHASE 5 : NÉGO LÉGALE',
    description: 'Légaliser via OT pour durée stable.',
    icon: <Scale size={24} />,
    duration: '1-4 semaines',
    detail: {
      objective: "Transformer squat en OT légale ou convention humanitaire.",
      tips: [
        "Passe par assos comme Communa/Toestand pour contrat.",
        "Service au propriétaire : entretien gratuit, évite taxe inoccupation.",
        "Pour réfugiés, appui CPAS/Fedasil pour humanitaire.",
      ],
      insidesKeys: ['negotiation', 'refugee', 'ot']
    }
  },
  {
    phase: 'post',
    title: 'PHASE 6 : LONG TERME',
    description: 'Gestion communauté en OT, préparation futur.',
    icon: <Clock size={24} />,
    duration: '3-24 mois',
    detail: {
      objective: "Maximiser OT, reloger vulnérables, maintenir harmonie.",
      tips: [
        "Planifie logements sociaux (attente longue).",
        "Communauté financement/entretien (événements PWYC).",
        "Soutien psycho (PTSD), conseil légal (CIRÉ, Myria).",
      ],
      insidesKeys: ['daily_life', 'refugee', 'ot']
    }
  }
];

const brusselsDistricts = [
  { id: '1070', name: 'Anderlecht', risk: 'faible', notes: 'Grands entrepôts vides, moins de pression – idéal pour squat->OT débutants.' },
  { id: '1080', name: 'Molenbeek', risk: 'moyen', notes: 'Solidarité locale forte, bons réseaux pour réfugiés, élus gauche facilitent OT.' }
];

// Sub-components with fixed design (back to soft-paper bg, removed gradient, fixed bullets, cleaned French)
const EmergencyModal: React.FC<{ onClose: () => void; tacticalScripts: Record<string, string>; copiedItem: string | null; handleCopyScript: (key: string) => void }> = ({ onClose, tacticalScripts, copiedItem, handleCopyScript }) => (
  <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
        <X size={24} />
      </button>
      <h2 className="text-3xl font-black mb-8 text-center uppercase tracking-tight">🚨 Scripts d'urgence</h2>
      <div className="space-y-4">
        {Object.entries(tacticalScripts).map(([key, script]) => (
          <div key={key} className="border rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold uppercase text-xs">{key}</h3>
              <button onClick={() => handleCopyScript(key)} className="text-xs font-bold text-red-600">
                {copiedItem === key ? 'COPIÉ' : 'COPIER'}
              </button>
            </div>
            <p className="text-sm font-mono bg-gray-50 p-3 rounded">{script}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InsideModal: React.FC<{ inside: Inside | null; onClose: () => void }> = ({ inside, onClose }) => {
  if (!inside) return null;
  return (
    <div className="fixed inset-0 z-[300] bg-black/95 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full">
          <X size={24} />
        </button>
        <h2 className="text-3xl font-black mb-4 uppercase flex items-center gap-2">
          {inside.icon} {inside.text}
        </h2>
        <p className="text-sm mb-4 whitespace-pre-wrap">{inside.details}</p>
        {inside.source && <p className="text-xs italic text-gray-500">Source: {inside.source}</p>}
      </div>
    </div>
  );
};

const PhaseSelector: React.FC<{ phases: PhaseInfo[]; activePhase: PhaseType; setActivePhase: (phase: PhaseType) => void }> = ({ phases, activePhase, setActivePhase }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
    {phases.map(p => (
      <button
        key={p.phase}
        onClick={() => setActivePhase(p.phase)}
        className={`p-4 border-4 transition-all text-center ${activePhase === p.phase ? 'border-warm-red bg-guinea-yellow shadow-brutal-red scale-105' : 'border-earth-black bg-white opacity-60'}`}
      >
        <div className="mb-2 text-warm-red flex justify-center">{p.icon}</div>
        <h3 className="text-[10px] font-black uppercase">{p.title.split(':')[0]}</h3>
      </button>
    ))}
  </div>
);

const PhaseDetail: React.FC<{ phaseData: PhaseInfo; checklists: Checklists; toggleChecklistItem: (phase: keyof Checklists, id: number) => void; onInsideClick: (inside: Inside) => void }> = ({ phaseData, checklists, toggleChecklistItem, onInsideClick }) => (
  <div className="bg-white border-4 border-earth-black p-8 shadow-brutal animate-in fade-in slide-in-from-bottom-4">
    <h2 className="text-3xl font-black mb-6 uppercase flex items-center gap-3">
      <span className="text-warm-red">{phaseData.icon}</span>
      {phaseData.title}
    </h2>
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-black text-sm uppercase mb-4 flex items-center gap-2">
          <LayoutList className='h-4 w-4 text-earth-black' /> Checklist ({phaseData.duration})
        </h3>
        <div className="space-y-2">
          {checklists[phaseData.phase]?.map(item => (
            <label key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleChecklistItem(phaseData.phase, item.id)}
                className="accent-warm-red"
              />
              <span className={`text-sm font-bold ${item.done ? 'line-through text-gray-400' : ''}`}>{item.text}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="bg-earth-black text-white p-6 rounded-3xl">
        <h3 className="font-black text-sm uppercase mb-4 text-warm-red flex items-center gap-2">
          <Zap className="h-4 w-4" /> Conseils Terrain & Astuces Clés
        </h3>
        <ul className="space-y-3 text-xs font-mono opacity-80">
          {phaseData.detail.tips.map((tip, i) => <li key={`tip-${i}`}>{tip}</li>)}
          {getInsidesForPhase(phaseData.phase).slice(0, 3).map(inside => (
            <li key={`inside-${inside.id}`} className="mt-2 text-guinea-yellow font-bold cursor-pointer" onClick={() => onInsideClick(inside)}>
              {inside.text.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1.toUpperCase())} <span className="text-gray-400 italic">({inside.source})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const ChecklistsTab: React.FC<{ checklists: Checklists; phases: PhaseInfo[]; toggleChecklistItem: (phase: keyof Checklists, id: number) => void }> = ({ checklists, phases, toggleChecklistItem }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {(Object.keys(checklists) as Array<keyof Checklists>).map(phase => (
      <div key={phase} className="bg-white border-4 border-earth-black p-6 shadow-brutal">
        <h3 className="text-xl font-black mb-4 uppercase">{phases.find(p => p.phase === phase)?.title || phase.toUpperCase()}</h3>
        <div className="space-y-3">
          {checklists[phase].map(item => (
            <label key={item.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded cursor-pointer hover:bg-guinea-yellow/30 transition-colors">
              <input type="checkbox" checked={item.done} onChange={() => toggleChecklistItem(phase, item.id)} className="mt-1 accent-warm-red flex-shrink-0" />
              <span className={`text-sm font-bold ${item.done ? 'line-through text-gray-400' : 'text-earth-black'}`}>{item.text}</span>
            </label>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const InsidesTab: React.FC<{ brusselsDistricts: typeof brusselsDistricts; onInsideClick: (inside: Inside) => void }> = ({ brusselsDistricts, onInsideClick }) => (
  <div className="space-y-8">
    <h3 className="text-4xl font-black mb-6 uppercase text-center text-earth-black">
      <Lightbulb className="inline h-8 w-8 text-guinea-yellow" /> Secrets d'Insiders 2025 - Bible Squat & OT
    </h3>
    <div className="grid md:grid-cols-2 gap-6">
      {renderInsidesByCategory('general', '⚡ Généraux (Risques & Prépa)', onInsideClick)}
      {renderInsidesByCategory('negotiation', '⚖️ Négociation & Légalisation (OT)', onInsideClick)}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {renderInsidesByCategory('refugee', '🫂 Réfugiés & Vulnérables (Urgence Hiver 2025)', onInsideClick)}
      {renderInsidesByCategory('daily_life', '🗓️ Vie Quotidienne & Long-Terme', onInsideClick)}
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      {renderInsidesByCategory('ot', '📜 Occupation Temporaire Précaire (Légalisation Post-Squat)', onInsideClick)}
    </div>
    <div className="bg-warm-red text-white border-4 border-earth-black p-6 rounded-xl shadow-brutal-red">
      <h4 className="font-black mb-4 uppercase tracking-widest text-guinea-yellow flex items-center gap-2">
        <MapPin className='h-4 w-4' /> Zones Clés à BXL pour Squat-&gt;OT
      </h4>
      <ul className="text-sm space-y-2 font-bold">
        {brusselsDistricts.map(d => (
          <li key={d.id} className="border-l-2 border-white pl-3">
            <span className="text-guinea-yellow">{d.name} ({d.id})</span>: {d.notes}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

// Utility functions
const getInsidesForPhase = (phase: PhaseType) => {
  const phaseData = phases.find(p => p.phase === phase);
  if (!phaseData) return [];
  return insidesData.filter(inside => phaseData.detail.insidesKeys.includes(inside.category));
};

const renderInsidesByCategory = (category: InsideCategory, title: string, onClick: (inside: Inside) => void) => {
  const filteredInsides = insidesData.filter(i => i.category === category);
  if (filteredInsides.length === 0) return null;

  return (
    <div className="bg-white border-4 border-earth-black p-6 shadow-brutal">
      <h4 className="text-xl font-black mb-4 uppercase text-warm-red flex items-center gap-2">
        <Lightbulb className="h-5 w-5" /> {title}
      </h4>
      <div className="space-y-4">
        {filteredInsides.map(inside => (
          <div key={inside.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3 cursor-pointer hover:bg-guinea-yellow/30" onClick={() => onClick(inside)}>
            <span className="text-earth-black flex-shrink-0 mt-0.5">{inside.icon}</span>
            <div className="text-sm">
              <p className="font-bold mb-1">{inside.text}</p>
              {inside.source && <p className="text-xs italic text-gray-500">Source: {inside.source}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component with fixed design (soft-paper bg, no gradients, clean French, no extra bullets)
const SquatSection: React.FC<SquatSectionProps> = ({ language = 'fr' }) => {
  const [activeTab, setActiveTab] = useState<TabType>('manual');
  const [activePhase, setActivePhase] = useState<PhaseType>('scouting');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [selectedInside, setSelectedInside] = useState<Inside | null>(null);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [checklists, setChecklists] = useState<Checklists>(initialChecklists);

  const tacticalScripts = {
    policeArrival: `⚠️ DIS SIMPLEMENT : "On habite ici par besoin, c'est notre maison maintenant. On filme tout. Appelez le CPAS s'il vous plaît." (Garde ça calme, pas agressif. Puis pivote vers OT via asso.)`,
    ownerNegotiation: `📝 DIS : "On peut entretenir le lieu gratuitement en attendant vos travaux. On est ouverts au dialogue pour OT – contactez-nous via Communa."`,
    communePoliceNegotiation: `📝 POUR COMMUNE/POLICE : "On propose une convention temporaire OT pour occuper pacifiquement. On entretient, pas de dégradations. Contactez notre asso (e.g., Toestand) pour discuter avec appui CPAS/Fedasil."`,
  };

  const toggleChecklistItem = (phase: keyof Checklists, id: number) => {
    setChecklists(prev => ({
      ...prev,
      [phase]: prev[phase].map(item =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    }));
  };

  const handleCopyScript = async (scriptKey: string) => {
    try {
      await navigator.clipboard.writeText(tacticalScripts[scriptKey]);
      setCopiedItem(scriptKey);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  };

  const handleInsideClick = (inside: Inside) => {
    setSelectedInside(inside);
  };

  const currentPhaseData = phases.find(p => p.phase === activePhase);

  return (
    <div className="min-h-screen bg-soft-paper pb-20">
      {emergencyMode && (
        <EmergencyModal
          onClose={() => setEmergencyMode(false)}
          tacticalScripts={tacticalScripts}
          copiedItem={copiedItem}
          handleCopyScript={handleCopyScript}
        />
      )}
      {selectedInside && (
        <InsideModal
          inside={selectedInside}
          onClose={() => setSelectedInside(null)}
        />
      )}

      <header className="pt-24 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-black mb-4 uppercase tracking-tighter">
          GUIDE <span className="text-warm-red">SQUAT & OT</span> BXL
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
          Conseils de terrain pour occuper en toute sécurité : squat comme start, OT comme légalisation.
        </p>
        <button
          onClick={() => setEmergencyMode(true)}
          className="mt-8 bg-warm-red text-white px-8 py-4 rounded-full font-black uppercase border-4 border-earth-black shadow-brutal active:shadow-none transition-all"
        >
          URGENCE & SCRIPTS
        </button>
      </header>

      <nav className="flex justify-center gap-2 mb-12 px-6 overflow-x-auto border-y-4 border-earth-black bg-white sticky top-20 z-50">
        {['manual', 'checklists', 'insides'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`px-6 py-4 font-black text-xs uppercase tracking-widest border-x-2 border-earth-black transition-colors ${activeTab === tab ? 'bg-guinea-yellow' : 'bg-white hover:bg-gray-50'}`}
          >
            {tab === 'manual' ? 'Phases' : tab === 'checklists' ? 'Listes' : 'Astuces'}
          </button>
        ))}
      </nav>

      <main className="max-w-6xl mx-auto px-6">
        {activeTab === 'manual' && (
          <div className="space-y-8">
            <PhaseSelector phases={phases} activePhase={activePhase} setActivePhase={setActivePhase} />
            {currentPhaseData && (
              <PhaseDetail phaseData={currentPhaseData} checklists={checklists} toggleChecklistItem={toggleChecklistItem} onInsideClick={handleInsideClick} />
            )}
          </div>
        )}

        {activeTab === 'checklists' && (
          <ChecklistsTab checklists={checklists} phases={phases} toggleChecklistItem={toggleChecklistItem} />
        )}

        {activeTab === 'insides' && (
          <InsidesTab brusselsDistricts={brusselsDistricts} onInsideClick={handleInsideClick} />
        )}
      </main>
    </div>
  );
};

export default SquatSection;