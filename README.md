# Portfolio — Maxime Derbigny

**En ligne : [maxime-derbigny.ch](https://maxime-derbigny.ch)**

<img width="1588" height="970" alt="image" src="https://github.com/user-attachments/assets/56dbc599-118f-4cff-8ba5-d1901c5ead69" />

Portfolio personnel de Maxime Derbigny, développeur d'applications en Suisse
romande. Une seule page éditoriale : hero, à propos, expertise, stack,
parcours, certifications, approche et contact.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack) + **React 19**
- **TypeScript** strict (`noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`)
- **Tailwind CSS 4** avec design tokens définis dans `src/app/globals.css`
- **Motion** (`LazyMotion` + `MotionConfig reducedMotion="user"`)
- **Vitest** + Testing Library pour les tests unitaires, **Playwright** + axe-core pour l'e2e et l'accessibilité

## Démarrer

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

Variables d'environnement : voir [`.env.example`](.env.example)
(`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GITHUB_REPO` optionnel).

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
  content/          profile.ts (tout le contenu) + site.ts (config)
  lib/              dates.ts, utils.ts
public/images/      portraits/ et logo/ (grayscale → couleur au survol)
tests/              unit/ (Vitest) et e2e/ (Playwright + axe)
```

**Tout le contenu se modifie dans `src/content/profile.ts`** — les sections ne
contiennent aucune donnée en dur.

## Qualité & CI

- `.github/workflows/ci.yml` — format, lint, typecheck, tests unitaires,
  build, e2e. Gate unique `CI passed` pour la protection de branche.
- `deploy.yml` — previews Vercel sur PR, production gated par la CI, rollback manuel.
- `lighthouse.yml` — audit hebdomadaire + sur PR (seuils dans `lighthouserc.json`).
- `security.yml` — `pnpm audit --prod` et dependency-review sur les changements de dépendances.
- Dependabot : mises à jour groupées (next / testing / tooling / actions),
  actions pinnées par SHA.

## Déploiement

Déployé sur **Vercel** via GitHub Actions (l'intégration Git Vercel est
désactivée — le workflow `deploy.yml` est la source de vérité). Secrets requis :
`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
