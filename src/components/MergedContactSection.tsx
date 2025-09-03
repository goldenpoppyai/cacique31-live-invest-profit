/**
 * MergedContactSection Component
 * 
 * Combines Sam's professional profile (60% left) with contact form (40% right)
 * Meeting Your Specialist & Schedule Your Tour section
 */

import React, { useState } from 'react';
import { Phone, Mail, Linkedin, Download, Calendar, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactFormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface MergedContactSectionProps {
  calendlyEmbedUrl?: string;
  contactFormFields: ContactFormField[];
  onContactSubmit: (formData: any) => void;
  onBrochureDownload: () => void;
}

const MergedContactSection: React.FC<MergedContactSectionProps> = ({
  contactFormFields,
  onContactSubmit,
  onBrochureDownload
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContactSubmit(formData);
  };

  const scrollToContact = () => {
    const contactForm = document.querySelector('#contact-form');
    contactForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="section-luxury" style={{ backgroundColor: '#f6f5f4' }}>
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#121212' }}>
            Meet Your Specialist & Schedule Your Tour
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#6b6b6b' }}>
            Connect with our verified luxury real estate expert for personalized guidance and exclusive access
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Sam's Professional Profile (60%) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Professional Profile Card */}
            <div className="card-luxury p-8" style={{ backgroundColor: '#ffffff' }}>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Sam's Photo */}
                <div className="flex-shrink-0">
                  <img
                    src="/SamVekemans.webp"
                    alt="Sam Vekemans - Luxury Real Estate Specialist"
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-32 h-32 bg-accent/20 rounded-2xl flex items-center justify-center shadow-lg" style={{ display: 'none' }}>
                    <span className="text-4xl font-bold" style={{ color: '#b19762' }}>SV</span>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold" style={{ color: '#121212' }}>
                      Sam Vekemans
                    </h3>
                    <div className="flex items-center gap-1">
                      <Award size={20} style={{ color: '#b19762' }} />
                      <span className="text-sm font-medium" style={{ color: '#b19762' }}>Verified Expert</span>
                    </div>
                  </div>
                  
                  <p className="text-lg font-semibold mb-4" style={{ color: '#6b6b6b' }}>
                    Luxury Real Estate Specialist
                  </p>

                  {/* Credentials & Expertise */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Star size={16} style={{ color: '#b19762' }} />
                      <span className="text-sm" style={{ color: '#6b6b6b' }}>
                        Specialist in exclusive Casa de Campo properties
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} style={{ color: '#b19762' }} />
                      <span className="text-sm" style={{ color: '#6b6b6b' }}>
                        Expert in luxury villa financing and investment analysis
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star size={16} style={{ color: '#b19762' }} />
                      <span className="text-sm" style={{ color: '#6b6b6b' }}>
                        Personalized white-glove service for discerning clients
                      </span>
                    </div>
                  </div>

                  {/* Direct Contact Methods */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={18} style={{ color: '#b19762' }} />
                      <a 
                        href="tel:+32476872240"
                        className="text-foreground hover:text-accent transition-colors font-medium"
                      >
                        +32 476 87 22 40
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail size={18} style={{ color: '#b19762' }} />
                      <a 
                        href="mailto:sam@exelldreamestate.com"
                        className="text-foreground hover:text-accent transition-colors"
                      >
                        sam@exelldreamestate.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Linkedin size={18} style={{ color: '#b19762' }} />
                      <a 
                        href="https://www.linkedin.com/company/exell-dream-estate/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-accent transition-colors"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Consultation CTA */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  onClick={scrollToContact}
                  className="w-full btn-luxury btn-luxury--primary text-lg py-4"
                  style={{ background: 'linear-gradient(135deg, #b19762, #a08856)' }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Private Consultation
                </Button>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="card-luxury p-6" style={{ backgroundColor: 'rgba(177, 151, 98, 0.1)' }}>
              <h4 className="text-lg font-semibold mb-3" style={{ color: '#121212' }}>
                Why Choose Sam as Your Specialist?
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>
                Our luxury real estate team specializes in exclusive properties and guides you through every aspect of the acquisition process, from private viewings to financing arrangements. Experience personalized service that ensures you feel understood and well taken care of.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form (40%) */}
          <div className="lg:col-span-2">
            <div className="card-luxury p-8" style={{ backgroundColor: '#ffffff' }}>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2" style={{ color: '#121212' }}>
                  Request Your Private Tour
                </h3>
                <p className="text-sm" style={{ color: '#6b6b6b' }}>
                  Exclusive viewing • Immediate brochure access
                </p>
              </div>

              <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                {contactFormFields.map((field) => {
                  if (field.type === 'text' || field.type === 'email' || field.type === 'tel') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#121212' }}>
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Input
                          type={field.type}
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full"
                        />
                      </div>
                    );
                  }

                  if (field.type === 'select' && field.name === 'country') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#121212' }}>
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <Select onValueChange={(value) => handleInputChange(field.name, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="be">Belgium</SelectItem>
                            <SelectItem value="nl">Netherlands</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  }

                  if (field.type === 'textarea') {
                    return (
                      <div key={field.name}>
                        <label className="block text-sm font-medium mb-1" style={{ color: '#121212' }}>
                          {field.label}
                        </label>
                        <Textarea
                          value={formData[field.name] || ''}
                          onChange={(e) => handleInputChange(field.name, e.target.value)}
                          placeholder="Private tour, financing consultation, investment analysis..."
                          className="w-full resize-none"
                          rows={3}
                        />
                      </div>
                    );
                  }

                  if (field.type === 'checkbox') {
                    return (
                      <div key={field.name} className="flex items-start space-x-2">
                        <Checkbox
                          id={field.name}
                          checked={formData[field.name] || false}
                          onCheckedChange={(checked) => handleInputChange(field.name, checked)}
                          required={field.required}
                        />
                        <label 
                          htmlFor={field.name}
                          className="text-xs leading-relaxed cursor-pointer"
                          style={{ color: '#6b6b6b' }}
                        >
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                      </div>
                    );
                  }

                  return null;
                })}

                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    className="w-full btn-luxury btn-luxury--primary"
                    style={{ background: 'linear-gradient(135deg, #b19762, #a08856)' }}
                  >
                    Secure Your Private Viewing
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={onBrochureDownload}
                    variant="outline"
                    className="w-full"
                    style={{ borderColor: '#b19762', color: '#b19762' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MergedContactSection;