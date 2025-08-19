/**
 * ContactGatedFlow Component
 * 
 * Contact area + Calendly embed placeholder + gated brochure flow with POF checkbox.
 * 
 * Required Props:
 * - calendlyEmbedUrl: string
 * - contactFormFields: Array<{name: string, label: string, type: string, required: boolean}>
 * - onContactSubmit: (formData: any) => void
 * 
 * Optional Props:
 * - none
 */

import React, { useState } from 'react';
import { Calendar, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import ProfessionalCalendar from './ProfessionalCalendar';

interface ContactFormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
}

interface ContactGatedFlowProps {
  calendlyEmbedUrl: string;
  contactFormFields: ContactFormField[];
  onContactSubmit: (formData: any) => void;
}

const ContactGatedFlow: React.FC<ContactGatedFlowProps> = ({
  calendlyEmbedUrl,
  contactFormFields,
  onContactSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Default form fields if none provided
  const defaultFields: ContactFormField[] = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'preferredDates', label: 'Preferred Viewing Dates', type: 'text', required: false },
    { name: 'proofOfFunds', label: 'I will provide proof of funds or broker introduction', type: 'checkbox', required: true }
  ];

  const fields = contactFormFields.length > 0 ? contactFormFields : defaultFields;

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      if (field.required) {
        const value = formData[field.name];
        
        if (field.type === 'checkbox') {
          if (!value) {
            newErrors[field.name] = 'This field is required';
          }
        } else if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors[field.name] = `${field.label} is required`;
        } else if (field.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[field.name] = 'Please enter a valid email address';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onContactSubmit(formData);
      setIsSubmitted(true);
      setShowSuccessModal(true);
    }
  };

  const loadCalendar = () => {
    setIsCalendarLoaded(true);
  };

  const renderFormField = (field: ContactFormField) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'checkbox':
        return (
          <label key={field.name} className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              className="mt-1 w-4 h-4 text-accent border-border rounded focus:ring-2 focus:ring-accent"
            />
            <div>
              <span className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                Required for booking verification
              </p>
            </div>
          </label>
        );

      case 'textarea':
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <textarea
              id={field.name}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className="text-destructive text-sm mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <input
              type={field.type}
              id={field.name}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className="text-destructive text-sm mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <section className="section-luxury bg-gradient-elegant" role="region" aria-label="Contact and scheduling">
      <div className="container-luxury">
        <h2 className="text-center mb-12">Contact & Schedule Private Viewing</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Mail size={24} className="text-accent" />
                Request Information
              </h3>
              <p className="text-muted-foreground">
                Complete the form below to receive detailed property information and schedule your private viewing.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map(renderFormField)}

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full btn-luxury btn-luxury--primary focus-luxury disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    Form Submitted
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>

            {/* Contact Info */}
            <div className="pt-6 border-t border-border space-y-3">
              <h4 className="font-semibold">Direct Contact</h4>
              
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-accent" />
                <span>luxury@example.com</span>
              </div>
            </div>
          </div>

          {/* Calendar Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar size={24} className="text-accent" />
                Schedule Your Visit
              </h3>
              <p className="text-muted-foreground">
                Book your exclusive viewing at your convenience.
              </p>
            </div>

            <ProfessionalCalendar 
              onBookingSubmit={(bookingData) => {
                console.log('Viewing scheduled:', bookingData);
                // Handle booking submission
                onContactSubmit({
                  type: 'viewing_scheduled',
                  ...bookingData
                });
              }}
              className="bg-card rounded-lg"
            />
          </div>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div
            className="modal-backdrop-luxury"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
          >
            <div className="modal-luxury text-center">
              <CheckCircle size={48} className="text-accent mx-auto mb-4" />
              
              <h3 id="success-modal-title" className="text-xl font-semibold mb-4">
                Thank You for Your Interest
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Your request has been received. We'll contact you within 24 hours.
              </p>

              <div className="bg-gradient-elegant p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Next Steps</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Personal consultation within 24 hours</li>
                  <li>• Detailed property brochure delivery</li>
                  <li>• Private viewing scheduling</li>
                </ul>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="btn-luxury btn-luxury--primary focus-luxury"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Qualification Notice */}
        <div className="mt-12 bg-card p-6 rounded-lg border border-border">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-accent mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold mb-2">Qualification Required</h4>
              <p className="text-muted-foreground text-sm">
                Proof of funds or broker introduction required for private viewings to ensure serious inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactGatedFlow;