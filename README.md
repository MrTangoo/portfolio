# Portfolio — Maxime Derbigny

**En ligne : [maxime-derbigny.ch](https://maxime-derbigny.ch)**

<img width="1588" height="970" alt="image" src="https://github.com/user-attachments/assets/56dbc599-118f-4cff-8ba5-d1901c5ead69" />

Portfolio personnel de Maxime Derbigny, développeur d'applications en Suisse
romande, disponible en français, anglais et allemand. La page d'accueil regroupe
hero, à propos, expertise, stack, parcours, certifications, approche et contact.
Les pages Applications et Mentions légales complètent ces routes.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack) + **React 19**
- **TypeScript** strict (`noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`)
- **Tailwind CSS 4** avec design tokens définis dans `src/app/globals.css`
- **Motion** (`LazyMotion` + `MotionConfig reducedMotion="user"`)
- **GSAP / ScrollTrigger** pour le parcours épinglé sur grand écran
- **Nodemailer** pour le formulaire de contact côté serveur
- **Vitest** + Testing Library pour les tests unitaires, **Playwright** + axe-core pour l'e2e et l'accessibilité

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Copier [`.env.example`](.env.example) vers `.env.local`. Le formulaire requiert
`SMTP_USER` et `SMTP_PASS` (mot de passe d'application Gmail). `CONTACT_EMAIL`
définit le destinataire et utilise `SMTP_USER` par défaut. Ne jamais préfixer
ces secrets par `NEXT_PUBLIC_`.

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GITHUB_REPO` et
`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` sont facultatifs.

## Scripts

| Commande         | Rôle                                                      |
| ---------------- | --------------------------------------------------------- |
| `pnpm dev`       | Serveur de développement                                  |
| `pnpm build`     | Build de production                                       |
| `pnpm start`     | Sert le build de production                               |
| `pnpm lint`      | ESLint                                                    |
| `pnpm typecheck` | `next typegen` + `tsc --noEmit`                           |
| `pnpm test`      | Tests unitaires (Vitest)                                  |
| `pnpm test:e2e`  | Tests end-to-end (Playwright, build de production requis) |
| `pnpm format`    | Formate avec Prettier (+ tri des classes Tailwind)        |
| `pnpm check`     | `format:check` + `lint` + `typecheck` + `test`            |

## Structure

```
src/
  app/              Routes, layout, metadata, og-image, sitemap, robots
  components/
    layout/         Header, Footer, scroll-spy
    motion/         MotionProvider, Reveal / Stagger
    sections/       Une section de page par dossier/fichier
    seo/            JSON-LD Person (schema.org)
    ui/             Primitives : Section, Eyebrow, Button, Portrait…
  content/          Types et identité partagée (profile.ts), configuration (site.ts)
  i18n/             Dictionnaires fr/en/de, provider et négociation de langue
  lib/              Dates, terminal simulé, validation et modèle du courriel
public/images/      portraits/ et logo/ (grayscale → couleur au survol)
tests/              unit/ (Vitest) et e2e/ (Playwright + axe)
```

Les textes affichés se modifient dans `src/i18n/dictionaries/`. L'identité et
les liens communs aux langues restent dans `src/content/profile.ts`.

## Qualité & CI

- `.github/workflows/ci.yml` — format, lint, typecheck, tests unitaires,
  build, e2e. Gate unique `CI passed` pour la protection de branche.
- `lighthouse.yml` — audit hebdomadaire + sur PR (seuils dans `lighthouserc.json`).
- `security.yml` — `pnpm audit --prod` et dependency-review sur les changements de dépendances.
- Dependabot : mises à jour groupées (next / testing / tooling / actions),
  actions pinnées par SHA.

## Déploiement

Le dépôt ne contient pas de workflow de déploiement. Configurer le projet
Vercel et ses variables serveur dans l'hébergeur, puis valider localement :

```bash
pnpm check
pnpm build
pnpm test:e2e
```

Les tests end-to-end utilisent le serveur de production sur le port 3100.
`PLAYWRIGHT_BASE_URL` permet de viser un autre serveur déjà démarré.

Avant mise en ligne, vérifier la réception SMTP dans l'environnement cible et
la limitation de débit de `/api/contact` décrite dans [SECURITY.md](SECURITY.md).
Les tests locaux simulent les emails ; ils ne valident pas les identifiants Gmail.

La palette et le terminal sont chargés à la demande. Les animations respectent
le mouvement réduit ; le parcours utilise un affichage empilé sous 1280 px.
Les diagnostics navigateur sont conservés dans `output/` et exclus de Git.
