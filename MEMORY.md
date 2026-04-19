# Mémoire de recherche — 19 avril 2026

## 1. CLAUDE.md — Instructions pour Claude Code

**Rôle :** Fichier de configuration lu automatiquement par Claude Code à chaque session.

**Bonnes pratiques :**
- Garder court et direct. Chaque ligne doit répondre : « Enlever ça ferait-il une erreur à Claude ? »
- Inclure : contexte projet (une phrase), style de code, commandes clés, pièges connus
- Préférer des références `fichier:ligne` plutôt que des extraits de code (qui deviennent obsolètes)
- Ne jamais mettre de règles de style → utiliser un linter à la place

**Architecture en couches :**
- `~/.claude/CLAUDE.md` → préférences globales
- `repo/CLAUDE.md` → contexte partagé équipe
- `repo/sous-dossier/CLAUDE.md` → guidance spécifique au module
- `CLAUDE.local.md` → overrides personnels (ne pas versionner)

**Limite :** Un LLM suit ~150–200 instructions de manière fiable. Au-delà, les règles se perdent.

Sources : [HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md) · [Builder.io](https://www.builder.io/blog/claude-md-guide) · [kirill-markin](https://kirill-markin.com/articles/claude-code-rules-for-ai/)

---

## 2. primer.md — Fichier de contexte pour agents IA

**Concept :** Fichier markdown structuré qui donne à un agent tout le contexte dont il a besoin sans passer par une base vectorielle (RAG). Un fichier de 200 lignes compressé dans la fenêtre de contexte suffit à guider un agent.

**Variantes courantes :**
- `.memory.md` → captures d'échecs d'implémentation
- `.instructions.md` → patterns réussis
- `.prompt.md` → workflows affinés

**Évolution du domaine :** Le « context engineering » remplace le « prompt engineering » — il s'agit de concevoir l'ensemble de l'information disponible (connaissance, mémoire, outils, données) et pas seulement la formulation d'une requête.

**Usage dans Claude Code :** MEMORY.md sert de mémoire projet — l'agent y écrit automatiquement patterns, décisions, notes architecturales.

Sources : [DEV Community](https://dev.to/shinomontaz/building-ai-workflow-and-project-context-from-memory-banks-to-simple-markdown-27np) · [Anthropic Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

---

## 3. Memory.sh — Persistance mémoire IA via Bash

**Outils identifiés :**

**PILOT (pour Kiro CLI) :**
Système de hooks bash qui capture les solutions après vérification, stockées dans `~/.pilot/learnings/` en fichiers markdown datés.

**Memory Forge (MCP Server) :**
Serveur MCP open-source pour mémoire IA persistante (Claude, ChatGPT, tout LLM).
- PostgreSQL pour la persistance, Redis pour la vitesse, Qdrant pour la recherche vectorielle
- Sauvegarde automatique toutes les 30 secondes
- Contextes isolés par utilisateur

**bash-ai (bai) :**
Script bash assistant terminal IA avec mémoire persistante des requêtes précédentes.

Sources : [DEV Community — Kiro](https://dev.to/aws-builders/building-persistent-memory-for-kiro-with-bash-hooks-4gm8) · [Memory Forge GitHub](https://github.com/cpretzinger/memory-forge)

---

## 4. Hindsight — Mémoire agentique qui apprend

**Auteur :** vectorize.io — open source

**Concept :** Mémoire pour agents IA inspirée de la mémoire humaine — contextuelle, consciente du temps, capable de former et mettre à jour des croyances.

**Architecture (4 réseaux logiques) :**
1. Faits sur le monde
2. Expériences de l'agent
3. Résumés d'entités synthétisés
4. Croyances évolutives

**3 opérations fondamentales :** Retain (garder) · Recall (rappeler) · Reflect (réfléchir)

**Performances :**
- 91,4 % de précision sur LongMemEval
- 89,61 % sur LoCoMo
- Dépasse les architectures mémoire existantes sur questions multi-sessions

**Intégration (avril 2026) :** Provider natif dans Hermes Agent. 3 modes : hybrid, context, tools.

Sources : [GitHub vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) · [hindsight.vectorize.io](https://hindsight.vectorize.io/) · [arXiv 2512.12818](https://arxiv.org/abs/2512.12818)

---

## 5. Obsidian — Gestion de connaissance + IA

**Chiffres (fév. 2026) :** 1,5 million d'utilisateurs, +22 % par an.

**Approche :** Local-first, markdown pur, architecture de plugins ouverte.

**Principaux plugins IA :**

| Plugin | Fonction |
|--------|----------|
| Smart Connections | Recherche sémantique, découverte de liens entre notes |
| CoPilot | Édition assistée par IA |
| Smart Second Brain | RAG sur le vault personnel |
| Text Generator | Génération de texte (OpenAI, Anthropic, Google, modèles locaux) |
| Vision Recall | OCR + VLM pour screenshots → base visuelle |

**Intégration Claude Code + MCP :** Le vault devient un espace de travail IA actif (pas juste du stockage passif).

Sources : [NxCode guide 2026](https://www.nxcode.io/resources/news/obsidian-ai-second-brain-complete-guide-2026) · [obsidian.md/plugins](https://obsidian.md/plugins?search=ai) · [Awesome Obsidian AI Tools](https://github.com/danielrosehill/awesome-obsidian-ai-tools)
