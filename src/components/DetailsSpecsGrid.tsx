/**
 * DetailsSpecsGrid Component
 * 
 * Grid for property facts + feature cards + download-brochure trigger (modal).
 * Cards include an icon slot, short label placeholder, and benefitPlaceholder.
 * 
 * Required Props:
 * - specs: object with property specifications
 * - featureCards: Array<{iconSlot: React.ReactNode, labelPlaceholder: string, benefitPlaceholder: string}>
 * 
 * Optional Props:
 * - onSubmit: (formData: any) => void
 */

import React, { useState } from 'react';
import { Download, X, Home, Waves, Calendar, Ruler, MapPin, Eye } from 'lucide-react';

interface PropertySpecs {
  bedrooms: number;
  baths: number;
  halfBaths: number;
  areaSF: number;
  areaM2: number;
  lotSF: number;
  lotM2: number;
  yearBuilt: number;
  view: string;
  poolBoolean: boolean;
  infraFee: string;
}

interface FeatureCard {
  iconSlot: React.ReactNode;
  labelPlaceholder: string;
  benefitPlaceholder: string;
}

interface DetailsSpecsGridProps {
  specs: PropertySpecs;
  featureCards: FeatureCard[];
  onSubmit?: (formData: {
    name: string;
    email: string;
    phone: string;
    preferredContact: string[];
  }) => void;
}

const DetailsSpecsGrid: React.FC<DetailsSpecsGridProps> = ({
  specs,
  featureCards,
  onSubmit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredContact: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const handleContactChange = (method: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      preferredContact: checked
        ? [...prev.preferredContact, method]
        : prev.preferredContact.filter(m => m !== method)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (formData.preferredContact.length === 0) {
      newErrors.preferredContact = 'Please select at least one contact method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
      setIsModalOpen(false);
      setFormData({ name: '', email: '', phone: '', preferredContact: [] });
    }
  };

  const specItems = [
    { icon: <Home size={20} />, label: 'Bedrooms', value: specs.bedrooms },
    { icon: <Waves size={20} />, label: 'Full Baths', value: specs.baths },
    { icon: <Waves size={20} />, label: 'Half Baths', value: specs.halfBaths },
    { icon: <Ruler size={20} />, label: 'Interior', value: `${formatNumber(specs.areaSF)} SF` },
    { icon: <Ruler size={20} />, label: 'Interior', value: `${formatNumber(specs.areaM2)} M²` },
    { icon: <MapPin size={20} />, label: 'Lot Size', value: `${formatNumber(specs.lotSF)} SF` },
    { icon: <MapPin size={20} />, label: 'Lot Size', value: `${formatNumber(specs.lotM2)} M²` },
    { icon: <Calendar size={20} />, label: 'Year Built', value: specs.yearBuilt },
    { icon: <Eye size={20} />, label: 'View', value: specs.view },
    { icon: <Waves size={20} />, label: 'Pool', value: specs.poolBoolean ? 'Yes' : 'No' },
  ];

  return (
    <section className="section-luxury" role="region" aria-label="Property details and specifications">
      <div className="container-luxury">
        <h2 className="mb-8">Property Details & Specifications</h2>

        {/* Property Specifications Grid */}
        <div className="specs-grid-luxury mb-12">
          {specItems.map((item, index) => (
            <div key={index} className="spec-luxury">
              <div className="text-accent flex-shrink-0" aria-hidden="true">
                {item.icon}
              </div>
              <div>
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Infrastructure Fee */}
        <div className="bg-gradient-elegant p-6 rounded-lg mb-12">
          <h3 className="text-lg font-semibold mb-2">Infrastructure Fee</h3>
          <p className="text-muted-foreground">{specs.infraFee}</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featureCards.map((card, index) => (
            <div key={index} className="card-luxury">
              <div className="text-accent mb-4" aria-hidden="true">
                {card.iconSlot}
              </div>
              <h3 className="font-semibold mb-2">{card.labelPlaceholder}</h3>
              <p className="text-muted-foreground">{card.benefitPlaceholder}</p>
            </div>
          ))}
        </div>

        {/* Download Brochure CTA */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-luxury btn-luxury--primary focus-luxury"
            aria-label="Request property brochure"
          >
            <Download size={18} />
            Download Brochure
          </button>
        </div>

        {/* Brochure Request Modal */}
        {isModalOpen && (
          <div
            className="modal-backdrop-luxury"
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-modal-title"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen(false);
              }
            }}
          >
            <div className="modal-luxury">
              <div className="flex justify-between items-center mb-6">
                <h3 id="brochure-modal-title" className="text-xl font-semibold">
                  Request Property Brochure
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg focus-luxury"
                  aria-label="Close brochure form"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-destructive text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-destructive text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-destructive text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <fieldset>
                  <legend className="block text-sm font-medium mb-2">
                    Preferred Contact Method *
                  </legend>
                  <div className="space-y-2">
                    {['phone', 'email', 'whatsapp'].map((method) => (
                      <label key={method} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.preferredContact.includes(method)}
                          onChange={(e) => handleContactChange(method, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="capitalize">{method}</span>
                      </label>
                    ))}
                  </div>
                  {errors.preferredContact && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.preferredContact}
                    </p>
                  )}
                </fieldset>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn-luxury btn-luxury--ghost flex-1 focus-luxury"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-luxury btn-luxury--primary flex-1 focus-luxury"
                  >
                    Request Brochure
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DetailsSpecsGrid;