import type {
  Certification,
  Education,
  Experience,
  ExpertiseArea,
  Principle,
  StackCategory,
} from "@/content/profile";
import type { NavItem } from "@/content/site";
import type { Locale } from "@/i18n/locales";

/**
 * Dictionnaire français — référence. La forme de cet objet définit le type
 * `Dictionary` auquel les autres langues doivent se conformer (`satisfies`).
 * Seules des données sérialisables sont autorisées : le dictionnaire est
 * transmis du serveur aux composants client via le `DictionaryProvider`.
 * Les champs dynamiques utilisent des gabarits `{placeholder}` rendus par `format()`.
 */
interface JourneyChapterMeta {
  id: string;
  index: string;
  year: string;
  /** Chapter name shown in the vermilion eyebrow. */
  kind: string;
  /** Editorial title — the narrative, not the CV data. */
  editorial?: string;
}

const expertiseAreas: readonly ExpertiseArea[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Development",
    description:
      "Conception d'interfaces claires et réactives avec React, Next.js et TypeScript. Attention portée à la structure des composants, à l'accessibilité et à la cohérence visuelle.",
    keywords: ["React", "Next.js", "AngularJS", "TypeScript", "JavaScript", "Tailwind CSS"],
    icon: "monitor",
  },
  {
    id: "application",
    index: "02",
    title: "Application Development",
    description:
      "Développement et évolution d'applications métier : analyse des besoins, implémentation de fonctionnalités, intégration d'API REST et maintenance corrective et évolutive.",
    keywords: ["C# / .NET", "Node.js", "PHP", "API REST"],
    icon: "app-window",
  },
  {
    id: "data",
    index: "03",
    title: "Databases & Data",
    description:
      "Modélisation et manipulation de bases de données relationnelles, écriture de requêtes SQL et T-SQL, adaptation de schémas existants et utilisation d'ORM modernes.",
    keywords: ["PostgreSQL", "SQL Server", "MySQL", "Prisma ORM", "Neon"],
    icon: "database",
  },
  {
    id: "engineering",
    index: "04",
    title: "Engineering Practices",
    description:
      "Qualité logicielle, versionnement, automatisation et méthodes Agile. Un intérêt marqué pour le Clean Code, les tests et les pipelines CI/CD.",
    keywords: ["Git", "GitHub Actions", "Scrum", "Clean Code"],
    icon: "workflow",
  },
];

const stackCategories: readonly StackCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces web modernes, typées et accessibles.",
    technologies: [
      { name: "React", favorite: true, note: "Bibliothèque de référence pour mes interfaces." },
      { name: "Next.js", favorite: true, note: "App Router, Server Components, rendu hybride." },
      { name: "TypeScript", favorite: true, note: "Typage strict, du composant à la donnée." },
      { name: "JavaScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS", note: "Design tokens et composition utilitaire." },
      { name: "Bootstrap" },
      { name: "AngularJS", note: "Rencontré sur des applications existantes." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "Logique applicative, services et API.",
    technologies: [
      { name: "Node.js", favorite: true },
      { name: "C#" },
      { name: ".NET" },
      { name: "PHP" },
      { name: "API REST", note: "Conception, consommation et intégration." },
    ],
  },
  {
    id: "data",
    label: "Database & ORM",
    description: "Données relationnelles et accès typé.",
    technologies: [
      { name: "PostgreSQL", favorite: true, note: "Mon moteur relationnel de prédilection." },
      { name: "Prisma ORM", favorite: true, note: "Schéma déclaratif et client typé." },
      { name: "Neon", favorite: true, note: "PostgreSQL serverless, branches de base." },
      { name: "Microsoft SQL Server" },
      { name: "T-SQL" },
      { name: "MySQL" },
    ],
  },
  {
    id: "tooling",
    label: "Tools & Engineering",
    description: "Versionnement, déploiement et exploitation.",
    technologies: [
      { name: "Git" },
      { name: "GitHub", favorite: true },
      {
        name: "GitHub Actions",
        favorite: true,
        learning: true,
        note: "Pipelines CI/CD, en apprentissage actif.",
      },
      { name: "Vercel", favorite: true },
      { name: "Cloudflare" },
      { name: "Windows Server" },
      { name: "IIS" },
      { name: "PM2" },
      { name: "PowerShell" },
    ],
  },
];

const journeyChapters: readonly JourneyChapterMeta[] = [
  {
    id: "2021",
    index: "01",
    year: "2021",
    kind: "Les fondations",
    editorial: "Poser les fondations.",
  },
  {
    id: "2024",
    index: "02",
    year: "2024",
    kind: "L'évolution",
    editorial: "Consolider la pratique.",
  },
  { id: "2025", index: "03", year: "2025", kind: "Le tournant", editorial: "Un nouveau chapitre." },
  {
    id: "2026",
    index: "04",
    year: "2026",
    kind: "Élargir les perspectives",
    editorial: "Élargir les perspectives.",
  },
  { id: "final", index: "05", year: "", kind: "Next chapter" },
];

const certificationItems: readonly Certification[] = [
  {
    id: "psm-1",
    name: "Professional Scrum Master I",
    shortName: "PSM I",
    issuer: "Scrum.org",
    obtained: { year: 2026, month: 9 },
    score: "97,5 %",
    description:
      "Certification officielle attestant de la compréhension de Scrum : responsabilités, événements, artefacts et principes du cadre de travail.",
    logo: {
      src: "/images/logo/psm1.png",
      width: 595,
      height: 594,
      alt: "Badge Scrum.org Professional Scrum Master I",
    },
  },
];

const principles: readonly Principle[] = [
  {
    title: "Qualité du code",
    description:
      "Un code lisible, explicite et cohérent vaut mieux qu'un code astucieux. Je m'applique à écrire ce que je serais content de relire dans six mois.",
    icon: "book-open",
  },
  {
    title: "Maintenabilité",
    description:
      "Les applications vivent longtemps. Séparer les responsabilités et limiter la complexité facilite chaque évolution future.",
    icon: "wrench",
  },
  {
    title: "Architecture",
    description:
      "Comprendre le besoin avant de choisir la structure. Préférer des solutions simples, cohérentes et adaptées au périmètre réel.",
    icon: "layers",
  },
  {
    title: "Automatisation",
    description:
      "Ce qui peut être vérifié automatiquement doit l'être : formatage, lint, typage, tests et déploiement, via des pipelines CI/CD.",
    icon: "bot",
  },
  {
    title: "Tests",
    description:
      "Des tests ciblés, qui protègent les comportements importants sans alourdir le développement.",
    icon: "flask-conical",
  },
  {
    title: "Amélioration continue",
    description:
      "Apprendre en pratiquant, mesurer, ajuster. Chaque itération est une occasion de faire un peu mieux.",
    icon: "trending-up",
  },
];

const experiences: readonly Experience[] = [
  {
    id: "micro",
    role: "Développeur junior",
    company: "MICRO Informatic Systems SA",
    location: "Montagny-près-Yverdon, Vaud",
    period: { start: { year: 2025, month: 9 }, end: null },
    summary:
      "Développement et évolution d'applications métier, du frontend aux bases de données SQL, en collaboration avec les équipes et les interlocuteurs métier.",
    highlights: [
      "Développement d'interfaces et de fonctionnalités applicatives",
      "Manipulation et adaptation de bases de données SQL",
      "Maintenance corrective et évolutive",
      "Analyse des besoins fonctionnels et techniques",
      "Participation aux phases de tests et de déploiement",
    ],
    logo: {
      src: "/images/logo/micro.png",
      width: 894,
      height: 279,
      alt: "Logo MICRO Informatic Systems SA",
    },
  },
  {
    id: "gri",
    role: "Apprenti développeur",
    company: "Groupement Romand de l'Informatique",
    location: "Montagny-près-Yverdon, Vaud",
    period: { start: { year: 2024, month: 8 }, end: { year: 2025, month: 7 } },
    summary:
      "Dernière année d'apprentissage en environnement professionnel, conclue par la réalisation du Travail Pratique Individuel du CFC.",
    highlights: [
      "Développement d'applications en contexte professionnel",
      "Réalisation du Travail Pratique Individuel (TPI)",
    ],
    logo: {
      src: "/images/logo/gri.png",
      width: 709,
      height: 340,
      alt: "Logo Groupement Romand de l'Informatique",
    },
  },
  {
    id: "sbb",
    role: "Apprenti développeur",
    company: "SBB CFF FFS",
    location: "Berne",
    period: { start: { year: 2021, month: 8 }, end: { year: 2024, month: 8 } },
    summary:
      "Première expérience professionnelle en développement informatique, dans un environnement d'entreprise structuré.",
    highlights: [
      "Découverte du développement logiciel en entreprise",
      "Travail au sein d'un environnement d'entreprise structuré",
    ],
    logo: {
      src: "/images/logo/sbb.webp",
      width: 1500,
      height: 1000,
      alt: "Logo SBB CFF FFS",
    },
  },
];

const education: readonly Education[] = [
  {
    id: "iseig",
    degree: "Informaticien de gestion avec brevet fédéral",
    institution: "ISEIG",
    institutionFull: "Institut Suisse d'Enseignement de l'Informatique de Gestion",
    location: "Lausanne, Vaud",
    period: { start: { year: 2026, month: 2 }, end: { year: 2027, month: 4 } },
    status: "ongoing",
    summary:
      "Formation en cours, orientée vers la gestion de projet, l'analyse des exigences et la compréhension des besoins métier.",
    topics: [
      "Gestion de projet",
      "Analyse des exigences",
      "Systèmes d'information",
      "Organisation informatique",
      "Compréhension des besoins métier",
    ],
    note: "Fin prévue en avril 2027",
    logo: {
      src: "/images/logo/iseig.svg",
      width: 426,
      height: 181,
      alt: "Logo de l'ISEIG",
    },
  },
  {
    id: "epsic",
    degree: "CFC d'informaticien — Développement d'applications",
    institution: "EPSIC",
    location: "Lausanne, Vaud",
    period: { start: { year: 2021, month: 8 }, end: { year: 2025, month: 7 } },
    status: "completed",
    summary:
      "Formation initiale en développement d'applications, en alternance avec les expériences professionnelles chez SBB CFF FFS puis au GRI.",
    topics: [],
    note: "Travail Pratique Individuel : 5,6 / 6",
    logo: {
      src: "/images/logo/epsic.png",
      width: 480,
      height: 320,
      alt: "Logo de l'EPSIC — École Professionnelle Lausanne",
    },
  },
];

export const fr = {
  locale: "fr" as Locale,

  meta: {
    title: "Maxime Derbigny — Développeur d'applications en Suisse",
    description:
      "Portfolio de Maxime Derbigny, développeur d'applications en Suisse romande. Découvrez son parcours, ses compétences en développement web et ses certifications.",
    keywords: [
      "Maxime Derbigny",
      "développeur d'applications",
      "software developer",
      "Suisse romande",
      "Fribourg",
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
    ],
    skipLink: "Aller au contenu",
  },

  og: {
    alt: "Maxime Derbigny — Développeur d'applications, Suisse romande",
    eyebrow: "Développeur d'applications — Suisse romande",
    lines: ["Concevoir avec", "précision.", "Développer avec", "intention."],
  },

  nav: [
    { id: "a-propos", label: "À propos" },
    { id: "expertise", label: "Expertise" },
    { id: "stack", label: "Stack" },
    { id: "parcours", label: "Parcours" },
    { id: "certifications", label: "Certifications" },
    { id: "approche", label: "Approche" },
    { id: "contact", label: "Contact" },
  ] satisfies readonly NavItem[],

  switcher: {
    label: "Choisir la langue",
  },

  header: {
    navAriaLabel: "Navigation principale",
    mobileNavAriaLabel: "Navigation mobile",
    openPalette: "Ouvrir la palette de commandes",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    monogramLabel: "Maxime Derbigny — retour en haut de page",
  },

  footer: {
    externalAriaLabel: "Liens externes",
    backToTop: "Retour en haut",
    legalLabel: "Mentions légales",
  },

  identity: {
    jobTitle: "Développeur d'applications",
    location: {
      city: "Attalens",
      region: "Fribourg",
      country: "Suisse",
      display: "Suisse romande",
    },
    portrait: {
      src: "/images/portrait/me.png",
      alt: "Portrait en noir et blanc de Maxime Derbigny, souriant, devant un fond sombre ponctué d'un aplat vermillon.",
      width: 454,
      height: 588,
    },
    portraitSecondary: {
      src: "/images/portrait/me2.png",
      alt: "Maxime Derbigny de profil, regard tourné vers la lumière, sur fond sombre.",
      width: 519,
      height: 430,
    },
  },

  hero: {
    ariaLabel: "Introduction",
    eyebrow: "Développeur d'applications — Suisse romande",
    title: ["Concevoir avec précision.", "Développer avec intention."],
    intro:
      "Je suis Maxime Derbigny, développeur d'applications en Suisse romande. Je conçois et fais évoluer des solutions web, avec un intérêt particulier pour les technologies modernes, l'architecture et la qualité logicielle.",
    primaryCta: { label: "Découvrir mon parcours", href: "#parcours" },
    secondaryCta: { label: "Me contacter", href: "#contact" },
    cvLabel: "Télécharger mon CV",
    basedLabel: "Basé à",
    currentlyLabel: "Actuellement",
    credentialLine: "CFC Informaticien · Brevet fédéral en cours",
    scrollLabel: "Défiler",
  },

  about: {
    eyebrow: "À propos",
    title: "Une approche polyvalente du développement logiciel.",
    paragraphs: [
      "Développeur d'applications CFC, je travaille chez MICRO Informatic Systems SA tout en préparant le brevet fédéral d'informaticien de gestion à l'ISEIG.",
      "Mon expérience m'a permis de développer une approche polyvalente du développement logiciel : du frontend aux bases de données, en passant par la logique applicative et la maintenance de solutions métier.",
      "J'apprécie comprendre les besoins derrière une application, concevoir des solutions pertinentes et chercher continuellement à améliorer leur qualité.",
      "Je m'intéresse particulièrement à React, Next.js, aux architectures modernes et aux outils qui permettent de développer des applications fiables, performantes et évolutives.",
    ],
    facts: [
      {
        label: "Basé à",
        value: "Attalens, Fribourg",
        icon: "map-pin",
        href: "https://www.google.com/maps/search/?api=1&query=Attalens%2C+FR%2C+Suisse",
      },
      {
        label: "Actuellement",
        value: "MICRO Informatic Systems SA",
        icon: "briefcase",
        href: "https://www.microinformatic.ch/",
      },
      {
        label: "Formation en cours",
        value: "Brevet fédéral — ISEIG",
        icon: "graduation-cap",
        href: "https://iseig.ch",
      },
      { label: "Diplôme", value: "CFC Informaticien, dév. d'applications", icon: "award" },
    ],
    languagesLabel: "Langues",
  },

  expertise: {
    eyebrow: "Expertise",
    titleA: "Quatre domaines,",
    titleB: "une même exigence.",
    keywordsAria: "Mots-clés",
    areas: expertiseAreas,
  },

  stack: {
    eyebrow: "Stack",
    titleA: "Des outils choisis",
    titleB: "pour leur justesse.",
    description:
      "Les technologies rencontrées au fil de mon parcours, et celles que je privilégie aujourd'hui pour construire des applications fiables et évolutives.",
    categoriesAria: "Catégories de technologies",
    favoriteTechAria: "Technologie favorite",
    learningBadge: "En cours",
    favoriteFootnote: "Technologies que j'apprécie particulièrement.",
    favoriteLabel: "Combinaison favorite",
    favoriteStack: {
      title: "Next.js · Prisma · Neon",
      description:
        "La combinaison que j'apprécie particulièrement pour construire des applications web complètes : un framework React full-stack, un ORM typé et une base PostgreSQL serverless.",
    },
    softSkillsLabel: "Compétences transversales",
    softSkills: [
      "Développement d'applications",
      "Analyse des besoins",
      "Résolution de problèmes techniques",
      "Maintenance applicative",
      "Gestion de bases de données",
      "Intégration d'API",
      "Qualité logicielle",
      "Méthodes Agile",
      "Scrum",
      "Collaboration technique",
    ],
    categories: stackCategories,
  },

  journey: {
    eyebrow: "Parcours",
    titleA: "Un parcours construit",
    titleB: "étape par étape.",
    description:
      "De l'apprentissage aux CFF à mon poste actuel, en passant par le CFC et le brevet fédéral en préparation.",
    redThreadLabel: "Parcours — le fil conducteur",
    timelineLabel: "Parcours",
    statuses: {
      current: "Poste actuel",
      completed: "Diplôme obtenu",
      ongoing: "En cours",
      today: "Aujourd'hui",
    },
    chapters: journeyChapters,
    chapterSummaries: {
      micro:
        "Développement et évolution d'applications métier, du frontend aux bases de données SQL.",
      iseig:
        "Formation orientée gestion de projet, analyse des exigences et compréhension des besoins métier.",
    },
    final: {
      label: "NEXT CHAPTER_",
      title: "La suite reste à écrire...",
      text: "Continuer à apprendre. Construire avec exigence. Évoluer.",
      sub: "Aujourd'hui, je poursuis mon évolution dans le développement logiciel, avec un intérêt croissant pour l'architecture, la qualité et les responsabilités techniques.",
    },
  },

  certifications: {
    eyebrow: "Certifications",
    titleA: "Des acquis",
    titleB: "vérifiés.",
    verifyLabel: "Vérifier la certification",
    resultLabel: "Résultat",
    items: certificationItems,
  },

  mindset: {
    eyebrow: "Approche",
    titleA: "Une ingénierie",
    titleB: "qui dure.",
    description:
      "Des pratiques que je cherche à appliquer au quotidien et à approfondir, plus que des certitudes.",
    practicesLabel: "Ce site applique ces principes",
    practices: [
      "Next.js App Router",
      "TypeScript strict",
      "Tests Vitest & Playwright",
      "CI GitHub Actions",
      "Déploiement Vercel",
    ],
    ciBadgeAlt: "Statut du workflow CI",
    principles,
  },

  contact: {
    eyebrow: "Contact",
    title: "Construisons la suite.",
    description:
      "Une question, une opportunité ou simplement envie d'échanger autour du développement logiciel ? N'hésite pas à me contacter.",
    cvPdfLabel: "Télécharger le PDF",
    form: {
      eyebrow: "Message direct",
      intro:
        "Tu préfères passer par un formulaire ? Laisse-moi un message, il arrive directement dans ma boîte mail.",
      honeypotLabel: "Ne pas remplir",
      nameLabel: "Nom",
      namePlaceholder: "Ton nom",
      emailLabel: "Email",
      emailPlaceholder: "ton@email.ch",
      subjectLabel: "Sujet",
      subjectOptional: "(optionnel)",
      subjectPlaceholder: "Une opportunité, une question…",
      messageLabel: "Message",
      messagePlaceholder: "Écris ton message…",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      privacyNotice: "Tes données servent uniquement à traiter ta demande et te répondre.",
      privacyLinkLabel: "Mentions légales",
    },
    toasts: {
      loading: "Envoi en cours…",
      success: "Message envoyé avec succès !",
      error: "L'envoi a échoué. Réessaie ou écris-moi par email.",
    },
    apiErrors: {
      invalid: "Merci de vérifier les champs du formulaire.",
      unconfigured: "Le service d'envoi n'est pas configuré.",
      send_failed: "L'envoi a échoué. Réessaie dans un instant.",
    },
  },

  experiences,

  education,

  languages: [
    { name: "Français", flag: "/images/flags/fr.svg", code: "fr-CH" },
    { name: "Anglais", flag: "/images/flags/gb.svg", code: "en" },
    { name: "Allemand", flag: "/images/flags/de.svg", code: "de" },
  ],

  dates: {
    today: "aujourd'hui",
    todayCapitalized: "Aujourd'hui",
  },

  errors: {
    notFound: {
      title: "Page introuvable",
      heading: "Cette page n'existe pas",
      body: "Le lien est peut-être erroné ou la page a été déplacée.",
      cta: "Retour à l'accueil",
    },
    error: {
      eyebrow: "Une erreur est survenue",
      heading: "Quelque chose s'est mal passé",
      retry: "Réessayer",
    },
  },

  palette: {
    ariaLabel: "Palette de commandes",
    searchAria: "Rechercher une commande",
    listAria: "Commandes",
    closeAria: "Fermer la palette de commandes",
    placeholder: "Rechercher une commande…",
    empty: "Aucun résultat pour «\u00a0{query}\u00a0»",
    hints: { navigate: "naviguer", execute: "exécuter", close: "fermer" },
    categories: {
      navigation: "Navigation",
      actions: "Actions",
      links: "Liens externes",
    },
    commands: {
      home: { label: "Accueil", keywords: ["top", "haut", "hero", "home"] },
      sectionKeywords: ["section", "aller"],
      downloadCv: { label: "Télécharger le CV", keywords: ["cv", "pdf", "resume", "curriculum"] },
      sendEmail: {
        label: "M'envoyer un email",
        keywords: ["email", "mail", "message", "contact", "formulaire", "écrire", "envoyer"],
      },
      copyEmail: {
        label: "Copier l'adresse email",
        keywords: ["email", "mail", "copier", "contact"],
      },
      copySuccess: "Copié : {value}",
      copyFailure: "La copie a échoué — réessayez.",
      openTerminal: {
        label: "Ouvrir le terminal",
        keywords: ["terminal", "console", "shell", "cli", "commande"],
      },
      socialKeywords: {
        github: ["code", "repo", "profil"],
        linkedin: ["profil", "réseau"],
      },
    },
  },

  terminal: {
    dialogAria: "Terminal simulé",
    controlsAria: "Contrôles de la fenêtre",
    close: "Fermer",
    closeTerminal: "Fermer le terminal",
    minimize: "Réduire",
    minimizeTerminal: "Réduire le terminal",
    maximize: "Agrandir",
    maximizeTerminal: "Agrandir le terminal",
    restore: "Restaurer",
    restoreSize: "Restaurer la taille",
    restoreTerminal: "Restaurer le terminal",
    inputAria: "Saisir une commande — tapez « help » pour la liste",
    inputPlaceholder: "tapez « help »…",
    commands: [
      { name: "help", description: "Liste les commandes disponibles" },
      { name: "about", description: "Présentation du site et de son auteur" },
      { name: "projects", description: "Projets publiés" },
      { name: "stack", description: "Technologies utilisées" },
      { name: "experience", description: "Expériences professionnelles" },
      { name: "contact", description: "Moyens de contact" },
      { name: "cv", description: "Ouvre le CV au format PDF" },
      { name: "date", description: "Affiche la date et l'heure locales" },
      { name: "whoami", description: "Qui suis-je ?" },
      { name: "echo", description: "echo <texte> — réaffiche le texte fourni" },
      { name: "clear", description: "Efface l'historique du terminal" },
      { name: "exit", description: "Ferme le terminal" },
    ],
    welcome: {
      intro: "Terminal simulé — les commandes sont limitées à une liste prédéfinie.",
      hint: "Tapez « help » pour les découvrir, « exit » pour quitter.",
    },
    outputs: {
      favoriteNote: "* technologie de prédilection",
      experienceFooter: "→ Détails dans la section ",
      sectionLink: "→ Section ",
      noProjects: "Aucun projet n'est encore publié sur ce site — section en préparation.",
      githubMeanwhile: "En attendant, mes dépôts sont sur ",
      openingCv: "Ouverture de ",
      sudoDenied: "Permission refusée : ce terminal est une simulation.",
      emailHint: "Pour m'écrire : « contact » ou « echo » pour afficher du texte.",
      commandNotFound: "commande introuvable : « {command} » — tapez « help ».",
      emailLabel: "Email",
      atEmployer: "Actuellement chez",
    },
  },

  legal: {
    meta: {
      title: "Mentions légales",
      description:
        "Mentions légales et politique de confidentialité du portfolio de Maxime Derbigny : données traitées, hébergement, cookies et propriété intellectuelle.",
    },
    eyebrow: "Informations",
    title: "Mentions légales",
    backHome: "Retour au site",
    updatedLabel: "Dernière mise à jour : octobre 2026",
    intro:
      "Transparence sur ce que ce site fait, et ne fait pas, de tes données. L'essentiel : aucun cookie, aucun traceur, aucune mesure d'audience.",
    /** Appended to the "external" section only when the GitHub CI badge is rendered. */
    badgeNote:
      "Exception : le badge de statut CI affiché dans la section « Approche » est chargé depuis github.com, qui reçoit alors ton adresse IP et les informations de ton navigateur.",
    sections: [
      {
        id: "editeur",
        title: "Éditeur du site",
        paragraphs: [
          "Ce site est édité par Maxime Derbigny, Attalens (Fribourg), Suisse. Contact : maxime.derbigny@gmail.com.",
          "C'est un site personnel de présentation professionnelle : aucune prestation, bien ou service n'y est vendu.",
        ],
      },
      {
        id: "hebergement",
        title: "Hébergement",
        paragraphs: [
          "Le site est hébergé par Vercel Inc. (États-Unis). Lors de ta visite, ses serveurs enregistrent les données techniques nécessaires à la distribution et à la sécurité du site, notamment ton adresse IP et le type de navigateur.",
        ],
      },
      {
        id: "donnees",
        title: "Données personnelles",
        paragraphs: [
          "Le formulaire de contact transmet uniquement ce que tu y écris : nom, adresse e-mail, sujet et message. Ces informations servent exclusivement à traiter ta demande et à te répondre.",
          "Les messages me parviennent par e-mail via Gmail (Google LLC, États-Unis) et restent dans ma boîte de réception le temps nécessaire au traitement de ta demande. Ils ne sont ni vendus, ni partagés à des fins commerciales, ni utilisés à d'autres fins.",
          "Conformément à la loi fédérale sur la protection des données (LPD), tu peux demander l'accès, la rectification ou la suppression des données te concernant en écrivant à maxime.derbigny@gmail.com.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies et mesure d'audience",
        paragraphs: [
          "Ce site n'utilise aucun cookie, aucun traceur et aucun outil de mesure d'audience : rien n'est stocké dans ton navigateur.",
          "La langue affichée est déduite des réglages de ton navigateur au moment de la requête, sans être conservée.",
        ],
      },
      {
        id: "external",
        title: "Liens et ressources externes",
        paragraphs: [
          "Les liens vers GitHub, LinkedIn, Google Maps et d'autres services tiers relèvent des politiques de confidentialité de ces services dès lors que tu les consultes.",
          "Polices, images et scripts sont hébergés localement : ta visite ne déclenche aucune requête vers des serveurs tiers.",
        ],
      },
      {
        id: "propriete",
        title: "Propriété intellectuelle",
        paragraphs: [
          "Les contenus de ce site (textes, portraits, illustrations) sont protégés par le droit d'auteur. Le code source est publié sous licence MIT.",
          "Les logos d'entreprises, d'écoles et de technologies affichés appartiennent à leurs détenteurs respectifs et sont utilisés à titre indicatif. Police Geist : SIL Open Font License. Icônes Lucide : licence ISC.",
        ],
      },
    ],
  },
};

export type Dictionary = typeof fr;
