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
    "https://cdn.resize.sparkplatform.com/cdc/1280x1024/true/20241017142555390709000000-o.jpg"
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
    view: "{{VIEW_PLACEHOLDER}}",
    poolBoolean: true,
    infraFee: "{{INFRA_FEE_PLACEHOLDER}}"
  };

  // Feature cards for property highlights
  const featureCards = [
    {
      iconSlot: <Crown size={32} />,
      labelPlaceholder: "{{LUXURY_FEATURE_PLACEHOLDER}}",
      benefitPlaceholder: "{{LUXURY_BENEFIT_PLACEHOLDER}}"
    },
    {
      iconSlot: <Waves size={32} />,
      labelPlaceholder: "{{POOL_FEATURE_PLACEHOLDER}}",
      benefitPlaceholder: "{{POOL_BENEFIT_PLACEHOLDER}}"
    },
    {
      iconSlot: <TreePine size={32} />,
      labelPlaceholder: "{{GARDEN_FEATURE_PLACEHOLDER}}",
      benefitPlaceholder: "{{GARDEN_BENEFIT_PLACEHOLDER}}"
    },
    {
      iconSlot: <Shield size={32} />,
      labelPlaceholder: "{{SECURITY_FEATURE_PLACEHOLDER}}",
      benefitPlaceholder: "{{SECURITY_BENEFIT_PLACEHOLDER}}"
    },
    {
      iconSlot: <Home size={32} />,
      labelPlaceholder: "{{TURNKEY_FEATURE_PLACEHOLDER}}",
      benefitPlaceholder: "{{TURNKEY_BENEFIT_PLACEHOLDER}}"
    },
    {
      iconSlot: <MapPin size={32} />,
      labelPlaceholder: "{{LOCATION_FEATURE_PLACEHOLDER}}",
      benefitPlaceholder: "{{LOCATION_BENEFIT_PLACEHOLDER}}"
    }
  ];

  // Points of interest for neighborhood
  const pointsOfInterest = [
    {
      titlePlaceholder: "{{GOLF_COURSE_NAME_PLACEHOLDER}}",
      distancePlaceholder: "{{GOLF_DISTANCE_PLACEHOLDER}}",
      iconSlot: <TreePine size={24} />,
      shortDescPlaceholder: "{{GOLF_DESCRIPTION_PLACEHOLDER}}"
    },
    {
      titlePlaceholder: "{{MARINA_NAME_PLACEHOLDER}}",
      distancePlaceholder: "{{MARINA_DISTANCE_PLACEHOLDER}}",
      iconSlot: <Car size={24} />,
      shortDescPlaceholder: "{{MARINA_DESCRIPTION_PLACEHOLDER}}"
    },
    {
      titlePlaceholder: "{{RESTAURANT_NAME_PLACEHOLDER}}",
      distancePlaceholder: "{{RESTAURANT_DISTANCE_PLACEHOLDER}}",
      iconSlot: <Utensils size={24} />,
      shortDescPlaceholder: "{{RESTAURANT_DESCRIPTION_PLACEHOLDER}}"
    },
    {
      titlePlaceholder: "{{SHOPPING_NAME_PLACEHOLDER}}",
      distancePlaceholder: "{{SHOPPING_DISTANCE_PLACEHOLDER}}",
      iconSlot: <ShoppingBag size={24} />,
      shortDescPlaceholder: "{{SHOPPING_DESCRIPTION_PLACEHOLDER}}"
    },
    {
      titlePlaceholder: "{{AIRPORT_NAME_PLACEHOLDER}}",
      distancePlaceholder: "{{AIRPORT_DISTANCE_PLACEHOLDER}}",
      iconSlot: <Plane size={24} />,
      shortDescPlaceholder: "{{AIRPORT_DESCRIPTION_PLACEHOLDER}}"
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
    console.log('Primary CTA clicked');
  };

  const handleSecondaryAction = () => {
    console.log('Secondary CTA clicked');
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
        titlePlaceholder="{{HERO_TITLE_PLACEHOLDER}}"
        subheadPlaceholder="{{HERO_SUBTITLE_PLACEHOLDER}}"
        ctaPrimaryPlaceholder="{{HERO_PRIMARY_CTA_PLACEHOLDER}}"
        ctaSecondaryPlaceholder="{{HERO_SECONDARY_CTA_PLACEHOLDER}}"
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
