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

## Direction artistique : « presse militante » (éditorial engagé)

Identité éditoriale et incarnée — entre le journal communautaire et la publication militante. Sobre, direct, fier. La source de vérité runtime des tokens est `index.html` (Tailwind CDN + config inline + bloc `<style>`).

## Tokens de design

- Couleurs : `guinea-red` (#BE0000), `guinea-red-dark` (#9B0000), `guinea-yellow` (#FFCC00), `guinea-green` (#00843D), `ink` (#141210, encre chaude), `ivory` (#FAF7F0, papier chaud), `paper` (#F3EEE3), `ink-muted` (#6B655C), `border-subtle` (#E4DECF)
- Polices : `font-serif` = **Fraunces** (titres/affichage, `font-black`) · `font-sans` = **Archivo** (corps, défaut) · `font-mono` = **Space Mono** (petits labels)
- Labels / eyebrows : classe `.dateline` (Space Mono, majuscules, `tracking-[0.16em]`, gras) — pour tout petit libellé. Préférer `<SectionHeader eyebrow="…" flagLine />`.
- Texture : classe `.paper-grain` sur les sections claires (ivory/paper/blanc) + `relative z-10` sur le conteneur interne. **Jamais** sur fond sombre (`bg-ink`) ou coloré.
- Ombres : `shadow-soft-elegant`, `shadow-soft-sm`, `shadow-soft-lg`, `shadow-soft-xl`
- Rayon : coins nets éditoriaux — `rounded-[4px]` (cartes/panneaux), `rounded-[3px]` (boutons/badges)
- Boutons : `font-mono font-bold uppercase tracking-[0.08em] rounded-[3px]`. Primaire sombre `bg-ink text-ivory hover:bg-guinea-red` · primaire rouge `bg-guinea-red text-white hover:bg-guinea-red-dark` · secondaire `border-2 border-ink hover:bg-ink hover:text-ivory`
- Ligne drapeau : classe CSS `.flag-line` — `<div className="flag-line" aria-hidden="true"><span /><span /><span /></div>`. **Une seule signature drapeau par section** (idéalement via `SectionHeader flagLine`). Ne pas multiplier les rappels tricolores.
- Photos : conservées en **couleur** (pas de `grayscale`, pas de duotone), cadrées `rounded-[4px] border border-ink/10`, légendes en `.dateline`.
- Ne jamais utiliser : blur blobs décoratifs (`blur-[…]` + `rounded-full bg-…`), overlays `dot-grid`, badges flottants sur images, emoji (utiliser des icônes `lucide-react`), `earth-black`, `warm-red`, `warm-gold`, `warm-green`, `shadow-brutal`, `african-pattern`, `border-b-8`

## Branche de développement

Développer sur `main` sauf instruction contraire explicite.
