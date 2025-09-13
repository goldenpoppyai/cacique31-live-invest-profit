// src/components/Header.tsx
/**
 * Header component — Exell Dream Estate
 *
 * - Uses relative asset path (./ExellDreamEstate_favicon.webp) so it works when deployed
 *   under a subfolder (e.g. /villaducacique/).
 * - Accessible, responsive, TypeScript-friendly.
 * - Minimal, self-contained: no external state required.
 */

import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-card border-b border-border/10 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container-luxury flex items-center justify-between gap-4 py-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="./" className="inline-flex items-center gap-3" aria-label="Exell Dream Estate home">
            <img
              src="./ExellDreamEstate_favicon.webp"
              alt="Exell Dream Estate"
              className="h-9 w-auto"
              width={36}
              height={36}
              loading="eager"
            />
            <span className="hidden sm:inline-block text-lg font-semibold">Exell Dream Estate</span>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          <a href="./#about" className="text-sm hover:underline">
            About
          </a>
          <a href="./#features" className="text-sm hover:underline">
            Features
          </a>
          <a href="./#virtual-tour" className="text-sm hover:underline">
            Virtual tour
          </a>
          <a href="./#contact" className="text-sm hover:underline">
            Contact
          </a>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+1809xxxxxxx"
            className="hidden sm:inline-flex items-center gap-2 rounded-md px-3 py-2 border border-gray-200 bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label="Call Exell Dream Estate"
          >
            <Phone size={16} />
            <span className="text-sm">+32 476 87 22 40</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex items-center justify-center rounded-md p-2 bg-white/90 hover:bg-white focus:outline-none focus:ring-2 focus:ring-accent md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <div
        id="mobile-menu"
        className={`md:hidden bg-card/95 border-t border-border/10 transition-max-h duration-300 overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <div className="px-4 py-4 space-y-3">
          <a href="./#about" className="block text-base" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="./#features" className="block text-base" onClick={() => setOpen(false)}>
            Features
          </a>
          <a href="./#virtual-tour" className="block text-base" onClick={() => setOpen(false)}>
            Virtual tour
          </a>
          <a href="./#contact" className="block text-base" onClick={() => setOpen(false)}>
            Contact
          </a>
          <a
            href="tel:+1809xxxxxxx"
            className="mt-2 inline-flex items-center gap-2 rounded-md px-4 py-2 border border-gray-200 bg-white text-sm"
            onClick={() => setOpen(false)}
          >
            <Phone size={16} />
            Call
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
