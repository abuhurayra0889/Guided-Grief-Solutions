# 5 PM-grade ideas to make the Control Tower feel real for Nidhi

The current admin has the bones (Agents, AI usage, Knowledge, Integrations) but it reads like a settings panel, not a product. To make the client *feel* the value of the agentic framework, we should add 5 capability areas that together tell a story: **"Here is how AI runs grief-care safely, at scale, with a human in the loop."**

Each idea below = a new top-level admin section with multiple pages so the sidebar fills out and the demo has somewhere to click.

---

## 1. Conversations & Inbox (the "human-in-the-loop" story)

A live feed of every Navigator/Journal Companion conversation, the way Intercom or Front shows support tickets — but for AI sessions.

Pages:
- `/admin/conversations` — list of all user sessions: who, agent, last message, sentiment chip (calm / anxious / crisis), flagged badge, duration, tokens.
- `/admin/conversations/$id` — full transcript + side panel showing agent's reasoning trace, KB citations used, model + cost for that session, and a **"Take over"** / **"Add note for Sarah"** action (mocked).
- `/admin/conversations/flagged` — filtered queue: anything the safety classifier raised (self-harm mentions, legal questions, complaints).

Why it matters: shows the client GGS is not a black box — staff can read, audit, and intervene.

---

## 2. Safety & Trust Center

Grief care is sensitive. A dedicated section signals "we take this seriously."

Pages:
- `/admin/safety/guardrails` — toggleable rules: crisis-keyword detection, medical-advice block, profanity, off-topic redirect. Each shows trigger count last 7d.
- `/admin/safety/escalations` — log of every time an agent handed off to a human or surfaced a hotline (988, etc.).
- `/admin/safety/audit-log` — immutable feed of every prompt, model response, and admin action with timestamps (compliance/SOC-2 vibe).
- `/admin/safety/policies` — versioned system prompts and content policies with diff view between versions.

Why it matters: any healthcare-adjacent buyer asks "what about safety?" first. We answer it on screen.

---

## 3. Content Studio (the "editor" experience)

Right now Knowledge feels like a list. Make it feel like a CMS.

Pages:
- `/admin/content/articles` — full grid of articles with status (draft / in review / published), author, last edited, views, "helpful" rating.
- `/admin/content/articles/$id` — markdown editor preview + AI-suggested improvements panel (Knowledge Curator agent) + "Used by Navigator X times" stat.
- `/admin/content/journal-prompts` — already exists, move under here and add categories, A/B variant column, completion rate.
- `/admin/content/email-templates` — onboarding day-1, day-7, day-30 sequences with open/click rates.
- `/admin/content/calendar` — weekly editorial calendar showing what gets published / sent.

Why it matters: Nidhi's team will be the editors. They need to see themselves in the product.

---

## 4. Cohorts & Insights (the "analytics" story beyond AI usage)

We have AI usage. We're missing **product** analytics.

Pages:
- `/admin/insights/overview` — north-star KPIs: active widows, day-7 retention, journal entries / user, sessions ending in "calm" sentiment.
- `/admin/insights/cohorts` — retention table by signup week, by referral source, by grief-stage on onboarding.
- `/admin/insights/funnel` — Sign-up → Onboarding → First chat → First journal → Day 7 active.
- `/admin/insights/themes` — auto-clustered topics widows are talking about this week (loneliness ▲, finances ▼, sleep →) — sourced from the Insights Analyst agent.
- `/admin/insights/sentiment` — sentiment trend line per cohort.

Why it matters: this is what an executive opens on Monday morning. It justifies budget.

---

## 5. Operations Workbench (the "running the business" layer)

The plumbing tab — but presented as a workbench, not settings.

Pages:
- `/admin/ops/team` — staff users with roles (Owner, Editor, Reviewer, Support), invites, last active.
- `/admin/ops/roles` — role matrix: who can publish content, take over chats, edit guardrails.
- `/admin/ops/billing` — plan, model spend MTD vs budget, alert thresholds.
- `/admin/ops/api-keys` — outbound + inbound keys (mocked) with last-rotated date.
- `/admin/ops/notifications` — what triggers Slack/email alerts (crisis flag, source down, budget 80%).
- `/admin/ops/changelog` — internal release notes feed so the team can see what shipped each week.

Why it matters: closes the "is this a real product or a prototype?" question. Multi-user, governed, monitored.

---

## Sidebar after this work

```text
Operations          Agentic framework      Knowledge / Content      Conversations
  Overview            Agents                 Articles                 All sessions
  Insights            AI models              Journal prompts          Flagged
  Cohorts             AI usage               Email templates          Transcript view
  Funnel              Memory                 Calendar
  Themes
                                          Safety & Trust           Ops Workbench
Integrations                                Guardrails               Team
  Integrations                              Escalations              Roles
  MCP servers                               Audit log                Billing
  URL monitor                               Policies                 API keys
                                                                     Notifications
                                                                     Changelog
```

That's ~25 pages total — enough that scrolling the sidebar tells the story by itself.

---

## How to scope the next build

All of this is still **pure mock** (no DB, no real AI). I'd suggest implementing in this order so the demo gets stronger fastest:

1. **Conversations & Inbox** (highest "wow", shows the AI in action)
2. **Safety & Trust Center** (de-risks the buyer's #1 objection)
3. **Cohorts & Insights** (executive view)
4. **Content Studio** (the editor's daily home)
5. **Operations Workbench** (rounds it out)

## Question before I build

Do you want me to ship **all 5 sections** in one pass (big diff, ~25 new pages), or **just sections 1 + 2** first (Conversations + Safety) so you can show Nidhi something tight and decide if she wants the rest? My recommendation: **all 5**, because the value of this exercise is the *fullness* of the sidebar.
