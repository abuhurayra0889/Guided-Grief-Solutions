import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import compassHero from "@/assets/article-compass-hero.jpg";
import parentChild from "@/assets/article-parent-child.jpg";

export const Route = createFileRoute("/articles/helping-children-deal-with-grief")({
  head: () => ({
    meta: [
      { title: "Helping Children Deal with Grief - Guided Grief Solutions" },
      { name: "description", content: "Gentle, practical guidance for parents helping their children navigate loss with honesty, safety, and love." },
      { property: "og:title", content: "Helping Children Deal with Grief" },
      { property: "og:description", content: "A compassionate guide for grieving parents supporting grieving children." },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <div className="bg-background min-h-screen">
      <DemoBadge />
      <SiteNav />

      {/* Hero band */}
      <section className="bg-[#f1ece1]">
        <div className="max-w-6xl mx-auto px-6 md:px-10 pt-6">
          <nav className="text-caption text-muted-foreground flex items-center gap-2">
            <Link to="/" className="text-foreground underline underline-offset-4 decoration-foreground/40 hover:text-primary">Home</Link>
            <span className="text-muted-foreground/60">·</span>
            <Link to="/faqs" className="hover:text-primary">The Resource Library</Link>
            <span className="text-muted-foreground/60">·</span>
            <span className="text-muted-foreground">Helping children deal with grief</span>
          </nav>
        </div>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-14 grid md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-center">
          <img
            src={compassHero}
            alt="Hand holding a compass in front of mountains"
            width={1280}
            height={896}
            className="w-full h-56 md:h-64 object-cover rounded-md"
          />
          <div>
            <div className="flex items-center gap-4 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary mb-4">
              <span>Parenting</span>
              <span className="text-muted-foreground">8 min read</span>
            </div>
            <h1 className="font-display text-3xl md:text-5xl leading-tight text-foreground">
              Helping Children Deal with Grief
            </h1>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-2xl mx-auto px-6 md:px-0 py-14 md:py-20 text-foreground/85 leading-relaxed">
        <p>
          When you are navigating the heavy fog of your own grief, the thought of guiding your children through theirs can feel overwhelming. Please know that <strong>you</strong> do not have to be perfect to be exactly what they need. Your presence, even in your sadness, is their greatest anchor.
        </p>
        <p className="mt-5">
          While you cannot take away their pain, you can create a sanctuary of safety and honesty where they feel seen, heard and held.
        </p>

        <h2 className="font-display text-2xl md:text-3xl mt-12 mb-4 text-foreground">Laying the foundation: gentle honesty</h2>
        <p>
          It is natural to want to protect your children from the harshness of loss, but children are intuitive. They find comfort in the truth when it is delivered with love.
        </p>
        <ul className="mt-5 space-y-3 list-disc pl-5">
          <li><strong>Follow their lead:</strong> Think of yourself as a quiet companion on their journey. Answer the questions they ask, but don't feel pressured to provide every detail. If they ask about the flowers at the service, talk about the flowers. This prevents them from feeling overwhelmed by more than they can process.</li>
          <li><strong>The "I don't know" bridge:</strong> If they ask a spiritual or existential question you aren't ready for, it is okay to say: "That is a big, beautiful question. I'm still thinking about that myself. What do you think happens?"</li>
          <li><strong>It's okay to be human:</strong> You don't have to hide your tears. Seeing you grieve gives them permission to feel their own sadness. However, try to share the news when you feel you can be a steady presence.</li>
          <li><strong>Don't hesitate to seek help:</strong> Professional counseling is often a good idea, no matter how old or how young a child is.</li>
        </ul>

        <img
          src={parentChild}
          alt="Parent and child walking together in a forest"
          loading="lazy"
          width={1280}
          height={896}
          className="w-full h-auto rounded-md my-12"
        />

        <h2 className="font-display text-2xl md:text-3xl mt-4 mb-4 text-foreground">Creating a space for their hearts</h2>
        <p>Children express grief in waves. They may cry one minute and want to play tag the next. This is healthy and normal.</p>
        <ul className="mt-5 space-y-3 list-disc pl-5">
          <li><strong>Listen with your whole self:</strong> When they speak, try to repeat back what they've said without judging it. If they say, "I'm mad that Daddy left," you might say, "I hear that you're feeling very angry. It's okay to feel that way."</li>
          <li><strong>Acknowledge, don't dismiss:</strong> Avoid saying "don't worry" or "you'll be fine." Instead, validate them: "It makes sense that you feel scared right now. We are going to take care of each other."</li>
          <li><strong>The comfort of routine:</strong> In a world that feels upside down, the same old things are incredibly grounding. Keeping bedtimes, mealtimes, and school schedules as consistent as possible reminds them that their world is still standing.</li>
        </ul>

        <blockquote className="my-12 text-center font-display text-2xl md:text-3xl leading-snug text-foreground/90 px-4">
          "Your presence, even in your sadness, is their greatest anchor."
        </blockquote>

        <h2 className="font-display text-2xl md:text-3xl mt-4 mb-4 text-foreground">Tools for the hard moments</h2>
        <p>When "everything will be okay" feels like a promise you can't quite make yet, focus on the now.</p>
        <ul className="mt-5 space-y-3 list-disc pl-5">
          <li><strong>The 'right now' safety:</strong> If they are anxious about the future, bring them back to the present. "We are safe in this house right now. We are together right now."</li>
          <li><strong>Grounding the senses:</strong> Teach them to notice five things they can see, four they can touch, and three they can hear. This pulls their mind out of the what-ifs and back into their bodies.</li>
          <li><strong>Keeping the connection:</strong> Encourage them to draw pictures, write letters, or share stories about the person they lost. Keeping photos visible and saying their name aloud keeps their memory a warm, living part of your home.</li>
        </ul>

        <h3 className="font-display text-xl md:text-2xl mt-10 mb-3 text-foreground">Navigating traumatic loss (suicide or overdose)</h3>
        <p>If the death was sudden or traumatic, the truth feels even heavier. Experts suggest a layered approach:</p>
        <ol className="mt-5 space-y-3 list-decimal pl-5">
          <li><strong>Start with the body:</strong> "Their brain or body was very, very sick."</li>
          <li><strong>Add the complexity:</strong> "They had a disease called addiction (or mental illness) that made it hard for their brain to make healthy choices."</li>
          <li><strong>The reassurance:</strong> "Many people have this illness and get better, but their body just wasn't strong enough this time. It is not something you can 'catch' like a cold."</li>
        </ol>

        <h2 className="font-display text-2xl md:text-3xl mt-12 mb-4 text-foreground">When the winter of grief lingers</h2>
        <p>While there is no timeline for mourning, complex grief is when a child feels stuck. Look for:</p>
        <ul className="mt-5 space-y-3 list-disc pl-5">
          <li><strong>Total apathy:</strong> Losing interest in <em>all</em> activities they used to love for months on end.</li>
          <li><strong>Safety fears:</strong> Refusing to leave your side or go to school because they are terrified you will also die.</li>
          <li><strong>Physical ailments:</strong> Frequent stomachaches or headaches that have no medical cause but coincide with the loss.</li>
        </ul>
        <p className="mt-5">
          If you notice persistent nightmares, a total withdrawal from friends, or physical regressions (like bedwetting) that last longer than six months, reaching out to a professional counselor can provide your child with extra tools to navigate their path.
        </p>
        <p className="mt-5">
          You cannot pour from an empty cup. Children heal best when the adults around them are also supported. Seeking a therapist, joining a support group, or simply asking a friend to take the kids for an hour so you can rest is not a sign of weakness. It is a vital part of being a good parent.
        </p>
        <p className="mt-5">
          Remember, you are planting seeds of resilience in your children. One day, the sharp edges of this grief will soften into a quiet, enduring love. You are doing a beautiful job in the hardest of circumstances.
        </p>
      </article>

      {/* Related articles */}
      <section className="bg-[#f1ece1] py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="text-center text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-10">Related articles</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background rounded-md overflow-hidden border border-border/40">
                <img src={compassHero} alt="" loading="lazy" className="w-full h-44 object-cover" />
                <div className="p-5">
                  <span className="inline-block text-[10px] font-semibold tracking-[0.25em] uppercase text-primary border border-primary/40 rounded-full px-2.5 py-0.5 mb-3">Self care</span>
                  <h3 className="font-display text-lg leading-snug mb-2">Finding Stillness: A Daily Ritual for the Grieving Mind</h3>
                  <p className="text-xs text-muted-foreground mb-4">A short hook or teaser text for this article.</p>
                  <a href="#" className="text-[11px] font-semibold tracking-[0.25em] uppercase text-primary hover:underline">Read article →</a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/faqs" className="inline-block rounded-full border border-primary/60 px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Back to Resource Library
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}



