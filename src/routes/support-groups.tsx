import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart,
  Sparkles,
  Compass,
  Sun,
  Users,
  Flower2,
  MapPin,
  Phone,
  ExternalLink,
  Plus,
  Minus,
  ArrowRight,
} from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import heroLakeAsset from "@/assets/hero-lake-edited.jpg.asset.json";
const heroBg = heroLakeAsset.url;

export const Route = createFileRoute("/support-groups")({
  head: () => ({
    meta: [
      { title: "Support Groups - Guided Grief Solutions" },
      {
        name: "description",
        content:
          "Find strength and sisterhood through in-person New Jersey support groups and online widow communities.",
      },
      { property: "og:title", content: "Support Groups - Guided Grief Solutions" },
      {
        property: "og:description",
        content:
          "Local NJ and online support communities for widows navigating grief.",
      },
    ],
  }),
  component: SupportGroupsPage,
});

function PlaceholderImage({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-[repeating-conic-gradient(#e5e5e5_0deg_90deg,#f5f5f5_90deg_180deg)] bg-[length:24px_24px] ${className}`}
      aria-hidden
    />
  );
}

type OfferItem = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  body: string;
};

const offerItems: OfferItem[] = [
  {
    icon: Heart,
    title: "The comfort of knowing you are not alone",
    body: "As you share your heart, you will find that your deepest feelings, the confusion, the waves of emotion, the questions, are a natural part of healing. There is immense peace in realizing that you are exactly where you need to be.",
  },
  {
    icon: Sparkles,
    title: "Gentle healing for the soul",
    body: "Engaging with a community has a soothing effect on the mind and body. It helps quiet anxiety, invites more restful sleep, and softens the sharpest edges of your mourning.",
  },
  {
    icon: Sun,
    title: "Wisdom for the daily journey",
    body: "These circles offer more than just emotional warmth; they provide practical lanterns for the road ahead. You’ll find shared wisdom on navigating finances, parenting, and discovering new rhythms for your daily life.",
  },
  {
    icon: Compass,
    title: "A compass for resources",
    body: "Within these groups, a wealth of knowledge is shared, from uplifting books to trusted counselors, ensuring you have the tools you need to thrive.",
  },
  {
    icon: Flower2,
    title: "The grace of routine",
    body: "A scheduled meeting offers a soft, predictable anchor in your week, helping you regain a sense of balance and structure as you rebuild your world.",
  },
  {
    icon: Users,
    title: "A space tailored for you",
    body: "Whether you prefer the lived wisdom of a peer-led group, the guidance of a professional, or the convenience of an online community, there is a perfect space designed to meet you exactly where you are today.",
  },
];

type LocalGroup = {
  name: string;
  description: string;
  location: string;
  phone: string;
  badge: { label: string; tone: "green" | "yellow" | "rose" };
  href: string;
};

const localGroups: LocalGroup[] = [
  {
    name: "Good Grief",
    description:
      "While well-known for children and teens, they also offer Nights of Support for the adult caregivers and spouses in the family.",
    location: "Morristown and Princeton",
    phone: "(908) 522-1999",
    badge: { label: "ADD A MEMBER/A FEW MEMBERS", tone: "rose" },
    href: "https://good-grief.org",
  },
  {
    name: "H.O.P.E (Helping Other People Evolve)",
    description:
      "A non-profit specifically for widowed men and women. They offer structured 10-week support sessions across several counties, including Atlantic, Burlington, Camden, Cape May, Gloucester, and Mercer.",
    location: "Multiple Counties",
    phone: "(888) 920-2201",
    badge: { label: "WIDOWS & WIDOWERS", tone: "yellow" },
    href: "https://www.hopesnj.org/",
  },
  {
    name: "Jewish Family and Children’s Services (JFCS)",
    description:
      "Offers bereavement groups specifically for widows and widowers, often available both in-person and via telehealth.",
    location: "Northern New Jersey (Bergen, Passaic, Hudson counties).",
    phone: "(201) 837-9090",
    badge: { label: "IN PERSON & VIRTUAL", tone: "rose" },
    href: "https://www.jfcsnnj.org/",
  },
  {
    name: "Journey Through Grief",
    description:
      "A mutual self-help bereavement group for all widowed persons.",
    location: "Hamilton Square, NJ",
    phone: "(609) 587-7072",
    badge: { label: "ALL BEREAVED SPOUSES", tone: "rose" },
    href: "#",
  },
  {
    name: "Imagine",
    description:
      "Provides free, year-round grief support, including groups for parents and young adults.",
    location: "Mountainside",
    phone: "(908) 264-3100",
    badge: { label: "FREE YEAR-ROUND", tone: "green" },
    href: "https://imaginenj.org",
  },
  {
    name: "Samaritan Healthcare & Hospice",
    description:
      "Provides a group called Grieving the Love of Your Life for those who have lost a spouse or partner, as well as an Early Endings group for younger adults.",
    location: "Southern New Jersey (Marlton and surrounding areas).",
    phone: "(800) 229-8183",
    badge: { label: "SPOUSE & PARTNER LOSS", tone: "rose" },
    href: "https://samaritannj.org",
  },
  {
    name: "Starting Over",
    description:
      "A specialized mutual self-help group for widows and widowers under the age of 50 or those with dependent children.",
    location: "Saul Colonial Home, Hamilton Square, NJ.",
    phone: "(609) 587-0170",
    badge: { label: "UNDER 50 / DEPENDENT CHILDREN", tone: "yellow" },
    href: "#",
  },
  {
    name: "Stephy's Place",
    description:
      "A non-profit center offering free, in-person support groups, including dedicated bereavement groups for those who lost spouses.",
    location: "Red Bank",
    phone: "(732) 797-9739",
    badge: { label: "FREE IN-PERSON", tone: "green" },
    href: "https://stephysplace.org",
  },
  {
    name: "Survivors of Suicide",
    description:
      "This group meets on the 2nd and 4th Wednesday of each month to support those who have lost a loved one to suicide.",
    location: "Madison",
    phone: "(908) 605-0325",
    badge: { label: "SUICIDE LOSS", tone: "rose" },
    href: "https://sosmadison.com",
  },
];

type OnlineCommunity = {
  name: string;
  description: string;
  href: string;
};

const onlineCommunities: OnlineCommunity[] = [
  {
    name: "Hope for Widows Foundation",
    description:
      "Known for its peer-to-peer online support, this foundation offers a community blog where widows share their personal stories and an annual Restoring Hope grant program to assist those facing financial challenges.",
    href: "https://hopeforwidows.org/",
  },
  {
    name: "Modern Widows Club",
    description:
      "This organization focuses on \"moving forward while reaching back.\" They provide virtual support communities led by trained advocates and offer specialized interest clubs (like gardening, health, or leadership) tailored to widows at different stages of their journey.",
    href: "https://modernwidowsclub.org/",
  },
  {
    name: "Option B (Option B Gatherings)",
    description:
      "Created by Sheryl Sandberg, this platform offers Option B Gatherings, which are intimate, virtual, face-to-face conversations. They thoughtfully match you with a small group (12–15 people) that meets regularly to foster deeper, long-term connections.",
    href: "https://optionb.org/",
  },
  {
    name: "Soaring Spirits International (Widowed Village)",
    description:
      "This is one of the most robust 24/7 online communities specifically for widowed people. They offer focused forums where you can connect with others based on age, location, or even the specific nature of your loss. They also host weekly Zoom calls and a popular Widowed Pen Pal program.",
    href: "https://soaringspirits.org/",
  },
  {
    name: "The Sisterhood of Widows",
    description:
      "An online grief support community designed to be a gentle, judgment-free space. It focuses heavily on recovery and rebuilding, offering a private Facebook group that is strictly for women to ensure a safe environment for sharing.",
    href: "https://sisterhoodofwidows.com/",
  },
  {
    name: "The W Connection",
    description:
      "This network is built by widows, for widows. Their online community focuses on ‘moving from grief to growth’ by providing resources and virtual meetings that help women learn the new skills required to navigate their changed lives.",
    href: "https://widowsconnection.org/",
  },
];

function HomeHero() {
  return (
    <section>
      <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-[1.05] tracking-tight text-center my-8 md:my-12">
        Finding strength and sisterhood
      </h1>
      <div className="relative h-[50vh] min-h-[300px] overflow-hidden">
        <img
          src={heroBg}
          alt="Peaceful nature background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
      </div>
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto w-full bg-secondary/90 backdrop-blur-sm rounded-2xl px-10 py-14 text-center shadow-lg border border-border/30">
          <h2 className="font-display text-[22px] leading-[30px] tracking-[-1%] text-foreground">
            Support groups can offer understanding, compassion and renewed sense of belonging
          </h2>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            Joining a support circle is not just about managing grief; it is about gently gathering the pieces of your life in a soft, non-judgmental environment. Here, your story is honored, your silence is respected, and your courage is celebrated. Together, we move from the shadows of isolation toward a horizon of renewed hope and steady ground.
          </p>
        </div>
      </div>
    </section>
  );
}

function SupportGroupsPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(4);

  const badgeClasses = (tone: LocalGroup["badge"]["tone"]) => {
    if (tone === "green") return "bg-[#eaf1e9] text-[#3d4a3b]";
    if (tone === "yellow") return "bg-[#f5ecc9] text-[#7a6420]";
    return "bg-[#f4dcd4] text-[#8a3b28]";
  };

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
            <Link to="/at-a-glance" className="text-foreground hover:text-primary">
              At a glance
            </Link>
            <span className="text-muted-foreground/60">·</span>
            <span>Support groups</span>
          </nav>
        </div>
      </div>

      <HomeHero />



      {/* What support groups offer */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="text-center font-display text-3xl sm:text-4xl md:text-[42px] text-foreground leading-tight tracking-tight">
            Replacing the silence of loss with the strength of community
          </h2>

          <div className="mt-12 border-t border-[#eae0d0]">
            {offerItems.map(({ icon: Icon, title, body }, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={title} className="border-b border-[#eae0d0]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-4 py-5 text-left"
                  >
                    <Icon className="w-5 h-5 text-foreground/70 shrink-0" strokeWidth={1.5} />
                    <span className="flex-1 font-display text-[17px] md:text-[18px] text-foreground">
                      {title}
                    </span>
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-foreground/60 shrink-0" strokeWidth={1.5} />
                    ) : (
                      <Plus className="w-4 h-4 text-foreground/60 shrink-0" strokeWidth={1.5} />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pl-9 pr-8 pb-6 -mt-1 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                      {body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-[12px] md:text-[13px] text-muted-foreground leading-relaxed text-center">
            <span className="font-semibold text-foreground">Important:</span>&nbsp;Support groups and therapy serve different roles. Since group leaders aren't always licensed therapists, you might find that a one-on-one session with a professional is a better fit if you're seeking specialized therapeutic support.
          </p>
        </div>
      </section>

      {/* Local NJ groups */}
      <section id="local-groups" className="bg-[#f1ece1] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2 className="text-center font-display text-3xl sm:text-4xl md:text-[42px] text-foreground leading-tight tracking-tight">
            New Jersey support groups
          </h2>

          <div className="mt-12 space-y-5">
            {localGroups.slice(0, visibleCount).map((g) => (
              <article
                key={g.name}
                className="bg-[#FDFCFA] rounded-2xl p-6 md:p-8 border border-[#eae0d0]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-[20px] md:text-[22px] text-foreground leading-tight">
                      {g.name}
                    </h3>
                    <p className="mt-2 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase ${badgeClasses(g.badge.tone)}`}
                  >
                    {g.badge.label}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#eae0d0]">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] md:text-[13px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {g.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                      {g.phone}
                    </span>
                  </div>
                  <a
                    href={g.href}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary hover:text-primary-dark transition-colors"
                  >
                    Visit Site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {visibleCount < localGroups.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisibleCount(localGroups.length)}
                className="rounded-full border border-primary/60 text-primary px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Online communities */}
      <section className="bg-background py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="text-center text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-4">
            Anywhere You Are
          </p>
          <h2 className="text-center font-display text-3xl sm:text-4xl md:text-[42px] text-foreground leading-tight tracking-tight">
            Online communities
          </h2>

          <ul className="mt-12 space-y-8">
            {onlineCommunities.map((c) => (
              <li key={c.name} className="flex gap-4">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0"
                  aria-hidden
                />
                <div>
                  <h3 className="font-display text-[18px] md:text-[20px] text-foreground leading-tight">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                    {c.description}
                  </p>
                  <a
                    href={c.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary hover:text-primary-dark transition-colors"
                  >
                    Visit Site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#f1ece1] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <PlaceholderImage className="aspect-[4/3] w-full" />
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
              Clearing the path for new light
            </h2>
            <p className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-md">
              By gently smoothing the administrative chaos and calming your daily rhythm, my goal is to help you reclaim your energy and move through each day with a hopeful, renewed focus.
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
