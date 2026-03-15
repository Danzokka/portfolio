"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import Logo from "@/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_HREFS: Record<string, string> = {
  home: "#",
  projects: "#projects",
  skills: "#skills",
  services: "#services",
  contact: "#contact",
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, data } = useLanguage();
  const { navbar } = data;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: navbar.home,     href: NAV_HREFS.home     },
    { label: navbar.projects, href: NAV_HREFS.projects  },
    { label: navbar.skills,   href: NAV_HREFS.skills    },
    { label: navbar.services, href: NAV_HREFS.services  },
    { label: navbar.contact,  href: NAV_HREFS.contact   },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <nav className="w-full max-w-screen-2xl mx-auto px-4 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-1.5 text-sm font-mono text-zinc-400 hover:text-zinc-100 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              title={language === "pt" ? "Switch to English" : "Mudar para Português"}
              className="flex flex-col items-center gap-0.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center text-xl transition-all duration-200 group-hover:border-[#6C63FF] group-hover:bg-[#6C63FF]/5">
                {language === "pt" ? "🇧🇷" : "🇺🇸"}
              </div>
              <span className="font-mono text-[8px] text-zinc-700 tracking-widest select-none">
                PT / EN
              </span>
            </button>

            {/* Mobile menu trigger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-zinc-400 hover:text-zinc-100 cursor-pointer"
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-64 bg-black border-l border-[#1a1a1a] p-6"
              >
                <div className="mb-8">
                  <Logo asDiv />
                </div>
                <nav>
                  <ul className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="font-mono text-zinc-400 hover:text-zinc-100 transition-colors duration-200 text-sm"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
