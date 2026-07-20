import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import heroLakeAsset from "@/assets/hero-lake-edited.jpg.asset.json";
const heroBg = heroLakeAsset.url;

export const Route = createFileRoute("/daily-affirmation")({
  head: () => ({
    meta: [
      { title: "Daily Affirmation - Guided Grief Solutions" },
      { name: "description", content: "A daily affirmation to help you find strength and peace in your grief journey." },
    ],
  }),
  component: DailyAffirmationPage,
});

type LocalGroup = {
  name: string;
  description?: string;
  items?: { title: string; description: string }[];
  location: string;
  phone: string;
  badge: { label: string; tone: "green" | "yellow" | "rose" };
  href: string;
};

const localGroups: LocalGroup[] = [
  {
    name: "Affirmations work quietly to help you find your footing again",
    items: [
      {
        title: "Nurturing your mind",
        description: "Like a garden, your mind begins to ‘rewire’ itself and heal when tended with kindness.",
      },
      {
        title: "Restoring confidence",
        description: "They gently remind you of your enduring worth and capability during uncertain times.",
      },
      {
        title: "Creating calm",
        description: "Focusing on uplifting truths lowers the volume of anxiety, creating a peaceful space to breathe and heal.",
      },
    ],
    location: "Morristown & Princeton",
    phone: "(908) 522-1999",
    badge: { label: "ADD A MEMBER/A FEW MEMBERS", tone: "rose" },
    href: "#",
  },
  {
    name: "How to nurture your practice",
    items: [
      {
        title: "Be consistent",
        description: "Find a small, quiet moment each day to let these truths take root in your heart.",
      },
      {
        title: "Feel the warmth",
        description: "Instead of just reciting them, lean into the comfort and strength behind them.",
      },
      {
        title: "Keep it personal",
        description: "Use ‘I statements in the present tense to ground yourself in the ‘now’",
      },
    ],
    location: "Multiple Counties",

    phone: "(866) 930-2201",
    badge: { label: "WIDOWS & WIDOWERS", tone: "yellow" },
    href: "#",
  },
  {
    name: "Jewish Family & Children's Services (JFCS)",
    description:
      "A non-profit dedicated to widowed men and women. Offers structured 10-week support sessions across Atlantic, Burlington, Camden, Cape May, Gloucester, and Mercer counties.",
    location: "Multiple Counties",
    phone: "(866) 930-2201",
    badge: { label: "IN PERSON & VIRTUAL", tone: "rose" },
    href: "#",
  },
  {
    name: "Journey Through Grief",
    description:
      "A mutual self-help bereavement group open to all widowed persons offering peer-led community support.",
    location: "Hamilton Square, NJ",
    phone: "(609) 587-1070",
    badge: { label: "ALL BEREAVED SPOUSES", tone: "rose" },
    href: "#",
  },
];

function DailyAffirmationPage() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <section className="mt-20 md:mt-24">
        <div className="relative h-[50vh] min-h-[300px] overflow-hidden">
          <img
            src={heroBg}
            alt="Peaceful nature background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
        </div>
      </section>
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <div className="mt-0 p-10 bg-[#eaf1e9] rounded-2xl">
          <p className="font-display text-2xl md:text-3xl text-[#3d4e19] leading-relaxed italic">
            &ldquo;I am allowed to grieve, and I am allowed to heal - both can exist at the same time.&rdquo;
          </p>
        </div>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          These affirmations are updated daily. I hope you’ll visit again soon for another dose of inspiration.
        </p>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          - Haley
        </p>
      </main>

      {/* Local NJ groups */}
      <section id="local-groups" className="bg-[#f1ece1] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <h2 className="text-center font-display text-3xl sm:text-4xl md:text-[42px] text-foreground leading-tight tracking-tight">
            The healing gifts of daily affirmations
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-left">
            In the quiet moments of a new chapter you never asked to write, it is natural to feel adrift. Please know that it is okay to move slowly. As you navigate this path, there is a gentle, evidence-based practice that can act as an anchor for your soul: Daily affirmations.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed text-left">
            These are more than just words; they are soft whispers of truth designed to soothe your spirit and help you reclaim your inner strength. By intentionally choosing supportive thoughts, you begin to weave a safety net of hope that supports you today and carries you forward throughout your healing journey.
          </p>

          <div className="mt-12 space-y-5">
            {localGroups.slice(0, 2).map((g) => (
              <article
                key={g.name}
                className="bg-[#FDFCFA] rounded-2xl p-6 md:p-8 border border-[#eae0d0]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-[20px] md:text-[22px] text-foreground leading-tight">
                      {g.name}
                    </h3>
                    {g.items ? (
                      <ul className="mt-2 list-disc pl-5 space-y-2 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                        {g.items.map((item) => (
                          <li key={item.title}>
                            <p className="font-bold text-foreground">{item.title}</p>
                            <p>{item.description}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-[13px] md:text-[14px] text-muted-foreground leading-relaxed">
                        {g.description}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed text-left">
            Daily affirmations are more than just words. They are soft whispers of truth designed to soothe your spirit and help you reclaim your inner strength.
          </p>
        </div>
      </section>


      {/* CTA Banner */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
            From chaos to calm
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto">
            Guided Grief Solutions can help lessen the complex administrative burden you are carrying, so you can focus on healing, instead of paperwork.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/#services"
              className="inline-flex items-center gap-2 rounded-full border border-primary/60 text-primary px-7 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              GET STARTED <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

