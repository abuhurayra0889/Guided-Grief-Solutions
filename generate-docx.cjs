const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
        Header, Footer, PageNumber, ExternalHyperlink } = require('docx');

// Page setup constants
const PAGE_WIDTH = 12240;  // 8.5 inches
const PAGE_HEIGHT = 15840; // 11 inches
const MARGIN = 1440;       // 1 inch
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN; // 9360

// Color constants
const COLOR_PRIMARY = "5A7D5A";
const COLOR_DARK = "2C3E2C";
const COLOR_LIGHT_BG = "F4F6F4";
const COLOR_MUTED = "6B7B6B";
const COLOR_BORDER = "D5DDD5";

const cellBorder = { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function heading1(text) {
  return new Paragraph({
    spacing: { before: 360, after: 180 },
    children: [new TextRun({ text, bold: true, size: 36, color: COLOR_DARK, font: "Montserrat" })]
  });
}

function heading2(text) {
  return new Paragraph({
    spacing: { before: 280, after: 120 },
    children: [new TextRun({ text, bold: true, size: 26, color: COLOR_PRIMARY, font: "Montserrat" })]
  });
}

function bodyText(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, size: 22, color: COLOR_DARK, font: "Montserrat", ...opts })]
  });
}

function bullet(text) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    indent: { left: 720, hanging: 360 },
    children: [new TextRun({ text: "• " + text, size: 22, color: COLOR_DARK, font: "Montserrat" })]
  });
}

function codeBlock(lines) {
  return new Paragraph({
    spacing: { before: 120, after: 120 },
    shading: { fill: COLOR_LIGHT_BG, type: ShadingType.CLEAR },
    indent: { left: 240, right: 240 },
    children: [new TextRun({ text: lines, size: 18, color: COLOR_DARK, font: "Consolas" })]
  });
}

function makeTable(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  const headerCells = headers.map((h, i) => new TableCell({
    borders: cellBorders,
    width: { size: colWidths[i], type: WidthType.DXA },
    shading: { fill: COLOR_LIGHT_BG, type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, color: COLOR_DARK, font: "Montserrat" })] })]
  }));

  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders: cellBorders,
      width: { size: colWidths[i], type: WidthType.DXA },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, color: COLOR_DARK, font: "Montserrat" })] })]
    }))
  }));

  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({ children: headerCells }),
      ...dataRows
    ]
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Montserrat", size: 22 }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
        margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "Embrace Compassion — Design System", size: 18, color: COLOR_MUTED, font: "Montserrat" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 18, color: COLOR_MUTED, font: "Montserrat" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 18, color: COLOR_MUTED, font: "Montserrat" })
          ]
        })]
      })
    },
    children: [
      // Title
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 600, after: 120 },
        children: [new TextRun({ text: "Embrace Compassion", bold: true, size: 52, color: COLOR_DARK, font: "Montserrat" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
        children: [new TextRun({ text: "Design System", size: 36, color: COLOR_PRIMARY, font: "Montserrat" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "A complete reference for replicating the Embrace Compassion visual identity on another app.", size: 22, color: COLOR_MUTED, font: "Montserrat" })]
      }),

      // 1. Philosophy
      heading1("1. Philosophy"),
      bodyText("Tone: Warm, serene, organic wellness. The design avoids corporate sterility in favor of a gentle, nature-inspired palette and editorial typography. It feels like a trusted guide — calm, approachable, and intentional."),
      bodyText("Differentiation: Soft sage greens paired with warm linen backgrounds, a signature script accent (Lavishly Yours) for personal touches, and the distinctive Gotu serif for headings create an unmistakable wellness / grief-support aesthetic."),

      // 2. Color Palette
      heading1("2. Color Palette"),
      bodyText("All colors are defined as OKLCH values in CSS custom properties.", { italic: true }),
      makeTable(
        ["Token", "OKLCH Value", "Role"],
        [
          ["--background", "oklch(0.965 0.012 75)", "Page background — warm linen"],
          ["--foreground", "oklch(0.22 0.015 60)", "Primary text — soft charcoal"],
          ["--card", "oklch(0.985 0.008 75)", "Card surface"],
          ["--card-foreground", "oklch(0.22 0.015 60)", "Card text"],
          ["--popover", "oklch(1 0 0)", "Dropdown / popover surface"],
          ["--popover-foreground", "oklch(0.22 0.015 60)", "Popover text"],
          ["--primary", "oklch(0.52 0.045 145)", "Main accent — muted sage green"],
          ["--primary-foreground", "oklch(0.98 0.005 75)", "Text on primary"],
          ["--primary-dark", "oklch(0.40 0.05 145)", "Darker sage for emphasis"],
          ["--secondary", "oklch(0.93 0.015 75)", "Secondary surface"],
          ["--secondary-foreground", "oklch(0.30 0.04 145)", "Text on secondary"],
          ["--muted", "oklch(0.94 0.012 75)", "Muted backgrounds"],
          ["--muted-foreground", "oklch(0.48 0.02 60)", "Secondary / muted text"],
          ["--accent", "oklch(0.78 0.05 145)", "Lighter sage accent"],
          ["--accent-foreground", "oklch(0.22 0.04 145)", "Text on accent"],
          ["--destructive", "oklch(0.6 0.18 25)", "Error red"],
          ["--destructive-foreground", "oklch(1 0 0)", "Text on destructive"],
          ["--border", "oklch(0.92 0.01 70)", "Borders, dividers"],
          ["--input", "oklch(0.92 0.01 70)", "Form input borders"],
          ["--ring", "oklch(0.52 0.045 145)", "Focus ring (same as primary)"],
          ["--surface", "oklch(0.93 0.015 75)", "Elevated surface"],
        ],
        [2800, 3400, 3160]
      ),
      new Paragraph({ spacing: { before: 160 }, children: [] }),
      bodyText("Additional card colors (hardcoded):", { bold: true }),
      bullet("Normal card background: #FDFCFA"),
      bullet("Card hover state: #EAF1E9"),

      // 3. Typography
      heading1("3. Typography"),
      heading2("Font Families"),
      makeTable(
        ["Role", "Font", "Fallbacks"],
        [
          ["Display / Headings", "Gotu", "Georgia, serif"],
          ["Body / UI", "Montserrat", "system-ui, sans-serif"],
          ["Signature / Script accent", "Lavishly Yours", "cursive"],
        ],
        [3000, 2800, 3560]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "All three are Google Fonts. Load them via <link> in your HTML head (do not use @import in CSS with Tailwind v4).", size: 20, color: COLOR_MUTED, font: "Montserrat", italic: true })] }),

      heading2("Type Scale — Desktop"),
      makeTable(
        ["Token", "Size", "Line Height", "Letter Spacing", "Font Family"],
        [
          [".text-hero", "57px", "64px", "-0.02em", "Gotu"],
          [".text-h1", "48px", "56px", "-0.02em", "Gotu"],
          [".text-h2", "40px", "52px", "-0.02em", "Gotu"],
          [".text-h3", "33px", "40px", "0", "Gotu"],
          [".text-h4", "30px", "38px", "0", "Gotu"],
          [".text-h5", "24px", "32px", "0", "Gotu"],
          [".text-h6", "20px", "28px", "0", "Gotu"],
          [".text-body-lg", "20px", "28px", "—", "Montserrat"],
          [".text-body", "18px", "28px", "—", "Montserrat"],
          [".text-body-sm", "16px", "24px", "—", "Montserrat"],
          [".text-caption", "13px", "18px", "—", "Montserrat"],
          [".text-eyebrow", "13px", "13px", "0.154em", "Montserrat, semibold, uppercase"],
          [".text-signature", "52px", "56px", "—", "Lavishly Yours"],
        ],
        [2200, 1400, 1600, 1800, 2360]
      ),

      heading2("Type Scale — Mobile (≤768px)"),
      makeTable(
        ["Token", "Size", "Line Height", "Letter Spacing"],
        [
          [".text-hero", "36px", "44px", "-0.01em"],
          [".text-h1", "32px", "40px", "-0.01em"],
          [".text-h2", "28px", "36px", "-0.01em"],
          [".text-h3", "22px", "34px", "—"],
          [".text-h4", "22px", "30px", "—"],
          [".text-h5", "20px", "28px", "—"],
          [".text-h6", "18px", "26px", "—"],
          [".text-eyebrow", "12px", "12px", "—"],
          [".text-signature", "48px", "52px", "—"],
        ],
        [2800, 1800, 2000, 2760]
      ),

      heading2("Font Weight Rules"),
      bullet("Headings (Gotu): always font-weight: 400 (Gotu only has Regular). Rely on size and letter-spacing for hierarchy."),
      bullet("Body (Montserrat): default 400, semibold (600) for emphasis, buttons, eyebrows."),
      bullet("Signature (Lavishly Yours): always font-weight: 400."),

      // 4. Spacing & Shape
      heading1("4. Spacing & Shape"),
      makeTable(
        ["Token", "Value"],
        [
          ["--radius", "1rem (16px)"],
          ["--radius-sm", "calc(var(--radius) - 4px) → 12px"],
          ["--radius-md", "calc(var(--radius) - 2px) → 14px"],
          ["--radius-lg", "1rem"],
          ["--radius-xl", "calc(var(--radius) + 4px) → 20px"],
          ["--radius-2xl", "calc(var(--radius) + 8px) → 24px"],
        ],
        [3600, 5760]
      ),
      new Paragraph({ spacing: { before: 160 }, children: [new TextRun({ text: "Border radius strategy: Generous rounding (12–24px) on cards, buttons, and images. Creates a soft, approachable feel.", size: 20, color: COLOR_MUTED, font: "Montserrat", italic: true })] }),

      // 5. Shadows
      heading1("5. Shadows"),
      bodyText("Cards use shadow (Tailwind default shadow class). The overall shadow approach is minimal and soft — no harsh drop shadows."),

      // 6. Components
      heading1("6. Components"),
      heading2("Button"),
      codeBlock(`Base: inline-flex items-center justify-center gap-2 whitespace-nowrap
rounded-md text-sm font-medium transition-colors
focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
disabled:pointer-events-none disabled:opacity-50

Variants:
• default: bg-primary text-primary-foreground shadow hover:bg-primary/90
• destructive: bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90
• outline: border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground
• secondary: bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80
• ghost: hover:bg-accent hover:text-accent-foreground
• link: text-primary underline-offset-4 hover:underline

Sizes:
• default: h-9 px-4 py-2
• sm: h-8 rounded-md px-3 text-xs
• lg: h-10 rounded-md px-8
• icon: h-9 w-9`),

      heading2("Card"),
      codeBlock(`Container: rounded-xl border bg-card text-card-foreground shadow
Header: flex flex-col space-y-1.5 p-6
Title: font-semibold leading-none tracking-tight
Description: text-sm text-muted-foreground
Content: p-6 pt-0
Footer: flex items-center p-6 pt-0

Custom card style (used in "Find the right level of support"):
• Normal background: #FDFCFA
• Hover background: #EAF1E9
• Transition: transition-colors`),

      // 7. Animation
      heading1("7. Animation"),
      makeTable(
        ["Class", "Animation", "Duration", "Easing"],
        [
          [".fade-in", "opacity 0→1, translateY(8px→0)", "500ms", "cubic-bezier(0.16, 1, 0.3, 1)"],
          [".slide-up", "opacity 0→1, translateY(14px→0)", "600ms", "cubic-bezier(0.16, 1, 0.3, 1)"],
          [".delay-1", "60ms delay", "", ""],
          [".delay-2", "120ms delay", "", ""],
          [".delay-3", "180ms delay", "", ""],
          [".delay-4", "240ms delay", "", ""],
        ],
        [2200, 3200, 1400, 2560]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [new TextRun({ text: "Staggered entrance animations are used for cards and sections.", size: 20, color: COLOR_MUTED, font: "Montserrat", italic: true })] }),

      // 8. Base Styles
      heading1("8. Base Styles"),
      codeBlock(`html { scroll-behavior: smooth; }
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
::selection {
  background-color: var(--color-accent);
  color: var(--color-accent-foreground);
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}`),

      // 9. Tailwind v4 Setup
      heading1("9. Tailwind v4 Setup"),
      bodyText("This project uses Tailwind CSS v4 (CSS-first, no tailwind.config.js)."),
      heading2("src/styles.css structure"),
      codeBlock(`@import "tailwindcss";

@font-face { /* Gotu, Montserrat, Lavishly Yours */ }

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Montserrat', system-ui, sans-serif;
  --font-display: 'Gotu', Georgia, serif;
  --font-serif: 'Gotu', Georgia, serif;
  --font-signature: 'Lavishly Yours', cursive;
  /* map all --color-* tokens to CSS vars */
}

:root {
  --radius: 1rem;
  /* all color tokens as OKLCH */
}`),
      heading2("Key Tailwind v4 rules"),
      bullet("Use @import \"tailwindcss\" (not the v3 @tailwind directives)"),
      bullet("Define tokens in @theme inline {} (not tailwind.config.js)"),
      bullet("Load fonts via <link> in HTML head (not @import URLs in CSS)"),
      bullet("Custom utilities use @utility (not @layer utilities)"),

      // 10. CSS Quick Reference
      heading1("10. CSS Quick Reference"),
      bodyText("Copy these utility classes when building components:"),
      codeBlock(`/* Font family helpers */
.font-display  → font-family: var(--font-display); font-weight: 400; letter-spacing: -0.02em;
.font-signature → font-family: var(--font-signature); font-weight: 400;

/* Typography */
.text-hero, .text-h1, .text-h2, .text-h3, .text-h4, .text-h5, .text-h6
.text-body-lg, .text-body, .text-body-sm, .text-caption
.text-eyebrow  → uppercase, semibold, wide tracking
.text-signature → Lavishly Yours script

/* Animation */
.fade-in, .slide-up, .delay-1 … .delay-4`),

      // 11. Visual Principles
      heading1("11. Visual Principles"),
      bullet("No harsh contrasts — everything is softened. Even the \"black\" text is a warm charcoal."),
      bullet("Generous whitespace — sections breathe. Padding is ample."),
      bullet("Nature-inspired imagery — soft florals, landscapes, butterflies. Images are warm-toned."),
      bullet("Script accents — use Lavishly Yours for personal signatures, quotes, or warm callouts."),
      bullet("Card hover — always a subtle background shift to a lighter sage (#EAF1E9), never a border change or scale transform."),
      bullet("No purple / blue gradients — the palette is strictly warm neutrals + sage green."),

      new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: "Generated from the Embrace Compassion codebase. Use this document to replicate the exact look and feel on any other app.", size: 20, color: COLOR_MUTED, font: "Montserrat", italic: true })] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/mnt/documents/embrace-compassion-design-system.docx", buffer);
  console.log("DOCX created successfully");
}).catch(err => {
  console.error("Error creating DOCX:", err);
  process.exit(1);
});
