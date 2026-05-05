import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { getSmoother } from "@/hooks/useScrollSmoother";

const SECTION_CONFIG: Record<string, string> = {
  home:       "hero-section",
  profile:    "profile-section",
  project:    "project-section",
  experience: "experience-section",
  contact:    "footer-section",
};

const UpCard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (sectionKey: string) => {
    const targetId = SECTION_CONFIG[sectionKey] ?? sectionKey;

    const scrollTo = (id: string) => {
      const el = document.getElementById(id);
      const smoother = getSmoother();
      if (smoother && el) {
        smoother.scrollTo(el, { duration: 1.5, ease: "power2.inOut" });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollTo(targetId), 700);
    } else {
      scrollTo(targetId);
    }
  };

  return (
    <section
      id="footer-section"
      className="w-full flex justify-center items-center bg-[#f7f6f4] py-50 px-4"
    >
      {/* CARD UTAMA */}
      <div className="w-full max-w-7xl rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.1)] bg-white scale-[0.98] md:scale-[0.97] origin-top">

        {/* HERO SECTION */}
        <div className="flex flex-col items-center justify-center text-center px-4 py-5 bg-white">
          <h1 className="text-[3.5rem] md:text-[6rem] font-display font-semibold mb-6 text-[#111] tracking-tight leading-none">
            Muhammad Ilyas
          </h1>
          <p className="text-lg md:text-2xl text-[#444] mb-12 leading-relaxed font-serif max-w-2xl">
            Full Stack Developer & Software Engineer passionate about building intelligent, scalable, and elegant digital experiences.
          </p>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-10 text-sm md:text-base font-medium uppercase tracking-wide border-[1.5px] border-[#222] text-[#222] hover:bg-[#222] hover:text-white transition-all duration-300"
            >
              LET'S CHAT
            </Button>
          </Link>
        </div>

        {/* FOOTER SECTION */}
        <div className="px-6 md:px-1 pb-[3px]">
          <footer className="bg-gradient-to-r from-[#1f1f20] via-[#3e3e3f] to-[#555555] text-gray-100 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-[3px] divide-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)]">

            {/* LEFT — Explore */}
            <div className="p-3 md:p-4 flex flex-col justify-between">
              <h3 className="text-lg md:text-xl font-serif text-white/90">Explore</h3>
              <nav className="flex flex-col gap-3 text-[13px] md:text-[14px] font-medium tracking-wide uppercase mt-6">
                {[
                  { label: "Home",       key: "home" },
                  { label: "Profile",    key: "profile" },
                  { label: "Project",    key: "project" },
                  { label: "Experience", key: "experience" },
                ].map(({ label, key }) => (
                  <button
                    key={key}
                    onClick={() => handleNav(key)}
                    className="relative text-left text-gray-300 group w-fit"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white/60 transition-all duration-300 group-hover:w-full" />
                  </button>
                ))}
              </nav>
            </div>

            {/* CENTER — Connect */}
            <div className="p-3 md:p-4 flex flex-col justify-between">
              <h3 className="text-lg md:text-xl font-serif text-white/90">Connect</h3>
              <nav className="flex flex-col gap-3 text-[13px] md:text-[14px] font-medium tracking-wide uppercase mt-6">
                {[
                  { label: "Email",    href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}` },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-ilyas-abdul-ghoni-76a584368" },
                  { label: "Discord",  href: "https://discord.com/users/877090899518189578" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-gray-300 group w-fit"
                  >
                    {label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-white/60 transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>
            </div>

            {/* RIGHT — Currently */}
            <div className="p-3 md:p-4 flex flex-col justify-between">
              <h3 className="text-lg md:text-xl font-serif text-white/90">Currently</h3>
              <div className="flex flex-col">
                <div className="flex flex-col gap-3 text-[13px] md:text-[14px] font-medium tracking-wide uppercase mt-6">
                  <span className="flex items-center gap-2 text-gray-300">
                    {/* Dot hijau animasi pulse — menandakan available */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Available for work
                  </span>
                  <span className="text-gray-300">Open to remote</span>
                </div>
                <p className="text-[11px] md:text-[12px] mt-6 uppercase tracking-wide text-white/60">
                  © 2025 Muhammad Ilyas Abdul Ghoni. All Rights Reserved.
                </p>
              </div>
            </div>

          </footer>
        </div>
      </div>
    </section>
  );
};

export default UpCard;
