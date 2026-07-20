import { Link } from "@tanstack/react-router";
import { useState, type AnchorHTMLAttributes } from "react";
import { LogoMark } from "./SiteNav";
import footerWatermark from "@/assets/ggs-footer-watermark.png.asset.json";

type FooterLink =
  | { label: string; to: "/" | "/about" | "/contact" | "/faqs" | "/auth" | "/resource-library" | "/services" | "/articles/helping-children-deal-with-grief" }
  | { label: string; href: string }
  | { label: string; attrs: AnchorHTMLAttributes<HTMLAnchorElement> & Record<string, string> };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "About", to: "/about" },
      { label: "Services & Packages", to: "/services" },
      { label: "Daily Affirmation", href: "#" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Library", to: "/resource-library" },
      { label: "Support Groups", href: "#" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Book a Free Call", attrs: { "data-cal-link": "guidedgriefsolutions/free-45-min-intro-call", "data-cal-namespace": "free-45-min-intro-call", "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}' } },
      { label: "The First Steps - Free Guide", to: "/auth" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

export function SiteFooter() {
  const colLinks =
    "block text-[13px] font-bold tracking-[0.12em] uppercase text-foreground/85 hover:text-primary transition-colors cursor-pointer";
  const colHeader =
    "font-display font-normal text-[26px] leading-none text-foreground/80 pb-3 mb-6 border-b border-foreground/25 inline-block min-w-[160px]";

  return (
    <footer className="relative bg-[#faf6ef] border-t border-foreground/15 overflow-hidden">
      <img
        src={footerWatermark.url}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[57vw] w-auto h-full object-contain opacity-[0.05] select-none max-md:left-0 max-md:w-auto max-md:h-[690px] max-md:top-0 max-md:object-cover max-md:object-[22%]"
      />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pt-12 md:pt-16 pb-10">
        {/* Mobile logo + socials */}
        <div className="flex flex-col items-center md:hidden">
          <Link to="/" aria-label="Guided Grief Solutions" className="block">
            <LogoMark className="h-28 w-auto" />
          </Link>
          <div className="mt-5 flex items-center gap-5 text-primary">
            <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><SocialIcon name="facebook" /></a>
            <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><SocialIcon name="instagram" /></a>
            <a href="#" aria-label="TikTok" className="hover:opacity-70 transition-opacity"><SocialIcon name="tiktok" /></a>
            <a href="#" aria-label="Pinterest" className="hover:opacity-70 transition-opacity"><SocialIcon name="pinterest" /></a>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden mt-10 flex flex-col">
          {columns.map((col) => (
            <FooterAccordion key={col.title} title={col.title}>
              <div className="space-y-5 pb-6 pt-2 pl-4">
                {col.links.map((l) =>
                  "to" in l ? (
                    <Link key={l.label} to={l.to} className={colLinks}>{l.label}</Link>
                  ) : "href" in l ? (
                    <a key={l.label} href={l.href} className={colLinks}>{l.label}</a>
                  ) : (
                    <a key={l.label} className={colLinks} {...l.attrs}>{l.label}</a>
                  )
                )}
              </div>
            </FooterAccordion>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-10 items-start">
          <div className="flex flex-col items-center">
            <Link to="/" aria-label="Guided Grief Solutions" className="block">
              <LogoMark className="h-28 w-auto" />
            </Link>
            <div className="mt-6 flex items-center gap-3 text-primary">
              <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><SocialIcon name="facebook" /></a>
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><SocialIcon name="instagram" /></a>
              <a href="#" aria-label="TikTok" className="hover:opacity-70 transition-opacity"><SocialIcon name="tiktok" /></a>
              <a href="#" aria-label="Pinterest" className="hover:opacity-70 transition-opacity"><SocialIcon name="pinterest" /></a>
            </div>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className={colHeader}>{col.title}</h3>
              <div className="space-y-5">
                {col.links.map((l) =>
                  "to" in l ? (
                    <Link key={l.label} to={l.to} className={colLinks}>{l.label}</Link>
                  ) : "href" in l ? (
                    <a key={l.label} href={l.href} className={colLinks}>{l.label}</a>
                  ) : (
                    <a key={l.label} className={colLinks} {...l.attrs}>{l.label}</a>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="md:mt-14 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-[13px] text-foreground/60">
          <p>© {new Date().getFullYear()} Guided Grief Solutions by Abundance After Loss LLC. All rights reserved.</p>
        </div>
        <div className="mt-6 pt-6 border-t border-foreground/15 text-[12px] leading-relaxed text-foreground/60">
          <p>
            The information on this website and its content is provided for general educational purposes only and does not constitute legal, financial, tax, medical, or other professional advice. AAL and Guided Grief Solutions does not provide professional services or individualized advice through its website or content/articles. Because laws, regulations, and best practices are subject to change and vary by circumstance, you should consult a qualified professional regarding your specific situation. Guided Grief Solutions can, however, provide access to independent professionals. Your use of or reliance on this website does not create a professional-client relationship with Guided Grief Solutions.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterAccordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(title === "Explore");
  return (
    <div className="border-t border-foreground/20 last:border-b">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-display font-normal text-[26px] leading-none text-foreground/80">{title}</span>
        {open ? (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M4 16H28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M4 16H16M16 16H28M16 16V4M16 16V28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/70" />
          </svg>
        )}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function SocialIcon({ name }: { name: "facebook" | "instagram" | "tiktok" | "pinterest" }) {
  const common = { width: 28, height: 28, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "facebook") return (
    <svg {...common}><path d="M17.9654 27.8394C20.2238 27.4644 22.3277 26.4512 24.0291 24.9194C25.7304 23.3876 26.9581 21.4011 27.5673 19.1942C28.1765 16.9874 28.1418 14.6523 27.4672 12.4646C26.7927 10.2768 25.5064 8.32769 23.7603 6.84716C22.0142 5.36662 19.881 4.41648 17.6125 4.10885C15.344 3.80121 13.0348 4.14892 10.9575 5.11094C8.88015 6.07297 7.12133 7.60916 5.88854 9.53826C4.65576 11.4674 4.00047 13.7088 4 15.9982C3.99962 18.8388 5.00675 21.5873 6.84226 23.755C8.67776 25.9228 11.2239 27.3691 14.0255 27.8368C15.3298 28.0535 16.6608 28.0544 17.9654 27.8394ZM14.0255 27.8368L14.0242 21.3434H11.5632C11.3568 21.3434 11.1588 21.2614 11.0128 21.1154C10.8669 20.9694 10.7849 20.7714 10.7849 20.565V18.1804C10.7849 17.974 10.8669 17.776 11.0128 17.63C11.1588 17.484 11.3568 17.402 11.5632 17.402H14.0242V13.3386C14.0242 12.3064 14.4343 11.3164 15.1641 10.5865C15.894 9.85656 16.8839 9.4465 17.9161 9.4465H20.2642C20.6083 9.4465 20.9383 9.58319 21.1815 9.82649C21.4248 10.0698 21.5615 10.3998 21.5615 10.7439V12.0931C21.5615 12.4372 21.4248 12.7672 21.1815 13.0105C20.9383 13.2538 20.6083 13.3905 20.2642 13.3905H19.2627C18.9186 13.3905 18.5887 13.5272 18.3454 13.7705C18.1021 14.0138 17.9654 14.3438 17.9654 14.6879V17.402H20.9453C21.0583 17.402 21.1699 17.4266 21.2724 17.474C21.375 17.5215 21.4659 17.5908 21.539 17.6769C21.6121 17.7631 21.6655 17.8641 21.6956 17.973C21.7257 18.0819 21.7317 18.1961 21.7133 18.3076L21.389 20.2588C21.3386 20.5618 21.1824 20.837 20.9482 21.0356C20.714 21.2342 20.4169 21.3433 20.1098 21.3434H17.9654V27.8394"/></svg>
  );
  if (name === "instagram") return (
    <svg {...common}>
      <path d="M4 16C4 10.3427 4 7.51467 5.75733 5.75733C7.51467 4 10.344 4 16 4C21.656 4 24.4853 4 26.2427 5.75733C28 7.51467 28 10.344 28 16C28 21.656 28 24.4853 26.2427 26.2427C24.4853 28 21.656 28 16 28C10.344 28 7.51467 28 5.75733 26.2427C4 24.4853 4 21.656 4 16Z"/>
      <path d="M23.1667 9H23M21.3333 16C21.3333 17.4144 20.7714 18.771 19.7712 19.7712C18.771 20.7714 17.4145 21.3333 16 21.3333C14.5855 21.3333 13.229 20.7714 12.2288 19.7712C11.2286 18.771 10.6667 17.4144 10.6667 16C10.6667 14.5855 11.2286 13.2289 12.2288 12.2287C13.229 11.2285 14.5855 10.6667 16 10.6667C17.4145 10.6667 18.771 11.2285 19.7712 12.2287C20.7714 13.2289 21.3333 14.5855 21.3333 16ZM23.3333 9C23.3333 9.08841 23.2982 9.17319 23.2357 9.2357C23.1732 9.29821 23.0884 9.33333 23 9.33333C22.9116 9.33333 22.8268 9.29821 22.7643 9.2357C22.7018 9.17319 22.6667 9.08841 22.6667 9C22.6667 8.91159 22.7018 8.82681 22.7643 8.7643C22.8268 8.70179 22.9116 8.66667 23 8.66667C23.0884 8.66667 23.1732 8.70179 23.2357 8.7643C23.2982 8.82681 23.3333 8.91159 23.3333 9Z"/>
    </svg>
  );
  if (name === "tiktok") return (
    <svg {...common}>
      <path d="M28 10.6667V21.3333C28 23.1014 27.2976 24.7971 26.0474 26.0474C24.7971 27.2976 23.1014 28 21.3333 28H10.6667C8.89856 28 7.20286 27.2976 5.95262 26.0474C4.70238 24.7971 4 23.1014 4 21.3333V10.6667C4 8.89856 4.70238 7.20286 5.95262 5.95262C7.20286 4.70238 8.89856 4 10.6667 4H21.3333C23.1014 4 24.7971 4.70238 26.0474 5.95262C27.2976 7.20286 28 8.89856 28 10.6667Z"/>
      <path d="M13.3333 16C12.5422 16 11.7689 16.2346 11.1111 16.6741C10.4533 17.1136 9.94058 17.7384 9.63783 18.4693C9.33508 19.2002 9.25586 20.0044 9.4102 20.7804C9.56455 21.5563 9.94551 22.269 10.5049 22.8284C11.0643 23.3878 11.7771 23.7688 12.553 23.9231C13.3289 24.0775 14.1332 23.9983 14.8641 23.6955C15.595 23.3928 16.2197 22.8801 16.6592 22.2223C17.0987 21.5645 17.3333 20.7911 17.3333 20V8C17.7773 9.33333 19.4667 12 22.6667 12"/>
    </svg>
  );
  return (
    <svg {...common}>
      <path d="M28 16C28 17.5759 27.6896 19.1363 27.0866 20.5922C26.4835 22.0481 25.5996 23.371 24.4853 24.4853C23.371 25.5996 22.0481 26.4835 20.5922 27.0866C19.1363 27.6896 17.5759 28 16 28C14.4241 28 12.8637 27.6896 11.4078 27.0866C9.95189 26.4835 8.62902 25.5996 7.51472 24.4853C6.40042 23.371 5.5165 22.0481 4.91345 20.5922C4.31039 19.1363 4 17.5759 4 16C4 12.8174 5.26428 9.76516 7.51472 7.51472C9.76516 5.26428 12.8174 4 16 4C19.1826 4 22.2348 5.26428 24.4853 7.51472C26.7357 9.76516 28 12.8174 28 16Z"/>
      <path d="M9.93599 17.5734C8.45865 14.5574 10.4693 8.68273 17.232 9.64273C24.68 10.7014 23.34 22.2801 17.1293 21.8267C15.164 21.6841 14.4213 20.0561 14.2267 18.3921M14.2267 18.3921C14.08 17.1307 14.248 15.8494 14.44 15.1787C14.7653 14.0361 15.3053 14.1921 14.9107 15.7027C14.7187 16.4387 14.484 17.3627 14.2267 18.3921ZM14.2267 18.3921C13.5413 21.1387 12.6933 24.6387 12.0533 27.3361"/>
    </svg>
  );
}
