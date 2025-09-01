/**
 * PropertyDescription Component
 * 
 * Displays the luxury property story and verified specifications
 */

import React from 'react';
import { 
  Home, 
  Bed, 
  Bath, 
  Maximize, 
  Calendar, 
  DollarSign,
  MapPin,
  TrendingUp,
  Shield,
  Star
} from 'lucide-react';

interface PropertySpecs {
  price: string;
  bedrooms: number;
  bathrooms: string;
  livingSpace: string;
  lotSize: string;
  yearBuilt: number;
  annualRental: string;
  financing: string;
}

interface PropertyDescriptionProps {
  specs: PropertySpecs;
  story: string;
  highlights: string[];
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
  specs,
  story,
  highlights
}) => {
  const specItems = [
    { icon: <DollarSign size={24} />, label: 'Price', value: specs.price },
    { icon: <Bed size={24} />, label: 'Bedrooms', value: `${specs.bedrooms} bedrooms` },
    { icon: <Bath size={24} />, label: 'Bathrooms', value: specs.bathrooms },
    { icon: <Maximize size={24} />, label: 'Living Space', value: specs.livingSpace },
    { icon: <Home size={24} />, label: 'Lot Size', value: specs.lotSize },
    { icon: <Calendar size={24} />, label: 'Year Built', value: specs.yearBuilt.toString() },
    { icon: <TrendingUp size={24} />, label: 'Annual Rental Income', value: specs.annualRental },
    { icon: <Shield size={24} />, label: 'Financing Available', value: specs.financing }
  ];

  return (
    <section className="section-luxury bg-background" role="region" aria-label="Property description">
      <div className="container-luxury">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#121212' }}>
            Villa Du Cacique — Live, Invest, and Profit
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Property Story */}
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed" style={{ color: '#6b6b6b' }}>
                {story}
              </p>
            </div>
          </div>

          {/* Property Specifications */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: '#121212' }}>
              Property Specifications
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specItems.map((item, index) => (
                <div 
                  key={index}
                  className="card-luxury p-4 hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#ffffff' }}
                >
                  <div className="flex items-center gap-3">
                    <div style={{ color: '#b19762' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium" style={{ color: '#6b6b6b' }}>
                        {item.label}
                      </div>
                      <div className="font-semibold" style={{ color: '#121212' }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 text-center" style={{ color: '#121212' }}>
            Investment Highlights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="card-luxury p-6 text-center hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="flex justify-center mb-4">
                  <Star size={32} style={{ color: '#b19762' }} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#6b6b6b' }}>
                  {highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDescription;