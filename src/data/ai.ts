export type Lang = "en";

export interface CoreLesson {
  id: string;
  number: number;
  title: string;
  minutes: number;
  summary: string;
  keyIdeas: string[];
  example: string;
  practice: string;
  check: {
    question: string;
    answer: string;
  };
}

export interface LearningTrack {
  id: "everyday" | "student" | "builder";
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  modules: string[];
  project: string;
}

export interface PromptRecipe {
  id: string;
  title: string;
  goal: string;
  prompt: string;
  warning?: string;
  lang: Lang;
}

export interface AITool {
  name: string;
  url: string;
  goodAt: string;
  remember: string;
  lang: Lang;
}

export interface CourseSource {
  title: string;
  publisher: string;
  url: string;
  note: string;
}

export const coreLessons: CoreLesson[] = [
  {
    id: "what-ai-is",
    number: 1,
    title: "What AI is — and is not",
    minutes: 5,
    summary:
      "AI finds patterns in examples. A chatbot produces an answer by predicting likely pieces of text, not by looking up a guaranteed truth.",
    keyIdeas: [
      "Artificial intelligence is a broad name for systems that recognise or generate patterns in text, images, sound, and other data.",
      "Generative AI creates new content. ChatGPT, Gemini, and Claude are examples of tools built around language models.",
      "A fluent answer can still be mistaken. Confidence, detail, and good grammar are not proof of accuracy.",
    ],
    example:
      "A chatbot may give a confident date from Kashmiri history even when it has mixed up two events. Treat the answer as a useful draft to investigate, not as evidence.",
    practice:
      "Ask an AI tool: “Explain in three sentences how you produce an answer.” Then ask the same question in a new chat and compare the wording.",
    check: {
      question: "If an AI answer sounds certain and detailed, does that make it true?",
      answer:
        "No. The answer still needs evidence, especially for names, quotations, dates, numbers, health, law, and current events.",
    },
  },
  {
    id: "right-tool",
    number: 2,
    title: "Choose the right tool",
    minutes: 5,
    summary:
      "AI is one tool among several. Sometimes you need a chatbot; sometimes you need search, a calculator, an official website, or a qualified person.",
    keyIdeas: [
      "Use a chatbot to explain, brainstorm, rewrite, practise, or organise information you provide.",
      "Use web search and primary sources for current facts. A chatbot does not automatically have live information unless its search feature is active.",
      "Use a calculator or spreadsheet for exact arithmetic, and a qualified professional for high-stakes medical, legal, or financial decisions.",
    ],
    example:
      "For an examination date, use the official board or university website. AI can help you understand the notice or make a study plan after you verify the date.",
    practice:
      "Pick one task you have today. Decide whether it needs AI, search, a calculator, or a human expert before opening any tool.",
    check: {
      question: "Where should you confirm a current exam schedule?",
      answer:
        "On the responsible board, university, or institution's official website — not in an unverified AI answer or forwarded message.",
    },
  },
  {
    id: "better-prompts",
    number: 3,
    title: "Give useful instructions",
    minutes: 7,
    summary:
      "A useful prompt usually contains four things: your task, the relevant context, the form of the answer, and any limits.",
    keyIdeas: [
      "Task: say exactly what you want the AI to help you do.",
      "Context: include your level, goal, source material, or situation — but leave out private information.",
      "Format and limits: ask for a table, steps, questions, simple English, a word limit, or one idea at a time.",
    ],
    example:
      "Instead of “teach me Python,” try: “I have never coded. Teach me Python variables in simple English, show one example, then give me one small exercise. Do not show the answer until I try.”",
    practice:
      "Write one prompt using this formula: Task + Context + Format + Limits. Run it, find one weakness in the answer, and improve the prompt once.",
    check: {
      question: "What should you add when an answer is too advanced?",
      answer:
        "Give the AI your current level and request a simpler format, such as one idea at a time with a short example.",
    },
  },
  {
    id: "verify",
    number: 4,
    title: "Check answers and sources",
    minutes: 7,
    summary:
      "Asking AI for sources is only the beginning. Models can invent books, links, quotations, and page numbers, so you must open and check the evidence yourself.",
    keyIdeas: [
      "Prefer primary sources: the original document, research paper, official notice, historical text, dataset, or direct recording.",
      "Open every important citation. Check that the source exists and actually supports the sentence beside it.",
      "For disputed history, compare serious scholars and describe uncertainty instead of presenting one interpretation as settled fact.",
    ],
    example:
      "If AI attributes a claim about the Nilamata Purana to a book, search the book itself for the passage. The correct author can still be attached to the wrong publication.",
    practice:
      "Ask AI a factual question you already know something about. Request two sources, open both, and mark which parts of the answer each source actually supports.",
    check: {
      question: "Is a realistic-looking citation enough evidence?",
      answer:
        "No. Confirm that it exists, read the relevant passage, and check whether it truly supports the claim.",
    },
  },
  {
    id: "privacy",
    number: 5,
    title: "Protect private information",
    minutes: 5,
    summary:
      "Anything you paste into an online AI service leaves your device. Share only what the task requires, and remove identifying or confidential details first.",
    keyIdeas: [
      "Never paste passwords, one-time codes, bank details, identity numbers, private intimate material, or another person's secrets.",
      "Remove names, addresses, phone numbers, student or employee IDs, signatures, and account numbers from documents.",
      "Work, school, medical, and legal documents may have special confidentiality rules. Ask permission or use an approved system.",
    ],
    example:
      "To improve a CV, replace your real name, phone number, address, and employer-confidential details with placeholders before sharing the text.",
    practice:
      "Take a sample document and list every detail you would remove before giving it to an AI tool. Do not upload the actual document.",
    check: {
      question: "Should you paste a complete identity card to ask AI what one field means?",
      answer:
        "No. Type only the field label without the number, image, or other identifying details.",
    },
  },
  {
    id: "responsible-use",
    number: 6,
    title: "Use AI without causing harm",
    minutes: 7,
    summary:
      "AI can reproduce bias, imitate people, create convincing fakes, and perform poorly in under-represented languages. The user remains responsible for what they create and share.",
    keyIdeas: [
      "Do not use AI to impersonate, harass, cheat, fabricate evidence, or spread unverified claims.",
      "For a suspicious image, video, or voice note, trace the original source and seek independent confirmation. Visual oddities alone are no longer a reliable test.",
      "AI support for Koshur is uneven across scripts and dialects. Have fluent speakers check translations, spellings, meanings, and cultural context.",
    ],
    example:
      "Before forwarding an alarming WhatsApp clip, stop and find its earliest source. Check whether trusted independent sources report the same event.",
    practice:
      "Choose one AI-generated claim or image you saw recently. Write down how you would verify its source before sharing it.",
    check: {
      question: "Can you rely on AI alone for a Koshur translation?",
      answer:
        "No. Use it as a draft and ask a fluent speaker to verify the script, dialect, meaning, and context.",
    },
  },
];

export const learningTracks: LearningTrack[] = [
  {
    id: "everyday",
    eyebrow: "For everyone",
    title: "Use AI in everyday life",
    description: "Handle ordinary tasks faster without giving away your judgement or privacy.",
    outcome:
      "You will be able to use AI deliberately and recognise when another tool or a person is safer.",
    modules: [
      "Understand a difficult letter or document",
      "Compare choices without letting AI decide for you",
      "Draft, rewrite, and translate everyday writing",
      "Work carefully with images, audio, and voice",
      "Recognise scams, manipulation, and synthetic media",
    ],
    project: "Create a one-page AI safety guide for your family.",
  },
  {
    id: "student",
    eyebrow: "For study and work",
    title: "Learn and work with AI",
    description:
      "Use AI as a tutor, research assistant, language partner, and career coach — not as a shortcut around learning.",
    outcome:
      "You will leave with a repeatable study workflow and one improved piece of work you can explain yourself.",
    modules: [
      "Turn a syllabus into a realistic study plan",
      "Learn through questions, recall, and feedback",
      "Research with sources instead of copied answers",
      "Practise English and professional communication",
      "Improve a CV, application, or interview answer",
    ],
    project: "Complete a seven-day study plan and test yourself without looking at AI's answers.",
  },
  {
    id: "builder",
    eyebrow: "Optional technical path",
    title: "Build with AI",
    description:
      "Move from using chatbots to creating small, testable AI applications in Python or JavaScript.",
    outcome:
      "You will understand the main parts of an AI application and publish one small project with documented limitations.",
    modules: [
      "Call a model through an API and handle errors",
      "Request structured output and connect a safe tool",
      "Search your own documents with retrieval (RAG)",
      "Measure answer quality, cost, speed, and safety",
      "Deploy a small application and monitor failures",
    ],
    project: "Build a cited assistant for a small, trustworthy Kashmiri source collection.",
  },
];

export const prompts: PromptRecipe[] = [
  {
    id: "explain-and-test",
    title: "Learn a topic, then test yourself",
    goal: "Turn AI into a tutor instead of an answer machine.",
    prompt:
      "I am learning [topic] at [your level]. First ask what I already know. Then explain one small idea in simple English with one example. Ask me to explain it back in my own words. Correct any misunderstanding, then give me three questions. Do not reveal the answers until I attempt them.",
    warning: "Check important facts against your textbook, teacher, or primary source.",
    lang: "en",
  },
  {
    id: "research",
    title: "Research without invented citations",
    goal: "Create a source-checking plan before writing.",
    prompt:
      "Help me research [question]. Separate what is well established, disputed, and unknown. Suggest primary sources and serious secondary scholarship. For every source, give enough publication information for me to find it. Do not invent quotations, links, page numbers, or references. Clearly say when you are uncertain. I will open and verify every source myself.",
    warning: "Never cite a source you have not opened and read.",
    lang: "en",
  },
  {
    id: "english",
    title: "Practise English through conversation",
    goal: "Improve by answering, receiving feedback, and trying again.",
    prompt:
      "Act as my English practice partner. My level is [beginner / intermediate / advanced]. Ask one question and wait for my answer. Then: 1) show only the important mistakes, 2) explain them simply, 3) give a more natural version, and 4) ask me to try the sentence again. Continue one question at a time.",
    lang: "en",
  },
  {
    id: "cv",
    title: "Improve a CV honestly",
    goal: "Make real experience clearer without inventing achievements.",
    prompt:
      "Help me improve this CV for [role]. I have removed my personal details. Do not invent skills, numbers, experience, or qualifications. First identify the five biggest weaknesses. Then rewrite the bullet points using clear, specific language. Mark every place where you need a real example or number from me. Keep the result to one page.",
    warning: "Remove names, contact details, IDs, and confidential employer information first.",
    lang: "en",
  },
];

export const tools: AITool[] = [
  {
    name: "ChatGPT",
    url: "https://chatgpt.com",
    goodAt: "General learning, writing, files, images, and conversation.",
    remember: "Features and limits depend on the selected model and plan.",
    lang: "en",
  },
  {
    name: "Google Gemini",
    url: "https://gemini.google.com",
    goodAt: "General learning and work with Google's connected services.",
    remember: "Check whether an answer used live sources or only model knowledge.",
    lang: "en",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    goodAt: "Reading, explaining, and revising long documents.",
    remember: "A long, careful answer can still contain unsupported claims.",
    lang: "en",
  },
  {
    name: "Perplexity",
    url: "https://www.perplexity.ai",
    goodAt: "Finding web sources and getting an initial research overview.",
    remember: "Open each cited page and check that it supports the claim.",
    lang: "en",
  },
  {
    name: "NotebookLM",
    url: "https://notebooklm.google.com",
    goodAt: "Asking questions about a source collection you provide.",
    remember: "The quality of the result depends on the quality and completeness of your sources.",
    lang: "en",
  },
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org",
    goodAt: "Structured lessons and practice in mathematics, science, computing, and more.",
    remember: "Prefer a real course when you need a complete sequence, not isolated answers.",
    lang: "en",
  },
];

export const courseSources: CourseSource[] = [
  {
    title: "AI competency framework for students",
    publisher: "UNESCO",
    url: "https://www.unesco.org/en/articles/ai-competency-framework-students?hub=66973",
    note: "A human-centred framework covering AI knowledge, ethics, application, and creation.",
  },
  {
    title: "Guidance for generative AI in education and research",
    publisher: "UNESCO",
    url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=67098",
    note: "Practical guidance on privacy, age-appropriate use, ethics, and human responsibility.",
  },
  {
    title: "Generative Artificial Intelligence Profile",
    publisher: "NIST",
    url: "https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence",
    note: "A detailed reference for risks such as false information, privacy loss, bias, and misuse.",
  },
  {
    title: "Scammers use fake emergencies to steal your money",
    publisher: "US Federal Trade Commission",
    url: "https://consumer.ftc.gov/articles/scammers-use-fake-emergencies-steal-your-money",
    note: "Clear advice for recognising and independently verifying AI voice-cloning scams.",
  },
];
