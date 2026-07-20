import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import compassHero from "@/assets/article-compass-hero.jpg";
import wildflowersLeft from "@/assets/wildflowers-4.png.asset.json";
import wildflowersRight from "@/assets/wildflowers-2.png.asset.json";
import meadowBanner from "@/assets/meadow-banner.jpg";

export const Route = createFileRoute("/resource-library")({
  head: () => ({
    meta: [
      { title: "The Resource Library - Guided Grief Solutions" },
      { name: "description", content: "Free articles and guides to help you take the next gentle step - plus a deeper library available to GGS clients." },
      { property: "og:title", content: "The Resource Library - Guided Grief Solutions" },
      { property: "og:description", content: "A library built for every step of your journey." },
    ],
  }),
  component: ResourceLibraryPage,
});

const freeArticles = Array.from({ length: 4 }).map((_, i) => ({
  id: `free-${i}`,
  tag: "Self Care",
  title: "Finding Stillness: A Daily Ritual for the Grieving Mind",
  excerpt: "This is a hook or teaser text for this article.",
}));

const furtherArticles = Array.from({ length: 6 }).map((_, i) => ({
  id: `more-${i}`,
  tag: "Self Care",
  title: "Finding Stillness: A Daily Ritual for the Grieving Mind",
  excerpt: "This is a hook or teaser text for this article.",
}));

function ResourceLibraryPage() {
  return (
    <div className="bg-background min-h-screen">
      <DemoBadge />
      <SiteNav />

      {/* Breadcrumb */}
      <div className="bg-[#f1ece1]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-5 pb-2">
          <nav className="text-[12px] tracking-wide text-muted-foreground flex items-center gap-2">
            <Link to="/" className="text-foreground hover:text-primary">Home</Link>
            <span className="text-muted-foreground/60">·</span>
            <span>The Resource Library</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={wildflowersLeft.url}
            alt=""
            aria-hidden
            className="hidden md:block absolute bottom-0 left-[calc(50%-24rem-250px-1rem)] w-auto max-w-[250px] opacity-90 pointer-events-none select-none"
          />
          <img
            src={wildflowersRight.url}
            alt=""
            aria-hidden
            className="hidden md:block absolute bottom-0 right-[calc(50%-24rem-250px-1rem)] w-auto max-w-[250px] opacity-90 pointer-events-none select-none"
          />
          <div className="relative max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24 text-center">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">The Resource Library</p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] text-foreground leading-[1.1] tracking-tight">
              A library built for every<br />step of your journey.
            </h1>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Free articles and guides to get you started - and a deeper library available to Guided Grief Solutions clients when you're ready.
            </p>
          </div>
        </section>
      </div>

      {/* Free resources */}
      <section className="py-20 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">Free Resources</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">Start reading today.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-7">
            {freeArticles.map((a) => (
              <ArticleCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote banner */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <img src={meadowBanner} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/55" />
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="font-display text-2xl sm:text-3xl text-foreground leading-snug">
            "Grief doesn't follow a schedule.<br />Neither does the support you'll find here."
          </p>
          <p className="mt-5 text-[11px] tracking-[0.3em] uppercase text-foreground/70">Haley Wargacki, Founder</p>
        </div>
      </section>

      {/* Further reading carousel */}
      <FurtherReading />

      {/* Stay connected */}
      <section className="py-20 md:py-24 bg-[#F5EFE4]">
        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">Stay Connected</p>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">New resources, delivered gently.</h2>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            When new articles and guides are added to the library, you'll be the first to know.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 max-w-md mx-auto text-left"
          >
            <label htmlFor="email" className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-foreground/80 mb-2">
              Email Address
            </label>
            <div className="flex items-stretch gap-3">
              <input
                id="email"
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-full bg-background border border-foreground/20 px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-12">
            <p className="text-sm text-foreground/80">Looking for more personalized support?</p>
            <Link
              to="/"
              hash="services"
              className="mt-3 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground border-b border-foreground/40 pb-1 hover:text-primary hover:border-primary transition-colors"
            >
              Explore Services <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ArticleCard({ tag, title, excerpt }: { tag: string; title: string; excerpt: string }) {
  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-border/40 shadow-sm">
      <img src={compassHero} alt="" className="w-full h-56 object-cover" loading="lazy" />
      <div className="p-6">
        <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-primary bg-primary/10 rounded px-2 py-1 mb-4">
          {tag}
        </span>
        <h3 className="font-display text-xl text-foreground leading-snug mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5">{excerpt}</p>
        <Link
          to="/articles/helping-children-deal-with-grief"
          className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors"
        >
          Read Article <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}

function FurtherReading() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  const next = () => scrollBy(1);
  const prev = () => scrollBy(-1);

  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">A Look Ahead</p>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">
            Further reading when you're ready.
          </h2>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            Every widow's situation is different. Choose the guide that matches yours. Each one will give you a clear, prioritized starting point for the earliest days after loss.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {furtherArticles.map((a) => (
              <div key={a.id} className="snap-start shrink-0 w-[80%] sm:w-[45%] md:w-[31%]">
                <ArticleCard {...a} />
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg hover:bg-primary-dark transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-primary text-primary-foreground items-center justify-center shadow-lg hover:bg-primary-dark transition-colors z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="h-1.5 w-8 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
        </div>
      </div>
    </section>
  );
}
