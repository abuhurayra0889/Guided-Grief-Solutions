// Pure mock data layer for the GGS prototype demo.
// All "DB" reads/writes go through mockStore.ts which wraps these seeds.

export type ActionItem = {
  id: string;
  title: string;
  category: string;
  state_code: string;
  status: "not_started" | "in_progress" | "done";
  urgent_tag?: string;
};

export type JournalEntry = {
  id: string;
  created_at: string;
  content: string;
  mood: string;
  prompt_used?: string;
};

export type JournalPrompt = {
  id: string;
  prompt_text: string;
  source: "curated" | "ai";
  active: boolean;
  grief_stage?: string | null;
};

export type KbArticle = {
  id: string;
  title: string;
  state_code: string;
  category: string;
  summary: string;
  body: string;
  attorney_reviewed: boolean;
  published: boolean;
  updated_at: string;
};

export type AdminUser = {
  id: string;
  full_name: string;
  email: string;
  state_code: string;
  loss_date: string;
  grief_stage: string;
  created_at: string;
  last_active: string;
  status: "active" | "inactive";
};

export type EmailCapture = {
  id: string;
  email: string;
  source: string;
  created_at: string;
};

export type NavigatorSession = {
  id: string;
  user_name: string;
  messages: number;
  last_active: string;
  topic: string;
};

export type UrlMonitorRow = {
  id: string;
  url: string;
  source_type: string;
  jurisdiction: string;
  topics: string;
  update_frequency: string;
  rss_available: boolean;
  rss_url?: string;
  status: "active" | "pending" | "broken";
  confidence: "high" | "medium" | "low";
  last_checked: string | null;
  notes?: string;
  tier: 1 | 2;
};

export type DemoProfile = {
  id: string;
  full_name: string;
  email: string;
  loss_date: string;
  state_code: string;
  grief_stage: string;
  urgent_needs: string[];
};

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};
const dateAgo = (n: number) => daysAgo(n).slice(0, 10);

export const seedProfile: DemoProfile = {
  id: "demo-user",
  full_name: "Sarah Mitchell",
  email: "sarah@example.com",
  loss_date: dateAgo(47),
  state_code: "NJ",
  grief_stage: "finding_footing",
  urgent_needs: ["probate_estate", "benefits_ssa", "financial_accounts"],
};

export const seedActionItems: ActionItem[] = [
  { id: "a1", title: "Order 10–15 certified copies of the death certificate", category: "Immediate", state_code: "NJ", status: "done" },
  { id: "a2", title: "Notify Social Security Administration", category: "Benefits", state_code: "NJ", status: "done" },
  { id: "a3", title: "Locate the original will", category: "Probate", state_code: "NJ", status: "done" },
  { id: "a4", title: "File with Bergen County Surrogate's Court", category: "Probate", state_code: "NJ", status: "in_progress" },
  { id: "a5", title: "Submit life insurance claim", category: "Financial", state_code: "NJ", status: "in_progress" },
  { id: "a6", title: "Notify employer HR - survivor benefits", category: "Benefits", state_code: "NJ", status: "not_started" },
  { id: "a7", title: "Transfer utilities into your name", category: "Housing", state_code: "NJ", status: "not_started" },
  { id: "a8", title: "Update auto insurance & vehicle title", category: "Financial", state_code: "NJ", status: "not_started" },
  { id: "a9", title: "Schedule attorney consult for trust review", category: "Probate", state_code: "NJ", status: "not_started" },
  { id: "a10", title: "Cancel or transfer subscriptions in spouse's name", category: "Financial", state_code: "NJ", status: "not_started" },
];

export const seedJournalEntries: JournalEntry[] = [
  { id: "j1", created_at: daysAgo(1), mood: "🙂", content: "Made it through the surrogate court appointment. The clerk was kinder than I expected. Came home and slept for three hours.", prompt_used: "What surprised you today?" },
  { id: "j2", created_at: daysAgo(3), mood: "😐", content: "The kids asked about Dad's tools in the garage. We sat with them for a while. I don't know what to keep.", prompt_used: "What is one small thing you are holding onto?" },
  { id: "j3", created_at: daysAgo(6), mood: "😔", content: "Bad day. Got a piece of mail addressed to him and lost it for an hour. Took a walk. Came back. Made tea.", prompt_used: "What helped you get through today?" },
  { id: "j4", created_at: daysAgo(10), mood: "🙂", content: "Cooked his lasagna recipe for the first time. The kids said it was right. Felt close to him.", prompt_used: "When did you feel love today?" },
  { id: "j5", created_at: daysAgo(14), mood: "😊", content: "Met with Haley. She walked me through the next 30 days. I have a checklist. I can do this.", prompt_used: "What gave you hope today?" },
];

export const seedJournalPrompts: JournalPrompt[] = [
  { id: "p1", prompt_text: "What is one small thing that brought you comfort today?", source: "curated", active: true, grief_stage: null },
  { id: "p2", prompt_text: "What surprised you today - good or hard?", source: "curated", active: true, grief_stage: "finding_footing" },
  { id: "p3", prompt_text: "Write a memory you don't want to lose.", source: "curated", active: true, grief_stage: null },
  { id: "p4", prompt_text: "What is one thing you accomplished, no matter how small?", source: "curated", active: true, grief_stage: "just_happened" },
  { id: "p5", prompt_text: "If you could say one thing to them right now, what would it be?", source: "curated", active: true, grief_stage: null },
  { id: "p6", prompt_text: "What do you need more of this week?", source: "ai", active: true, grief_stage: "rebuilding" },
  { id: "p7", prompt_text: "Who showed up for you today, and how?", source: "curated", active: true, grief_stage: null },
];

export const seedKbArticles: KbArticle[] = [
  {
    id: "k1",
    title: "Filing for Social Security Survivor Benefits",
    state_code: "US",
    category: "Benefits",
    summary: "What surviving spouses need to know about SSA survivor benefits, eligibility, and the application process.",
    body: `As a surviving spouse, you may be eligible for monthly survivor benefits from the Social Security Administration if your spouse worked and paid into Social Security.\n\nWho qualifies:\n• Widows and widowers age 60 or older (50 if disabled)\n• Surviving spouses caring for a child under 16\n• Dependent children under 18\n\nWhat you'll need:\n• Certified death certificate\n• Your spouse's Social Security number\n• Your marriage certificate\n• Birth certificates for any dependent children\n\nHow to apply:\nYou cannot apply for survivor benefits online. You must call SSA at 1-800-772-1213 or visit your local Social Security office. Schedule the appointment as soon as you have the documents above.`,
    attorney_reviewed: true, published: true, updated_at: daysAgo(12),
  },
  {
    id: "k2",
    title: "New Jersey Probate: A Step-by-Step Guide",
    state_code: "NJ",
    category: "Probate",
    summary: "Probate in NJ takes 9–18 months. Here's what to expect, county by county.",
    body: `New Jersey probate begins at your county Surrogate's Court. If your spouse left a will, you must file within a reasonable period - most counties expect filing within 60 days.\n\nThe steps:\n1. Locate the original will (a copy is not sufficient)\n2. Schedule an appointment with the Surrogate's Court\n3. Bring the death certificate, the will, and identification\n4. Pay the filing fee (typically $100–$200 depending on county)\n5. Receive Letters Testamentary, which give you legal authority as Executor\n\nAfter probate is opened, you'll need to inventory assets, notify creditors, file a final tax return, and ultimately distribute assets to beneficiaries.`,
    attorney_reviewed: true, published: true, updated_at: daysAgo(8),
  },
  {
    id: "k3",
    title: "Bergen County Surrogate's Court - Practical Tips",
    state_code: "NJ", category: "Probate",
    summary: "What to expect at your Bergen County Surrogate appointment, and how to prepare.",
    body: `The Bergen County Surrogate's Court is located in Hackensack. Appointments are required for probate matters.\n\nBefore you go:\n• Bring the original will (copies will be rejected)\n• Bring a certified death certificate\n• Bring photo ID\n• Be prepared to pay by check or money order\n\nWhat happens at the appointment:\nThe Surrogate or a deputy will review the documents, swear you in as Executor, and issue Letters Testamentary on the spot in most cases.`,
    attorney_reviewed: false, published: true, updated_at: daysAgo(20),
  },
  {
    id: "k4",
    title: "VA Survivor Benefits for Military Spouses",
    state_code: "US", category: "Benefits",
    summary: "If your spouse served, you may be eligible for Dependency and Indemnity Compensation, survivor pension, and burial benefits.",
    body: `The Department of Veterans Affairs offers several benefits for surviving spouses of veterans.\n\nDependency and Indemnity Compensation (DIC):\nA tax-free monthly benefit for surviving spouses of service members who died in the line of duty or from a service-connected condition.\n\nSurvivors Pension:\nA needs-based monthly benefit for low-income widows of wartime veterans.\n\nBurial benefits:\nVA may help with burial in a national cemetery, a headstone or marker, and a burial allowance.\n\nApply through VA.gov or call 1-800-827-1000.`,
    attorney_reviewed: true, published: true, updated_at: daysAgo(15),
  },
  {
    id: "k5",
    title: "Medicare Coverage After a Spouse's Death",
    state_code: "US", category: "Benefits",
    summary: "How losing a spouse affects your Medicare eligibility and premiums.",
    body: `If you were covered under your spouse's employer plan, you may need to enroll in Medicare during a Special Enrollment Period.\n\nKey rules:\n• If you're 65+, you have 8 months from the loss of employer coverage to enroll\n• If you're already on Medicare, your coverage continues unchanged\n• Survivor benefits from SSA may help cover Part B premiums\n\nCall 1-800-MEDICARE for personal guidance.`,
    attorney_reviewed: false, published: true, updated_at: daysAgo(25),
  },
  {
    id: "k6",
    title: "Closing or Transferring Joint Bank Accounts",
    state_code: "US", category: "Financial",
    summary: "What to do with checking, savings, and brokerage accounts held jointly with your spouse.",
    body: `Joint accounts with rights of survivorship typically pass automatically to you. Bring a certified death certificate to the bank and request the account be retitled in your name only.\n\nIf the account was solely in your spouse's name, it usually must go through probate before funds can be released.\n\nDo not close accounts immediately - automatic deposits, pension payments, and refunds may still arrive for several months.`,
    attorney_reviewed: true, published: true, updated_at: daysAgo(30),
  },
  {
    id: "k7",
    title: "Life Insurance Claims: Getting Paid Quickly",
    state_code: "US", category: "Financial",
    summary: "Most life insurance claims are paid within 30–60 days. Here's how to start.",
    body: `Contact the insurance carrier directly. You'll need:\n• A certified death certificate\n• The policy number (if known)\n• A completed claim form (the carrier will send it)\n\nIf you can't find the policy, check old tax returns, the spouse's email for premium notices, or run a search at the National Association of Insurance Commissioners' Life Insurance Policy Locator (NAIC.org).`,
    attorney_reviewed: true, published: true, updated_at: daysAgo(40),
  },
  {
    id: "k8",
    title: "New York Probate: Surrogate's Court Basics",
    state_code: "NY", category: "Probate",
    summary: "How probate works in New York State, with notes on NYC's five boroughs.",
    body: `Each New York county has its own Surrogate's Court. In New York City, each borough has a separate Surrogate's Court (New York County, Kings County, Bronx County, Queens County, Richmond County).\n\nFiling typically takes 4–9 months for uncontested estates.`,
    attorney_reviewed: false, published: true, updated_at: daysAgo(18),
  },
  {
    id: "k9",
    title: "Housing & Utilities: Transferring Accounts",
    state_code: "US", category: "Housing",
    summary: "Practical guidance for transferring or canceling accounts in your spouse's name.",
    body: `Utilities, internet, cable, mobile phone, and streaming services in your spouse's name must be transferred or canceled.\n\nMost providers accept a death certificate by email or fax. Call customer service rather than visiting in person - most agents have a dedicated bereavement process.`,
    attorney_reviewed: false, published: true, updated_at: daysAgo(45),
  },
  {
    id: "k10",
    title: "Grief Resources & Support Groups",
    state_code: "US", category: "Benefits",
    summary: "A vetted list of grief support organizations and crisis resources.",
    body: `National resources:\n• Modern Widows Club - modernwidowsclub.org\n• Soaring Spirits International - soaringspirits.org\n• GriefShare - griefshare.org\n• Hope for Widows Foundation - hopeforwidows.org\n\n24/7 crisis support:\n• 988 Suicide & Crisis Lifeline - call or text 988`,
    attorney_reviewed: false, published: true, updated_at: daysAgo(7),
  },
];

export const seedAdminUsers: AdminUser[] = [
  { id: "u1", full_name: "Sarah Mitchell", email: "sarah@example.com", state_code: "NJ", loss_date: dateAgo(47), grief_stage: "finding_footing", created_at: daysAgo(45), last_active: daysAgo(0), status: "active" },
  { id: "u2", full_name: "Linda Chen", email: "linda.chen@example.com", state_code: "NY", loss_date: dateAgo(120), grief_stage: "finding_footing", created_at: daysAgo(100), last_active: daysAgo(2), status: "active" },
  { id: "u3", full_name: "Patricia Johnson", email: "patj@example.com", state_code: "PA", loss_date: dateAgo(15), grief_stage: "just_happened", created_at: daysAgo(12), last_active: daysAgo(0), status: "active" },
  { id: "u4", full_name: "Margaret O'Brien", email: "mobrien@example.com", state_code: "MA", loss_date: dateAgo(400), grief_stage: "rebuilding", created_at: daysAgo(380), last_active: daysAgo(5), status: "active" },
  { id: "u5", full_name: "Diane Foster", email: "diane.f@example.com", state_code: "CA", loss_date: dateAgo(220), grief_stage: "rebuilding", created_at: daysAgo(200), last_active: daysAgo(1), status: "active" },
  { id: "u6", full_name: "Karen Williams", email: "kwilliams@example.com", state_code: "NJ", loss_date: dateAgo(60), grief_stage: "finding_footing", created_at: daysAgo(55), last_active: daysAgo(3), status: "active" },
  { id: "u7", full_name: "Joan Reilly", email: "joan.r@example.com", state_code: "FL", loss_date: dateAgo(30), grief_stage: "just_happened", created_at: daysAgo(28), last_active: daysAgo(0), status: "active" },
  { id: "u8", full_name: "Susan Park", email: "spark@example.com", state_code: "WA", loss_date: dateAgo(700), grief_stage: "moving_forward", created_at: daysAgo(680), last_active: daysAgo(14), status: "inactive" },
  { id: "u9", full_name: "Beverly Cox", email: "bcox@example.com", state_code: "TX", loss_date: dateAgo(180), grief_stage: "finding_footing", created_at: daysAgo(170), last_active: daysAgo(4), status: "active" },
  { id: "u10", full_name: "Helen Marquez", email: "hmarquez@example.com", state_code: "NJ", loss_date: dateAgo(8), grief_stage: "just_happened", created_at: daysAgo(7), last_active: daysAgo(0), status: "active" },
  { id: "u11", full_name: "Eleanor Wright", email: "ewright@example.com", state_code: "OH", loss_date: dateAgo(310), grief_stage: "rebuilding", created_at: daysAgo(290), last_active: daysAgo(11), status: "active" },
  { id: "u12", full_name: "Carol Bennett", email: "cbennett@example.com", state_code: "NC", loss_date: dateAgo(95), grief_stage: "finding_footing", created_at: daysAgo(85), last_active: daysAgo(2), status: "active" },
];

export const seedEmailCaptures: EmailCapture[] = [
  ...Array.from({ length: 15 }).map((_, i): EmailCapture => ({
    id: `e${i + 1}`,
    email: [
      "rebecca.l@email.com","jane.morris@email.com","aprilf@email.com","tessa@email.com",
      "donna.k@email.com","mary.b@email.com","yvonne@email.com","cathy.r@email.com",
      "lisa.t@email.com","grace.h@email.com","nora.w@email.com","brenda@email.com",
      "deb.l@email.com","amy.s@email.com","frances@email.com",
    ][i],
    source: ["landing","landing","is-there-a-will","is-there-a-trust","landing","is-there-a-will","footer","landing","footer","is-there-a-will","landing","landing","is-there-a-trust","landing","footer"][i],
    created_at: daysAgo(i + 1),
  })),
];

export const seedNavigatorSessions: NavigatorSession[] = [
  { id: "n1", user_name: "Sarah Mitchell", messages: 14, last_active: daysAgo(0), topic: "NJ probate filing" },
  { id: "n2", user_name: "Patricia Johnson", messages: 8, last_active: daysAgo(0), topic: "Social Security survivor benefits" },
  { id: "n3", user_name: "Joan Reilly", messages: 23, last_active: daysAgo(1), topic: "Death certificate copies" },
  { id: "n4", user_name: "Linda Chen", messages: 6, last_active: daysAgo(2), topic: "Joint bank accounts" },
  { id: "n5", user_name: "Helen Marquez", messages: 19, last_active: daysAgo(0), topic: "Life insurance claim" },
  { id: "n6", user_name: "Karen Williams", messages: 4, last_active: daysAgo(3), topic: "Employer HR benefits" },
];

export const seedUrlMonitor: UrlMonitorRow[] = [
  // Tier 1 - Federal
  { id: "m1", url: "https://www.ssa.gov/benefits/survivors/", source_type: "Federal Agency", jurisdiction: "Federal", topics: "Survivor benefits", update_frequency: "Monthly", rss_available: true, rss_url: "https://www.ssa.gov/news/rss/", status: "active", confidence: "high", last_checked: daysAgo(1), tier: 1 },
  { id: "m2", url: "https://www.va.gov/family-and-caregiver-benefits/", source_type: "Federal Agency", jurisdiction: "Federal", topics: "VA survivor benefits, DIC", update_frequency: "Monthly", rss_available: true, status: "active", confidence: "high", last_checked: daysAgo(1), tier: 1 },
  { id: "m3", url: "https://www.medicare.gov/", source_type: "Federal Agency", jurisdiction: "Federal", topics: "Medicare enrollment", update_frequency: "Quarterly", rss_available: false, status: "active", confidence: "high", last_checked: daysAgo(2), tier: 1 },
  { id: "m4", url: "https://www.irs.gov/individuals/survivors-executors-and-administrators", source_type: "Federal Agency", jurisdiction: "Federal", topics: "Final tax return, estate tax", update_frequency: "Quarterly", rss_available: true, status: "active", confidence: "high", last_checked: daysAgo(1), tier: 1 },
  // Tier 1 - State (NJ focus)
  { id: "m5", url: "https://www.njcourts.gov/courts/superior/surrogate", source_type: "State Court", jurisdiction: "NJ", topics: "Probate filing, Surrogate's Court", update_frequency: "Quarterly", rss_available: false, status: "active", confidence: "high", last_checked: daysAgo(3), tier: 1 },
  { id: "m6", url: "https://www.bcsurrogate.com/", source_type: "County Court", jurisdiction: "NJ - Bergen", topics: "Bergen County probate", update_frequency: "As needed", rss_available: false, status: "broken", confidence: "medium", last_checked: daysAgo(2), notes: "Site returning 502 intermittently - flagged for human review.", tier: 1 },
  { id: "m7", url: "https://www.nj.gov/treasury/taxation/inheritance-estate/inheritance.shtml", source_type: "State Agency", jurisdiction: "NJ", topics: "Inheritance tax, estate tax", update_frequency: "Quarterly", rss_available: false, status: "active", confidence: "high", last_checked: daysAgo(4), tier: 1 },
  { id: "m8", url: "https://www.nycourts.gov/courthelp/whensomeonedies/", source_type: "State Court", jurisdiction: "NY", topics: "NY probate basics", update_frequency: "Quarterly", rss_available: false, status: "active", confidence: "high", last_checked: daysAgo(5), tier: 1 },
  // Tier 2 - Nonprofits / vetted resources
  { id: "m9", url: "https://www.modernwidowsclub.org/", source_type: "Nonprofit", jurisdiction: "National", topics: "Peer support, community", update_frequency: "Monthly", rss_available: true, status: "active", confidence: "medium", last_checked: daysAgo(7), tier: 2 },
  { id: "m10", url: "https://soaringspirits.org/", source_type: "Nonprofit", jurisdiction: "National", topics: "Widow community, Camp Widow", update_frequency: "Monthly", rss_available: true, status: "active", confidence: "medium", last_checked: daysAgo(8), tier: 2 },
  { id: "m11", url: "https://www.griefshare.org/", source_type: "Nonprofit", jurisdiction: "National", topics: "Grief support groups", update_frequency: "Quarterly", rss_available: false, status: "active", confidence: "medium", last_checked: daysAgo(10), tier: 2 },
  { id: "m12", url: "https://hopeforwidows.org/", source_type: "Nonprofit", jurisdiction: "National", topics: "Widow stories, financial help", update_frequency: "Monthly", rss_available: false, status: "pending", confidence: "low", last_checked: null, notes: "Newly added - first crawl pending.", tier: 2 },
  { id: "m13", url: "https://www.aarp.org/caregiving/financial-legal/info-2018/grief-loss-spouse.html", source_type: "Media", jurisdiction: "National", topics: "Practical guidance, financial", update_frequency: "Quarterly", rss_available: true, status: "active", confidence: "medium", last_checked: daysAgo(12), tier: 2 },
  { id: "m14", url: "https://www.consumerfinance.gov/about-us/blog/managing-debt-after-the-loss-of-a-loved-one/", source_type: "Federal Agency", jurisdiction: "Federal", topics: "Debt, creditors", update_frequency: "Quarterly", rss_available: true, status: "active", confidence: "high", last_checked: daysAgo(6), tier: 1 },
];
