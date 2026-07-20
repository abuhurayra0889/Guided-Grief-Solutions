import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import aboutPortraitAsset from "@/assets/about-portrait.jpg.asset.json";
import aboutJourneyAsset from "@/assets/grief-journey.jpg.asset.json";
import aboutStrategiesAsset from "@/assets/about-strategies.jpg.asset.json";
import founderImgAsset from "@/assets/founder.jpg.asset.json";
const aboutPortrait = aboutPortraitAsset.url;
const aboutJourney = aboutJourneyAsset.url;
const aboutStrategies = aboutStrategiesAsset.url;
const founderImg = founderImgAsset.url;
import wildflowersBnwAsset from "@/assets/wildflowers-bnw2.png.asset.json";
import griefEducatorBadgeAsset from "@/assets/grief-educator-badge.png.asset.json";
const flowersWatercolor = wildflowersBnwAsset.url;
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import { ScrollFadeImage } from "@/components/ggs/ScrollFadeImage";

export const Route = createFileRoute("/about-backup")({
  head: () => ({
    meta: [
      { title: "About Haley (Backup) - Guided Grief Solutions" },
      { name: "description", content: "Backup page - Haley's journey from heartbreak to healing, and the mission behind Guided Grief Solutions." },
      { property: "og:title", content: "About Haley (Backup) - Guided Grief Solutions" },
      { property: "og:description", content: "Backup - From sudden loss to a steady hand for other widows." },
    ],
  }),
  component: AboutBackupPage,
});

function AboutBackupPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <SectionA />
      <SectionB />
      <SectionC />
      <SectionD />
      <BreatheBanner />
      <Certified />
      <ClosingCTA />
      <SiteFooter />
      <DemoBadge />
    </div>
  );
}

function Crumbs() {
  return (
    <div className="max-w-7xl mx-auto px-8 pt-6 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
      <Link to="/" className="hover:text-primary">Home</Link>
      <span className="mx-2 text-muted-foreground/60">·</span>
      <span className="text-foreground">About (Backup)</span>
    </div>
  );
}

function Hero() {
  return (
    <>
      <Crumbs />
      <section className="bg-secondary/60 mx-6 md:mx-12 mt-4 rounded-2xl overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.2fr]">
          <div className="px-10 md:px-14 py-16 md:py-20 flex flex-col justify-center">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-[1.05] tracking-tight">
              My journey from<br />heartbreak to<br />healing.
            </h1>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-sm">
              When loss turns your world upside down, the last thing you need is more to manage. We handle the details so you can focus on healing.
            </p>
          </div>
          <div className="relative min-h-[280px] md:min-h-[420px]">
            <ScrollFadeImage src={aboutPortrait} alt="Haley sitting peacefully near a window" className="absolute inset-0 w-full h-full object-cover object-top" width={1024} height={1280} />
          </div>
        </div>
      </section>
    </>
  );
}

function StoryRow({ image, alt, reverse, kicker, heading, children, imgClassName }: { image: string; alt: string; reverse?: boolean; kicker?: string; heading: string; children: React.ReactNode; imgClassName?: string }) {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className={`max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-secondary/40">
          <img src={image} alt={alt} className={`w-full h-full object-cover ${imgClassName || ""}`} loading="lazy" width={1024} height={1280} />
        </div>
        <div>
          {kicker && <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">{kicker}</p>}
          <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">{heading}</h2>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">{children}</div>
        </div>
      </div>
    </section>
  );
}

function SectionA() {
  return (
    <StoryRow image={founderImg} alt="Portrait of Haley" heading="At age thirty-nine, my world shifted off its axis in an instant.">
      <p>Unexpectedly became a widow just two weeks after my husband passed. I sought out a second day, gathered into a wave that suddenly aggressively, exceedingly quiet. This loud silence echoed through every corner of my home and heart.</p>
      <p>In those early months of navigating new motherhood always be profound loss - least thrilling. I never want another widow to endure what I've endured. That is, drowning under the suffocating weight of paperwork, not knowing where to turn for answers or trust, and feeling as though I needed to be doing my own healing. It was in that struggle that Guided Grief Solutions was born.</p>
    </StoryRow>
  );
}

function SectionB() {
  return (
    <StoryRow image={aboutJourney} alt="A woman walking along a forest path at golden hour" reverse heading="Grief is deeply personal. It isn't a process to be completed; it is a journey that must be honored.">
      <p>It is a process with a definitive end, just more something we walk through every nuance, evolving and learning with every step. I have learned to integrate grief into my life, acknowledging the pain of loss while it is also part of my whole self, mentally, emotionally, physically, and spiritually.</p>
    </StoryRow>
  );
}

function SectionC() {
  return (
    <StoryRow image={aboutPortrait} alt="Quiet moment by a window" heading="While I never would have chosen this path, I am profoundly grateful for the perspective it has gifted me." imgClassName="object-left">
      <p>I live with a deep understanding that tomorrow is never guaranteed; making every sunrise a precious, cherished gift. Slowly but surely, I've regained moments to savor, sitting still and growth often hooks the two steps forward and one step back. Through it all, I've discovered an inner resilience and strength I never knew I could claim.</p>
      <p>As I continued forward on this new and unforeseen path, I realized that all of the soft, gentle nights are now heartache gave me a beautiful opportunity to give back and support other widows. Guided Grief Solutions was created to be the steady hand I wished I'd had - providing a centralized sanctuary that honors the widow as a whole person, not just a set of tasks.</p>
    </StoryRow>
  );
}

function SectionD() {
  return (
    <section className="py-20 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">Strategies for healing and<br />a path forward</h2>
          <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>By combining personalized administrative guidance with carefully curated mental health resources, I offer a tailored roadmap for your physical, emotional, and integrative needs. My mission is to move you out of the exhausting cycle of constant task-switching and into a steadier, more supported rhythm where necessary normalcies are handled with steady care and healing is not postponed.</p>
            <p>I hope you will allow Guided Grief Solutions to help you navigate the complexities of loss, giving you the necessary space and time to become, to heal, and to eventually rediscover your own light.</p>
            <p className="font-signature text-4xl text-[#D3ABA0] pt-2">many life blessings, haley</p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-secondary/40">
          <img src={aboutStrategies} alt="A woman writing peacefully in a journal" className="w-full h-full object-cover" loading="lazy" width={1024} height={1280} />
        </div>
      </div>
    </section>
  );
}

function BreatheBanner() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-8">
        <div className="bg-secondary/60 rounded-2xl px-8 md:px-12 py-10 grid md:grid-cols-[200px_1fr] gap-8 items-center">
          <img src={flowersWatercolor} alt="" aria-hidden className="w-40 mx-auto" loading="lazy" width={400} height={500} />
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl text-foreground">Breathe easier</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-md">
              More than just words, daily affirmations are soft whispers of truth designed to soothe your spirit and help you reclaim your inner strength.
            </p>
            <Link to="/auth" className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors">
              See Today's Affirmation <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Certified() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-8">
        <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary text-center mb-8">Grief educator</p>
        <div className="grid md:grid-cols-[180px_1fr] gap-8 items-center">
          <div className="mx-auto">
            <img src={griefEducatorBadgeAsset.url} alt="Certified Grief Educator badge by David Kessler" className="w-36 h-36 object-contain" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Haley has been trained through David Kessler's Grief Educator Certification Program - one of the world's most respected frameworks for understanding and supporting grief.
          </p>
        </div>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-2xl mx-auto px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          Navigating loss together, one step at a time.
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
          You don't need to do this alone. Guided Grief Solutions is here to help.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors">
            Book a Free Call
          </Link>
          <a href="/#services" className="inline-flex items-center gap-2 rounded-full border border-primary/60 text-primary px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors">
            Explore Services <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
