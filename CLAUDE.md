# Ballal ASBL — Instructions pour Claude

## Contexte du projet

Ballal ASBL est une association **fondée et dirigée par des sans-papiers et d'anciens sans-papiers** à Molenbeek, Bruxelles. Elle accompagne les personnes en situation irrégulière sur l'ensemble de leur parcours : logement d'urgence, alimentation, droits, emploi, communauté — jusqu'à l'autonomie complète. Elle gère directement plusieurs occupations solidaires à Bruxelles. Sa force distinctive : la direction vient du terrain, pas de l'extérieur.

## Règles de rédaction française

### Ton général
- Écrire en **français courant et direct**, jamais académique ni administratif
- Phrases courtes. Verbes actifs. Pas de tournures passives inutiles
- Relire chaque phrase comme si on la disait à voix haute à quelqu'un de la communauté
- Le site s'adresse à des personnes en situation précaire ET à des partenaires institutionnels : trouver le juste milieu entre accessibilité et crédibilité

### Fautes à éviter absolument
- **"&"** → toujours écrire **"et"**
- **Calques anglais** : "frontière" ≠ *frontier* → dire "levier", "étape", "cap" selon le contexte
- **"significativement"** → "considérablement", "nettement", "fortement"
- **"impacter"** → "affecter", "toucher", "peser sur"
- **Les langues s'écrivent en minuscule** : français, peul, malinké, arabe (pas Français, Peul…)
- **"connaître le chemin"** et métaphores vagues du même type → formuler concrètement ce qu'on veut dire
- **Tiret em (—) avant un pronom relatif** : "les sans-papiers — qui font" est cassé → réécrire sans tiret

### Cohérence des temps
- Présent de narration pour décrire l'action de l'association
- Pas de mélange passé/présent dans la même phrase

### Typographie française
- Guillemets français : « » (pas " ")
- Espace insécable avant : !, ?, :, ;
- Majuscule uniquement aux noms propres et débuts de phrase

## Tokens de design (ne pas modifier)

- Couleurs : `guinea-red` (#BE0000), `guinea-yellow` (#FFCC00), `guinea-green` (#00843D), `#0F0F0F`, `#FAFAF8`
- Ombres : `shadow-soft-elegant`, `shadow-soft-sm`, `shadow-soft-lg`, `shadow-soft-xl`
- Rayon : `rounded-token` (8px), `rounded-token-lg` (12px), `rounded-token-xl` (20px)
- Ligne drapeau : classe CSS `.flag-line` — toujours `<div className="flag-line" aria-hidden="true"><span /><span /><span /></div>`
- Ne jamais utiliser : `earth-black`, `warm-red`, `warm-gold`, `warm-green`, `shadow-brutal`, `african-pattern`, `border-b-8`

## Branche de développement

Développer sur `main` sauf instruction contraire explicite.
