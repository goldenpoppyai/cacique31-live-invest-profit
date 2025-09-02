/**
 * Footer Component - Exell Dream Estate
 * 
 * Complete footer with branding, contact info, social links,
 * and luxury properties navigation
 */

import React from 'react';
import { Phone, Mail, MapPin, ExternalLink, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-luxury">
        <div className="grid md:grid-cols-3 gap-12">
          
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">E</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-background mb-0">
                  Exell Dream Estate
                </h3>
                <p className="text-background/70 text-sm">
                  Luxury Real Estate
                </p>
              </div>
            </div>
            
            <p className="text-background/70 leading-relaxed mb-6">
              Our luxury real estate team specializes in exclusive properties and guides you through every aspect of the acquisition process, from private viewings to financing arrangements.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/exell-dream-estate/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">
              Contact Sam Vekemans
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+32476872240"
                    className="text-background hover:text-accent transition-colors"
                  >
                    +32 476 87 22 40
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="mailto:sam@exell.marketing"
                    className="text-background hover:text-accent transition-colors"
                  >
                    sam@exell.marketing
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/70">
                    Casa de Campo, La Romana<br />
                    Dominican Republic
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Properties */}
          <div>
            <h4 className="text-lg font-semibold text-background mb-4">
              Other Luxury Properties
            </h4>
            
            <div className="space-y-3">
              <div className="p-4 bg-background/10 rounded-lg">
                <p className="text-background/70 text-sm">
                  Exclusive listings coming soon
                </p>
                <a 
                  href="#"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm mt-2"
                >
                  View Portfolio
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Sam's Photo Placeholder */}
            <div className="mt-6 p-4 bg-background/10 rounded-lg">
              <div className="w-16 h-16 bg-accent/20 rounded-full mb-3 flex items-center justify-content center">
                <span className="text-accent text-xl font-bold">SV</span>
              </div>
              <p className="text-background/70 text-sm">
                <strong className="text-background">Sam Vekemans</strong><br />
                Luxury Real Estate Specialist
              </p>
            </div>
          </div>
        </div>

        {/* Legal Disclaimers */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="text-background/60 text-sm space-y-4">
            <p>
              <strong>DISCLAIMER:</strong> All figures are estimates and must be independently verified. 
              Actual payments may vary by lender, buyer profile, and prevailing interest rates at time of purchase. 
              Consult a legal and tax advisor before making any financial commitments.
            </p>
            
            <p>
              All placeholder content marked [PLACEHOLDER] requires verification with appropriate professionals. 
              Property specifications, financial projections, and legal requirements subject to change.
            </p>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4">
              <p>&copy; 2024 Exell Dream Estate. All rights reserved.</p>
              <p>Villa Du Cacique - Casa de Campo Exclusive Listing</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
