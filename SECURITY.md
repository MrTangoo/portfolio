# Sécurité

Le site utilise Next.js avec des pages pré-rendues et une route serveur
`POST /api/contact` qui transmet les messages par SMTP. Il n'utilise pas de
base de données.

La route accepte uniquement du JSON, limite la taille réellement lue à 64 Kio,
valide les champs et refuse les origines étrangères déclarées. Les données
sont échappées dans le courriel HTML ; les identifiants SMTP restent côté serveur.
Les tests d'envoi utilisent un transport simulé et n'expédient aucun courriel.

Le honeypot et le délai de saisie filtrent les soumissions simples automatisées,
mais ne remplacent pas une limitation de débit. Configurer celle-ci au niveau
de l'hébergeur pour `/api/contact`, sur toutes les instances. Une limite en mémoire
dans une fonction serverless ne constitue pas une protection globale fiable.

Les dépendances sont auditées via `pnpm audit --prod` en CI et Dependabot est actif.

## Signaler une vulnérabilité

Merci de me contacter par email à
[maxime.derbigny@gmail.com](mailto:maxime.derbigny@gmail.com) plutôt que
d'ouvrir une issue publique. Décrire le problème, l'impact et les étapes de
reproduction. Réponse sous quelques jours.
