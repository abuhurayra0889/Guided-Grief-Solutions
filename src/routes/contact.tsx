import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { SiteNav } from "@/components/ggs/SiteNav";
import { SiteFooter } from "@/components/ggs/SiteFooter";
import { DemoBadge } from "@/components/ggs/DemoBadge";
import { useEmailCaptureMutation } from "@/lib/ggs/queries";
import contactButterflyAsset from "@/assets/contact-butterfly.jpg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Guided Grief Solutions" },
      { name: "description", content: "Reach out to Haley. Compassionate support for widows navigating the legal, financial, and emotional weight of loss." },
      { property: "og:title", content: "Contact Guided Grief Solutions" },
      { property: "og:description", content: "Have questions? Send a message and let's start the conversation." },
    ],
  }),
  component: ContactPage,
});

function Crumbs() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 text-xs tracking-wide text-muted-foreground">
      <Link to="/" className="underline underline-offset-4 hover:text-primary">Home</Link>
      <span className="mx-2">·</span>
      <span>Contact us</span>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Crumbs />
      <Hero />
      <FormSection />
      <ClosingCTA />
      <SiteFooter />
      <DemoBadge />
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-secondary/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-20 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
        <div className="order-2 md:order-1 text-center md:text-left">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
            Contact us
          </h1>
          <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
            If you have any questions or concerns, don't hesitate to contact me. Fill out the form below and let's get the conversation started.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={contactButterflyAsset.url}
            alt="Butterfly resting on vibrant pink wildflowers"
            className="w-full h-auto max-h-[300px] rounded-2xl object-cover shadow-md"
            width={1280}
            height={1024}
          />
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold tracking-wide text-primary mb-2">{label}</span>
      {children}
    </label>
  );
}

const inputClass = "w-full rounded-full border border-primary/30 bg-background px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/60";

function FormSection() {
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "", subject: "", message: "" });
  const capture = useEmailCaptureMutation();
  const update = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    try {
      await capture.mutateAsync({ email: form.email, source: "contact-form" });
      toast.success("Thank you. Your message has been sent - Haley will be in touch soon.");
      setForm({ first: "", last: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send message.");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground mb-10">Send me a message:</h2>
        <form onSubmit={submit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="First Name">
              <input className={inputClass} placeholder="First Name" value={form.first} onChange={update("first")} required maxLength={80} />
            </Field>
            <Field label="Last Name">
              <input className={inputClass} placeholder="Last Name" value={form.last} onChange={update("last")} maxLength={80} />
            </Field>
          </div>
          <Field label="Email">
            <input type="email" className={inputClass} placeholder="you@mail.com" value={form.email} onChange={update("email")} required maxLength={200} />
          </Field>
          <Field label="Phone">
            <input type="tel" className={inputClass} placeholder="888-888-8888" value={form.phone} onChange={update("phone")} maxLength={40} />
          </Field>
          <Field label="Subject">
            <input className={inputClass} placeholder="Subject" value={form.subject} onChange={update("subject")} maxLength={120} />
          </Field>
          <Field label="Message">
            <textarea
              className="w-full rounded-2xl border border-primary/30 bg-background px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary/60 min-h-[180px]"
              placeholder="Enter your message"
              value={form.message}
              onChange={update("message")}
              required
              maxLength={2000}
            />
          </Field>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary/40 hover:bg-primary text-primary-foreground py-4 text-xs font-semibold tracking-[0.3em] uppercase transition-colors"
          >
            Send <ArrowRight className="w-3 h-3" />
          </button>
        </form>
      </div>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="bg-[#f1ece1] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight tracking-tight">
          Take the first step toward a lighter tomorrow
        </h2>
        <p className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-md mx-auto">
          The logistics of loss shouldn’t interrupt your healing. Start simplifying your life today.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
            data-cal-namespace="free-45-min-intro-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-primary-dark transition-colors"
          >
            BOOK FREE CONSULTATION <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
