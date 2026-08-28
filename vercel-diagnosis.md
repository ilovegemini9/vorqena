# Diagnostic Vercel

## Constat

Le repository GitHub `ilovegemini9/calculator.net` contient bien `client/`, `server/`, `package.json` et le commit `dfb8ddc`. Le lien Vercel visible dans le README est `https://calculatorsy.vercel.app/`.

La page live de Vercel affiche le contenu de `server/index.ts` comme du texte brut au lieu de l’interface React. Le texte visible contient `var`, `3e3` et le bundle Express, ce qui correspond à `dist/index.js` généré par esbuild.

## Cause probable

Le deployment Vercel utilise le dossier `dist` comme racine de sortie. Comme l’interface Vite est générée dans `dist/public/index.html` tandis que le serveur bundlé est généré dans `dist/index.js`, Vercel sert le bundle serveur comme fichier d’entrée à la racine.

## Correctif prévu

Ajouter `vercel.json` à la racine pour lancer le build, servir `dist/public` comme output directory et réécrire les routes client vers `/index.html`. Le serveur Express reste utile pour le démarrage local/Node, mais le deployment Vercel doit servir directement les fichiers frontend statiques.
