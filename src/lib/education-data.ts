// Year and module definitions for the 108-module curriculum
export interface ModuleDef {
  num: number;
  title: string;
}

export interface YearDef {
  year: number;
  age: number;
  theme: string;
  modules: ModuleDef[];
}

export const curriculum: YearDef[] = [
  {
    year: 1,
    age: 13,
    theme: "Money Basics",
    modules: [
      { num: 1, title: "What is Money?" },
      { num: 2, title: "Barter & Trade" },
      { num: 3, title: "History of Currency" },
      { num: 4, title: "How Banks Work" },
      { num: 5, title: "Saving vs Spending" },
      { num: 6, title: "Needs vs Wants" },
      { num: 7, title: "Your First Budget" },
      { num: 8, title: "The Power of Compounding" },
      { num: 9, title: "Digital Money & UPI" },
      { num: 10, title: "Inflation: Why Money Shrinks" },
      { num: 11, title: "Setting Financial Goals" },
      { num: 12, title: "Year 1 Review & Quiz" },
    ],
  },
  {
    year: 2,
    age: 14,
    theme: "How Markets Work",
    modules: [
      { num: 1, title: "How Banks Work" },
      { num: 2, title: "Understanding Interest Rates" },
      { num: 3, title: "Fixed Deposits & Recurring Deposits" },
      { num: 4, title: "Inflation — Why Prices Rise" },
      { num: 5, title: "The Indian Rupee Story" },
      { num: 6, title: "Digital Money & UPI" },
      { num: 7, title: "Staying Safe with Money (Scams & Security)" },
      { num: 8, title: "Introduction to the Stock Market" },
      { num: 9, title: "What Are Shares?" },
      { num: 10, title: "How Stock Prices Change" },
      { num: 11, title: "Don't Put All Eggs in One Barrel (Diversification)" },
      { num: 12, title: "Year 2 Review — My Portfolio So Far" },
    ],
  },
  {
    year: 3,
    age: 15,
    theme: "Risk & Reward",
    modules: [
      { num: 1, title: "Mutual Funds Explained Simply" },
      { num: 2, title: "SIP: Power of Regular Investing" },
      { num: 3, title: "Understanding NAV" },
      { num: 4, title: "Types of Mutual Funds" },
      { num: 5, title: "Risk vs Reward" },
      { num: 6, title: "Asset Allocation Basics" },
      { num: 7, title: "Bull and Bear Markets" },
      { num: 8, title: "Reading a Fund Factsheet" },
      { num: 9, title: "Bonds and Fixed Income" },
      { num: 10, title: "Gold, Real Estate, and Alternative Investments" },
      { num: 11, title: "Setting Financial Goals for Real" },
      { num: 12, title: "Year 3 Review: Building My Investment Knowledge" },
    ],
  },
  {
    year: 4,
    age: 16,
    theme: "Personal Finance",
    modules: [
      { num: 1, title: "Your First Bank Account" },
      { num: 2, title: "Debit vs Credit Cards" },
      { num: 3, title: "Good Debt vs Bad Debt" },
      { num: 4, title: "Credit Scores" },
      { num: 5, title: "Creating a Budget Template" },
      { num: 6, title: "Tracking Expenses" },
      { num: 7, title: "Setting Up Auto-Save" },
      { num: 8, title: "Financial Apps Review" },
      { num: 9, title: "Part-time Income" },
      { num: 10, title: "Goal-Based Investing" },
      { num: 11, title: "Net Worth Calculation" },
      { num: 12, title: "Year 4 Review & Quiz" },
    ],
  },
  {
    year: 5,
    age: 17,
    theme: "Taxes & Law in India",
    modules: [
      { num: 1, title: "What is Income Tax?" },
      { num: 2, title: "Tax Slabs Explained" },
      { num: 3, title: "GST Basics" },
      { num: 4, title: "TDS & TCS" },
      { num: 5, title: "Tax Deductions for Young Adults" },
      { num: 6, title: "Filing Your First ITR" },
      { num: 7, title: "Capital Gains Tax" },
      { num: 8, title: "Tax on Inheritance & Gifts" },
      { num: 9, title: "PAN & Aadhaar Link" },
      { num: 10, title: "Contracts & Legal Basics" },
      { num: 11, title: "Your Rights as a Consumer" },
      { num: 12, title: "Year 5 Review & Quiz" },
    ],
  },
  {
    year: 6,
    age: 18,
    theme: "Investing as an Adult",
    modules: [
      { num: 1, title: "Opening a Demat Account" },
      { num: 2, title: "Building Your Portfolio" },
      { num: 3, title: "Value vs Growth Investing" },
      { num: 4, title: "Dollar-Cost Averaging" },
      { num: 5, title: "Real Estate Investing" },
      { num: 6, title: "Gold & Commodities" },
      { num: 7, title: "Fixed Deposits & PPF" },
      { num: 8, title: "National Pension System" },
      { num: 9, title: "Investing in Startups" },
      { num: 10, title: "International Investing" },
      { num: 11, title: "Portfolio Rebalancing" },
      { num: 12, title: "Year 6 Review & Quiz" },
    ],
  },
  {
    year: 7,
    age: 19,
    theme: "Advanced Topics",
    modules: [
      { num: 1, title: "Options & Futures Basics" },
      { num: 2, title: "Leverage & Margin" },
      { num: 3, title: "Reading Financial Statements" },
      { num: 4, title: "Ratio Analysis" },
      { num: 5, title: "Macroeconomics for Investors" },
      { num: 6, title: "Currency Exchange Rates" },
      { num: 7, title: "The RBI & Monetary Policy" },
      { num: 8, title: "Global Markets & India" },
      { num: 9, title: "ESG Investing" },
      { num: 10, title: "Algorithmic Trading Intro" },
      { num: 11, title: "Wealth Management Basics" },
      { num: 12, title: "Year 7 Review & Quiz" },
    ],
  },
  {
    year: 8,
    age: 20,
    theme: "Wealth Management",
    modules: [
      { num: 1, title: "Trusts & Estate Planning" },
      { num: 2, title: "Philanthropy & Giving" },
      { num: 3, title: "Business Finance Basics" },
      { num: 4, title: "Angel Investing" },
      { num: 5, title: "Real Estate Portfolios" },
      { num: 6, title: "Tax Optimization Strategies" },
      { num: 7, title: "Risk-Adjusted Returns" },
      { num: 8, title: "Inflation-Protected Investing" },
      { num: 9, title: "Family Wealth Preservation" },
      { num: 10, title: "Impact Investing" },
      { num: 11, title: "Wealth Transfer Planning" },
      { num: 12, title: "Year 8 Review & Quiz" },
    ],
  },
  {
    year: 9,
    age: 21,
    theme: "Life After the Trust",
    modules: [
      { num: 1, title: "Receiving Your Trust" },
      { num: 2, title: "First Financial Decisions" },
      { num: 3, title: "Investing Lump Sums" },
      { num: 4, title: "Buying vs Renting" },
      { num: 5, title: "Starting a Business" },
      { num: 6, title: "Career Investments" },
      { num: 7, title: "Marriage & Joint Finances" },
      { num: 8, title: "Teaching Kids About Money" },
      { num: 9, title: "Creating Your Own Trust" },
      { num: 10, title: "Legacy & Purpose" },
      { num: 11, title: "Financial Independence" },
      { num: 12, title: "Final Review & Graduation" },
    ],
  },
];

// Quiz questions per module (sample — Module 1 full, rest skeleton)
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ModuleQuiz {
  year: number;
  module: number;
  questions: QuizQuestion[];
}

export function getQuizForModule(year: number, moduleNum: number): ModuleQuiz | null {
  if (year === 1 && moduleNum === 1) {
    return {
      year: 1,
      module: 1,
      questions: [
        {
          question: "What is the primary purpose of money?",
          options: [
            "To be hoarded",
            "A medium of exchange",
            "To impress others",
            "To collect as hobby",
          ],
          correctIndex: 1,
        },
        {
          question: "What did people use before money?",
          options: [
            "Credit cards",
            "Digital wallets",
            "Barter system",
            "Bank transfers",
          ],
          correctIndex: 2,
        },
        {
          question: "Which of these is NOT a characteristic of good money?",
          options: [
            "Durability",
            "Divisibility",
            "Portability",
            "Fragility",
          ],
          correctIndex: 3,
        },
        {
          question: "What gives modern currency its value?",
          options: [
            "It's made of gold",
            "Government trust and legal tender laws",
            "It's beautiful",
            "It's rare",
          ],
          correctIndex: 1,
        },
        {
          question: "UPI stands for:",
          options: [
            "Universal Payment Index",
            "United Payment Interface",
            "Unified Payments Interface",
            "Universal Payment Integration",
          ],
          correctIndex: 2,
        },
      ],
    };
  }

  // Generate generic quiz for other modules
  return {
    year,
    module: moduleNum,
    questions: [
      {
        question: `What is the most important concept in this module?`,
        options: [
          "Understanding the basics",
          "Applying knowledge practically",
          "Reviewing regularly",
          "All of the above",
        ],
        correctIndex: 3,
      },
      {
        question: `Which statement best applies to this module's topic?`,
        options: [
          "It's too complex for most people",
          "It's only relevant for the wealthy",
          "It's essential knowledge for financial literacy",
          "It doesn't matter much",
        ],
        correctIndex: 2,
      },
      {
        question: `How can you apply this module's lessons?`,
        options: [
          "In daily financial decisions",
          "Only when investing",
          "Only for exams",
          "It doesn't apply to real life",
        ],
        correctIndex: 0,
      },
      {
        question: `What should you do after learning this module?`,
        options: [
          "Forget it",
          "Practice the concepts",
          "Wait until you need it",
          "Nothing",
        ],
        correctIndex: 1,
      },
      {
        question: `Why is this module important?`,
        options: [
          "It builds foundational knowledge",
          "It's required for school",
          "It makes you rich instantly",
          "It doesn't matter",
        ],
        correctIndex: 0,
      },
    ],
  };
}
