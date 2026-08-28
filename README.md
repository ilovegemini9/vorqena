# Calculator.net — reconstruction web

Ce dépôt contient une **reconstruction frontend indépendante** d’une suite de calculateurs en ligne, préparée à partir de la structure fonctionnelle visible sur [Calculator.net](https://www.calculator.net/). Le projet privilégie une expérience utilitaire : entrées lisibles, résultats immédiats, navigation par catégories et affichage responsive.

> Cette reconstruction est indépendante : elle indexe les 221 routes publiques découvertes من sitemap، وتوفر shell موحداً وformula engines للأدوات ذات الأنماط المشتركة. Les sources privées, services backend/API et comportements non exposés publiquement ne sont pas inclus.

## Fonctionnalités disponibles

| Route | Outil | Fonctionnalité principale |
| --- | --- | --- |
| `/` | Répertoire + calculatrice scientifique | Recherche locale, catégories et calculatrice avec opérations courantes, trigonométrie, mémoire et racines. |
| `/mortgage` | Mortgage Calculator | Estimation des échéances, taxes, assurance, HOA, intérêts et tableau annuel d’amortissement. |
| `/bmi` | BMI Calculator | Calcul avec unités US ou métriques, fourchettes standard, BMI Prime et intervalle de poids. |
| `/age` | Age Calculator | Écart entre date de naissance et date de référence, avec années, mois, semaines, jours et heures. |
| `/*.html` | Public calculator registry | 221 routes publiques, recherche, catégories et workspace dynamique avec labels liés à chaque outil. |

## Stack

| Élément | Choix |
| --- | --- |
| Interface | React 19 + TypeScript |
| Routage | Wouter |
| Styles | Tailwind CSS 4 + CSS personnalisé |
| Icônes | Lucide React |
| Build | Vite |

## Démarrage local

```bash
pnpm install
pnpm dev
```

Pour vérifier le projet avant une publication :

```bash
pnpm check
pnpm build
```

## Étendre la collection

Le fichier `client/src/lib/calculators.ts` est généré depuis `sitemap.xml` par `node scripts/generate-calc-registry.mjs`. Chaque route publique est disponible dans le directory et reçoit une page dynamique. Les formules nécessitant plusieurs hypothèses doivent ensuite être remplacées par des modules dédiés, en gardant la même enveloppe de navigation, le panneau de résultats et les styles documentés dans `ideas.md`.

## Configuration Vercel

Le fichier `vercel.json` force Vercel à exécuter `pnpm build`, à servir `dist/public` et à réécrire les routes SPA vers `index.html`. Cela évite de servir `dist/index.js` comme page visible.

## Ressources visuelles

Les images de catégories et le symbole de marque utilisent des URL de stockage gérées par le projet. Elles ne doivent pas être déplacées dans `client/public` ou `client/src/assets`.
