/**
 * SamContactSection Component
 * 
 * Professional contact section featuring Sam Vekemans
 * Positions him as a luxury real estate specialist
 */

import React from 'react';
import { Phone, Mail, Linkedin, MapPin, Star, Award } from 'lucide-react';

const SamContactSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20" role="region" aria-label="Contact Sam Vekemans">
      <div className="container-luxury">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#121212' }}>
              Meet Your Luxury Real Estate Specialist
            </h2>
            <p className="text-xl text-muted-foreground">
              Exclusive properties deserve exclusive service. Let Sam guide you to your perfect luxury investment.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Sam's Photo & Credentials */}
              <div className="relative p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-center">
                  <div className="relative inline-block mb-6">
                    <img
                      src="/SamVekemans.webp"
                      alt="Sam Vekemans - Luxury Real Estate Specialist"
                      className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
                      onError={(e) => {
                        // Fallback if image doesn't load
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiByeD0iNjQiIGZpbGw9IiNCMTk3NjIiLz4KPHN2ZyB4PSIzMiIgeT0iMzIiIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTIgMiAuOSAyIDItLjkgMi0yIDJ6TTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6TTEyIDIwYy0xLjc0IDAtMy4zNC0uNTYtNC42NS0xLjUxQzguOTQgMTYuOSAxMC40NCAxNiAxMiAxNnMzLjA2LjkgNC42NSAyLjQ5QzE1LjM0IDE5LjQ0IDEzLjc0IDIwIDEyIDIweiIvPgo8L3N2Zz4KPC9zdmc+';
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-2 shadow-lg">
                      <Award size={16} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#121212' }}>
                    Sam Vekemans
                  </h3>
                  
                  <p className="text-lg font-medium mb-4" style={{ color: '#b19762' }}>
                    Luxury Real Estate Specialist
                  </p>

                  <div className="flex justify-center items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill="#b19762" style={{ color: '#b19762' }} />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">Verified Expert</span>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                      <MapPin size={20} style={{ color: '#b19762' }} />
                      <span className="text-sm font-medium">Casa de Campo Specialist</span>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-xl">
                      <Award size={20} style={{ color: '#b19762' }} />
                      <span className="text-sm font-medium">$50M+ in Luxury Sales</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information & CTA */}
              <div className="p-8 lg:p-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold mb-4" style={{ color: '#121212' }}>
                      Direct Contact
                    </h4>
                    
                    <div className="space-y-4">
                      <a 
                        href="tel:+32476872240"
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Phone size={20} style={{ color: '#b19762' }} />
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#121212' }}>
                            +32 476 87 22 40
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Direct line for priority service
                          </p>
                        </div>
                      </a>

                      <a 
                        href="mailto:sam@exelldreamestate.com"
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Mail size={20} style={{ color: '#b19762' }} />
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#121212' }}>
                            sam@exelldreamestate.com
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Confidential inquiries welcome
                          </p>
                        </div>
                      </a>

                      <a 
                        href="https://www.linkedin.com/company/exell-dream-estate/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 group"
                      >
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Linkedin size={20} style={{ color: '#b19762' }} />
                        </div>
                        <div>
                          <p className="font-medium" style={{ color: '#121212' }}>
                            LinkedIn Profile
                          </p>
                          <p className="text-sm text-muted-foreground">
                            View professional credentials
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h5 className="font-semibold mb-3" style={{ color: '#121212' }}>
                      Expertise & Specializations:
                    </h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Casa de Campo luxury properties</li>
                      <li>• International buyer representation</li>
                      <li>• Investment property analysis</li>
                      <li>• Discreet off-market transactions</li>
                      <li>• Property management coordination</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        const contactSection = document.querySelector('[aria-label="Contact and scheduling"]');
                        contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="w-full px-6 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      style={{ background: 'linear-gradient(135deg, #b19762, #a08856)' }}
                    >
                      Schedule Private Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial or Trust Badge */}
          <div className="text-center mt-12">
            <blockquote className="text-lg italic text-muted-foreground max-w-2xl mx-auto">
              "Sam's expertise in Casa de Campo luxury properties is unmatched. His attention to detail and 
              commitment to client privacy makes him the preferred choice for discerning international buyers."
            </blockquote>
            <p className="mt-4 font-medium" style={{ color: '#b19762' }}>
              — Verified Client Review
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SamContactSection;