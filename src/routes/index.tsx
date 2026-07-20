import { Fragment, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import roadmapIcon from "@/assets/icons/lightbulb.svg";
import articlesIcon from "@/assets/icons/articles.svg";
import reminderIcon from "@/assets/icons/reminder.svg";
import oneLeafIcon from "@/assets/icons/1-leaf.svg";
import twoLeavesIcon from "@/assets/icons/2-leaves.svg";
import mapleLeafIcon from "@/assets/icons/maple_leaf.svg";
import sproutIcon from "@/assets/icons/sprout.svg";
import mountainWatercolorAsset from "@/assets/wildflowers-bnw1.png.asset.json";
const mountainWatercolor = mountainWatercolorAsset.url;
import founderImgAsset from "@/assets/founder-portrait.jpg.asset.json";
const founderImg = founderImgAsset.url;
import heroLakeAsset from "@/assets/hero-lake-edited.jpg.asset.json";
const heroBg = heroLakeAsset.url;
import meadowBannerAsset from "@/assets/lake-reflection.jpg.asset.json";
const meadowBanner = meadowBannerAsset.url;
import { DemoBadge } from "@/components/ggs/DemoBadge";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { ScrollFadeImage } from "@/components/ggs/ScrollFadeImage";
import { ScrollSlideUpImage } from "@/components/ggs/ScrollSlideUpImage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guided Grief Solutions - You don't have to do this alone" },
      { name: "description", content: "Compassionate, state-specific support for widows navigating the legal, financial, and emotional weight of loss." },
      { property: "og:title", content: "Guided Grief Solutions" },
      { property: "og:description", content: "A steady hand for the hardest season." },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav transparent />
      <Hero />
      <div className="border-b-2 border-[#eae0d0]" />
      <Intro />
      <SectionDivider />
      <FounderStory />
      <SectionDivider />
      <QuoteBanner />
      <HowWeWalk />
      <OneOnOneSupport />
      <CircleOfCareCTA />
      <FreeResources />
      <PersonalizedCTA />
      <SiteFooter />
      <DemoBadge />
    </div>
  );
}

function SectionDivider() {
  return <div className="border-b-2 border-[#eae0d0]" />;
}




function Hero() {
  return (
    <section className="mt-20 md:mt-24">
      <div className="relative h-[50vh] min-h-[300px] overflow-hidden">
        <img
          src={heroBg}
          alt="Peaceful nature background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="max-w-2xl mx-auto w-full bg-secondary/90 backdrop-blur-sm rounded-2xl px-10 py-14 text-center shadow-lg border border-border/30">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-[calc(1.05em+8px)] tracking-tight">
              Helping grieving hearts find hope and healing
            </h1>
          </div>
        </div>
      </div>
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto w-full bg-secondary/90 backdrop-blur-sm rounded-2xl px-10 py-14 text-center shadow-lg border border-border/30">
          <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-[1.05] tracking-tight">
            You don't have to face your loss alone
          </h2>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            As a widow, I know firsthand how overwhelming, stressful and exhausting the grief recovery process can be. But you don't have to walk this path on your own. I'm here to support you as you navigate the heartache, challenges and what comes next on your journey of healing.
          </p>
          <Link to="/auth"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors">
            Find Your Path Forward
          </Link>
        </div>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative flex items-center justify-center before:content-[''] before:block before:bg-[#ede5d6] before:w-[75%] before:h-[82%] before:absolute before:bottom-0 before:right-0 before:rounded-[10px]">
          <ScrollSlideUpImage src={mountainWatercolor} alt="Mountain watercolor illustration" className="relative z-10 w-full max-w-sm rounded-lg" width={1024} height={768} />
        </div>
        <div>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">
            Supporting and empowering widows
          </h2>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            The early months following a loss are a fragile time when your heart deserves the space to simply breathe. While the world may press in with seemingly unending demands, decisions and disruptions, your main priority should be on your well-being.
          </p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Guided Grief Solutions acts as both a compass and a shield. By providing clear, compassionate guidance I can help lessen the complex administrative burden you are carrying, so you can focus on healing, instead of paperwork. By offering a carefully curated selection of coping strategies and restorative holistic wellness resources that nurture the mind, body and spirit throughout the grief journey, I provide a steadying, quiet presence.
          </p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            My mission is to silence the noise so you can find a peaceful rhythm, feel more grounded today and hopeful for the future.
          </p>
          <a
            data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
            data-cal-namespace="free-45-min-intro-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors cursor-pointer">
            BOOK FREE CONSULTATION
          </a>
        </div>
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-3xl mx-auto px-8 text-center">
        
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          Meet your guide,<br className="sm:hidden" /> Haley Wargacki
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed font-semibold">
          A graduate of David Kessler's Grief Education Certification Program, one of the world's most respected frameworks for understanding and supporting grief.
        </p>
        <p className="mt-4 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
          From experience, I know how easily the logistics of loss can bury the need to grieve and heal when you're facing a mountain of administrative tasks, financial decisions and legal processes. That's why I started Guided Grief Solutions. No one should have to navigate this path on their own.
        </p>
        <div className="max-w-xl mx-auto text-center mt-12">
          <Link to="/about" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors">
            Read My Full Story <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="mt-8 rounded-2xl overflow-hidden bg-secondary/40 aspect-[3/4] md:aspect-[4/3] max-w-2xl mx-auto">
          <ScrollSlideUpImage src={founderImg} alt="Haley Wargacki, founder of Guided Grief Solutions" className="w-full h-full object-cover object-[center_20%]" width={1024} height={768} />
        </div>
      </div>
    </section>
  );
}

const pillars = [
  { key: "pillar-1", icon: (props: { className?: string }) => <img src={roadmapIcon} alt="" className={props.className} />, title: <>Tell me what's most important to<br />you right now</>, desc: "I'm here to listen and help you through the grief recovery and healing process." },
  { key: "pillar-2", icon: (props: { className?: string }) => <img src={reminderIcon} alt="" className={props.className} />, title: <>Answer a few questions about<br />the issues you're facing</>, desc: "This will help us both understand the type of support you need to move forward." },
  { key: "pillar-3", icon: (props: { className?: string }) => <img src={articlesIcon} alt="" className={props.className} />, title: <>Choose the level of guidance and<br />interaction you want</>, desc: "Everyone grieves differently. You are the only one who knows how much help you need." },
];

function HowWeWalk() {
  return (
    <section id="services" className="py-20 bg-background border-t border-border/30">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight text-center mb-14">
          How Guided Grief Solutions works
        </h2>
        <div className="flex flex-col md:flex-row md:items-stretch gap-12 md:gap-0">
          {pillars.map((p, i) => (
            <Fragment key={p.key}>
              {i > 0 && <div className="hidden md:block w-px self-stretch bg-[#EAE0D0]" aria-hidden />}
              <div className="flex-1 text-center md:px-10">
                <p.icon className="w-7 h-7 text-primary mx-auto mb-5" />
                <h3 className="font-display text-[18px] text-foreground mb-4 leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{p.desc}</p>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="flex justify-center mt-14">
          <Link to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors">
            GET STARTED
          </Link>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  {
    text: "After my husband died, I felt so alone, angry and overwhelmed. With Haley's help, I quickly came to understand that taking care of myself and taking time to grieve was just as important as rushing around trying to handle paperwork. I'm so happy I found her.",
    name: "Monica M.",
    title: "Guided Grief Solutions Client",
  },
  {
    text: "Having never managed our bills, investments or taxes before, I was really worried about money after Richard passed. The guidance and resources Haley offered made it a lot easier for me to get a handle on my finances and how to manage them. I couldn't be more grateful.",
    name: "Katherine S.",
    title: "Guided Grief Solutions Client",
  },
  {
    text: "Working with Haley was a true joy. She didn't judge. She didn't lecture. She didn't rush. She listened instead of trying to 'fix' me and offered practical, concrete advice that saved me a lot of headaches. She also made me laugh, which was a lifesaver.",
    name: "Sophie B.",
    title: "Guided Grief Solutions Client",
  },
  {
    text: "I was really struggling before and so were my boys. Being a solo parent isn't easy. Haley helped me realize that it was okay if the house was messy. What my children really needed wasn't a perfect parent. It was understanding and love. She made a big difference in our lives.",
    name: "Christina T.",
    title: "Guided Grief Solutions Client",
  },
];

function QuoteBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="hidden relative py-24 overflow-hidden" aria-hidden="true">
      <img src={meadowBanner} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" width={1920} height={640} aria-hidden />
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative z-10 max-w-5xl mx-auto px-8">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review, i) => (
              <div key={i} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#d3cdc2] flex items-center justify-center text-[#3d4e19] font-display text-3xl md:text-4xl">
                    {review.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="font-display text-xl sm:text-2xl text-foreground leading-snug">
                    "{review.text}"
                  </p>
                  <div className="mt-5">
                    <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/70 font-bold">{review.name}</p>
                    <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/70">{review.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={goToPrev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-foreground/30 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mt-10">
          <Link to="/about"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#88a883] bg-[#eaf1e9] text-[#3d4a3b] px-9 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-[#dce8da] transition-colors"
          >
            READ MORE CLIENT STORIES
          </Link>
        </div>
      </div>
    </section>
  );
}

const guides = [
  { icon: (props: { className?: string }) => <img src={oneLeafIcon} alt="" className={props.className} />, title: "Is there a Will?", desc: "We'll partner with you. This guide walks you through the immediate steps to take, who to notify, how to begin the legal process with clarity and confidence." },
  { icon: (props: { className?: string }) => <img src={twoLeavesIcon} alt="" className={props.className} />, title: "Is there a Will & Trust?", desc: "Both documents work in tandem. This guide helps you understand how they work together and where to start so nothing material is missed." },
  { icon: (props: { className?: string }) => <img src={mapleLeafIcon} alt="" className={props.className} />, title: "Is there a Trust only?", desc: "A trust-only situation comes with its own steps. We'll show you what they mean and outline how to move forward - the start of a healing journey." },
  { icon: (props: { className?: string }) => <img src={sproutIcon} alt="" className={props.className} />, title: "Is there no Will or Trust?", desc: "No documents leaves you in a difficult spot. We'll guide you on starting points for figuring out what comes next, even without a formal estate planning structure." },
];

function OneOnOneSupport() {
  return (
    <section className="py-20 bg-background border-t-2 border-[#eae0d0]">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          The personalized, one-on-one support you deserve
        </h2>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          When you sign up for one of the guided packages I offer, we can connect via video chat or phone, whichever is easiest for you.
        </p>
        <a
          data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
          data-cal-namespace="free-45-min-intro-call"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors cursor-pointer">
          BOOK FREE CONSULTATION
        </a>
      </div>
    </section>
  );
}

function CircleOfCareCTA() {
  return (
    <section className="py-20 bg-background border-t-2 border-[#eae0d0]">
      <div className="max-w-3xl mx-auto px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          Are you a friend or family member of a widow?
        </h2>
        <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Supporting a grieving widow is one of the greatest gifts you can give, but it requires more than just good intentions. It requires a plan. I have a complete toolkit of practical tips, ready-to-use templates and time-tested strategies to help you and other members of your Circle of Care understand the most effective ways to offer coordinated, timely help. The type of sustained, compassionate support that truly lightens the load.
        </p>
        <Link to="/services"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-9 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors">
          LEARN MORE
        </Link>
      </div>
    </section>
  );
}

function FreeResources() {
  return (
    <section id="resources" className="hidden" aria-hidden="true">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-14">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">Free resource</p>
          <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">Start with something free.</h2>
          <p className="mt-5 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Every widow's situation is different. Choose the guide that matches yours. Each one will give you a clear, prioritized starting point for the hardest days after loss.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {guides.map((g) => (
            <div key={g.title} className="bg-card rounded-2xl p-7 border border-border/40">
              <g.icon className="w-6 h-6 text-primary mb-4" />
              <h3 className="font-display text-xl text-foreground mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{g.desc}</p>
              <Link to="/auth" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:text-primary hover:border-primary transition-colors">
                Download your guide <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PersonalizedCTA() {
  return (
    <section id="contact" className="py-20 bg-secondary/60">
      <div className="max-w-5xl mx-auto px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          The logistics of loss can be overwhelming.
        </h2>
        <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Together, we can simplify the necessary administrative burdens of today, creating the space you need to focus on healing
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/auth" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}


