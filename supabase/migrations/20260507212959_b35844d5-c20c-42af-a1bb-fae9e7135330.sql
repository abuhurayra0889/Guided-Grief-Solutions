
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;

-- Seed KB
INSERT INTO public.kb_articles (title, state_code, category, summary, body, attorney_reviewed) VALUES
('NJ Probate Process — Step by Step','NJ','Probate','Walks through the New Jersey probate process from filing to final distribution. Designed for surviving spouses with little prior legal experience.','In New Jersey, probate begins in the County Surrogate''s Court within 10 days of death. If your spouse left a valid will, you''ll file it along with the death certificate and an application for probate. The Surrogate then issues Letters Testamentary, giving the executor authority to act. Expect the full process to take 9–18 months depending on estate complexity.', true),
('Social Security Survivor Benefits — Who Qualifies','US','Benefits','Explains eligibility for Social Security survivor benefits and how to apply. Covers age requirements and benefit calculations.','As a surviving spouse, you may qualify for Social Security survivor benefits as early as age 60, or 50 if disabled. Apply by phone at 1-800-772-1213 or in person at your local SSA office — you generally cannot apply online. Bring the death certificate, your marriage certificate, and both Social Security numbers.', true),
('NJ Inheritance Tax — What Surviving Spouses Need to Know','NJ','Financial','New Jersey eliminated the estate tax in 2018, but inheritance tax still applies. Surviving spouses are exempt.','Surviving spouses, civil union partners, and direct descendants (Class A beneficiaries) are fully exempt from New Jersey inheritance tax. However, an inheritance tax return may still be required to clear titles on real estate and certain accounts. File Form IT-R within 8 months.', true),
('Transferring Vehicle Title After Death in NJ','NJ','Financial','How to transfer a vehicle title to a surviving spouse in New Jersey. Covers MVC requirements and forms.','Visit a New Jersey MVC agency with the original title, death certificate, and a completed Affidavit of Surviving Spouse (Form BA-62) if the estate is under $50,000. Title transfer fee is $60. The vehicle does not need to go through probate if jointly titled.', false),
('Medicare Continuation for Surviving Spouses','US','Benefits','Surviving spouses retain their own Medicare eligibility but lose access to a deceased spouse''s coverage rules.','Your own Medicare benefits continue uninterrupted. However, if you were enrolled as a dependent under your spouse''s employer plan, you have COBRA rights for up to 36 months. Contact your spouse''s former HR department within 60 days.', true),
('NJ County Surrogate Court — Bergen County Guide','NJ','Probate','Practical guide to filing probate in Bergen County, including hours, fees, and what to bring.','Bergen County Surrogate''s Court is at 1 Bergen County Plaza, Hackensack. Filing fee for probate is $100 plus $5 per page over 10 pages. Bring the original will, certified death certificate, and government photo ID. Walk-ins accepted but appointments preferred.', false);

-- Seed action item templates
INSERT INTO public.action_items (title, category, status, is_template, urgent_tag) VALUES
('Order 10–15 certified copies of the death certificate','Immediate','not_started', true, 'all_of_the_above'),
('Notify Social Security Administration','Benefits','not_started', true, 'benefits_ssa'),
('File for Social Security survivor benefits','Benefits','not_started', true, 'benefits_ssa'),
('Locate the original will and contact the Surrogate''s Court','Probate','not_started', true, 'probate_estate'),
('Cancel or transfer utilities and household accounts','Housing','not_started', true, 'housing_utilities'),
('Compile a list of all financial accounts and life insurance policies','Financial','not_started', true, 'financial_accounts'),
('Schedule a session with a grief counselor or support group','Emotional','not_started', true, 'emotional_support');

-- Seed journal prompts
INSERT INTO public.journal_prompts (prompt_text, source) VALUES
('What is one thing your spouse would want you to know today?','curated'),
('Describe a memory that makes you smile, even now.','curated'),
('What feels a little lighter this week compared to last week?','curated'),
('What is one small thing you did for yourself today?','curated'),
('Write a letter to your future self — one year from now.','curated'),
('Name three people who have shown up for you recently.','curated'),
('What boundary do you need to set this week to protect your energy?','curated');

-- Seed URL monitor
INSERT INTO public.url_monitor (url, source_type, jurisdiction, topics, update_frequency, rss_available, status, confidence) VALUES
('https://www.ssa.gov/benefits/survivors','Federal Agency','Federal','Survivor benefits','Monthly', true, 'active','high'),
('https://www.irs.gov/businesses/small-businesses/estate-and-gift-taxes','Federal Agency','Federal','Estate tax, inherited IRA','Monthly', false, 'active','high'),
('https://www.medicare.gov/basics/survivor-benefits','Federal Agency','Federal','Medicare continuation','Quarterly', false, 'active','high'),
('https://www.nj.gov/treasury/taxation/inheritance-estate-tax','State Agency','NJ','NJ inheritance tax','As needed', false, 'active','high'),
('https://www.njleg.state.nj.us','State Legislature','NJ','Probate, family law bills','Weekly', true, 'active','high'),
('https://www.nj.gov/health/vital/death','State Agency','NJ','Death certificates','As needed', false, 'active','high'),
('https://www.bergencountyclerk.org','County Court','Bergen County, NJ','Probate forms','As needed', false, 'pending','medium'),
('https://www.pbgc.gov/wr/benefits/survivors','Federal Agency','Federal','Pension survivor benefits','Quarterly', false, 'active','medium');
