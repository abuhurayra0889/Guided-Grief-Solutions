import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import ggsLogo from "@/assets/ggs-logo.png.asset.json";

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 15H27M3 24H27M3 6H27" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 4L28 28M4 28L28 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LogoMark({ className = "h-10 w-auto" }: { className?: string }) {
  return (
    <img
      src={ggsLogo.url}
      alt="Guided Grief Solutions"
      className={className}
      width={1000}
      height={820}
    />
  );
}

const articleLinks = [
  { label: "Helping Children Deal with Grief", to: "/articles/helping-children-deal-with-grief" as const },
];

export function SiteNav({ transparent = false }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [getStartedMobileOpen, setGetStartedMobileOpen] = useState(false);
  const getStartedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = () => {
    setOpen(false);
    setResourcesOpen(false);
    setGetStartedOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleGetStartedEnter = () => {
    if (getStartedTimer.current) clearTimeout(getStartedTimer.current);
    setGetStartedOpen(true);
  };

  const handleGetStartedLeave = () => {
    getStartedTimer.current = setTimeout(() => setGetStartedOpen(false), 150);
  };

  return (
    <nav
      className={`${transparent ? "absolute" : "relative"} top-0 left-0 right-0 z-[110] bg-[#faf6ef] border-b border-[#eae0d0]`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-20 md:h-24 flex items-center justify-between">
        {/* Logo: image on all resolutions; name beside it on mobile, underlined below on desktop */}
        <Link to="/" className="flex items-center gap-3 lg:flex-col lg:items-center lg:gap-0 leading-none lg:w-[100px] lg:h-[70px]">
          <LogoMark className="h-10 lg:h-full w-auto lg:object-cover lg:object-center" />
          <span className="lg:hidden font-display text-[18px] text-[#3d4e19] leading-none">
            Guided Grief Solutions
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-10 text-eyebrow text-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <a href="/#resources" className="hover:text-primary transition-colors">Resources</a>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <button
            type="button"
            data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
            data-cal-namespace="free-45-min-intro-call"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
            className="text-center rounded-full border-2 border-[#88a883] bg-[#eaf1e9] px-7 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-[#3d4a3b] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            Connect with Haley
          </button>
          <Link to="/auth" className="font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary transition-colors">Sign In</Link>

          {/* Get Started flyout */}
          <div
            className="relative"
            onMouseEnter={handleGetStartedEnter}
            onMouseLeave={handleGetStartedLeave}
          >
            <button
              type="button"
              className="flex items-center gap-1 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary transition-colors"
              aria-expanded={getStartedOpen}
              aria-haspopup="true"
            >
              Get Started
              <ChevronDown className={`h-3 w-3 transition-transform ${getStartedOpen ? "rotate-180" : ""}`} />
            </button>
            {getStartedOpen && (
              <div
                className="absolute top-full right-0 mt-3 w-56 bg-[#faf6ef] border border-[#eae0d0] rounded-xl shadow-lg py-3 px-2 z-50"
                onMouseEnter={handleGetStartedEnter}
                onMouseLeave={handleGetStartedLeave}
              >
                <Link to="/at-a-glance" className="block px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary hover:bg-[#eaf1e9] rounded-lg transition-colors">At a glance</Link>
                <Link to="/daily-affirmation" className="block px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary hover:bg-[#eaf1e9] rounded-lg transition-colors">Daily Affirmation</Link>
                <Link to="/services" className="block px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary hover:bg-[#eaf1e9] rounded-lg transition-colors">Plans &amp; pricing</Link>
                <Link to="/resource-library" className="block px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary hover:bg-[#eaf1e9] rounded-lg transition-colors">Resource Library</Link>
                <Link to="/support-groups" className="block px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary hover:bg-[#eaf1e9] rounded-lg transition-colors">Support Groups</Link>
                <Link to="/faqs" className="block px-4 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary hover:bg-[#eaf1e9] rounded-lg transition-colors">FAQs</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 text-foreground z-50 relative"
        >
          {open ? <CloseIcon className="h-7 w-7" /> : <MenuIcon className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile drawer - full width below nav, solid background */}
      {open && (
        <>
          <style>{`
            .mobile-drawer-overlay::before {
              content: "";
              background: #000;
              width: 100%;
              height: 100%;
              display: block;
              position: absolute;
              opacity: 0.4;
            }
          `}</style>
          <aside
            className="mobile-drawer-overlay lg:hidden fixed top-20 right-0 left-0 bottom-0 z-[100] animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
          >

            {/* Drawer body */}
            <div
              className="flex flex-col overflow-y-auto px-8 py-8 mt-[1px]"
              style={{ height: "100vh", background: "#faf6ef", position: "fixed", right: 0, width: "85%" }}
            >
              <div className="flex flex-col gap-7 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground">
                <Link to="/about" onClick={close} className="hover:text-primary">About</Link>
                <Link to="/services" onClick={close} className="hover:text-primary">Services</Link>

                {/* Resources expandable */}
                <div>
                  <button
                    type="button"
                    onClick={() => setResourcesOpen((v) => !v)}
                    aria-expanded={resourcesOpen}
                    className="w-full flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary"
                  >
                    <span>Resources</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                  {resourcesOpen && (
                    <div className="mt-4 pl-4 flex flex-col gap-4 border-l border-foreground/15">
                      {articleLinks.map((a) => (
                        <Link
                          key={a.to}
                          to={a.to}
                          onClick={close}
                          className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug"
                        >
                          {a.label}
                        </Link>
                      ))}
                      <Link
                        to="/faqs"
                        onClick={close}
                        className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary"
                      >
                        FAQs
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/contact" onClick={close} className="hover:text-primary">Contact</Link>

                <button
                  type="button"
                  onClick={close}
                  data-cal-link="guidedgriefsolutions/free-45-min-intro-call"
                  data-cal-namespace="free-45-min-intro-call"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
                  className="mt-2 inline-flex justify-center rounded-full border-2 border-[#88a883] bg-[#eaf1e9] px-7 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-[#3d4a3b] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  Connect with Haley
                </button>
                <Link to="/auth" onClick={close} className="font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary transition-colors">Sign In</Link>

                {/* Get Started expandable */}
                <div>
                  <button
                    type="button"
                    onClick={() => setGetStartedMobileOpen((v) => !v)}
                    aria-expanded={getStartedMobileOpen}
                    className="w-full flex items-center justify-between font-sans text-[12px] font-semibold uppercase tracking-[0.154em] text-foreground hover:text-primary"
                  >
                    <span>Get Started</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${getStartedMobileOpen ? "rotate-180" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                  {getStartedMobileOpen && (
                    <div className="mt-4 pl-4 flex flex-col gap-4 border-l border-foreground/15">
                      <Link to="/at-a-glance" onClick={close} className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug">At a glance</Link>
                      <Link to="/daily-affirmation" onClick={close} className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug">Daily Affirmation</Link>
                      <Link to="/services" onClick={close} className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug">Plans &amp; pricing</Link>
                      <Link to="/resource-library" onClick={close} className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug">Resource Library</Link>
                      <Link to="/support-groups" onClick={close} className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug">Support Groups</Link>
                      <Link to="/faqs" onClick={close} className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/80 hover:text-primary leading-snug">FAQs</Link>
                    </div>
                  )}
                </div>
              </div>


              {/* Divider */}
              <div className="my-8 border-t border-foreground/15" />

              {/* Social icons */}
              <div className="flex items-center justify-center gap-5 text-primary">
                <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><SocialIcon name="facebook" /></a>
                <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><SocialIcon name="instagram" /></a>
                <a href="#" aria-label="TikTok" className="hover:opacity-70 transition-opacity"><SocialIcon name="tiktok" /></a>
                <a href="#" aria-label="Pinterest" className="hover:opacity-70 transition-opacity"><SocialIcon name="pinterest" /></a>
              </div>
            </div>
          </aside>
        </>
      )}

    </nav>
  );
}

function SocialIcon({ name }: { name: "facebook" | "instagram" | "tiktok" | "pinterest" }) {
  const common = { width: 26, height: 26, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
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
