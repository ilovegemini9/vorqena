# Calculator.net — reconstruction web

Ce dépôt contient une **reconstruction frontend indépendante** d’une suite de calculateurs en ligne, préparée à partir de la structure fonctionnelle visible sur [Calculator.net](https://www.calculator.net/). Le projet privilégie une expérience utilitaire : entrées lisibles, résultats immédiats, navigation par catégories et affichage responsive.

> Cette version ne contient pas les sources privées, les services backend ou l’ensemble des calculateurs de la plateforme de référence. Elle implémente les outils prioritaires et une base claire pour étendre la collection.

## Fonctionnalités disponibles

| Route | Outil | Fonctionnalité principale |
| --- | --- | --- |
| `/` | Répertoire + calculatrice scientifique | Recherche locale, catégories et calculatrice avec opérations courantes, trigonométrie, mémoire et racines. |
| `/mortgage` | Mortgage Calculator | Estimation des échéances, taxes, assurance, HOA, intérêts et tableau annuel d’amortissement. |
| `/bmi` | BMI Calculator | Calcul avec unités US ou métriques, fourchettes standard, BMI Prime et intervalle de poids. |
| `/age` | Age Calculator | Écart entre date de naissance et date de référence, avec années, mois, semaines, jours et heures. |

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

Les calculateurs complémentaires doivent être ajoutés sous forme de routes React dédiées, en gardant la même enveloppe de navigation, le panneau de résultats et les styles documentés dans `ideas.md`. Les liens non prioritaires de la page d’accueil pointent actuellement vers l’outil représentatif de leur catégorie ; remplacez-les par leurs routes dédiées à mesure que les formules sont implémentées.

## Ressources visuelles

Les images de catégories et le symbole de marque utilisent des URL de stockage gérées par le projet. Elles ne doivent pas être déplacées dans `client/public` ou `client/src/assets`.
