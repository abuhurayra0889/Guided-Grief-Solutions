import { useState } from "react";
import { X, Sparkles, RotateCcw } from "lucide-react";
import { store } from "@/lib/ggs/mockStore";
import { toast } from "sonner";

export function DemoBadge() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs">
      <div className="bg-card/95 backdrop-blur border border-primary/30 rounded-xl px-4 py-3 shadow-lg flex items-start gap-3">
        <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground">Prototype demo</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            All data is mocked - nothing is saved to a real database.
          </p>
          <button
            onClick={() => {
              store.reset();
              toast.success("Demo reset to seeded state.");
              setTimeout(() => location.reload(), 400);
            }}
            className="mt-2 inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
          >
            <RotateCcw className="h-3 w-3" /> Reset demo
          </button>
        </div>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
