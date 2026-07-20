import { useState } from "react";
import { X } from "lucide-react";

export function DemoBadge() {
  const [open, setOpen] = useState(false);
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 text-[11px] text-muted-foreground hover:text-foreground bg-card/95 border border-border rounded-full px-3 py-1.5 shadow-sm"
      >
        Connected to Supabase
      </button>
    );
  }
  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs">
      <div className="bg-card/95 backdrop-blur border border-primary/30 rounded-xl px-4 py-3 shadow-lg flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">Live data</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            User features read and write to your Supabase database. Admin agent screens still use demo data.
          </p>
        </div>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
