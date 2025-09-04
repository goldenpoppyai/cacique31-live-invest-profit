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

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroLayout from '../components/HeroLayout';
import CinematicGallery from '../components/CinematicGallery';
import PropertyDescription from '../components/PropertyDescription';
import ROIFinancingSection from '../components/ROIFinancingSection';
import NeighborhoodMapModule from '../components/NeighborhoodMapModule';
import MergedContactSection from '../components/MergedContactSection';
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

  // Add virtual tour event listener
  useEffect(() => {
    const handleOpenVirtualTour = () => setShowVirtualTour(true);
    window.addEventListener('openVirtualTour', handleOpenVirtualTour);
    return () => window.removeEventListener('openVirtualTour', handleOpenVirtualTour);
  }, []);

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

  // Gallery images with specific captions and alt text
  const galleryImages = [
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143027022294000000-o.jpg",
      alt: "Grand living room with tufted sofas, mezzanine and crystal chandeliers — Villa du Cacique interior, Casa de Campo, Dominican Republic",
      caption: "Grand living room"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142605147224000000-o.jpg", 
      alt: "Aerial view of Villa du Cacique estate showing formal gardens and approach — Casa de Campo, Dominican Republic",
      caption: "Aerial view of estate"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017134103072434000000-o.jpg",
      alt: "Front façade and illuminated driveway with manicured parterres — Villa du Cacique entrance, Casa de Campo",
      caption: "Formal entrance"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142525164951000000-o.jpg",
      alt: "Archway entrance with wooden bridge leading through to the central courtyard — Villa du Cacique, Casa de Campo",
      caption: "Entry archway"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142813128407000000-o.jpg",
      alt: "View through open blue gates toward gardens and golf course — exterior gate view, Villa du Cacique Casa de Campo",
      caption: "Gate view to gardens"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142531522780000000-o.jpg",
      alt: "Private pool, terrace and thatched palapa lounge beside the main house — Villa du Cacique outdoor living, Casa de Campo",
      caption: "Pool & palapa"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143044518672000000-o.jpg",
      alt: "Large paved central courtyard framed by arched colonnades and the main entrance — Villa du Cacique, Casa de Campo",
      caption: "Central courtyard"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142537673676000000-o.jpg",
      alt: "Pool, palapa and poolside seating with landscaped lawn beyond — Villa du Cacique outdoor entertaining, Casa de Campo",
      caption: "Poolside view"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142544253297000000-o.jpg",
      alt: "Wide lawn and palapa cottage beside the pool — Villa du Cacique garden and pool area, Casa de Campo",
      caption: "Lawn & palapa"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142555390709000000-o.jpg",
      alt: "Overhead aerial showing property layout, pool, palapa and sculpted gardens — Villa du Cacique estate plan, Casa de Campo",
      caption: "Aerial plan view"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142828655430000000-o.jpg",
      alt: "Infinity-style pool and sun loungers overlooking tropical landscaping — Villa du Cacique pool deck, Casa de Campo",
      caption: "Pool & loungers"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142845810788000000-o.jpg",
      alt: "Sun loungers at pool edge with umbrella and garden vista at sunset — Villa du Cacique, Casa de Campo",
      caption: "Pool at sunset"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142902719737000000-o.jpg",
      alt: "Covered palapa lounge with built-in seating and tropical views — Villa du Cacique outdoor pavilion, Casa de Campo",
      caption: "Palapa lounge"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142920482935000000-o.jpg",
      alt: "Pool and thatched palapa with adjacent dining terrace and lawn — Villa du Cacique exterior living, Casa de Campo",
      caption: "Pool & dining"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142938155628000000-o.jpg",
      alt: "Garden-facing exterior of the villa with pool and lush landscaping — Villa du Cacique, Casa de Campo",
      caption: "Garden facade"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142514550592000000-o.jpg",
      alt: "Aerial view of the nearby Casa de Campo golf course and coastline adjacent to the property.",
      caption: "Nearby golf course"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143123038984000000-o.jpg",
      alt: "Ivy-covered front façade and symmetrical entrance with formal landscaping — Villa du Cacique exterior, Casa de Campo",
      caption: "Entrance façade"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143109348045000000-o.jpg",
      alt: "Straight driveway and manicured hedges leading to the villa entrance — Villa du Cacique, Casa de Campo",
      caption: "Driveway & hedges"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142650999140000000-o.jpg",
      alt: "Private home theater with reclining seats and projection screen — Villa du Cacique amenities, Casa de Campo",
      caption: "Home theater"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142612315857000000-o.jpg",
      alt: "Guest bedroom with emerald accent walls, classic furnishings and garden access — Villa du Cacique bedroom, Casa de Campo",
      caption: "Guest bedroom"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142627505951000000-o.jpg",
      alt: "Guest bathroom with marble vanity and walk-in shower — Villa du Cacique bath, Casa de Campo",
      caption: "Guest bathroom"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142642531749000000-o.jpg",
      alt: "Bright bedroom with patio door to the garden and natural daylight — Villa du Cacique bedroom, Casa de Campo",
      caption: "Bright bedroom"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142723235078000000-o.jpg",
      alt: "Master bedroom with four-poster style bed and multiple balcony/door accesses — Villa du Cacique master suite, Casa de Campo",
      caption: "Master suite"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142740424130000000-o.jpg",
      alt: "Walk-in shower with glass screen and circular porthole window — Villa du Cacique bathroom, Casa de Campo",
      caption: "Walk-in shower"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142757301402000000-o.jpg",
      alt: "Built-in children's bunk room with custom cabinetry — family accommodation at Villa du Cacique, Casa de Campo",
      caption: "Bunk room"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142953069338000000-o.jpg",
      alt: "Sitting room with tufted teal sofas, rustic coffee table and mezzanine balcony — Villa du Cacique interior, Casa de Campo",
      caption: "Sitting room"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143009999431000000-o.jpg",
      alt: "Grand sitting area with chandelier and symmetrical seating — Villa du Cacique salon, Casa de Campo",
      caption: "Grand salon"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143100597864000000-o.jpg",
      alt: "Formal dining room set for a long table with chandeliers and garden access — Villa du Cacique dining room, Casa de Campo",
      caption: "Formal dining"
    },
    {
      src: "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017143131260213000000-o.jpg",
      alt: "Gourmet kitchen with blue cabinetry, central island and high-end appliances — Villa du Cacique kitchen, Casa de Campo",
      caption: "Gourmet kitchen"
    }
  ];

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
  const propertyStory = "Live like an icon at the gorgeous Villa Du Cacique. Considered Casa De Campos MOST appreciated architecturally designed villa, is a bright, beautiful mansion located on Casa de Campo Millionaires row and is a lovely private location. Home to the former owner of Forbes Magazine Latin American and Latin Media Icon; this seven-bedroom, 8.5 bath, is immaculately designed, with incredible attention to detail. The luminous, generously proportioned interiors are simply unmatched at Casa de Campo. The villa sits on Teeth of the Dog hole #1, awarded the best golf course in the Americas, and with partial views of the Caribbean ocean, palatial style French gardens; there is enough chance of scenery to keep you from switching back to work mode.";

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

  // Use Vite's BASE_URL so assets work on root OR when deployed to a subfolder (e.g. /villaducacique/)
  const rawBase = (import.meta.env as any).BASE_URL || '/';
  // ensure trailing slash
  const baseUrl = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  const handleROIDownload = () => {
    // Opens the ROI PDF relative to the app base (works in Lovable preview and subfolder deploys)
    window.open(`${baseUrl}Exell_ROI.pdf`, '_blank');
  };

  const handleFinancingDownload = () => {
    // Opens the Financing PDF relative to the app base (works in Lovable preview and subfolder deploys)
    window.open(`${baseUrl}Exell_Financing.pdf`, '_blank');
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
    <>
      {/* Header */}
      <Header />
      
      <main id="main-content">
      {/* Hero Section with Full-Screen Video */}
      <HeroLayout
        heroImage={mediaUrls[0]}
        heroVideo="youtube"
        titlePlaceholder="Are you looking for your own piece of paradise?"
        subheadPlaceholder="Let's turn your dream into reality, for free!"
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

      {/* Cinematic Gallery Section */}
      <CinematicGallery
        images={galleryImages}
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

      {/* Location & Interactive Map */}
      <NeighborhoodMapModule />

      {/* Meet Your Specialist & Schedule Your Tour */}
      <div role="region" aria-label="Contact and scheduling">
        <MergedContactSection
          calendlyEmbedUrl=""
          contactFormFields={contactFormFields}
          onContactSubmit={handleContactSubmit}
          onBrochureDownload={handleBrochureDownload}
        />
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTourModal
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
        onBrochureDownload={handleBrochureDownload}
      />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Index;
