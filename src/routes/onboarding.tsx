import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/ggs/useAuth";
import { US_STATES } from "@/lib/ggs/states";
import { toast } from "sonner";
import { store } from "@/lib/ggs/mockStore";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome - GGS" }] }),
  component: Onboarding,
});

const URGENT = [
  { v: "probate_estate", l: "Probate & estate" },
  { v: "benefits_ssa", l: "Benefits & Social Security" },
  { v: "financial_accounts", l: "Financial accounts" },
  { v: "housing_utilities", l: "Housing & utilities" },
  { v: "emotional_support", l: "Emotional support" },
  { v: "all_of_the_above", l: "All of the above" },
];

const STAGES = [
  { v: "just_happened", l: "Just happened (0–30 days)" },
  { v: "finding_footing", l: "Finding my footing (1–6 months)" },
  { v: "rebuilding", l: "Rebuilding (6 months–2 years)" },
  { v: "moving_forward", l: "Moving forward (2+ years)" },
];

function Onboarding() {
  const navigate = useNavigate();
  const { user, profile, signInAs } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile?.full_name || "");
  const [email, setEmail] = useState(profile?.email || "");
  const [lossDate, setLossDate] = useState(profile?.loss_date || "");
  const [stateCode, setStateCode] = useState(profile?.state_code || "NJ");
  const [needs, setNeeds] = useState<string[]>(profile?.urgent_needs || []);
  const [stage, setStage] = useState<string>(profile?.grief_stage || "");

  useEffect(() => { if (!user) signInAs("user"); }, [user, signInAs]);

  const monthsSince = lossDate ? Math.max(0, Math.floor((Date.now() - new Date(lossDate).getTime()) / (1000 * 60 * 60 * 24 * 30))) : null;
  const toggleNeed = (v: string) => setNeeds((n) => n.includes(v) ? n.filter((x) => x !== v) : [...n, v]);

  const finish = () => {
    store.updateProfile({
      full_name: name, email, loss_date: lossDate, state_code: stateCode,
      grief_stage: stage, urgent_needs: needs,
    });
    toast.success("Your space is ready.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid place-items-center bg-secondary/40 p-6">
      <div className="w-full max-w-xl bg-card border border-border rounded-2xl p-8 md:p-10 fade-in">
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-primary" : "bg-border"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5 slide-up">
            <h1 className="font-display text-3xl">A few details, gently.</h1>
            <p className="text-muted-foreground">This helps us tailor your guidance.</p>
            <div className="space-y-3">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full px-4 py-3 rounded-md border border-border bg-background" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-md border border-border bg-background" />
              <label className="block text-sm text-muted-foreground">Date of loss
                <input type="date" value={lossDate.slice(0, 10)} onChange={(e) => setLossDate(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-md border border-border bg-background" />
              </label>
              <label className="block text-sm text-muted-foreground">State of residence
                <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} className="mt-1 w-full px-4 py-3 rounded-md border border-border bg-background">
                  {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
                </select>
              </label>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep(2)} disabled={!name || !email || !lossDate}
                className="px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50">Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5 slide-up">
            <h1 className="font-display text-3xl">Your situation</h1>
            {monthsSince !== null && (
              <p className="text-sm text-muted-foreground">It's been about <span className="text-foreground font-medium">{monthsSince} {monthsSince === 1 ? "month" : "months"}</span> since your loss.</p>
            )}
            <p className="text-foreground">What feels most urgent right now?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {URGENT.map((u) => {
                const on = needs.includes(u.v);
                return (
                  <button key={u.v} type="button" onClick={() => toggleNeed(u.v)}
                    className={`text-left px-4 py-3 rounded-md border transition-colors ${on ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                    {u.l}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)} className="px-4 py-2 text-muted-foreground">Back</button>
              <button onClick={() => setStep(3)} disabled={needs.length === 0}
                className="px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5 slide-up">
            <h1 className="font-display text-3xl">Where are you in this?</h1>
            <p className="text-muted-foreground">There's no right answer. This helps us personalize your experience.</p>
            <div className="space-y-2">
              {STAGES.map((s) => (
                <button key={s.v} type="button" onClick={() => setStage(s.v)}
                  className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${stage === s.v ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                  {s.l}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)} className="px-4 py-2 text-muted-foreground">Back</button>
              <button onClick={finish} disabled={!stage}
                className="px-5 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary-dark disabled:opacity-50">Enter my space</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
