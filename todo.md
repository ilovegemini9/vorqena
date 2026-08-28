# Correction serveur

- [x] Inspecter `server/index.ts` et rétablir une source TypeScript lisible.
- [x] Exécuter `pnpm check` et `pnpm build`.
- [x] Pousser la correction dans `ilovegemini9/calculator.net`.
- [x] Vérifier le commit distant et informer l’utilisateur.

## Note

Le code fourni ressemble à la sortie bundlée de `esbuild` (`var`, `3e3`) plutôt qu’à la source TypeScript.

---

Style reminder — Utilitarian Calculation Desk: server behavior stays minimal and transparent; no backend feature is added beyond static-file serving and SPA fallback.

- [x] Phase active: inspecter et rétablir la source TypeScript.


## Diagnostic Vercel

- [x] Vérifier la configuration et le projet Vercel liés à `calculator.net`.
- [x] Examiner les logs de build/runtime et identifier la cause réelle.
- [x] Appliquer le correctif nécessaire sans confondre l’output bundlé avec la source.
- [x] Tester, pousser le correctif et confirmer le déploiement.

## توسعة عامة من Calculator.net

- [x] حصر sitemap والفئات وكل calculator pages المتاحة علناً.
- [x] حفظ قائمة routes والـ forms والـ assets القابلة لإعادة البناء.
- [x] تصميم registry موحّد للـ calculators والـ routes.
- [x] تنفيذ calculator components ذات الأولوية ثم توسيع directory.
- [x] اختبار النتائج، الروابط، responsive، وVercel build.
- [x] دفع النسخة الموسعة إلى GitHub.

## Dedicated calculator pages

- [x] حصر page templates والحقول والنتائج لكل family من الصفحات العمومية.
- [x] بناء forms وresult rails dedicated للعائلات الأساسية.
- [x] ربط routes الخاصة وإزالة generic placeholder copy.
- [x] اختبار الحسابات والروابط وresponsive.
- [ ] حفظ checkpoint ودفع النسخة الجديدة إلى GitHub.
