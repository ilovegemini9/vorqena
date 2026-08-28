# Notes de référence — Calculator.net

Date d’observation : 27 août 2026. Source : https://www.calculator.net/

| Élément | Observation utile pour la reconstruction |
| --- | --- |
| Page d’accueil | Header bleu foncé, bloc principal bleu pâle avec calculatrice scientifique et recherche, puis quatre catégories en colonnes. |
| Catégories | Financial, Fitness & Health, Math, Other, plus lien vers toutes les calculatrices. |
| Mortgage | Formulaire prix, apport, durée, taux; résultat de mensualité, tableau mensuel/total et schedule d’amortissement. |
| BMI | Systèmes US/métrique, âge, genre, taille et poids; classification, plage de poids, BMI Prime et Ponderal Index. |
| Scientific | Pavé numérique, opérations, trigonométrie, puissances, racines et mémoire. |
| Age | Date de naissance + date de référence; affichage année, mois, semaine, jour, heure, minute et seconde. |

## Limite de reconstruction

Le site public expose sa structure, sa copie visible et une partie de son JavaScript côté client. Il ne donne pas accès aux sources originales non publiques, aux services backend, aux données privées ni à la totalité des ~200 outils. L’implémentation sera donc un frontend indépendant qui couvre en priorité la structure publique et les quatre calculateurs documentés ci-dessus.


## Full public inventory — 2026-08-28

The public sitemap yielded 221 unique Calculator.net URLs. Representative pages confirm four reusable families: financial pages expose grouped tools for mortgage, real estate, auto, investment, retirement, tax and loans; health pages expose unit tabs, age/gender/height/weight/activity fields and explanatory equations; math pages use a dense scientific keypad and direct input; other pages combine date inputs, settings, business-day toggles and related-tool links.

The initial reconstruction currently implements `/`, `/mortgage`, `/bmi`, and `/age`. The remaining sitemap routes require a route registry and formula-by-formula implementation rather than simply copying a shell. The public site exposes calculator forms and explanatory text, but no private backend/API source was retrieved from these pages.

Inventory source: https://www.calculator.net/sitemap.xml
Representative sources: https://www.calculator.net/financial-calculator.html, https://www.calculator.net/calorie-calculator.html, https://www.calculator.net/scientific-calculator.html, https://www.calculator.net/date-calculator.html
