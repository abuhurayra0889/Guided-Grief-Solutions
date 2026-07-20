import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import forestSketch from "@/assets/faq-forest-sketch.png";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs - Guided Grief Solutions" },
      { name: "description", content: "Answers to common questions about memberships, dedicated sessions, and getting started with Guided Grief Solutions." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Everything you need to know about working with Haley." },
    ],
  }),
  component: FaqsPage,
});

type QA = { q: string; a: string };
type Group = { title: string; items: QA[] };

const groups: Group[] = [
  {
    title: "Getting started",
    items: [
      { q: "How do I get started?", a: "Begin by booking a free consultation call with Haley. From there, we'll talk through what you're navigating and recommend the resources or membership tier that fits your moment." },
      { q: "How do I book a free consultation?", a: "Use the Connect with Haley button at the top of any page, or visit the Contact page to send a short message. Haley personally responds within one to two business days." },
      { q: "Is my personal information kept confidential?", a: "Absolutely. Anything you share - by form, email, or session - stays strictly between you and Haley. We never sell, share, or publicize member information." },
    ],
  },
  {
    title: "Your membership",
    items: [
      { q: "What is included in my membership?", a: "Members receive the full Resource Library, curated legal and financial roadmaps, journaling prompts, monthly group reflections, and priority access to Haley's calendar." },
      { q: "How much does a membership cost?", a: "Plans start at a gentle monthly rate with the option to pause or cancel at any time. Full pricing is shared on your consultation call so we can match you with the right tier." },
      { q: "Can I change my membership plan later?", a: "Yes - you can upgrade, downgrade, pause, or cancel from your account at any time. Grief is not linear, and your plan should be able to move with you." },
      { q: "How do I access my resources after becoming a member?", a: "You'll receive a personal welcome email with login details. All resources live in your member dashboard and are available on any device, day or night." },
    ],
  },
  {
    title: "Your dedicated sessions",
    items: [
      { q: "How do I book a dedicated session with Haley?", a: "Members can book sessions directly from the dashboard scheduling page. You'll see Haley's live availability and can choose a time that works for you." },
      { q: "How do I join the Zoom meeting(s)?", a: "A Zoom link is included in your booking confirmation and sent again as a reminder thirty minutes before the session. Simply click the link to join - no account required." },
    ],
  },
  {
    title: "About you",
    items: [
      { q: "What if I'm feeling too overwhelmed to start?", a: "That is exactly the right reason to reach out. You don't need a plan, energy, or the right words - just send a short note and Haley will meet you where you are." },
      { q: "I've been a widow for a long time. Will I still find value here?", a: "Yes. Grief shifts, and the questions that surface years after a loss are often the deepest. Members at every stage of the journey find belonging here." },
      { q: "I'm finding it hard to focus right now. Will these resources be too much for me?", a: "Everything is designed for grieving minds - short readings, gentle prompts, and bite-sized steps. There is no pressure to consume it all, and nothing is timed." },
      { q: "Is this site exclusively for widows or does it offer general grief support?", a: "Our core programming is built for widows, but anyone navigating significant loss is welcome in the Resource Library and free guides." },
    ],
  },
];

function FaqItem({ q, a }: QA) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] sm:text-base text-foreground/90 leading-snug">{q}</span>
        <span className="shrink-0 text-primary/80">
          {open ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FaqGroup({ group }: { group: Group }) {
  return (
    <section className="mb-14">
      <h2 className="font-display text-2xl sm:text-[28px] text-foreground/90 mb-4">{group.title}</h2>
      <div>
        {group.items.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </div>
    </section>
  );
}

function FaqsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <DemoBadge />
      <SiteNav />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-4 pb-2 text-xs tracking-wide text-muted-foreground">
        <Link to="/" className="underline underline-offset-4 hover:text-primary">Home</Link>
        <span className="mx-2">·</span>
        <span>FAQs</span>
      </div>

      <header className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-14 pb-10 sm:pb-16 text-center border-b border-border/40">
        <h1 className="font-display text-4xl sm:text-6xl text-foreground/90">Frequently Asked Questions</h1>
      </header>

      <main className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
        {groups.map((g) => (
          <FaqGroup key={g.title} group={g} />
        ))}
      </main>

      <section className="max-w-6xl mx-auto px-6 sm:px-8 pb-20">
        <div className="rounded-2xl bg-[oklch(0.92_0.02_85)] px-8 sm:px-14 py-10 sm:py-14 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left order-2 md:order-1">
            <h3 className="font-display text-2xl sm:text-3xl text-foreground/90">Still have questions? Let's connect.</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              No pressure. No commitment.<br />
              Just a simple conversation whenever you're ready.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-6 rounded-full bg-primary px-8 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary-foreground hover:bg-primary-dark transition-colors"
            >
              Contact me
            </Link>
          </div>
          <div className="order-1 md:order-2 md:w-1/3 flex justify-center">
            <img src={forestSketch} alt="" loading="lazy" width={768} height={576} className="max-w-[220px] md:max-w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="bg-[#f1ece1] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="rounded-2xl bg-[repeating-conic-gradient(#e5e5e5_0deg_90deg,#f5f5f5_90deg_180deg)] bg-[length:24px_24px] aspect-[4/3] w-full" aria-hidden />
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
              Clarity when you need it most
            </h2>
            <p className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-md">
              Guided Grief Solutions can help you navigate your new path by turning complex administrative and emotional hurdles into simple, manageable steps, so you can focus on healing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
              >
                Get Started <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
