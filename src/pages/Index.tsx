/**
 * Villa Du Cacique - Complete Luxury Landing Page
 * 
 * Premium luxury real estate experience with:
 * - YouTube hero video background
 * - Property description with verified specs
 * - ROI & Financing analysis sections
 * - Interactive MapBox location module
 * - Contact form with Exell Dream Estate branding
 * - Virtual tour modal
 */

import React, { useState } from 'react';
import HeroLayout from '../components/HeroLayout';
import GalleryFilmStrip from '../components/GalleryFilmStrip';
import PropertyDescription from '../components/PropertyDescription';
import ROIFinancingSection from '../components/ROIFinancingSection';
import NeighborhoodMapModule from '../components/NeighborhoodMapModule';
import ContactGatedFlow from '../components/ContactGatedFlow';
import VirtualTourModal from '../components/VirtualTourModal';
import { 
  TreePine, 
  Car, 
  Utensils, 
  ShoppingBag, 
  Plane
} from 'lucide-react';

const Index = () => {
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  // All 28 property images
  const mediaUrls = [
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143027022294000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142605147224000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017134103072434000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142525164951000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142813128407000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142531522780000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143044518672000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142537673676000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142544253297000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142555390709000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142828655430000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142845810788000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142902719737000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142920482935000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142938155628000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142514550592000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143123038984000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143109348045000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142650999140000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142612315857000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142627505951000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142642531749000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142723235078000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142740424130000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142757301402000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142953069338000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143009999431000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143100597864000000-o.jpg",
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143131260213000000-o.jpg"
  ];

  // Gallery images for the film strip
  const galleryImages = mediaUrls.map((url, index) => ({
    src: url,
    alt: `Villa Du Cacique interior and exterior view ${index + 1}`,
    captionPlaceholder: `Villa Du Cacique - View ${index + 1}`
  }));

  // Verified property specifications
  const propertySpecs = {
    price: "$7,000,000 USD",
    bedrooms: 6,
    bathrooms: "6 full + 3 half bathrooms",
    livingSpace: "11,001 sq ft",
    lotSize: "43,130 sq ft (nearly 1 acre)",
    yearBuilt: 2014,
    annualRental: "$500,000 USD",
    financing: "60% USD financing available"
  };

  // Property story (verbatim from docs)
  const propertyStory = "Live like an icon at the gorgeous Villa Du Cacique. Considered Casa De Campos MOST appreciated architecturally designed villa, is a bright, beautiful mansion located on Casa De Campo Millionaires row and is a lovely private location. Home to the former owner of Forbes Magazine Latin American and Latin Media Icon; this seven-bedroom, 8.5 bath, is immaculately designed, with incredible attention to detail. The luminous, generously proportioned interiors are simply unmatched at Casa De Campo. The villa sits on Teeth of the Dog hole #1, awarded the best golf course in the Americas, and with partial views of the Caribbean ocean, palatial style French gardens; there is enough chance of scenery to keep you from switching back to work mode.";

  // Investment highlights
  const investmentHighlights = [
    "Proven track record: $500,000+ annual gross rental income",
    "Premium location on Hole #1 of Teeth of the Dog Golf Course (Caribbean's #1 rated course)",
    "One of Casa de Campo's largest corner lots (43,130 sq ft - nearly 1 acre)",
    "Partial ocean views with unparalleled privacy and exclusivity",
    "Strategic proximity to world-class amenities and international airports"
  ];

  // ROI metrics from docs
  const roiMetrics = {
    annualGrossIncome: "$500,000 USD",
    monthlyAverage: "$41,667 USD",
    netAnnualCashFlow: "$225,000",
    grossRentalYield: "7.14%",
    netRentalYield: "3.21%",
    fiveYearTotalReturn: "$4,411,000",
    annualizedReturn: "12.6%"
  };

  // Financing costs table
  const financingCosts = [
    { item: "Mortgage (P&I)", monthlyUSD: "$37,810" },
    { item: "Property Taxes", monthlyUSD: "$2,000" },
    { item: "HOA/Club Fees", monthlyUSD: "$525" },
    { item: "Insurance", monthlyUSD: "$2,083" },
    { item: "Maintenance Reserve", monthlyUSD: "$2,917" },
    { item: "Utilities/Overhead", monthlyUSD: "$3,750" },
    { item: "Property Management", monthlyUSD: "$8,333" },
    { item: "TOTAL MONTHLY", monthlyUSD: "$57,418" }
  ];

  // Points of interest for neighborhood
  const pointsOfInterest = [
    {
      titlePlaceholder: "Teeth of the Dog",
      distancePlaceholder: "Immediate / on-property frontage",
      iconSlot: <TreePine size={24} />,
      shortDescPlaceholder: "Award-winning course ranked among the best in the Americas; direct golf frontage and scenic views."
    },
    {
      titlePlaceholder: "Casa de Campo Marina",
      distancePlaceholder: "Short drive (approx. 10–15 minutes)",
      iconSlot: <Car size={24} />,
      shortDescPlaceholder: "Full-service marina with private berths, dining, and concierge leisure services."
    },
    {
      titlePlaceholder: "Casa de Campo fine dining (select venues)",
      distancePlaceholder: "Short drive",
      iconSlot: <Utensils size={24} />,
      shortDescPlaceholder: "Michelin-quality and private dining options available nearby via concierge."
    },
    {
      titlePlaceholder: "Casa de Campo village shopping",
      distancePlaceholder: "Short drive",
      iconSlot: <ShoppingBag size={24} />,
      shortDescPlaceholder: "Curated boutiques, essential services, and private provisioning."
    },
    {
      titlePlaceholder: "La Romana International Airport (LRM)",
      distancePlaceholder: "Approx. 25–30 minutes by car",
      iconSlot: <Plane size={24} />,
      shortDescPlaceholder: "Quick private and commercial connections; convenient discreet arrivals for owners and guests."
    }
  ];

  // Contact form fields
  const contactFormFields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { name: 'country', label: 'Country', type: 'select', required: true },
    { name: 'interest', label: "I'm interested in...", type: 'textarea', required: false },
    { name: 'marketing', label: 'I agree to receive marketing communications from Exell Dream Estate', type: 'checkbox', required: true }
  ];

  // Event handlers
  const handlePrimaryAction = () => {
    // Scroll to contact section
    const contactSection = document.querySelector('[aria-label="Contact and scheduling"]');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSecondaryAction = () => {
    // Scroll to ROI/Financing section
    const roiSection = document.querySelector('[aria-label="ROI and financing analysis"]');
    roiSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleVirtualTour = () => {
    setShowVirtualTour(true);
  };

  const handleROIDownload = () => {
    window.open('/Exell_ROI.pdf', '_blank');
  };

  const handleFinancingDownload = () => {
    window.open('/Exell_Financing.pdf', '_blank');
  };

  const handlePersonalizedWorksheet = () => {
    handlePrimaryAction(); // Scroll to contact form
  };

  const handleBrochureDownload = () => {
    // Handle brochure download - could combine both PDFs or create new brochure
    handleROIDownload();
    handleFinancingDownload();
  };

  const handleContactSubmit = (formData: any) => {
    console.log('Contact form submission:', formData);
    // Here you would typically send to CRM/email service
    alert('Thank you for your interest! We will contact you within 24 hours.');
  };

  return (
    <main id="main-content">
      {/* Hero Section with YouTube Video */}
      <HeroLayout
        heroImage={mediaUrls[0]}
        heroVideo="youtube"
        titlePlaceholder="Own a Turnkey Villa on Millionaires Row — 31 Cacique — $7,000,000"
        subheadPlaceholder="Casa de Campo's Number 1 Luxury Property! This Stunning Estate Is Guaranteed To Impress."
        ctaPrimaryPlaceholder="Request Your Private Tour"
        ctaSecondaryPlaceholder="Explore Financing"
        ctaTertiaryPlaceholder="Virtual Tour"
        onPrimaryClick={handlePrimaryAction}
        onSecondaryClick={handleSecondaryAction}
        onTertiaryClick={handleVirtualTour}
      />

      {/* Property Description Section */}
      <PropertyDescription
        specs={propertySpecs}
        story={propertyStory}
        highlights={investmentHighlights}
      />

      {/* Gallery Section */}
      <GalleryFilmStrip
        images={galleryImages}
        initialIndex={0}
      />

      {/* ROI & Financing Section */}
      <div role="region" aria-label="ROI and financing analysis">
        <ROIFinancingSection
          roiMetrics={roiMetrics}
          financingCosts={financingCosts}
          onROIDownload={handleROIDownload}
          onFinancingDownload={handleFinancingDownload}
          onPersonalizedWorksheet={handlePersonalizedWorksheet}
        />
      </div>

      {/* Location & Amenities */}
      <NeighborhoodMapModule
        pointsOfInterest={pointsOfInterest}
        mapEmbedUrl=""
      />

      {/* Contact Section */}
      <div role="region" aria-label="Contact and scheduling">
        <ContactGatedFlow
          calendlyEmbedUrl=""
          contactFormFields={contactFormFields}
          onContactSubmit={handleContactSubmit}
        />
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTourModal
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
        onBrochureDownload={handleBrochureDownload}
      />
    </main>
  );
};

export default Index;