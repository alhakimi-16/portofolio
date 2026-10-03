/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALL PERSONAL CONTENT OF THE SITE LIVES IN THIS FILE.
 *
 *  • Every visible text exists in English (`en`) and German (`de`).
 *  • Text wrapped in *asterisks* is rendered as an italic serif accent.
 *  • Dates use "YYYY-MM". Leave `end` out for something that is still ongoing.
 *
 *  ⚠ DRAFT — entries marked SAMPLE are placeholders until the real
 *    LinkedIn data is filled in. Set `draft: false` once everything is real;
 *    that removes the "Draft" badge and allows search engines to index the site.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type {
  Certification,
  Education,
  L,
  Project,
  ProjectCategory,
  Role,
  Skill,
  SkillGroup,
  Social,
  SpokenLanguage,
} from "./types";

export const draft = true;

export const person = {
  firstName: "Mugahed",
  lastName: "Al-Hakimi",
  initials: "MA",
  // SAMPLE — headline from LinkedIn
  role: { en: "Data Scientist & ML Engineer", de: "Data Scientist & ML Engineer" } satisfies L,
  tagline: {
    en: "I turn *noisy data* into models and decisions that hold up in the real world.",
    de: "Ich verwandle *verrauschte Daten* in Modelle und Entscheidungen, die in der Praxis bestehen.",
  } satisfies L,
  // SAMPLE
  location: { en: "Germany", de: "Deutschland" } satisfies L,
  /** IANA time zone for the live clock, e.g. "Europe/Berlin". */
  timezone: "Europe/Berlin",
  availability: { en: "Open to new roles", de: "Offen für neue Positionen" } satisfies L,
  // SAMPLE — the address recruiters should write to
  email: "hello@example.com",
  /** Optional photo in /public (portrait, ~4:5). Rendered as an interactive halftone. */
  portrait: undefined as string | undefined,
  /** PDF files in /public, e.g. "/cv/Mugahed-Al-Hakimi-CV.pdf". Leave undefined to hide the buttons. */
  cv: { en: undefined, de: undefined } as L<string | undefined>,
};

export const socials: Social[] = [
  // SAMPLE — paste your LinkedIn URL
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "in/…" },
  { label: "GitHub", href: "https://github.com/alhakimi-16", handle: "alhakimi-16" },
];

export const about = {
  // SAMPLE
  statement: {
    en: "I'm a data scientist who enjoys the messy middle — cleaning, modelling and explaining data until it becomes something a team can *act on*.",
    de: "Ich bin Data Scientist und mag gerade den unordentlichen Teil: Daten bereinigen, modellieren und erklären — bis daraus etwas wird, auf dessen Basis ein Team *handeln kann*.",
  } satisfies L,
  // SAMPLE
  paragraphs: {
    en: [
      "My work sits between statistics, software engineering and the people who use the results. I build end-to-end pipelines — from raw data and feature engineering to deployed models and dashboards — and I care about making them reproducible, measurable and easy to understand.",
      "Right now I'm especially interested in applied machine learning, NLP and large language models, and in how to bring them into production responsibly.",
    ],
    de: [
      "Meine Arbeit liegt zwischen Statistik, Software-Engineering und den Menschen, die die Ergebnisse nutzen. Ich baue End-to-End-Pipelines — von Rohdaten und Feature Engineering bis zu produktiven Modellen und Dashboards — und lege Wert darauf, dass sie reproduzierbar, messbar und leicht verständlich sind.",
      "Derzeit interessieren mich besonders angewandtes Machine Learning, NLP und Large Language Models — und die Frage, wie man sie verantwortungsvoll in Produktion bringt.",
    ],
  } satisfies L<string[]>,
  // SAMPLE
  facts: {
    focus: { en: "Machine learning, NLP, analytics", de: "Machine Learning, NLP, Analytics" },
    currently: {
      en: "M.Sc. Data Science & working student",
      de: "M.Sc. Data Science & Werkstudent",
    },
    openTo: {
      en: "Full-time · Working student · Internship",
      de: "Festanstellung · Werkstudent · Praktikum",
    },
  } satisfies Record<string, L>,
  // SAMPLE — big numbers in the About section
  metrics: [
    { value: 3, suffix: "+", label: { en: "years working with data", de: "Jahre Erfahrung mit Daten" } },
    { value: 12, suffix: "", label: { en: "projects shipped", de: "umgesetzte Projekte" } },
    { value: 5, suffix: "", label: { en: "models in production", de: "Modelle in Produktion" } },
    { value: 25, suffix: "+", label: { en: "tools & frameworks", de: "Tools & Frameworks" } },
  ] satisfies { value: number; suffix: string; label: L }[],
};

export const categories: Record<ProjectCategory, L> = {
  ml: { en: "Machine Learning", de: "Machine Learning" },
  nlp: { en: "NLP & GenAI", de: "NLP & GenAI" },
  cv: { en: "Computer Vision", de: "Computer Vision" },
  analytics: { en: "Analytics", de: "Analytics" },
  data: { en: "Data Engineering", de: "Data Engineering" },
};

// SAMPLE — replace with your real projects (GitHub repos, thesis, course or work projects)
export const projects: Project[] = [
  {
    slug: "churn-radar",
    title: "Churn Radar",
    year: "2025",
    category: "ml",
    art: "bars",
    summary: {
      en: "Predicting customer churn early enough to act on it.",
      de: "Kundenabwanderung früh genug erkennen, um gegenzusteuern.",
    },
    problem: {
      en: "A subscription business was losing customers without warning. The retention team needed to know who was at risk — and why — before it was too late.",
      de: "Ein Abo-Unternehmen verlor Kundschaft ohne Vorwarnung. Das Retention-Team musste wissen, wer gefährdet ist — und warum —, bevor es zu spät ist.",
    },
    approach: {
      en: "Engineered behavioural features from 18 months of usage logs, trained a gradient-boosted model with time-based validation and used SHAP values to explain every prediction in plain language.",
      de: "Verhaltensbasierte Features aus 18 Monaten Nutzungsdaten entwickelt, ein Gradient-Boosting-Modell mit zeitbasierter Validierung trainiert und jede Vorhersage mit SHAP-Werten verständlich erklärt.",
    },
    results: [
      { value: "0.91", label: { en: "ROC-AUC on hold-out data", de: "ROC-AUC auf Testdaten" } },
      { value: "−18%", label: { en: "churn in the pilot group", de: "Abwanderung in der Pilotgruppe" } },
      { value: { en: "2 wks", de: "2 Wo." }, label: { en: "earlier warning", de: "frühere Warnung" } },
    ],
    stack: ["Python", "pandas", "XGBoost", "SHAP", "FastAPI", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/alhakimi-16" }],
  },
  {
    slug: "docu-mind",
    title: "DocuMind",
    year: "2025",
    category: "nlp",
    art: "network",
    summary: {
      en: "A retrieval-augmented assistant that answers questions from internal documents.",
      de: "Ein RAG-Assistent, der Fragen auf Basis interner Dokumente beantwortet.",
    },
    problem: {
      en: "Knowledge was scattered across hundreds of PDFs and wiki pages; finding the right answer took employees far too long.",
      de: "Wissen war über Hunderte PDFs und Wiki-Seiten verstreut; die richtige Antwort zu finden, dauerte viel zu lange.",
    },
    approach: {
      en: "Built a chunking and embedding pipeline, a vector index with hybrid search and an LLM answer layer that always cites its sources. Measured answer quality on a hand-labelled test set.",
      de: "Eine Chunking- und Embedding-Pipeline, einen Vektorindex mit hybrider Suche und eine LLM-Antwortschicht gebaut, die stets ihre Quellen zitiert. Die Antwortqualität auf einem handannotierten Testset gemessen.",
    },
    results: [
      { value: "92%", label: { en: "answers rated correct", de: "korrekt bewertete Antworten" } },
      { value: "−40%", label: { en: "time spent searching", de: "Zeitaufwand für die Suche" } },
      { value: "1.2k", label: { en: "documents indexed", de: "indexierte Dokumente" } },
    ],
    stack: ["Python", "LangChain", "Hugging Face", "FAISS", "FastAPI", "Streamlit"],
    links: [{ label: "GitHub", href: "https://github.com/alhakimi-16" }],
  },
  {
    slug: "demand-forecast",
    title: "Demand Forecasting",
    year: "2024",
    category: "analytics",
    art: "line",
    summary: {
      en: "Weekly sales forecasts for 300+ products to cut overstock.",
      de: "Wöchentliche Absatzprognosen für über 300 Produkte gegen Überbestände.",
    },
    problem: {
      en: "Ordering was based on gut feeling, which led to empty shelves and expensive overstock at the same time.",
      de: "Bestellungen beruhten auf Bauchgefühl — mit leeren Regalen und teuren Überbeständen zugleich.",
    },
    approach: {
      en: "Compared statistical baselines with LightGBM on lag and calendar features, reconciled forecasts across the product hierarchy and delivered them through an automated Power BI report.",
      de: "Statistische Baselines mit LightGBM auf Lag- und Kalender-Features verglichen, Prognosen über die Produkthierarchie abgestimmt und über einen automatisierten Power-BI-Bericht bereitgestellt.",
    },
    results: [
      { value: "7.8%", label: { en: "MAPE (weekly)", de: "MAPE (wöchentlich)" } },
      { value: "−12%", label: { en: "overstock", de: "Überbestand" } },
      { value: "300+", label: { en: "products covered", de: "abgedeckte Produkte" } },
    ],
    stack: ["Python", "SQL", "LightGBM", "statsmodels", "Airflow", "Power BI"],
  },
  {
    slug: "defect-vision",
    title: "Defect Vision",
    year: "2024",
    category: "cv",
    art: "heatmap",
    summary: {
      en: "Spotting manufacturing defects in camera images in real time.",
      de: "Fertigungsfehler in Kamerabildern in Echtzeit erkennen.",
    },
    problem: {
      en: "Manual visual inspection was slow, tiring and inconsistent between shifts.",
      de: "Die manuelle Sichtprüfung war langsam, ermüdend und zwischen den Schichten uneinheitlich.",
    },
    approach: {
      en: "Fine-tuned a convolutional detector on a small labelled dataset with heavy augmentation, optimised it for edge inference and added Grad-CAM heatmaps so inspectors can see why an image was flagged.",
      de: "Einen CNN-Detektor auf einem kleinen annotierten Datensatz mit starker Augmentierung feinjustiert, für Edge-Inferenz optimiert und Grad-CAM-Heatmaps ergänzt, damit Prüfer sehen, warum ein Bild markiert wurde.",
    },
    results: [
      { value: "0.87", label: { en: "mAP@0.5", de: "mAP@0.5" } },
      { value: "35 ms", label: { en: "per image on the edge device", de: "pro Bild auf dem Edge-Gerät" } },
      { value: "3×", label: { en: "faster inspection", de: "schnellere Prüfung" } },
    ],
    stack: ["PyTorch", "OpenCV", "ONNX", "Grad-CAM", "Docker"],
  },
  {
    slug: "sentiment-pulse",
    title: "Sentiment Pulse",
    year: "2023",
    category: "nlp",
    art: "scatter",
    summary: {
      en: "Clustering thousands of customer reviews into themes.",
      de: "Tausende Kundenbewertungen automatisch zu Themen clustern.",
    },
    problem: {
      en: "Product teams received thousands of reviews every month but had no structured way to see what customers were actually talking about.",
      de: "Produktteams erhielten jeden Monat Tausende Bewertungen, aber keinen strukturierten Überblick darüber, worüber die Kundschaft tatsächlich spricht.",
    },
    approach: {
      en: "Embedded reviews with a multilingual transformer, reduced them with UMAP, clustered them with HDBSCAN and labelled each cluster automatically — all explorable in an interactive dashboard.",
      de: "Bewertungen mit einem mehrsprachigen Transformer eingebettet, mit UMAP reduziert, mit HDBSCAN geclustert und jedes Cluster automatisch benannt — alles in einem interaktiven Dashboard explorierbar.",
    },
    results: [
      { value: "24", label: { en: "themes discovered", de: "erkannte Themen" } },
      { value: "8k+", label: { en: "reviews per month", de: "Bewertungen pro Monat" } },
      { value: "EN/DE", label: { en: "multilingual", de: "mehrsprachig" } },
    ],
    stack: ["Python", "Sentence-Transformers", "UMAP", "HDBSCAN", "Plotly Dash"],
  },
];

// SAMPLE — replace with the positions from LinkedIn (newest first)
export const experience: Role[] = [
  {
    company: "Acme Analytics GmbH",
    role: { en: "Working Student — Data Science", de: "Werkstudent Data Science" },
    type: { en: "Working student", de: "Werkstudent" },
    location: { en: "Berlin, Germany", de: "Berlin, Deutschland" },
    start: "2024-04",
    bullets: {
      en: [
        "Build and maintain ML models that forecast weekly demand for 300+ products.",
        "Automated the weekly reporting, saving the analytics team about 6 hours per week.",
        "Introduced experiment tracking with MLflow and code reviews for notebooks.",
      ],
      de: [
        "Entwicklung und Betreuung von ML-Modellen zur wöchentlichen Absatzprognose für über 300 Produkte.",
        "Wöchentliches Reporting automatisiert — rund 6 Stunden Zeitersparnis pro Woche für das Analytics-Team.",
        "Experiment-Tracking mit MLflow und Code-Reviews für Notebooks eingeführt.",
      ],
    },
    stack: ["Python", "SQL", "LightGBM", "MLflow", "Airflow"],
  },
  {
    company: "Northwind Labs",
    role: { en: "Machine Learning Intern", de: "Praktikant Machine Learning" },
    type: { en: "Internship", de: "Praktikum" },
    location: { en: "Munich, Germany", de: "München, Deutschland" },
    start: "2023-09",
    end: "2024-02",
    bullets: {
      en: [
        "Prototyped a retrieval-augmented chatbot for internal documentation.",
        "Built an evaluation set and metrics to compare the answer quality of different LLMs.",
        "Presented the results to stakeholders and handed the prototype over to engineering.",
      ],
      de: [
        "Prototyp eines RAG-Chatbots für interne Dokumentation entwickelt.",
        "Evaluationsdatensatz und Metriken zum Vergleich der Antwortqualität verschiedener LLMs aufgebaut.",
        "Ergebnisse vor Stakeholdern präsentiert und den Prototyp an das Engineering übergeben.",
      ],
    },
    stack: ["Python", "LangChain", "Hugging Face", "FastAPI"],
  },
  {
    company: "University Research Group",
    role: { en: "Student Research Assistant", de: "Studentische Hilfskraft" },
    type: { en: "Part-time", de: "Teilzeit" },
    location: { en: "Germany", de: "Deutschland" },
    start: "2022-10",
    end: "2023-08",
    bullets: {
      en: [
        "Cleaned and analysed sensor data for a research project on energy consumption.",
        "Wrote reproducible analysis pipelines in Python and R.",
      ],
      de: [
        "Sensordaten für ein Forschungsprojekt zum Energieverbrauch bereinigt und analysiert.",
        "Reproduzierbare Analyse-Pipelines in Python und R geschrieben.",
      ],
    },
    stack: ["Python", "R", "pandas", "Matplotlib"],
  },
];

// SAMPLE
export const education: Education[] = [
  {
    degree: { en: "M.Sc. Data Science", de: "M.Sc. Data Science" },
    school: "Your University",
    location: { en: "Germany", de: "Deutschland" },
    start: "2023-10",
    note: { en: "Focus: machine learning & NLP", de: "Schwerpunkt: Machine Learning & NLP" },
  },
  {
    degree: { en: "B.Sc. Computer Science", de: "B.Sc. Informatik" },
    school: "Your University",
    location: { en: "Germany", de: "Deutschland" },
    start: "2019-10",
    end: "2023-03",
    note: {
      en: "Thesis: forecasting energy demand with gradient boosting",
      de: "Abschlussarbeit: Prognose des Energiebedarfs mit Gradient Boosting",
    },
  },
];

// SAMPLE
export const certifications: Certification[] = [
  { name: "Machine Learning Specialization", issuer: "DeepLearning.AI", year: "2024" },
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2024" },
  { name: "Data Analyst Associate", issuer: "Microsoft", year: "2023" },
];

export const skillGroups: Record<SkillGroup, L> = {
  code: { en: "Programming", de: "Programmierung" },
  ml: { en: "Machine learning", de: "Machine Learning" },
  genai: { en: "NLP & GenAI", de: "NLP & GenAI" },
  data: { en: "Data engineering", de: "Data Engineering" },
  ops: { en: "MLOps & cloud", de: "MLOps & Cloud" },
  viz: { en: "Visualisation & BI", de: "Visualisierung & BI" },
};

// SAMPLE — level: 1 basics … 5 expert
export const skills: Skill[] = [
  { name: "Python", group: "code", level: 5 },
  { name: "SQL", group: "code", level: 4 },
  { name: "R", group: "code", level: 3 },
  { name: "Bash", group: "code", level: 2 },
  { name: "scikit-learn", group: "ml", level: 5 },
  { name: "PyTorch", group: "ml", level: 4 },
  { name: "XGBoost", group: "ml", level: 4 },
  { name: "TensorFlow", group: "ml", level: 3 },
  { name: "statsmodels", group: "ml", level: 3 },
  { name: "LLMs & RAG", group: "genai", level: 4 },
  { name: "Hugging Face", group: "genai", level: 4 },
  { name: "LangChain", group: "genai", level: 3 },
  { name: "spaCy", group: "genai", level: 3 },
  { name: "pandas", group: "data", level: 5 },
  { name: "NumPy", group: "data", level: 5 },
  { name: "PostgreSQL", group: "data", level: 4 },
  { name: "Spark", group: "data", level: 3 },
  { name: "Airflow", group: "data", level: 3 },
  { name: "Docker", group: "ops", level: 4 },
  { name: "Git", group: "ops", level: 4 },
  { name: "FastAPI", group: "ops", level: 4 },
  { name: "MLflow", group: "ops", level: 3 },
  { name: "Azure", group: "ops", level: 3 },
  { name: "Plotly", group: "viz", level: 4 },
  { name: "Matplotlib", group: "viz", level: 4 },
  { name: "Streamlit", group: "viz", level: 4 },
  { name: "Power BI", group: "viz", level: 3 },
  { name: "Tableau", group: "viz", level: 2 },
];

// SAMPLE
export const languages: SpokenLanguage[] = [
  { name: { en: "English", de: "Englisch" }, level: { en: "C1", de: "C1" }, value: 0.83 },
  { name: { en: "German", de: "Deutsch" }, level: { en: "B2", de: "B2" }, value: 0.67 },
];
