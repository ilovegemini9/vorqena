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

## Clone verification — 2026-08-28

التطبيق كيغطي 221 route فـ registry وكيعرضهم عبر dynamic route `/ :slug` داخل React. التغطية المخصصة حالياً هي 33 route ضمن families dedicated: mortgage (8)، BMI (3)، age (1)، percentage (3)، tip (1)، compound interest (1)، calorie (2)، triangle (2)، average (2)، standard deviation (1)، random number (1)، discount (1)، simple interest (1)، conversion (3)، وarea (3). باقي 188 route كيتعرضو عبر `GenericCalculator` أو families مازال ما عندهاش engine dedicated، وبالتالي ماشي clone 100% من ناحية forms، formulas، result tables، copy، أو pixel layout.

الـ backend/API الأصلي والـ private source مازال ما توفرش؛ لذلك المشروع الحالي هو frontend reconstruction موثق، ماشي نقل كامل للمصدر الأصلي.

## Route-aware coverage update — 2026-08-28

من بعد التوسعة الأخيرة، الـ dynamic routing ولى كيوصل كل 221 route إلى implementation مرئية: الصفحات المتخصصة كتستعمل engines dedicated، والصفحات الأخرى كتستعمل `TaskTool` route-aware كينتقي labels وworkflow وcalculation profile حسب slug والعنوان. هذا كيعطي 221/221 route rendering coverage، ولكن ماشي 221/221 exact formula/page parity؛ بعض profiles مازال تقريبية وخصها dedicated source-backed implementation لكل calculator.

## Expanded route-aware engine audit — 2026-08-28

بعد إضافة profiles جديدة (density، circle، grade/GPA، electrical، distance، temperature، probability، construction، loan، growth، tax، fuel، credit، health، math، وother)، الـ fallback التنفيذي الأخير ولى `TaskTool` route-aware، وما بقاش `GenericCalculator` هو المسار المستخدم. عدد الـ route definitions المرجعي مازال 221 حسب inventory السابق؛ coverage ديال rendering ولى 221/221، بينما exact formula parity مازال خاصها implementation مستقلة ومراجعة source-backed لكل calculator.
