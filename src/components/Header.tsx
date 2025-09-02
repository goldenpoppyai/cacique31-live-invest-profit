/**
 * Header Component - Exell Dream Estate Branding
 * 
 * Premium header with logo, navigation, and contact information
 * Implements luxury real estate design standards
 */

import React from 'react';
import { Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-card border-b border-border/20 sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container-luxury">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <img
              src="/Exell_DreamEstate_logo.webp"
              alt="Exell Dream Estate Logo"
              className="w-12 h-12 object-contain"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
              <span className="text-accent-foreground font-bold text-xl">E</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-0">
                Exell Dream Estate
              </h2>
              <p className="text-muted-foreground text-sm">
                Luxury Real Estate
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone size={16} className="text-accent" />
              <span>+32 476 87 22 40</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail size={16} className="text-accent" />
              <span>sam@exelldreamestate.com</span>
            </div>
          </div>

          {/* Mobile Contact */}
          <div className="md:hidden">
            <a 
              href="tel:+32476872240"
              className="btn-luxury btn-luxury--primary text-sm px-4 py-2"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;