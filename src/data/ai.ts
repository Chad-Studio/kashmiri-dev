export type Lang = "en";

export interface PromptRecipe {
  id: string;
  title: string;
  goal: string;
  prompt: string;
  lang: Lang;
}

export interface AITool {
  name: string;
  url: string;
  goodAt: string;
  lang: Lang;
}

export interface AwarenessTopic {
  title: string;
  body: string;
  tips: string[];
  lang: Lang;
}

export const prompts: PromptRecipe[] = [
  {
    id: "exam",
    title: "Prepare for an exam",
    goal: "Get a study plan and practice questions for any subject.",
    prompt:
      "I am a student in Kashmir preparing for [name of exam / class]. My subject is [subject]. I have [number] days to study. Please:\n1) Make a simple daily study plan.\n2) List the most important topics.\n3) Give me 10 practice questions with answers.\n4) Explain the hardest topic in simple English.",
    lang: "en",
  },
  {
    id: "english",
    title: "Practice English speaking & writing",
    goal: "Improve your English step by step with feedback.",
    prompt:
      "Act as my friendly English tutor. My level is [beginner / intermediate]. Do this:\n1) Ask me one simple question in English.\n2) Wait for my answer.\n3) Correct my grammar kindly and explain the mistake.\n4) Give me a better version of my sentence.\nKeep going for 10 questions.",
    lang: "en",
  },
  {
    id: "code",
    title: "Learn to code",
    goal: "Learn a programming language from zero, at your own pace.",
    prompt:
      "I want to learn [Python / JavaScript / other language]. I know nothing about coding. Please:\n1) Teach me one small idea at a time.\n2) Give one short example after each idea.\n3) Ask me a small task to try.\n4) Check my code and explain any mistakes in simple English.\nStart with lesson 1.",
    lang: "en",
  },
  {
    id: "cv",
    title: "Write a CV / resume",
    goal: "Build a clear, professional CV for jobs or internships.",
    prompt:
      "Help me write a clear one-page CV. Here is my information:\n- Name: [your name]\n- Location: [city, Kashmir]\n- Education: [degrees, years, marks]\n- Skills: [list your skills]\n- Experience: [jobs, internships, projects]\n- Job I want: [role]\n\nPlease write the CV in simple, professional English. Use short bullet points. Suggest 3 things I can improve.",
    lang: "en",
  },
];

export const tools: AITool[] = [
  { name: "ChatGPT", url: "https://chat.openai.com", goodAt: "General questions, writing help, and study support.", lang: "en" },
  { name: "Google Gemini", url: "https://gemini.google.com", goodAt: "Answers with web search and long documents.", lang: "en" },
  { name: "Claude", url: "https://claude.ai", goodAt: "Longer writing, careful explanations, and reading big texts.", lang: "en" },
  { name: "Perplexity", url: "https://www.perplexity.ai", goodAt: "Research questions with sources you can check.", lang: "en" },
  { name: "Khan Academy (Khanmigo)", url: "https://www.khanacademy.org", goodAt: "Free lessons in maths, science, and more.", lang: "en" },
  { name: "Google Translate", url: "https://translate.google.com", goodAt: "Quick translation between many languages.", lang: "en" },
];

export const awareness: AwarenessTopic[] = [
  {
    title: "AI hallucinations",
    body:
      "AI tools sometimes give answers that sound correct but are actually wrong. This is called a \"hallucination\". The AI is not lying on purpose — it just guesses the next words based on patterns.",
    tips: [
      "Always check important facts with a trusted source (book, teacher, official website).",
      "Ask the AI: \"Give me your sources.\" Then open those sources yourself.",
      "Be extra careful with names, dates, numbers, and medical or legal advice.",
    ],
    lang: "en",
  },
  {
    title: "Deepfakes",
    body:
      "A deepfake is a fake video, image, or voice made by AI. It can show a real person saying or doing something they never said or did. Deepfakes are getting harder to notice with the eye alone.",
    tips: [
      "Do not trust a shocking video just because it looks real.",
      "Look for the original source: which news site or official account posted it first?",
      "Check the person's real social media or a trusted news outlet for the same statement.",
    ],
    lang: "en",
  },
  {
    title: "Spotting AI-made fake news & rumours",
    body:
      "Fake news often spreads fast on WhatsApp and social media. AI now makes it easier to create fake photos, quotes, and articles. A calm mind and a few small checks can protect you and your family.",
    tips: [
      "Pause before you share. If it makes you very angry or scared, check it first.",
      "Search a few words from the message online to see if any trusted news site reports it.",
      "Look at the account or website: is it new, anonymous, or full of only shocking posts?",
      "Ask: \"Who benefits if I believe and share this?\"",
    ],
    lang: "en",
  },
];
