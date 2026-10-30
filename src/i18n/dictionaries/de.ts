import type { Dictionary } from "./fr";

/**
 * Deutsches Wörterbuch — gleiche Struktur wie die französische Referenz
 * (`satisfies` garantiert die Schlüsselparität zur Kompilierzeit).
 */
export const de = {
  locale: "de",

  meta: {
    title: "Maxime Derbigny - Applikationsentwickler in der Schweiz",
    description:
      "Portfolio von Maxime Derbigny, Applikationsentwickler in der Westschweiz. Entdecken Sie seinen Werdegang, seine Kompetenzen in der Webentwicklung und seine Zertifizierungen.",
    keywords: [
      "Maxime Derbigny",
      "Applikationsentwickler",
      "Softwareentwickler",
      "Westschweiz",
      "Freiburg",
      "React",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
    ],
    skipLink: "Zum Inhalt springen",
  },

  og: {
    alt: "Maxime Derbigny - Applikationsentwickler, Westschweiz",
    eyebrow: "Applikationsentwickler - Westschweiz",
    lines: ["Mit Präzision", "konzipieren.", "Mit Absicht", "entwickeln."],
  },

  nav: [
    { id: "a-propos", label: "Über mich" },
    { id: "expertise", label: "Kompetenzen" },
    { id: "stack", label: "Stack" },
    { id: "parcours", label: "Werdegang" },
    { id: "certifications", label: "Zertifizierungen" },
    { id: "approche", label: "Ansatz" },
    { id: "contact", label: "Kontakt" },
  ],

  switcher: {
    label: "Sprache wählen",
  },

  header: {
    navAriaLabel: "Hauptnavigation",
    mobileNavAriaLabel: "Mobile Navigation",
    openPalette: "Befehlspalette öffnen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schliessen",
    monogramLabel: "Maxime Derbigny - zurück zum Seitenanfang",
  },

  applications: {
    label: "Apps",
    title: ["Deine nächsten", "Lieblingsapps", "nehmen Gestalt an."],
    description:
      "Maxime arbeitet daran, sie zum Leben zu erwecken. Schau bald wieder vorbei und entdecke sie.",
    backHome: "Zurück zur Startseite",
  },

  footer: {
    externalAriaLabel: "Externe Links",
    backToTop: "Nach oben",
    legalLabel: "Impressum",
  },

  identity: {
    jobTitle: "Applikationsentwickler",
    location: {
      city: "Attalens",
      region: "Freiburg",
      country: "Schweiz",
      display: "Westschweiz",
    },
    portrait: {
      src: "/images/portrait/me.png",
      alt: "Schwarz-weiss-Porträt von Maxime Derbigny, lächelnd, vor einem dunklen Hintergrund mit einer zinnoberroten Farbfläche.",
      width: 454,
      height: 588,
    },
    portraitSecondary: {
      src: "/images/portrait/me2.png",
      alt: "Maxime Derbigny im Profil, Blick zum Licht gerichtet, vor dunklem Hintergrund.",
      width: 519,
      height: 430,
    },
  },

  hero: {
    ariaLabel: "Einleitung",
    eyebrow: "Applikationsentwickler - Westschweiz",
    title: ["Mit Präzision konzipieren.", "Mit Absicht entwickeln."],
    intro:
      "Ich bin Maxime Derbigny, Applikationsentwickler in der Westschweiz. Ich konzipiere und entwickle Weblösungen weiter, mit besonderem Interesse an modernen Technologien, Architektur und Softwarequalität.",
    primaryCta: { label: "Meinen Werdegang entdecken", href: "#parcours" },
    secondaryCta: { label: "Kontakt aufnehmen", href: "#contact" },
    cvLabel: "Meinen Lebenslauf herunterladen",
    basedLabel: "Wohnhaft in",
    currentlyLabel: "Aktuell",
    credentialLine: "EFZ Informatiker · Eidg. Diplom in Vorbereitung",
    scrollLabel: "Scrollen",
  },

  about: {
    eyebrow: "Über mich",
    title: "Ein vielseitiger Ansatz der Softwareentwicklung.",
    paragraphs: [
      "Als Applikationsentwickler mit eidgenössischem Fähigkeitszeugnis (EFZ) arbeite ich bei der MICRO Informatic Systems SA und bereite mich gleichzeitig auf das eidgenössische Diplom als Wirtschaftsinformatiker an der ISEIG vor.",
      "Meine Erfahrung hat mir einen vielseitigen Ansatz der Softwareentwicklung ermöglicht: vom Frontend über Datenbanken bis hin zur Anwendungslogik und zur Wartung von Geschäftslösungen.",
      "Es liegt mir, die Bedürfnisse hinter einer Anwendung zu verstehen, passende Lösungen zu konzipieren und deren Qualität kontinuierlich zu verbessern.",
      "Ich interessiere mich besonders für React, Next.js, moderne Architekturen und Werkzeuge, mit denen sich zuverlässige, leistungsfähige und skalierbare Anwendungen entwickeln lassen.",
    ],
    facts: [
      {
        label: "Wohnhaft in",
        value: "Attalens, Freiburg",
        icon: "map-pin",
        href: "https://www.google.com/maps/search/?api=1&query=Attalens%2C+FR%2C+Suisse",
      },
      {
        label: "Aktuell",
        value: "MICRO Informatic Systems SA",
        icon: "briefcase",
        href: "https://www.microinformatic.ch/",
      },
      {
        label: "Laufende Ausbildung",
        value: "Eidg. Diplom - ISEIG",
        icon: "graduation-cap",
        href: "https://iseig.ch",
      },
      { label: "Abschluss", value: "EFZ Informatiker, Applikationsentwicklung", icon: "award" },
    ],
    languagesLabel: "Sprachen",
  },

  expertise: {
    eyebrow: "Kompetenzen",
    titleA: "Vier Bereiche,",
    titleB: "derselbe Anspruch.",
    keywordsAria: "Schlüsselwörter",
    areas: [
      {
        id: "frontend",
        index: "01",
        title: "Frontend Development",
        description:
          "Konzeption klarer und reaktiver Benutzeroberflächen mit React, Next.js und TypeScript. Besonderes Augenmerk auf Komponentenstruktur, Barrierefreiheit und visuelle Konsistenz.",
        keywords: ["React", "Next.js", "AngularJS", "TypeScript", "JavaScript", "Tailwind CSS"],
        icon: "monitor",
      },
      {
        id: "application",
        index: "02",
        title: "Application Development",
        description:
          "Entwicklung und Weiterentwicklung von Geschäftsanwendungen: Bedarfsanalyse, Implementierung von Funktionen, Integration von REST-APIs sowie korrektive und weiterführende Wartung.",
        keywords: ["C# / .NET", "Node.js", "PHP", "API REST"],
        icon: "app-window",
      },
      {
        id: "data",
        index: "03",
        title: "Databases & Data",
        description:
          "Modellierung und Bearbeitung relationaler Datenbanken, Schreiben von SQL- und T-SQL-Abfragen, Anpassung bestehender Schemas und Einsatz moderner ORMs.",
        keywords: ["PostgreSQL", "SQL Server", "MySQL", "Prisma ORM", "Neon"],
        icon: "database",
      },
      {
        id: "engineering",
        index: "04",
        title: "Engineering Practices",
        description:
          "Softwarequalität, Versionierung, Automatisierung und agile Methoden. Ausgeprägtes Interesse an Clean Code, Tests und CI/CD-Pipelines.",
        keywords: ["Git", "GitHub Actions", "Scrum", "Clean Code"],
        icon: "workflow",
      },
    ],
  },

  stack: {
    eyebrow: "Stack",
    titleA: "Werkzeuge, gewählt",
    titleB: "nach ihrer Passgenauigkeit.",
    description:
      "Die Technologien, die mir auf meinem Weg begegnet sind, und jene, die ich heute bevorzuge, um zuverlässige und skalierbare Anwendungen zu bauen.",
    categoriesAria: "Technologiekategorien",
    favoriteTechAria: "Bevorzugte Technologie",
    learningBadge: "Laufend",
    favoriteFootnote: "Technologien, die ich besonders schätze.",
    favoriteLabel: "Lieblingskombination",
    favoriteStack: {
      title: "Next.js · Prisma · Neon",
      description:
        "Die Kombination, die ich besonders schätze, um vollständige Webanwendungen zu bauen: ein Full-Stack-React-Framework, ein typisiertes ORM und eine serverlose PostgreSQL-Datenbank.",
    },
    softSkillsLabel: "Übergreifende Kompetenzen",
    softSkills: [
      "Applikationsentwicklung",
      "Bedarfsanalyse",
      "Lösung technischer Probleme",
      "Anwendungswartung",
      "Datenbankverwaltung",
      "API-Integration",
      "Softwarequalität",
      "Agile Methoden",
      "Scrum",
      "Technische Zusammenarbeit",
    ],
    categories: [
      {
        id: "frontend",
        label: "Frontend",
        description: "Moderne, typisierte und barrierefreie Weboberflächen.",
        technologies: [
          { name: "React", favorite: true, note: "Meine Referenzbibliothek für Oberflächen." },
          {
            name: "Next.js",
            favorite: true,
            note: "App Router, Server Components, hybrides Rendering.",
          },
          {
            name: "TypeScript",
            favorite: true,
            note: "Strikte Typisierung, von der Komponente bis zu den Daten.",
          },
          { name: "JavaScript" },
          { name: "HTML5" },
          { name: "CSS3" },
          { name: "Tailwind CSS", note: "Design Tokens und Utility-Komposition." },
          { name: "Bootstrap" },
          { name: "AngularJS", note: "In bestehenden Anwendungen angetroffen." },
        ],
      },
      {
        id: "backend",
        label: "Backend",
        description: "Anwendungslogik, Dienste und APIs.",
        technologies: [
          { name: "Node.js", favorite: true },
          { name: "C#" },
          { name: ".NET" },
          { name: "PHP" },
          { name: "API REST", note: "Konzeption, Konsum und Integration." },
        ],
      },
      {
        id: "data",
        label: "Database & ORM",
        description: "Relationale Daten und typisierter Zugriff.",
        technologies: [
          { name: "PostgreSQL", favorite: true, note: "Meine relationale Engine der Wahl." },
          {
            name: "Prisma ORM",
            favorite: true,
            note: "Deklaratives Schema und typisierter Client.",
          },
          { name: "Neon", favorite: true, note: "Serverloses PostgreSQL mit Datenbank-Branches." },
          { name: "Microsoft SQL Server" },
          { name: "T-SQL" },
          { name: "MySQL" },
        ],
      },
      {
        id: "tooling",
        label: "Tools & Engineering",
        description: "Versionierung, Deployment und Betrieb.",
        technologies: [
          { name: "Git" },
          { name: "GitHub", favorite: true },
          {
            name: "GitHub Actions",
            favorite: true,
            learning: true,
            note: "CI/CD-Pipelines, aktiv am Lernen.",
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
    eyebrow: "Werdegang",
    titleA: "Ein Werdegang,",
    titleB: "Schritt für Schritt aufgebaut.",
    description:
      "Von der Lehre bei den SBB zu meiner aktuellen Stelle, über das EFZ und das eidgenössische Diplom in Vorbereitung.",
    redThreadLabel: "Werdegang - der rote Faden",
    timelineLabel: "Werdegang",
    statuses: {
      current: "Aktuelle Stelle",
      completed: "Abschluss erlangt",
      ongoing: "Laufend",
      today: "Heute",
    },
    chapters: [
      {
        id: "2021",
        index: "01",
        year: "2021",
        kind: "Die Grundlagen",
        editorial: "Die Grundlagen legen.",
      },
      {
        id: "2024",
        index: "02",
        year: "2024",
        kind: "Die Entwicklung",
        editorial: "Die Praxis festigen.",
      },
      { id: "2025", index: "03", year: "2025", kind: "Die Wende", editorial: "Ein neues Kapitel." },
      {
        id: "2026",
        index: "04",
        year: "2026",
        kind: "Horizonte erweitern",
        editorial: "Horizonte erweitern.",
      },
      { id: "final", index: "05", year: "", kind: "Next chapter" },
    ],
    chapterSummaries: {
      micro:
        "Entwicklung und Weiterentwicklung von Geschäftsanwendungen, vom Frontend bis zu SQL-Datenbanken.",
      iseig:
        "Ausbildung mit Schwerpunkt Projektmanagement, Anforderungsanalyse und Verständnis der Geschäftsbedürfnisse.",
    },
    final: {
      label: "NEXT CHAPTER_",
      title: "Der Rest bleibt zu schreiben...",
      text: "Weiter lernen. Mit Anspruch bauen. Wachsen.",
      sub: "Heute entwickle ich mich in der Softwareentwicklung weiter, mit wachsendem Interesse an Architektur, Qualität und technischer Verantwortung.",
    },
  },

  certifications: {
    eyebrow: "Zertifizierungen",
    titleA: "Nachgewiesene",
    titleB: "Kompetenzen.",
    verifyLabel: "Zertifizierung überprüfen",
    resultLabel: "Ergebnis",
    items: [
      {
        id: "psm-1",
        name: "Professional Scrum Master I",
        shortName: "PSM I",
        issuer: "Scrum.org",
        obtained: { year: 2026, month: 9 },
        score: "97,5 %",
        description:
          "Offizielle Zertifizierung, die das Verständnis von Scrum bestätigt: Verantwortlichkeiten, Ereignisse, Artefakte und Prinzipien des Frameworks.",
        logo: {
          src: "/images/logo/psm1.png",
          width: 595,
          height: 594,
          alt: "Scrum.org Professional Scrum Master I Badge",
        },
      },
    ],
  },

  mindset: {
    eyebrow: "Ansatz",
    titleA: "Ein Engineering,",
    titleB: "das Bestand hat.",
    description:
      "Praktiken, die ich täglich anzuwenden und zu vertiefen suche, mehr als feste Gewissheiten.",
    practicesLabel: "Diese Website wendet diese Prinzipien an",
    practices: [
      "Next.js App Router",
      "Striktes TypeScript",
      "Vitest- & Playwright-Tests",
      "CI mit GitHub Actions",
      "Deployment auf Vercel",
    ],
    ciBadgeAlt: "Status des CI-Workflows",
    principles: [
      {
        title: "Codequalität",
        description:
          "Lesbarer, klarer und konsistenter Code ist mehr wert als raffinierter Code. Ich schreibe, was ich in sechs Monaten gerne wieder lesen würde.",
        icon: "book-open",
      },
      {
        title: "Wartbarkeit",
        description:
          "Anwendungen leben lange. Verantwortlichkeiten zu trennen und die Komplexität zu begrenzen erleichtert jede künftige Weiterentwicklung.",
        icon: "wrench",
      },
      {
        title: "Architektur",
        description:
          "Das Bedürfnis verstehen, bevor man die Struktur wählt. Einfache, kohärente und dem tatsächlichen Umfang angepasste Lösungen bevorzugen.",
        icon: "layers",
      },
      {
        title: "Automatisierung",
        description:
          "Was automatisch geprüft werden kann, soll es auch werden: Formatierung, Linting, Typisierung, Tests und Deployment über CI/CD-Pipelines.",
        icon: "bot",
      },
      {
        title: "Tests",
        description:
          "Gezielte Tests, die wichtige Verhaltensweisen schützen, ohne die Entwicklung zu beschweren.",
        icon: "flask-conical",
      },
      {
        title: "Kontinuierliche Verbesserung",
        description:
          "In der Praxis lernen, messen, anpassen. Jede Iteration ist eine Gelegenheit, es ein wenig besser zu machen.",
        icon: "trending-up",
      },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Bauen wir die Zukunft.",
    description:
      "Eine Frage, eine Gelegenheit oder einfach Lust auf einen Austausch über Softwareentwicklung? Zögern Sie nicht, mich zu kontaktieren.",
    cvPdfLabel: "PDF herunterladen",
    form: {
      eyebrow: "Direkte Nachricht",
      intro:
        "Lieber über ein Formular? Hinterlassen Sie mir eine Nachricht - sie landet direkt in meinem Posteingang.",
      honeypotLabel: "Dieses Feld leer lassen",
      nameLabel: "Name",
      namePlaceholder: "Ihr Name",
      emailLabel: "E-Mail",
      emailPlaceholder: "sie@email.ch",
      subjectLabel: "Betreff",
      subjectOptional: "(optional)",
      subjectPlaceholder: "Eine Gelegenheit, eine Frage…",
      messageLabel: "Nachricht",
      messagePlaceholder: "Schreiben Sie Ihre Nachricht…",
      submit: "Nachricht senden",
      sending: "Wird gesendet…",
      privacyNotice:
        "Ihre Angaben dienen ausschliesslich der Bearbeitung und Beantwortung Ihrer Anfrage.",
      privacyLinkLabel: "Impressum",
    },
    toasts: {
      loading: "Wird gesendet…",
      success: "Nachricht erfolgreich gesendet!",
      error:
        "Der Versand ist fehlgeschlagen. Versuchen Sie es erneut oder schreiben Sie mir per E-Mail.",
    },
    apiErrors: {
      invalid: "Bitte überprüfen Sie die Formularfelder.",
      unconfigured: "Der Versanddienst ist nicht konfiguriert.",
      send_failed: "Der Versand ist fehlgeschlagen. Versuchen Sie es gleich erneut.",
    },
  },

  experiences: [
    {
      id: "micro",
      role: "Junior-Entwickler",
      company: "MICRO Informatic Systems SA",
      location: "Montagny-près-Yverdon, Waadt",
      period: { start: { year: 2025, month: 9 }, end: null },
      summary:
        "Entwicklung und Weiterentwicklung von Geschäftsanwendungen, vom Frontend bis zu SQL-Datenbanken, in Zusammenarbeit mit den Teams und den Fachverantwortlichen.",
      highlights: [
        "Entwicklung von Oberflächen und Anwendungsfunktionen",
        "Bearbeitung und Anpassung von SQL-Datenbanken",
        "Korrektive und weiterführende Wartung",
        "Analyse funktionaler und technischer Anforderungen",
        "Mitwirkung an Test- und Deployment-Phasen",
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
      role: "Lernender Entwickler",
      company: "Groupement Romand de l'Informatique",
      location: "Montagny-près-Yverdon, Waadt",
      period: { start: { year: 2024, month: 8 }, end: { year: 2025, month: 7 } },
      summary:
        "Letztes Lehrjahr in einem professionellen Umfeld, abgeschlossen mit der individuellen praktischen Arbeit (IPA) des EFZ.",
      highlights: [
        "Entwicklung von Anwendungen im professionellen Kontext",
        "Realisierung der individuellen praktischen Arbeit (IPA)",
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
      role: "Lernender Entwickler",
      company: "SBB CFF FFS",
      location: "Bern",
      period: { start: { year: 2021, month: 8 }, end: { year: 2024, month: 8 } },
      summary:
        "Erste Berufserfahrung in der Softwareentwicklung in einem strukturierten Unternehmensumfeld.",
      highlights: [
        "Einstieg in die professionelle Softwareentwicklung",
        "Arbeit in einem strukturierten Unternehmensumfeld",
      ],
      logo: {
        src: "/images/logo/sbb.webp",
        width: 1500,
        height: 1000,
        alt: "Logo SBB CFF FFS",
      },
    },
  ],

  education: [
    {
      id: "iseig",
      degree: "Wirtschaftsinformatiker mit eidg. Diplom",
      institution: "ISEIG",
      institutionFull: "Institut Suisse d'Enseignement de l'Informatique de Gestion",
      location: "Lausanne, Waadt",
      period: { start: { year: 2026, month: 2 }, end: { year: 2027, month: 4 } },
      status: "ongoing",
      summary:
        "Laufende Ausbildung mit Schwerpunkt Projektmanagement, Anforderungsanalyse und Verständnis der Geschäftsbedürfnisse.",
      topics: [
        "Projektmanagement",
        "Anforderungsanalyse",
        "Informationssysteme",
        "IT-Organisation",
        "Verständnis der Geschäftsbedürfnisse",
      ],
      note: "Voraussichtlicher Abschluss im April 2027",
      logo: {
        src: "/images/logo/iseig.svg",
        width: 426,
        height: 181,
        alt: "Logo der ISEIG",
      },
    },
    {
      id: "epsic",
      degree: "EFZ Informatiker - Applikationsentwicklung",
      institution: "EPSIC",
      location: "Lausanne, Waadt",
      period: { start: { year: 2021, month: 8 }, end: { year: 2025, month: 7 } },
      status: "completed",
      summary:
        "Grundausbildung in Applikationsentwicklung, kombiniert mit Berufserfahrung bei den SBB CFF FFS und anschliessend beim GRI.",
      topics: [],
      note: "Individuelle praktische Arbeit (IPA): 5,6 / 6",
      logo: {
        src: "/images/logo/epsic.png",
        width: 480,
        height: 320,
        alt: "Logo der EPSIC - École Professionnelle Lausanne",
      },
    },
  ],

  languages: [
    { name: "Französisch", flag: "/images/flags/fr.svg", code: "fr-CH" },
    { name: "Englisch", flag: "/images/flags/gb.svg", code: "en" },
    { name: "Deutsch", flag: "/images/flags/de.svg", code: "de" },
  ],

  dates: {
    today: "heute",
    todayCapitalized: "Heute",
  },

  errors: {
    notFound: {
      title: "Seite nicht gefunden",
      heading: "Diese Seite existiert nicht",
      body: "Der Link ist möglicherweise fehlerhaft oder die Seite wurde verschoben.",
      cta: "Zurück zur Startseite",
    },
    error: {
      eyebrow: "Ein Fehler ist aufgetreten",
      heading: "Etwas ist schiefgelaufen",
      retry: "Erneut versuchen",
    },
  },

  palette: {
    ariaLabel: "Befehlspalette",
    searchAria: "Befehl suchen",
    listAria: "Befehle",
    closeAria: "Befehlspalette schliessen",
    placeholder: "Befehl suchen…",
    empty: "Keine Ergebnisse für «\u00a0{query}\u00a0»",
    hints: { navigate: "navigieren", execute: "ausführen", close: "schliessen" },
    categories: {
      navigation: "Navigation",
      actions: "Aktionen",
      links: "Externe Links",
    },
    commands: {
      home: { label: "Startseite", keywords: ["top", "oben", "hero", "home"] },
      sectionKeywords: ["section", "gehe zu"],
      downloadCv: {
        label: "Lebenslauf herunterladen",
        keywords: ["cv", "pdf", "lebenslauf", "resume"],
      },
      sendEmail: {
        label: "Mir eine E-Mail schreiben",
        keywords: ["email", "mail", "nachricht", "kontakt", "formular", "schreiben", "senden"],
      },
      copyEmail: {
        label: "E-Mail-Adresse kopieren",
        keywords: ["email", "mail", "kopieren", "kontakt"],
      },
      copySuccess: "Kopiert: {value}",
      copyFailure: "Kopieren fehlgeschlagen - bitte erneut versuchen.",
      openTerminal: {
        label: "Terminal öffnen",
        keywords: ["terminal", "konsole", "shell", "cli", "befehl"],
      },
      socialKeywords: {
        github: ["code", "repo", "profil"],
        linkedin: ["profil", "netzwerk"],
      },
    },
  },

  terminal: {
    dialogAria: "Simuliertes Terminal",
    controlsAria: "Fenstersteuerung",
    close: "Schliessen",
    closeTerminal: "Terminal schliessen",
    minimize: "Minimieren",
    minimizeTerminal: "Terminal minimieren",
    maximize: "Vergrössern",
    maximizeTerminal: "Terminal vergrössern",
    restore: "Wiederherstellen",
    restoreSize: "Grösse wiederherstellen",
    restoreTerminal: "Terminal wiederherstellen",
    inputAria: "Befehl eingeben - « help » für die Liste",
    inputPlaceholder: "« help » eingeben…",
    commands: [
      { name: "help", description: "Listet die verfügbaren Befehle" },
      { name: "about", description: "Vorstellung der Website und ihres Autors" },
      { name: "projects", description: "Veröffentlichte Projekte" },
      { name: "stack", description: "Verwendete Technologien" },
      { name: "experience", description: "Berufserfahrung" },
      { name: "contact", description: "Kontaktmöglichkeiten" },
      { name: "cv", description: "Öffnet den Lebenslauf als PDF" },
      { name: "date", description: "Zeigt lokales Datum und Uhrzeit" },
      { name: "whoami", description: "Wer bin ich?" },
      { name: "echo", description: "echo <text> - gibt den Text zurück" },
      { name: "clear", description: "Löscht den Terminal-Verlauf" },
      { name: "exit", description: "Schliesst das Terminal" },
    ],
    welcome: {
      intro: "Simuliertes Terminal - die Befehle sind auf eine vordefinierte Liste beschränkt.",
      hint: "« help » eingeben, um sie zu entdecken, « exit » zum Beenden.",
    },
    outputs: {
      favoriteNote: "* bevorzugte Technologie",
      experienceFooter: "→ Details im Abschnitt ",
      sectionLink: "→ Abschnitt ",
      noProjects:
        "Noch sind keine Projekte auf dieser Website veröffentlicht - Abschnitt in Vorbereitung.",
      githubMeanwhile: "In der Zwischenzeit befinden sich meine Repositories auf ",
      openingCv: "Öffne ",
      sudoDenied: "Berechtigung verweigert: Dieses Terminal ist eine Simulation.",
      emailHint: "Um mir zu schreiben: « contact », oder « echo » zum Anzeigen von Text.",
      commandNotFound: "Befehl nicht gefunden: « {command} » - « help » eingeben.",
      emailLabel: "E-Mail",
      atEmployer: "Derzeit bei",
    },
  },

  legal: {
    meta: {
      title: "Impressum",
      description:
        "Impressum und Datenschutzerklärung des Portfolios von Maxime Derbigny: verarbeitete Daten, Hosting, Cookies und geistiges Eigentum.",
    },
    eyebrow: "Informationen",
    title: "Impressum",
    backHome: "Zurück zur Website",
    updatedLabel: "Letzte Aktualisierung: Oktober 2026",
    intro:
      "Transparenz darüber, was diese Website mit Ihren Daten tut, und was nicht. Das Wichtigste: keine Cookies, keine Tracker, keine Reichweitenmessung.",
    /** Appended to the "external" section only when the GitHub CI badge is rendered. */
    badgeNote:
      "Ausnahme: Das im Abschnitt «Ansatz» angezeigte CI-Statusbadge wird von github.com geladen, das dabei Ihre IP-Adresse und Browserinformationen erhält.",
    sections: [
      {
        id: "editeur",
        title: "Herausgeber",
        paragraphs: [
          "Diese Website wird von Maxime Derbigny, Attalens (Freiburg), Schweiz, herausgegeben. Kontakt: maxime.derbigny@gmail.com.",
          "Es handelt sich um eine persönliche Website zur beruflichen Selbstdarstellung: Es werden keine Dienstleistungen, Waren oder Produkte verkauft.",
        ],
      },
      {
        id: "hebergement",
        title: "Hosting",
        paragraphs: [
          "Die Website wird von Vercel Inc. (USA) gehostet. Bei Ihrem Besuch speichern deren Server die technischen Daten, die für die Auslieferung und Sicherheit der Website erforderlich sind, insbesondere Ihre IP-Adresse und den Browsertyp.",
        ],
      },
      {
        id: "donnees",
        title: "Personendaten",
        paragraphs: [
          "Das Kontaktformular übermittelt nur das, was Sie eingeben: Name, E-Mail-Adresse, Betreff und Nachricht. Diese Angaben dienen ausschliesslich der Bearbeitung und Beantwortung Ihrer Anfrage.",
          "Die Nachrichten erreichen mich per E-Mail über Gmail (Google LLC, USA) und bleiben so lange in meinem Posteingang, wie es für die Bearbeitung Ihrer Anfrage nötig ist. Sie werden weder verkauft, noch zu kommerziellen Zwecken weitergegeben oder anderweitig verwendet.",
          "Gemäss Bundesgesetz über den Datenschutz (DSG) können Sie Auskunft, Berichtigung oder Löschung Ihrer Daten verlangen, indem Sie an maxime.derbigny@gmail.com schreiben.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies und Reichweitenmessung",
        paragraphs: [
          "Diese Website verwendet keine Cookies, keine Tracker und keine Analysewerkzeuge: Es wird nichts in Ihrem Browser gespeichert.",
          "Die angezeigte Sprache wird zum Zeitpunkt der Anfrage aus Ihren Browsereinstellungen abgeleitet und nicht gespeichert.",
        ],
      },
      {
        id: "external",
        title: "Externe Links und Ressourcen",
        paragraphs: [
          "Links zu GitHub, LinkedIn, Google Maps und anderen Drittdiensten unterliegen beim Aufruf den Datenschutzrichtlinien dieser Dienste.",
          "Schriftarten, Bilder und Skripte werden lokal gehostet: Ihr Besuch löst keine Anfragen an Server von Drittanbietern aus.",
        ],
      },
      {
        id: "propriete",
        title: "Geistiges Eigentum",
        paragraphs: [
          "Die Inhalte dieser Website (Texte, Porträts, Illustrationen) sind urheberrechtlich geschützt. Der Quellcode ist unter der MIT-Lizenz veröffentlicht.",
          "Die gezeigten Logos von Unternehmen, Schulen und Technologien gehören ihren jeweiligen Inhabern und dienen der Veranschaulichung. Schriftart Geist: SIL Open Font License. Lucide-Icons: ISC-Lizenz.",
        ],
      },
    ],
  },
} satisfies Dictionary;
