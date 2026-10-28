/**
 * Source of truth for all personal content displayed on the site.
 *
 * Every section consumes this file. To update the portfolio (new job,
 * certification, technology…), edit the data here — not the components.
 */

export interface YearMonth {
  year: number;
  /** 1–12 */
  month: number;
}

export interface Period {
  start: YearMonth;
  /** `null` means "today" (ongoing). */
  end: YearMonth | null;
}

export interface SocialLink {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  /** Human-readable form, e.g. without protocol. */
  display: string;
}

export interface Logo {
  /** Path under /public. Rendered in grayscale, coloured on hover. */
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: Period;
  summary: string;
  highlights: readonly string[];
  logo?: Logo;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  institutionFull?: string;
  period: Period;
  status: "ongoing" | "completed";
  summary: string;
  topics: readonly string[];
  note?: string;
  logo?: Logo;
}

export interface Certification {
  id: string;
  name: string;
  shortName?: string;
  issuer: string;
  obtained: YearMonth;
  description: string;
  score?: string;
  /** Official verification URL, added when available. */
  verificationUrl?: string;
  logo?: Logo;
}

export type StackCategoryId = "frontend" | "backend" | "data" | "tooling";

export interface Technology {
  name: string;
  /** Technologies I actively favour and want to work with. */
  favorite?: boolean;
  /** Technologies I'm actively learning. */
  learning?: boolean;
  note?: string;
}

export interface StackCategory {
  id: StackCategoryId;
  label: string;
  description: string;
  technologies: readonly Technology[];
}

export interface ExpertiseArea {
  id: string;
  index: string;
  title: string;
  description: string;
  keywords: readonly string[];
}

export interface Principle {
  title: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
  /** Path under /public — flag icon. */
  flag?: string;
}

export const identity = {
  firstName: "Maxime",
  lastName: "Derbigny",
  fullName: "Maxime Derbigny",
  monogram: "MD.",
  jobTitle: "Développeur d'applications",
  employer: "MICRO Informatic Systems SA",
  location: {
    city: "Attalens",
    region: "Fribourg",
    country: "Suisse",
    display: "Suisse romande",
  },
  email: "maxime.derbigny@gmail.com",
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
} as const;

export const socials: readonly SocialLink[] = [
  {
    id: "email",
    label: "Email",
    href: `mailto:${identity.email}`,
    display: identity.email,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/MrTangoo",
    display: "github.com/MrTangoo",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxime-derbigny",
    display: "linkedin.com/in/maxime-derbigny",
  },
];

/** External profiles — everything except email. */
export const externalSocials = socials.filter((social) => social.id !== "email");

export const hero = {
  eyebrow: "Développeur d'applications — Suisse romande",
  title: ["Concevoir avec précision.", "Développer avec intention."],
  intro:
    "Je suis Maxime Derbigny, développeur d'applications en Suisse romande. Je conçois et fais évoluer des solutions web, avec un intérêt particulier pour les technologies modernes, l'architecture et la qualité logicielle.",
  primaryCta: { label: "Découvrir mon parcours", href: "#parcours" },
  secondaryCta: { label: "Me contacter", href: "#contact" },
} as const;

export const about = {
  eyebrow: "À propos",
  title: "Une approche polyvalente du développement logiciel.",
  paragraphs: [
    "Développeur d'applications CFC, je travaille chez MICRO Informatic Systems SA tout en préparant le brevet fédéral d'informaticien de gestion à l'ISEIG.",
    "Mon expérience m'a permis de développer une approche polyvalente du développement logiciel : du frontend aux bases de données, en passant par la logique applicative et la maintenance de solutions métier.",
    "J'apprécie comprendre les besoins derrière une application, concevoir des solutions pertinentes et chercher continuellement à améliorer leur qualité.",
    "Je m'intéresse particulièrement à React, Next.js, aux architectures modernes et aux outils qui permettent de développer des applications fiables, performantes et évolutives.",
  ],
  facts: [
    { label: "Basé à", value: "Attalens, Fribourg" },
    { label: "Actuellement", value: "MICRO Informatic Systems SA" },
    { label: "Formation en cours", value: "Brevet fédéral — ISEIG" },
    { label: "Diplôme", value: "CFC Informaticien, dév. d'applications" },
  ],
} as const;

export const expertise: readonly ExpertiseArea[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Development",
    description:
      "Conception d'interfaces claires et réactives avec React, Next.js et TypeScript. Attention portée à la structure des composants, à l'accessibilité et à la cohérence visuelle.",
    keywords: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "application",
    index: "02",
    title: "Application Development",
    description:
      "Développement et évolution d'applications métier : analyse des besoins, implémentation de fonctionnalités, intégration d'API REST et maintenance corrective et évolutive.",
    keywords: ["C# / .NET", "Node.js", "PHP", "API REST"],
  },
  {
    id: "data",
    index: "03",
    title: "Databases & Data",
    description:
      "Modélisation et manipulation de bases de données relationnelles, écriture de requêtes SQL et T-SQL, adaptation de schémas existants et utilisation d'ORM modernes.",
    keywords: ["PostgreSQL", "SQL Server", "Prisma ORM", "Neon"],
  },
  {
    id: "engineering",
    index: "04",
    title: "Engineering Practices",
    description:
      "Qualité logicielle, versionnement, automatisation et méthodes Agile. Un intérêt marqué pour le Clean Code, les tests et les pipelines CI/CD.",
    keywords: ["Git", "GitHub Actions", "Scrum", "Clean Code"],
  },
];

export const stack: readonly StackCategory[] = [
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
      { name: "Node.js" },
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
      { name: "GitHub" },
      { name: "GitHub Actions", learning: true, note: "Pipelines CI/CD, en apprentissage actif." },
      { name: "Vercel" },
      { name: "Cloudflare" },
      { name: "Windows Server" },
      { name: "IIS" },
      { name: "PM2" },
      { name: "PowerShell" },
    ],
  },
];

export const favoriteStack = {
  title: "Next.js · Prisma · Neon",
  description:
    "La combinaison que j'apprécie particulièrement pour construire des applications web complètes : un framework React full-stack, un ORM typé et une base PostgreSQL serverless.",
} as const;

export const softSkills: readonly string[] = [
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
];

export const experiences: readonly Experience[] = [
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

export const education: readonly Education[] = [
  {
    id: "iseig",
    degree: "Informaticien de gestion avec brevet fédéral",
    institution: "ISEIG",
    institutionFull: "Institut Suisse d'Enseignement de l'Informatique de Gestion",
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

export const certifications: readonly Certification[] = [
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

export const principles: readonly Principle[] = [
  {
    title: "Qualité du code",
    description:
      "Un code lisible, explicite et cohérent vaut mieux qu'un code astucieux. Je m'applique à écrire ce que je serais content de relire dans six mois.",
  },
  {
    title: "Maintenabilité",
    description:
      "Les applications vivent longtemps. Séparer les responsabilités et limiter la complexité facilite chaque évolution future.",
  },
  {
    title: "Architecture",
    description:
      "Comprendre le besoin avant de choisir la structure. Préférer des solutions simples, cohérentes et adaptées au périmètre réel.",
  },
  {
    title: "Automatisation",
    description:
      "Ce qui peut être vérifié automatiquement doit l'être : formatage, lint, typage, tests et déploiement, via des pipelines CI/CD.",
  },
  {
    title: "Tests",
    description:
      "Des tests ciblés, qui protègent les comportements importants sans alourdir le développement.",
  },
  {
    title: "Amélioration continue",
    description:
      "Apprendre en pratiquant, mesurer, ajuster. Chaque itération est une occasion de faire un peu mieux.",
  },
];

export const languages: readonly Language[] = [
  { name: "Français", level: "Langue principale", flag: "/images/flags/fr.svg" },
  {
    name: "Anglais",
    level: "Capacité professionnelle fonctionnelle",
    flag: "/images/flags/gb.svg",
  },
  { name: "Allemand", level: "Notions de base", flag: "/images/flags/de.svg" },
];

export const contact = {
  eyebrow: "Contact",
  title: "Construisons la suite.",
  description:
    "Une question, une opportunité ou simplement envie d'échanger autour du développement logiciel ? N'hésite pas à me contacter.",
} as const;
