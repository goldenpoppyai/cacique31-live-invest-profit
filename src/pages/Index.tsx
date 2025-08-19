/**
 * Luxury Villa Showcase - 31 Cacique
 * 
 * This page demonstrates 5 standalone luxury real estate components:
 * - HeroLayout: Cinematic hero with property showcase
 * - GalleryFilmStrip: Interactive property gallery
 * - DetailsSpecsGrid: Property specifications and features
 * - NeighborhoodMapModule: Location amenities and map
 * - ContactGatedFlow: Contact forms and scheduling
 */

import React from 'react';
import HeroLayout from '../components/HeroLayout';
import GalleryFilmStrip from '../components/GalleryFilmStrip';
import DetailsSpecsGrid from '../components/DetailsSpecsGrid';
import NeighborhoodMapModule from '../components/NeighborhoodMapModule';
import ContactGatedFlow from '../components/ContactGatedFlow';
import { 
  Home, 
  Waves, 
  TreePine, 
  Car, 
  Utensils, 
  ShoppingBag, 
  Plane,
  Crown,
  Shield,
  MapPin 
} from 'lucide-react';

const Index = () => {
  // Media URLs from the provided list
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
    alt: `Villa 31 Cacique interior and exterior view ${index + 1}`,
    captionPlaceholder: `{{GALLERY_CAPTION_${index + 1}_PLACEHOLDER}}`
  }));

  // Property specifications
  const propertySpecs = {
    bedrooms: 6,
    baths: 6,
    halfBaths: 3,
    areaSF: 10204,
    areaM2: 948,
    lotSF: 33045,
    lotM2: 3070,
    yearBuilt: 2004,
    view: "Golf (Teeth of the Dog hole #1) — partial Caribbean views",
    poolBoolean: true,
    infraFee: "74,412.36 (confirm currency)"
  };

  // Feature cards for property highlights
  const featureCards = [
    {
      iconSlot: <Crown size={32} />,
      labelPlaceholder: "Architect-designed Villa Du Cacique",
      benefitPlaceholder: "Immediate prestige and legacy value — exceptional design that reduces renovation needs."
    },
    {
      iconSlot: <Waves size={32} />,
      labelPlaceholder: "Private pool & terrace",
      benefitPlaceholder: "Private outdoor entertaining with low-visibility privacy."
    },
    {
      iconSlot: <TreePine size={32} />,
      labelPlaceholder: "French-style manicured gardens",
      benefitPlaceholder: "Scenic, event-ready grounds that elevate private events and curb appeal."
    },
    {
      iconSlot: <Shield size={32} />,
      labelPlaceholder: "Gated community & on-site security",
      benefitPlaceholder: "Controlled access and discreet privacy for high-net-worth owners."
    },
    {
      iconSlot: <Home size={32} />,
      labelPlaceholder: "Turnkey condition",
      benefitPlaceholder: "Move-in ready — saves months of work and significant renovation cost."
    },
    {
      iconSlot: <MapPin size={32} />,
      labelPlaceholder: "Millionaires Row address",
      benefitPlaceholder: "Exclusive, quiet neighborhood with a strong buyer pool and legacy appeal."
    }
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
    { name: 'preferredDates', label: 'Preferred Viewing Dates', type: 'text', required: false },
    { name: 'proofOfFunds', label: 'I will provide proof of funds or broker introduction', type: 'checkbox', required: true }
  ];

  // Event handlers (placeholders for integration)
  const handlePrimaryAction = () => {
    // Scroll to contact section
    const contactSection = document.querySelector('[role="region"][aria-label="Contact and scheduling"]');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSecondaryAction = () => {
    // Scroll to details section (brochure download)
    const detailsSection = document.querySelector('[role="region"][aria-label="Property details and specifications"]');
    detailsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBrochureSubmit = (formData: any) => {
    console.log('Brochure request:', formData);
  };

  const handleContactSubmit = (formData: any) => {
    console.log('Contact form submission:', formData);
  };

  return (
    <main id="main-content">
      {/* Hero Section */}
      <HeroLayout
        heroImage={mediaUrls[0]}
        titlePlaceholder="Own a Turnkey Villa on Millionaires Row — 31 Cacique — $7,000,000"
        subheadPlaceholder="Move in immediately: 6 beds, 6 full + 3 half baths, 10,204 sq ft, private pool, French gardens, and direct frontage on Teeth of the Dog — unmatched privacy and lifestyle."
        ctaPrimaryPlaceholder="Request a vetted private showing"
        ctaSecondaryPlaceholder="Download the confidential brochure"
        onPrimaryClick={handlePrimaryAction}
        onSecondaryClick={handleSecondaryAction}
      />

      {/* Gallery Section */}
      <GalleryFilmStrip
        images={galleryImages}
        initialIndex={0}
      />

      {/* Property Details & Specs */}
      <DetailsSpecsGrid
        specs={propertySpecs}
        featureCards={featureCards}
        onSubmit={handleBrochureSubmit}
      />

      {/* Neighborhood & Location */}
      <NeighborhoodMapModule
        pointsOfInterest={pointsOfInterest}
        mapEmbedUrl="{{MAP_EMBED_URL_PLACEHOLDER}}"
      />

      {/* Contact & Scheduling */}
      <ContactGatedFlow
        calendlyEmbedUrl="{{CALENDLY_EMBED_URL_PLACEHOLDER}}"
        contactFormFields={contactFormFields}
        onContactSubmit={handleContactSubmit}
      />
    </main>
  );
};

export default Index;
