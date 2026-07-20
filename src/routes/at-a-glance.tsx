import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Map,
  Landmark,
  Heart,
  PieChart,
  Flower2,
  Wind,
  Users,
  ArrowRight,
  X,
} from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";

export const Route = createFileRoute("/at-a-glance")({
  head: () => ({
    meta: [
      { title: "At a Glance - How Guided Grief Solutions Can Help" },
      {
        name: "description",
        content:
          "An overview of the grief support and administrative guidance Haley Wargacki offers widows navigating loss.",
      },
      { property: "og:title", content: "At a Glance - Guided Grief Solutions" },
      {
        property: "og:description",
        content:
          "Grief support and administrative guidance for widows - lessening the burden so they can focus on healing.",
      },
    ],
  }),
  component: AtAGlancePage,
});

type Offering = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  details: string;
};

const offerings: Offering[] = [
  {
    icon: Map,
    title: "Nurturing self-care approaches to support and promote your personal healing",
    description:
      "Clear direction on next steps - a reliable map toward feeling organized and empowered through the process.",
    details:
      "These intentional acts of kindness toward yourself act as a steadying anchor, helping you feel more grounded in the present while nourishing the energy and light you will carry forward into your future.",
  },
  {
    icon: Landmark,
    title: "Tailored pathways based on the estate structure you are dealing with",
    description:
      "Guidance on employer benefits, career decisions, and retirement considerations so clients can move forward with confidence.",
    details:
      "By personalizing your journey to fit your unique circumstances, we provide a steady hand to help you navigate your specific responsibilities with grace and ease.",
  },
  {
    icon: Heart,
    title: "Valuable guidance on career, employer, and retirement considerations",
    description:
      "Heart-centered tools to help the whole family find footing - creating a sanctuary of safety and understanding for children navigating loss.",
    details:
      "This gentle clarity empowers you to make decisions from a place of quiet confidence, allowing you to step forward into a future where your professional and personal well-being can coexist.",
  },
  {
    icon: PieChart,
    title: "Gentle, thoughtful and effective ways to support grieving children",
    description:
      "Clear, accessible education on taxation, insurance, and financial management - moving clients from uncertainty to informed choice.",
    details:
      "By providing you with heart-centered tools to nurture your children's healing, we help create a sanctuary of safety and understanding where your entire family can find its footing together.",
  },
  {
    icon: Flower2,
    title: "Important insights into legal and estate planning issues",
    description:
      "Restorative practices to heal the mind, body, and spirit - grounding clients in the present while illuminating a path forward.",
    details:
      "By gently demystifying at least some of the complexities the legal and estate planning issues, we provide you with the added clarity and confidence needed to build a stable foundation for the future.",
  },
  {
    icon: Wind,
    title: "Informative education on taxation, insurance, and financial management",
    description:
      "Proven techniques that reconnect clients with breath and body - offering a soothing sanctuary for the nervous system to rest and recalibrate.",
    details:
      "By shedding a gentle, clear light on your financial landscape, we empower you to move from uncertainty toward a place of steady confidence and informed choice.",
  },
  {
    icon: Users,
    title: "Practical tips to help a circle of support offer organized, compassionate care",
    description:
      "Practical guidance for family and friends - ensuring the widow is enveloped in organized, compassionate care today and in the months ahead.",
    details:
      "This thoughtful coordination ensures that the widow being supported is enveloped in the specific, practical care she needs both today and in the months and years to come.",
  },
];

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-[repeating-conic-gradient(#e5e5e5_0deg_90deg,#f5f5f5_90deg_180deg)] bg-[length:24px_24px] ${className}`}
      aria-hidden
    />
  );
}

function AtAGlancePage() {
  const [flippedTitle, setFlippedTitle] = useState<string | null>(null);
  return (
    <div className="bg-background min-h-screen">
      <DemoBadge />
      <SiteNav />

      {/* Breadcrumb */}
      <div className="bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-5 pb-2">
          <nav className="text-[12px] tracking-wide text-muted-foreground flex items-center gap-2">
            <Link to="/" className="text-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground/60">·</span>
            <span>At a glance</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-[#f1ece1] py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">
              At a Glance
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[52px] text-foreground leading-[1.1] tracking-tight">
              How Guided Grief Solutions can help
            </h1>
            <p className="mt-6 text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-md">
              Support and strategies to lessen the administrative burden and help you heal
            </p>
          </div>
          <PlaceholderImage className="aspect-[4/3] w-full" />
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <p className="text-center text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-10 md:mb-12">
            What We Offer
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:gap-7 [perspective:1200px]">
            {offerings.map(({ icon: Icon, title, description, details }) => {
              const isFlipped = flippedTitle === title;
              return (
                <div
                  key={title}
                  className="relative min-h-[260px] [transform-style:preserve-3d] transition-transform duration-500"
                  style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Front */}
                  <article className="absolute inset-0 bg-[#FDFCFA] rounded-2xl p-8 md:p-9 border border-border/40 shadow-sm flex flex-col [backface-visibility:hidden]">
                    <Icon className="w-8 h-8 text-foreground/70 mb-5" strokeWidth={1.5} />
                    <h3 className="font-display text-[22px] text-foreground leading-tight">
                      {title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setFlippedTitle(title)}
                      className="mt-auto pt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground hover:text-primary transition-colors self-start"
                    >
                      Learn More <ArrowRight className="w-3 h-3" />
                    </button>
                  </article>
                  {/* Back */}
                  <article className="absolute inset-0 bg-[#FDFCFA] rounded-2xl p-8 md:p-9 border border-border/40 shadow-sm flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <button
                      type="button"
                      onClick={() => setFlippedTitle(null)}
                      aria-label="Close details"
                      className="absolute top-4 right-4 p-1.5 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h3 className="font-display text-[20px] text-foreground leading-tight pr-8">
                      {title}
                    </h3>
                    <p className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                      {details}
                    </p>
                  </article>
                </div>
              );
            })}
          </div>
          <p className="mt-10 md:mt-12 text-[13px] text-foreground/80 leading-relaxed">
            Your access to these tools and personalized 1:1 solutioning sessions will be tailored based on the specific plan you choose.
          </p>
        </div>
      </section>

      <ClosingCTA />

      {/* Refer callout */}
      <section className="bg-[#f1ece1] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <PlaceholderImage className="aspect-[4/3] w-full" />
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
              Grief is a journey, not a schedule
            </h2>
            <p className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-md">
              Together, we can lessen the administrative noise so you can find the quiet you need to breathe, remember and begin to heal.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <a
                data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
                data-cal-namespace="free-45-min-intro-call"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
              >
                BOOK FREE CONSULTATION
              </a>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function ClosingCTA() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          Getting started is easy
        </h2>
        <ol className="mt-6 text-sm text-muted-foreground max-w-md mx-auto text-center list-decimal list-inside space-y-2 font-bold">
          <li>Book your free consultation</li>
          <li>Tell me about your priorities and challenges</li>
          <li>Choose the plan that's right for you</li>
        </ol>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a href="/#services" className="inline-flex items-center gap-2 rounded-full border border-primary/60 text-primary px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors">
            CHOOSE PLAN <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
