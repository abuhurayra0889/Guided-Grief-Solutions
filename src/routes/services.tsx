import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Check, Plus, Minus, X } from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import mountainWatercolor from "@/assets/mountain-linedrawing.png.asset.json";
import leafIconSvg from "@/assets/icons/1-leaf.svg";
import mapleLeafSvg from "@/assets/icons/maple_leaf.svg";
import sproutSvg from "@/assets/icons/sprout.svg";

const selfGuidedIcons: Record<string, string> = {
  "first-steps": leafIconSvg,
  "healing-within": mapleLeafSvg,
  "care-around-her": sproutSvg,
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Packages - Guided Grief Solutions" },
      { name: "description", content: "Support and strategies to lessen the administrative burden and help you heal - choose self-guided or guided by Haley." },
      { property: "og:title", content: "Services & Packages - Guided Grief Solutions" },
      { property: "og:description", content: "Find the right level of support for where you are in your grief journey." },
    ],
  }),
  component: ServicesPage,
});

type DetailItem = { lead: string; rest?: string };

type Tier = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  emphasis?: boolean;
  highlight?: boolean;
  intro?: string;
  features: string[];
  outro?: string;
  cta: { label: string; to?: "/auth" | "/contact"; href?: string };
  secondary?: { label: string; href: string };
  details?: {
    tagline: string;
    ctaLabel: string;
    items: DetailItem[];
  };
};

const detailsById: Record<string, Tier["details"]> = {
  "first-steps": {
    tagline: "Best for those seeking quiet clarity and reassurance in the earliest moments.",
    ctaLabel: "Download Free",
    items: [
      { lead: "A thoughtfully structured early-phase roadmap", rest: "for the first 90 days, bringing clarity to what needs attention and when" },
      { lead: "Step-by-step prioritization of urgent, time-sensitive tasks,", rest: "helping you focus on what truly needs to be handled first" },
      { lead: "Tailored pathways based on the estate structure", rest: "and whether there is a will, trust, both or nothing in place" },
      { lead: "Clear direction on what to do in the first days and weeks", rest: "designed to minimize stress and keep you grounded" },
      { lead: "Essential guidance about key administrative responsibilities", rest: "such as notifications, documentation, and financial access" },
      { lead: "A steady, grounding starting point", rest: "to help reduce uncertainty and provide a sense of control during an otherwise overwhelming time" },
    ],
  },
  "healing-within": {
    tagline: "For those ready to nurture themselves with intention and gentle daily rhythms.",
    ctaLabel: "Get Started",
    items: [
      { lead: "A holistic approach to well-being", rest: "that weaves emotional, physical, and spiritual care into your day" },
      { lead: "Full access to a curated library of 20+ holistic healing resources", rest: "carefully chosen to support each stage of grief" },
      { lead: "Morning ritual recommendations", rest: "to start the day with calm intention and grounded presence" },
      { lead: "Mid-day ritual recommendations", rest: "to gently reset and create space for what your body needs" },
      { lead: "Evening ritual recommendations", rest: "to ease the nervous system and prepare for restorative sleep" },
      { lead: "Guidance on proven products", rest: "that create a calming, restorative space in your home" },
    ],
  },
  "care-around-her": {
    tagline: "A meaningful way for loved ones to show up with intention and care.",
    ctaLabel: "Gift This",
    items: [
      { lead: "Essential grounding practices for the primary caretaker", rest: "so they can offer steady support without losing themselves" },
      { lead: "Thoughtful gift suggestions", rest: "tailored to where she is in her grief and what brings real comfort" },
      { lead: "Curated ideas for young children, preteens & teens", rest: "to help them process loss in age-appropriate, gentle ways" },
      { lead: "Communication guidance & suggestions", rest: "for what to say, what to avoid, and how to simply be present" },
      { lead: "Guidance on the role of the primary caretaker/supporter", rest: "with clear boundaries that protect everyone's well-being" },
      { lead: "Legal guidance for the primary caretaker/supporter", rest: "so they can help navigate paperwork without overstepping" },
    ],
  },
  "discovery-call": {
    tagline: "A free, low-pressure conversation to help you find your next right step.",
    ctaLabel: "Book a Free Call",
    items: [
      { lead: "A relaxed, no-pressure conversation", rest: "where you set the pace and share only what feels right" },
      { lead: "A chance to share what's weighing on you", rest: "with someone who has walked this path with others before" },
      { lead: "Honest guidance on the right next step", rest: "whether that's with Haley or somewhere else entirely" },
      { lead: "Clarity on which path fits you best", rest: "based on your situation, season of life, and current needs" },
    ],
  },
  "one-on-one": {
    tagline: "Personal, paced 1:1 guidance from someone who has walked this road.",
    ctaLabel: "Get Started",
    items: [
      { lead: "Private, focused 60-minute sessions", rest: "held in a calm, confidential space tailored to you" },
      { lead: "A tailored roadmap for your unique situation", rest: "built around your timeline, family structure, and priorities" },
      { lead: "Practical and emotional support side by side", rest: "so logistics and grief are never handled in isolation" },
      { lead: "Tools and rituals matched to your pace", rest: "with gentle adjustments as your needs shift week to week" },
      { lead: "Follow-up notes after every session", rest: "so nothing important slips through and you stay oriented" },
      { lead: "Email check-ins between sessions", rest: "for quick questions or reassurance when you need it most" },
    ],
  },
  "guided-journey": {
    tagline: "Comprehensive, ongoing care for the whole of your grief journey.",
    ctaLabel: "Apply Now",
    items: [
      { lead: "Weekly 1:1 sessions with Haley", rest: "to maintain steady momentum and accountability over time" },
      { lead: "Unlimited messaging between sessions", rest: "so you're never alone with a hard moment or pressing decision" },
      { lead: "Full access to the holistic resource library", rest: "with personalized recommendations based on your sessions" },
      { lead: "Personalized morning, mid-day & evening rituals", rest: "designed around your home, schedule, and energy" },
      { lead: "Care plan for your wider support circle", rest: "so the people around you know how to show up well" },
      { lead: "Priority booking and gentle accountability", rest: "to help you stay connected to the path you've chosen" },
    ],
  },
};

const selfGuided: Tier[] = [
  {
    id: "first-steps",
    title: "The First Steps",
    subtitle: "Clarity in the earliest days",
    price: "Free",
    features: [
      "A thoughtfully structured early-phase roadmap",
      "Step-by-step prioritization of urgent, time-sensitive tasks",
      "Tailored pathways based on the estate structure",
      "Clear direction on what to do in the first days and weeks",
      "Essential guidance about key administrative responsibilities",
      "A steady, grounding starting point",
    ],
    cta: { label: "Get Started", to: "/auth" },
  },
  {
    id: "care-around-her",
    title: "The Care Around Her: For Her Support System",
    subtitle: "Organized, meaningful support from her people",
    price: "$149.99",
    highlight: true,
    
    features: [
      "Guidance for the care around her",
      "Thoughtful gift suggestions for her",
      "Carefully curated ideas for young children, preteens and teens",
      "Gentle communication guidance and suggestions",
      "Clear guidance on the role of the primary caretaker/supporter",
      "Essential grounding practices to help the primary caretaker/supporter",
      "Legal guidance for the primary caretaker/supporter",
    ],
    outro: "Best for those who want to provide a widow with meaningful, sustained, timely support",
    cta: { label: "Get Started", to: "/auth" },
  },
  {
    id: "healing-within",
    title: "The Healing Within",
    subtitle: "Healing from within, at your own pace",
    price: "$249.99",
    emphasis: true,
    intro: "Full access to all resources, guidance and support found in The First Steps",
    features: [
      "A holistic approach to well-being",
      "Full access to a carefully curated library of 20+ holistic healing resources",
      "Morning ritual recommendations",
      "Mid-day ritual recommendations",
      "Evening ritual recommendations",
      "Guidance on proven products that create a calming, restorative space",
    ],
    outro: "Best for those seeking an elevated pathway to inner restoration and overall well-being.",
    cta: { label: "Get started", to: "/auth" },
  },
];

const guidedByHaley: Tier[] = [
  {
    id: "guided",
    title: "Guided",
    subtitle: "Personalized direction that meets you where you are",
    price: "Pricing based on your individual needs",
    intro: "Full access to all resources, guidance and support found in The First Steps",
    features: [
      "A customized administrative roadmap",
      "60 minutes of dedicated, 1:1 solutioning with Haley",
      "Targeted administrative guidance and clear direction on next steps",
      "Two (2) thoughtfully chosen grief support articles",
    ],
    outro: "Best for those seeking a personalized plan with light guidance along the way.",
    cta: { label: "Get started", to: "/contact" },
  },
  {
    id: "supported",
    title: "Supported",
    subtitle: "Carefully selected resources and curated guidance",
    price: "Pricing based on your individual needs",
    emphasis: true,
    intro: "Full access to all resources, guidance and support found in The First Steps",
    features: [
      "A personalized administrative roadmap",
      "Two (2) 60 minute 1:1 solutioning sessions with Haley",
      "A curated collection of articles aligned to your priorities and immediate needs",
      "Two (2) holistic healing articles",
      "Three (3) thoughtfully chosen grief support articles",
    ],
    outro: "Best for those seeking meaningful support and personalized guidance on the path forward.",
    cta: { label: "Get started", to: "/contact" },
  },
  {
    id: "held",
    title: "Held",
    subtitle: "Full support, every step of the way",
    price: "Pricing based on your individual needs",
    highlight: true,
    intro: "Full access to all resources, guidance and support found in The First Steps",
    features: [
      "A personalized administrative roadmap",
      "Three (3) 60 minute 1:1 solutioning sessions with Haley",
      "Full access to a curated library of resources",
      "Three (3) holistic healing articles",
      "Four (4) thoughtfully chosen grief support articles",
    ],
    outro: "Best for those seeking the highest level of personalized guidance, access and support.",
    cta: { label: "Get started", to: "/contact" },
  },
];

const faqs = [
  {
    q: "How does Guided Grief Solutions work?",
    a: "We meet you where you are. Start with a free guide, choose a self-guided package, or book a free 30-minute call with Haley to talk through what would help most. From there, you'll have a clear next step - whether that's a curated resource library, ongoing 1:1 sessions, or support for the people around you.",
  },
  {
    q: 'What does "Pricing based on individual needs" mean?',
    a: "Every grief journey is different. Rather than forcing one-size-fits-all packages, we offer a few clear tiers and a free conversation so you can choose what fits your situation and your budget - with no pressure to upgrade.",
  },
  {
    q: "How is my personal information handled?",
    a: "Your information stays private. We never share or sell anything you tell us. Sessions, intake forms, and journal entries are kept confidential and only used to support your care.",
  },
  {
    q: "What happens after I book a free call?",
    a: "You'll get a short confirmation with a calendar link and one or two gentle questions so Haley can prepare. On the call itself, there's no script - just space to talk, ask questions, and decide together if and how to move forward.",
  },
  {
    q: "How is this different from a grief support group?",
    a: "Support groups offer community and shared experience, which can be deeply valuable. Guided Grief Solutions is one-on-one and practical - combining emotional support with concrete guidance on the logistics, decisions, and rituals that come with loss.",
  },
];

function ServicesPage() {
  const [tab, setTab] = useState<"self" | "haley">("self");
  const [openTier, setOpenTier] = useState<Tier | null>(null);
  const tiers = tab === "self" ? selfGuided : guidedByHaley;

  return (
    <div className="bg-background min-h-screen">
      <DemoBadge />
      <SiteNav />

      {/* Breadcrumb */}
      <div className="bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-5 pb-2">
          <nav className="text-[12px] tracking-wide text-muted-foreground flex items-center gap-2">
            <Link to="/" className="text-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground/60">·</span>
            <span>Services &amp; Packages</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-background pt-10 md:pt-14 pb-2">
        <div className="max-w-3xl mx-auto px-6 text-center">
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] text-foreground leading-[1.05] tracking-tight">
            Find the level of support that’s right for you
          </h1>
          <p className="mt-6 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
            No guesswork. No hidden fees.<br />
            Just straightforward support tailored to specific unique needs.
          </p>
        </div>
      </section>

      {/* Tab toggle */}
      <section className="bg-background pt-10 md:pt-14">
        <div className="max-w-6xl mx-auto px-6 md:px-10 flex justify-center">
          <div className="inline-flex items-center rounded-full bg-[#f1ece1] p-1.5 border border-foreground/10">
            <button
              type="button"
              onClick={() => setTab("self")}
              className={`rounded-full px-7 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors ${
                tab === "self"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Self-Guided
            </button>
            <button
              type="button"
              onClick={() => setTab("haley")}
              className={`rounded-full px-7 py-2.5 text-[11px] font-semibold tracking-[0.22em] uppercase transition-colors ${
                tab === "haley"
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              Guided by Haley
            </button>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="bg-background pt-10 md:pt-14 pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-3 gap-6 md:gap-7 items-stretch">
            {tiers.map((t) => (
              <TierCard key={t.id} tier={t} onLearnMore={() => setOpenTier(t)} />
            ))}
          </div>
        </div>
      </section>

      {/* Not sure callout */}
      <section className="bg-background pb-20 md:pb-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="relative overflow-hidden rounded-2xl bg-[#e9dec7] px-8 md:px-14 py-12 md:py-14">
            <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-10 items-center">
              <div className="flex flex-col items-center text-center">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground leading-[calc(1.25em+8px)]">
                  Individualized pricing for The Path Forward: Guided, Supported or Held
                </h2>
                <p className="mt-4 text-sm text-foreground/70 max-w-md leading-relaxed">
                  Because the administrative and emotional weight of the grief journey varies for everyone, I prefer to provide a personalized quote after our initial consultation, so I have a full picture of your unique requirements. This ensures the pricing is as precise as the support itself.
                </p>
                <a
                  data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
                  data-cal-namespace="free-45-min-intro-call"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                  className="cursor-pointer mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
                >
                  BOOK FREE CONSULTATION
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
              <img
                src={mountainWatercolor.url}
                alt=""
                aria-hidden
                className="hidden md:block w-[320px] h-auto object-contain mix-blend-multiply opacity-90 justify-self-end"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <div className="text-center mb-10 md:mb-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">Common Questions</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">You might be wondering…</h2>
          </div>
          <div className="divide-y divide-foreground/15 border-t border-b border-foreground/15">
            {faqs.map((f, i) => (
              <FaqRow key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Ready when you are */}
      <section className="bg-[#f1ece1] py-20 md:py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight">Guidance that is secure, confidential and timely</h2>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            To ensure your privacy is protected, your personal information will not be shared with anyone and will not be sold, rented or disclosed to third parties without your explicit consent.
          </p>
          <div className="my-8 border-t border-foreground/15" />
          <p className="font-semibold text-foreground text-sm">Find your steady ground</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            By combining administrative strategy with holistic care, I clear the space you need to reclaim your rhythm and your rest.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/at-a-glance"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
            >
              SERVICES AT A GLANCE <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      <TierDetailModal tier={openTier} onClose={() => setOpenTier(null)} />
    </div>
  );
}

function TierCard({ tier, onLearnMore }: { tier: Tier; onLearnMore: () => void }) {
  return (
    <article className="bg-[#FDFCFA] hover:bg-[#EAF1E9] rounded-2xl p-8 md:p-9 border border-border/40 shadow-sm flex flex-col transition-colors">

      {selfGuidedIcons[tier.id] ? (
        <img src={selfGuidedIcons[tier.id]} alt="" className="w-10 h-10 mb-5 opacity-80" />
      ) : (
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">The Path Forward</p>
      )}
      <h3 className="font-display text-[18px] text-foreground leading-tight min-h-[48px] flex items-center">{tier.title}</h3>
      <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed min-h-[42px]">{tier.subtitle}</p>



      <div className="mt-7">
        <p className={`font-display text-primary leading-tight ${tier.price.length > 20 ? "text-[22px]" : "text-[34px] leading-none"}`}>
          {tier.price}
          {tier.priceNote && (
            <span className="font-sans text-[13px] text-muted-foreground tracking-normal ml-1 align-middle">{tier.priceNote}</span>
          )}
        </p>
      </div>

      <div className="my-6 border-t border-foreground/15" />

      {tier.intro && (
        <>
          <p className="text-[13px] font-semibold text-foreground/85 mb-4">{tier.intro}</p>
          <div className="flex items-center gap-3 mb-4 text-foreground/60">
            <span className="flex-1 h-px bg-foreground/30" />
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase">Plus</span>
            <span className="flex-1 h-px bg-foreground/30" />
          </div>
        </>
      )}

      <ul className="space-y-3.5 mb-9">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[13px] text-foreground/80 leading-relaxed">
            <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary" strokeWidth={2.25} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {tier.outro && (
        <p className="text-[13px] text-foreground/80 leading-relaxed mb-9">{tier.outro}</p>
      )}

      <div className="mt-auto pt-4 flex flex-col items-center gap-4">
        {tier.cta.to ? (
          <Link
            to={tier.cta.to}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
          >
            {tier.cta.label} <ArrowRight className="w-3 h-3" />
          </Link>
        ) : (
          <a
            href={tier.cta.href}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
          >
            {tier.cta.label} <ArrowRight className="w-3 h-3" />
          </a>
        )}
        {tier.secondary ? (
          <button
            type="button"
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground hover:text-primary transition-colors"
          >
            {tier.secondary.label} <ArrowRight className="w-3 h-3" />
          </button>
        ) : (
          <button type="button" className="invisible inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase">
            <span>Placeholder</span> <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </article>
  );
}

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left gap-6"
      >
        <span className="text-[14px] md:text-[15px] text-foreground/90">{q}</span>
        {open ? (
          <Minus className="w-5 h-5 shrink-0 text-foreground/60" strokeWidth={1.5} />
        ) : (
          <Plus className="w-5 h-5 shrink-0 text-foreground/60" strokeWidth={1.5} />
        )}
      </button>
      {open && (
        <p className="pb-6 pr-10 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function LeafIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M6 26C6 16 14 6 26 6C26 18 18 26 6 26Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 26L20 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function TierDetailModal({ tier, onClose }: { tier: Tier | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [activeTier, setActiveTier] = useState<Tier | null>(null);

  // Mount/unmount with transition
  useEffect(() => {
    if (tier) {
      setActiveTier(tier);
      setMounted(true);
      // next frame to trigger transition
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else if (mounted) {
      setVisible(false);
      const t = setTimeout(() => {
        setMounted(false);
        setActiveTier(null);
      }, 280);
      return () => clearTimeout(t);
    }
  }, [tier, mounted]);

  // Esc to close + lock scroll
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mounted, onClose]);

  if (!mounted || !activeTier) return null;

  const details = detailsById[activeTier.id];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeTier.title}
      className={`fixed inset-0 z-[100] flex items-end md:items-center justify-center px-0 md:px-6 transition-opacity duration-300 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]"
      />

      {/* Panel */}
      <div
        className={`relative w-full md:max-w-2xl bg-[#fbf8f1] rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[92vh] md:max-h-[88vh] overflow-y-auto transform-gpu transition-all duration-300 ease-out ${
          visible
            ? "translate-y-0 md:scale-100 opacity-100"
            : "translate-y-8 md:translate-y-2 md:scale-[0.98] opacity-0"
        }`}
      >
        {/* mobile grab handle */}
        <div className="md:hidden flex justify-center pt-2.5">
          <span className="block h-1 w-10 rounded-full bg-foreground/15" />
        </div>

        <div className="p-7 md:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 md:top-5 md:right-5 inline-flex items-center justify-center w-9 h-9 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-primary/70 mb-5">
            <LeafIcon />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-6">
            <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight">
              {activeTier.title}
            </h2>
            {activeTier.cta.to ? (
              <Link
                to={activeTier.cta.to}
                onClick={onClose}
                className="self-start md:self-auto shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
              >
                {details?.ctaLabel ?? activeTier.cta.label}
              </Link>
            ) : (
              <a
                href={activeTier.cta.href}
                className="self-start md:self-auto shrink-0 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
              >
                {details?.ctaLabel ?? activeTier.cta.label}
              </a>
            )}
          </div>

          <div className="my-6 border-t border-foreground/15" />

          <p className="text-[14px] md:text-[15px] font-semibold text-foreground/90 leading-relaxed">
            {details?.tagline ?? activeTier.subtitle}
          </p>

          <ul className="mt-7 space-y-5">
            {(details?.items ?? activeTier.features.map<DetailItem>((f) => ({ lead: f }))).map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[13px] md:text-[14px] text-foreground/80 leading-relaxed">
                <Check className="w-4 h-4 mt-1 shrink-0 text-foreground/70" strokeWidth={2.25} />
                <span>
                  <span className="font-semibold text-foreground">{item.lead}</span>
                  {item.rest ? <> {item.rest}</> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
