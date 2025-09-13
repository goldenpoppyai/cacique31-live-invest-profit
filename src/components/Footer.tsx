// src/components/Footer.tsx
import React from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

/**
 * Footer — Exell Dream Estate
 *
 * - Uses relative paths (./...) so assets load when deployed under a subfolder.
 * - Accessible landmarks and concise content for clarity.
 * - Replace phone/email/links with real values as needed.
 */

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-luxury py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <a href="./" aria-label="Exell Dream Estate home" className="inline-flex items-center gap-3">
              <img
                src="./ExellDreamEstate_logo_whiteBG.webp"
                alt="Exell Dream Estate logo"
                className="h-10 w-auto"
                width={160}
                height={40}
                loading="eager"
              />
            </a>

            <p className="mt-4 text-sm text-background/70 max-w-sm">
              Exell Dream Estate — Luxury real estate advisory and curated property listings in the Caribbean.
            </p>

            <div className="mt-4 space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Casa de Campo, La Romana, Dominican Republic</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a className="underline" href="tel:+1809xxxxxxx">+1 809-xxx-xxxx</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a className="underline" href="mailto:info@exelldreamestate.com">info@exelldreamestate.com</a>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-base font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="./#about" className="hover:underline">About Villa</a></li>
              <li><a href="./#features" className="hover:underline">Features</a></li>
              <li><a href="./#virtual-tour" className="hover:underline">Virtual Tour</a></li>
              <li><a href="./#contact" className="hover:underline">Contact & Viewings</a></li>
            </ul>
          </div>

          {/* Resources & legal */}
          <div>
            <h4 className="text-base font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <a href="./Exell_Financing.pdf" className="flex items-center gap-2 hover:underline" download>
                  <ExternalLink size={14} />
                  Financing PDF
                </a>
              </li>
              <li>
                <a href="./Exell_ROI.pdf" className="flex items-center gap-2 hover:underline" download>
                  <ExternalLink size={14} />
                  ROI Overview
                </a>
              </li>
              <li>
                <a href="./robots.txt" className="hover:underline">robots.txt</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-background/10 pt-6 text-sm text-background/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>&copy; {new Date().getFullYear()} Exell Dream Estate. All rights reserved.</div>

          <div className="flex items-center gap-4">
            <a href="./" className="hover:underline">Privacy</a>
            <a href="./" className="hover:underline">Terms</a>
            <a href="./#contact" className="inline-flex items-center gap-2 px-3 py-1 rounded bg-background/5 text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
