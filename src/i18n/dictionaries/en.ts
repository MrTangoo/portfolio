import type { Dictionary } from "./fr";

/**
 * English dictionary — same shape as the French reference (`satisfies`
 * guarantees key parity at compile time).
 */
export const en = {
  locale: "en",

  meta: {
    title: "Maxime Derbigny - Application Developer in Switzerland",
    description:
      "Portfolio of Maxime Derbigny, application developer in French-speaking Switzerland. Discover his background, web development skills and certifications.",
    keywords: [
      "Maxime Derbigny",
      "application developer",
      "software developer",
      "Switzerland",
      "Fribourg",
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
    ],
    skipLink: "Skip to content",
  },

  og: {
    alt: "Maxime Derbigny - Application Developer, French-speaking Switzerland",
    eyebrow: "Application Developer - French-speaking Switzerland",
    lines: ["Design with", "precision.", "Build with", "intent."],
  },

  nav: [
    { id: "a-propos", label: "About" },
    { id: "expertise", label: "Expertise" },
    { id: "stack", label: "Stack" },
    { id: "parcours", label: "Journey" },
    { id: "certifications", label: "Certifications" },
    { id: "approche", label: "Approach" },
    { id: "contact", label: "Contact" },
  ],

  switcher: {
    label: "Choose language",
  },

  header: {
    navAriaLabel: "Main navigation",
    mobileNavAriaLabel: "Mobile navigation",
    openPalette: "Open the command palette",
    openMenu: "Open the menu",
    closeMenu: "Close the menu",
    monogramLabel: "Maxime Derbigny - back to top",
  },

  applications: {
    label: "Applications",
    title: ["Your next", "favourite apps", "are taking shape."],
    description: "Maxime is working on bringing them to life. Come back soon to discover them.",
    backHome: "Back to home",
  },

  footer: {
    externalAriaLabel: "External links",
    backToTop: "Back to top",
    legalLabel: "Legal notice",
  },

  identity: {
    jobTitle: "Application Developer",
    location: {
      city: "Attalens",
      region: "Fribourg",
      country: "Switzerland",
      display: "French-speaking Switzerland",
    },
    portrait: {
      src: "/images/portrait/me.png",
      alt: "Black and white portrait of Maxime Derbigny, smiling, against a dark background with a vermilion block of colour.",
      width: 454,
      height: 588,
    },
    portraitSecondary: {
      src: "/images/portrait/me2.png",
      alt: "Maxime Derbigny in profile, looking towards the light, on a dark background.",
      width: 519,
      height: 430,
    },
  },

  hero: {
    ariaLabel: "Introduction",
    eyebrow: "Application Developer - French-speaking Switzerland",
    title: ["Design with precision.", "Build with intent."],
    intro:
      "I'm Maxime Derbigny, an application developer in French-speaking Switzerland. I design and evolve web solutions, with a particular interest in modern technologies, architecture and software quality.",
    primaryCta: { label: "Discover my journey", href: "#parcours" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    cvLabel: "Download my CV",
    basedLabel: "Based in",
    currentlyLabel: "Currently",
    credentialLine: "CFC Application Developer · Federal diploma in progress",
    scrollLabel: "Scroll",
  },

  about: {
    eyebrow: "About",
    title: "A versatile approach to software development.",
    paragraphs: [
      "As a federally certified (CFC) application developer, I work at MICRO Informatic Systems SA while preparing for the federal diploma in business IT at ISEIG.",
      "My experience has given me a versatile approach to software development: from frontend to databases, through application logic and the maintenance of business solutions.",
      "I enjoy understanding the needs behind an application, designing relevant solutions and continuously improving their quality.",
      "I am particularly interested in React, Next.js, modern architectures and the tools that make it possible to build reliable, performant and scalable applications.",
    ],
    facts: [
      {
        label: "Based in",
        value: "Attalens, Fribourg",
        icon: "map-pin",
        href: "https://www.google.com/maps/search/?api=1&query=Attalens%2C+FR%2C+Suisse",
      },
      {
        label: "Currently",
        value: "MICRO Informatic Systems SA",
        icon: "briefcase",
        href: "https://www.microinformatic.ch/",
      },
      {
        label: "Ongoing training",
        value: "Federal diploma - ISEIG",
        icon: "graduation-cap",
        href: "https://iseig.ch",
      },
      { label: "Degree", value: "CFC Application Developer", icon: "award" },
    ],
    languagesLabel: "Languages",
  },

  expertise: {
    eyebrow: "Expertise",
    titleA: "Four areas,",
    titleB: "one standard of care.",
    keywordsAria: "Keywords",
    areas: [
      {
        id: "frontend",
        index: "01",
        title: "Frontend Development",
        description:
          "Designing clear, responsive interfaces with React, Next.js and TypeScript. Careful attention to component structure, accessibility and visual consistency.",
        keywords: ["React", "Next.js", "AngularJS", "TypeScript", "JavaScript", "Tailwind CSS"],
        icon: "monitor",
      },
      {
        id: "application",
        index: "02",
        title: "Application Development",
        description:
          "Developing and evolving business applications: requirements analysis, feature implementation, REST API integration, and corrective and evolutionary maintenance.",
        keywords: ["C# / .NET", "Node.js", "PHP", "API REST"],
        icon: "app-window",
      },
      {
        id: "data",
        index: "03",
        title: "Databases & Data",
        description:
          "Modelling and manipulating relational databases, writing SQL and T-SQL queries, adapting existing schemas and working with modern ORMs.",
        keywords: ["PostgreSQL", "SQL Server", "MySQL", "Prisma ORM", "Neon"],
        icon: "database",
      },
      {
        id: "engineering",
        index: "04",
        title: "Engineering Practices",
        description:
          "Software quality, versioning, automation and Agile methods. A strong interest in Clean Code, testing and CI/CD pipelines.",
        keywords: ["Git", "GitHub Actions", "Scrum", "Clean Code"],
        icon: "workflow",
      },
    ],
  },

  stack: {
    eyebrow: "Stack",
    titleA: "Tools chosen",
    titleB: "for their fitness.",
    description:
      "The technologies I have encountered along my journey, and the ones I favour today for building reliable, scalable applications.",
    categoriesAria: "Technology categories",
    favoriteTechAria: "Favourite technology",
    learningBadge: "Learning",
    favoriteFootnote: "Technologies I particularly enjoy.",
    favoriteLabel: "Favourite combination",
    favoriteStack: {
      title: "Next.js · Prisma · Neon",
      description:
        "The combination I particularly enjoy for building complete web applications: a full-stack React framework, a typed ORM and a serverless PostgreSQL database.",
    },
    softSkillsLabel: "Cross-functional skills",
    softSkills: [
      "Application development",
      "Requirements analysis",
      "Technical problem solving",
      "Application maintenance",
      "Database management",
      "API integration",
      "Software quality",
      "Agile methods",
      "Scrum",
      "Technical collaboration",
    ],
    categories: [
      {
        id: "frontend",
        label: "Frontend",
        description: "Modern, typed and accessible web interfaces.",
        technologies: [
          { name: "React", favorite: true, note: "My go-to library for interfaces." },
          {
            name: "Next.js",
            favorite: true,
            note: "App Router, Server Components, hybrid rendering.",
          },
          { name: "TypeScript", favorite: true, note: "Strict typing, from component to data." },
          { name: "JavaScript" },
          { name: "HTML5" },
          { name: "CSS3" },
          { name: "Tailwind CSS", note: "Design tokens and utility composition." },
          { name: "Bootstrap" },
          { name: "AngularJS", note: "Encountered on existing applications." },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        description: "Application logic, services and APIs.",
        technologies: [
          { name: "Node.js", favorite: true },
          { name: "C#" },
          { name: ".NET" },
          { name: "PHP" },
          { name: "API REST", note: "Design, consumption and integration." },
        ],
      },
      {
        id: "data",
        label: "Database & ORM",
        description: "Relational data and typed access.",
        technologies: [
          { name: "PostgreSQL", favorite: true, note: "My relational engine of choice." },
          { name: "Prisma ORM", favorite: true, note: "Declarative schema and typed client." },
          { name: "Neon", favorite: true, note: "Serverless PostgreSQL with database branches." },
          { name: "Microsoft SQL Server" },
          { name: "T-SQL" },
          { name: "MySQL" },
        ],
      },
      {
        id: "tooling",
        label: "Tools & Engineering",
        description: "Versioning, deployment and operations.",
        technologies: [
          { name: "Git" },
          { name: "GitHub", favorite: true },
          {
            name: "GitHub Actions",
            favorite: true,
            learning: true,
            note: "CI/CD pipelines, actively learning.",
          },
          { name: "Vercel", favorite: true },
          { name: "Cloudflare" },
          { name: "Windows Server" },
          { name: "IIS" },
          { name: "PM2" },
          { name: "PowerShell" },
        ],
      },
    ],
  },

  journey: {
    eyebrow: "Journey",
    titleA: "A journey built",
    titleB: "step by step.",
    description:
      "From my apprenticeship at SBB to my current position, through the CFC diploma and the federal diploma in preparation.",
    redThreadLabel: "Journey - the red thread",
    timelineLabel: "Journey",
    statuses: {
      current: "Current position",
      completed: "Degree obtained",
      ongoing: "In progress",
      today: "Today",
    },
    chapters: [
      {
        id: "2021",
        index: "01",
        year: "2021",
        kind: "The foundations",
        editorial: "Laying the foundations.",
      },
      {
        id: "2024",
        index: "02",
        year: "2024",
        kind: "The evolution",
        editorial: "Consolidating the practice.",
      },
      {
        id: "2025",
        index: "03",
        year: "2025",
        kind: "The turning point",
        editorial: "A new chapter.",
      },
      {
        id: "2026",
        index: "04",
        year: "2026",
        kind: "Broadening horizons",
        editorial: "Broadening horizons.",
      },
      { id: "final", index: "05", year: "", kind: "Next chapter" },
    ],
    chapterSummaries: {
      micro: "Developing and evolving business applications, from frontend to SQL databases.",
      iseig:
        "Training focused on project management, requirements analysis and understanding business needs.",
    },
    final: {
      label: "NEXT CHAPTER_",
      title: "The rest is yet to be written...",
      text: "Keep learning. Build with rigour. Evolve.",
      sub: "Today, I continue to grow in software development, with a growing interest in architecture, quality and technical responsibilities.",
    },
  },

  certifications: {
    eyebrow: "Certifications",
    titleA: "Verified",
    titleB: "achievements.",
    verifyLabel: "Verify the certification",
    resultLabel: "Result",
    items: [
      {
        id: "psm-1",
        name: "Professional Scrum Master I",
        shortName: "PSM I",
        issuer: "Scrum.org",
        obtained: { year: 2026, month: 9 },
        score: "97.5%",
        description:
          "Official certification attesting to an understanding of Scrum: accountabilities, events, artefacts and the principles of the framework.",
        logo: {
          src: "/images/logo/psm1.png",
          width: 595,
          height: 594,
          alt: "Scrum.org Professional Scrum Master I badge",
        },
      },
    ],
  },

  mindset: {
    eyebrow: "Approach",
    titleA: "Engineering",
    titleB: "that lasts.",
    description: "Practices I strive to apply and deepen every day, rather than fixed certainties.",
    practicesLabel: "This site applies these principles",
    practices: [
      "Next.js App Router",
      "Strict TypeScript",
      "Vitest & Playwright tests",
      "GitHub Actions CI",
      "Vercel deployment",
    ],
    ciBadgeAlt: "CI workflow status",
    principles: [
      {
        title: "Code quality",
        description:
          "Readable, explicit and consistent code beats clever code. I strive to write what I would be happy to re-read in six months.",
        icon: "book-open",
      },
      {
        title: "Maintainability",
        description:
          "Applications live a long time. Separating concerns and limiting complexity makes every future change easier.",
        icon: "wrench",
      },
      {
        title: "Architecture",
        description:
          "Understand the need before choosing the structure. Prefer simple, coherent solutions that fit the real scope.",
        icon: "layers",
      },
      {
        title: "Automation",
        description:
          "Whatever can be checked automatically should be: formatting, linting, typing, tests and deployment, through CI/CD pipelines.",
        icon: "bot",
      },
      {
        title: "Testing",
        description:
          "Targeted tests that protect important behaviours without weighing down development.",
        icon: "flask-conical",
      },
      {
        title: "Continuous improvement",
        description:
          "Learn by doing, measure, adjust. Every iteration is an opportunity to do a little better.",
        icon: "trending-up",
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's build what's next.",
    description:
      "A question, an opportunity, or simply want to chat about software development? Feel free to get in touch.",
    cvPdfLabel: "Download the PDF",
    form: {
      eyebrow: "Direct message",
      intro: "Prefer a form? Leave me a message - it lands straight in my inbox.",
      honeypotLabel: "Leave this field empty",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@email.com",
      subjectLabel: "Subject",
      subjectOptional: "(optional)",
      subjectPlaceholder: "An opportunity, a question…",
      messageLabel: "Message",
      messagePlaceholder: "Write your message…",
      submit: "Send the message",
      sending: "Sending…",
      privacyNotice: "Your data is only used to handle and reply to your request.",
      privacyLinkLabel: "Legal notice",
    },
    toasts: {
      loading: "Sending…",
      success: "Message sent successfully!",
      error: "Sending failed. Try again or email me directly.",
    },
    apiErrors: {
      invalid: "Please check the form fields.",
      unconfigured: "The mail service is not configured.",
      send_failed: "Sending failed. Please try again in a moment.",
    },
  },

  experiences: [
    {
      id: "micro",
      role: "Junior Developer",
      company: "MICRO Informatic Systems SA",
      location: "Montagny-près-Yverdon, Vaud",
      period: { start: { year: 2025, month: 9 }, end: null },
      summary:
        "Developing and evolving business applications, from frontend to SQL databases, in collaboration with teams and business stakeholders.",
      highlights: [
        "Developing interfaces and application features",
        "Manipulating and adapting SQL databases",
        "Corrective and evolutionary maintenance",
        "Analysing functional and technical requirements",
        "Taking part in testing and deployment phases",
      ],
      logo: {
        src: "/images/logo/micro.png",
        width: 894,
        height: 279,
        alt: "MICRO Informatic Systems SA logo",
      },
    },
    {
      id: "gri",
      role: "Developer apprentice",
      company: "Groupement Romand de l'Informatique",
      location: "Montagny-près-Yverdon, Vaud",
      period: { start: { year: 2024, month: 8 }, end: { year: 2025, month: 7 } },
      summary:
        "Final year of apprenticeship in a professional environment, completed with the individual practical assignment (TPI) of the CFC diploma.",
      highlights: [
        "Developing applications in a professional context",
        "Completing the individual practical assignment (TPI)",
      ],
      logo: {
        src: "/images/logo/gri.png",
        width: 709,
        height: 340,
        alt: "Groupement Romand de l'Informatique logo",
      },
    },
    {
      id: "sbb",
      role: "Developer apprentice",
      company: "SBB CFF FFS",
      location: "Bern",
      period: { start: { year: 2021, month: 8 }, end: { year: 2024, month: 8 } },
      summary:
        "First professional experience in software development, within a structured corporate environment.",
      highlights: [
        "Introduction to professional software development",
        "Working within a structured corporate environment",
      ],
      logo: {
        src: "/images/logo/sbb.webp",
        width: 1500,
        height: 1000,
        alt: "SBB CFF FFS logo",
      },
    },
  ],

  education: [
    {
      id: "iseig",
      degree: "Business IT specialist with federal diploma",
      institution: "ISEIG",
      institutionFull: "Institut Suisse d'Enseignement de l'Informatique de Gestion",
      location: "Lausanne, Vaud",
      period: { start: { year: 2026, month: 2 }, end: { year: 2027, month: 4 } },
      status: "ongoing",
      summary:
        "Ongoing training focused on project management, requirements analysis and understanding business needs.",
      topics: [
        "Project management",
        "Requirements analysis",
        "Information systems",
        "IT organisation",
        "Understanding business needs",
      ],
      note: "Expected completion in April 2027",
      logo: {
        src: "/images/logo/iseig.svg",
        width: 426,
        height: 181,
        alt: "ISEIG logo",
      },
    },
    {
      id: "epsic",
      degree: "CFC in IT - Application Development",
      institution: "EPSIC",
      location: "Lausanne, Vaud",
      period: { start: { year: 2021, month: 8 }, end: { year: 2025, month: 7 } },
      status: "completed",
      summary:
        "Initial training in application development, combined with professional experience at SBB CFF FFS and then at GRI.",
      topics: [],
      note: "Individual practical assignment (TPI): 5.6 / 6",
      logo: {
        src: "/images/logo/epsic.png",
        width: 480,
        height: 320,
        alt: "EPSIC logo - École Professionnelle Lausanne",
      },
    },
  ],

  languages: [
    { name: "French", flag: "/images/flags/fr.svg", code: "fr-CH" },
    { name: "English", flag: "/images/flags/gb.svg", code: "en" },
    { name: "German", flag: "/images/flags/de.svg", code: "de" },
  ],

  dates: {
    today: "today",
    todayCapitalized: "Today",
  },

  errors: {
    notFound: {
      title: "Page not found",
      heading: "This page does not exist",
      body: "The link may be broken or the page may have been moved.",
      cta: "Back to home",
    },
    error: {
      eyebrow: "An error occurred",
      heading: "Something went wrong",
      retry: "Try again",
    },
  },

  palette: {
    ariaLabel: "Command palette",
    searchAria: "Search for a command",
    listAria: "Commands",
    closeAria: "Close the command palette",
    placeholder: "Search for a command…",
    empty: "No results for “\u00a0{query}\u00a0”",
    hints: { navigate: "navigate", execute: "run", close: "close" },
    categories: {
      navigation: "Navigation",
      actions: "Actions",
      links: "External links",
    },
    commands: {
      home: { label: "Home", keywords: ["top", "hero", "home"] },
      sectionKeywords: ["section", "go to"],
      downloadCv: { label: "Download my CV", keywords: ["cv", "pdf", "resume", "curriculum"] },
      sendEmail: {
        label: "Send me an email",
        keywords: ["email", "mail", "message", "contact", "form", "write", "send"],
      },
      copyEmail: {
        label: "Copy my email address",
        keywords: ["email", "mail", "copy", "contact"],
      },
      copySuccess: "Copied: {value}",
      copyFailure: "Copy failed - please try again.",
      openTerminal: {
        label: "Open the terminal",
        keywords: ["terminal", "console", "shell", "cli", "command"],
      },
      socialKeywords: {
        github: ["code", "repo", "profile"],
        linkedin: ["profile", "network"],
      },
    },
  },

  terminal: {
    dialogAria: "Simulated terminal",
    controlsAria: "Window controls",
    close: "Close",
    closeTerminal: "Close the terminal",
    minimize: "Minimize",
    minimizeTerminal: "Minimize the terminal",
    maximize: "Maximize",
    maximizeTerminal: "Maximize the terminal",
    restore: "Restore",
    restoreSize: "Restore the size",
    restoreTerminal: "Restore the terminal",
    inputAria: "Enter a command - type « help » for the list",
    inputPlaceholder: "type « help »…",
    commands: [
      { name: "help", description: "List the available commands" },
      { name: "about", description: "About the site and its author" },
      { name: "projects", description: "Published projects" },
      { name: "stack", description: "Technologies I use" },
      { name: "experience", description: "Professional experience" },
      { name: "contact", description: "Ways to get in touch" },
      { name: "cv", description: "Open the PDF CV" },
      { name: "date", description: "Show the local date and time" },
      { name: "whoami", description: "Who am I?" },
      { name: "echo", description: "echo <text> - print the given text" },
      { name: "clear", description: "Clear the terminal history" },
      { name: "exit", description: "Close the terminal" },
    ],
    welcome: {
      intro: "Simulated terminal - commands are limited to a predefined list.",
      hint: "Type « help » to discover them, « exit » to quit.",
    },
    outputs: {
      favoriteNote: "* technology of choice",
      experienceFooter: "→ Details in the section ",
      sectionLink: "→ Section ",
      noProjects: "No projects are published on this site yet - section in the works.",
      githubMeanwhile: "In the meantime, my repositories are on ",
      openingCv: "Opening ",
      sudoDenied: "Permission denied: this terminal is a simulation.",
      emailHint: "To write to me: « contact », or « echo » to print text.",
      commandNotFound: "command not found: « {command} » - type « help ».",
      emailLabel: "Email",
      atEmployer: "Currently at",
    },
  },

  legal: {
    meta: {
      title: "Legal notice",
      description:
        "Legal notice and privacy policy of Maxime Derbigny's portfolio: data processed, hosting, cookies and intellectual property.",
    },
    eyebrow: "Information",
    title: "Legal notice",
    backHome: "Back to site",
    updatedLabel: "Last updated: October 2026",
    intro:
      "Transparency about what this site does, and doesn't do, with your data. The essentials: no cookies, no trackers, no analytics.",
    /** Appended to the "external" section only when the GitHub CI badge is rendered. */
    badgeNote:
      "Exception: the CI status badge shown in the “Approach” section is loaded from github.com, which then receives your IP address and browser information.",
    sections: [
      {
        id: "editeur",
        title: "Site owner",
        paragraphs: [
          "This site is published by Maxime Derbigny, Attalens (Fribourg), Switzerland. Contact: maxime.derbigny@gmail.com.",
          "It is a personal portfolio for professional presentation: no services, goods or products are sold here.",
        ],
      },
      {
        id: "hebergement",
        title: "Hosting",
        paragraphs: [
          "The site is hosted by Vercel Inc. (United States). During your visit, its servers record the technical data needed to deliver and secure the site, including your IP address and browser type.",
        ],
      },
      {
        id: "donnees",
        title: "Personal data",
        paragraphs: [
          "The contact form only sends what you type: name, e-mail address, subject and message. This information is used exclusively to handle and reply to your request.",
          "Messages reach me by e-mail via Gmail (Google LLC, United States) and stay in my inbox for as long as needed to handle your request. They are never sold, shared for commercial purposes, or used for anything else.",
          "Under the Swiss Federal Act on Data Protection (FADP), you may request access, rectification or deletion of your data by writing to maxime.derbigny@gmail.com.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and analytics",
        paragraphs: [
          "This site uses no cookies, no trackers and no analytics tools: nothing is stored in your browser.",
          "The displayed language is inferred from your browser settings at request time and is not retained.",
        ],
      },
      {
        id: "external",
        title: "External links and resources",
        paragraphs: [
          "Links to GitHub, LinkedIn, Google Maps and other third-party services are governed by those services' own privacy policies once you visit them.",
          "Fonts, images and scripts are hosted locally: your visit triggers no request to third-party servers.",
        ],
      },
      {
        id: "propriete",
        title: "Intellectual property",
        paragraphs: [
          "The content of this site (text, portraits, illustrations) is protected by copyright. The source code is published under the MIT license.",
          "Company, school and technology logos belong to their respective owners and are shown for identification only. Geist font: SIL Open Font License. Lucide icons: ISC license.",
        ],
      },
    ],
  },
} satisfies Dictionary;
