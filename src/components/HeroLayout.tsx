/**
 * HeroLayout Component
 * 
 * Cinematic hero with large image/video stack, headline placeholder, two CTAs, 
 * microtrust line placeholder, and hero overlay gradient.
 * 
 * Required Props:
 * - heroImage: string (URL for hero image)
 * - titlePlaceholder: string (main headline text)
 * - subheadPlaceholder: string (subtitle text)
 * - ctaPrimaryPlaceholder: string (primary button text)
 * - ctaSecondaryPlaceholder: string (secondary button text)
 * 
 * Optional Props:
 * - heroVideo: string (URL for hero video)
 * - onPrimaryClick: () => void
 * - onSecondaryClick: () => void
 */

import React from 'react';

interface HeroLayoutProps {
  heroImage: string;
  heroVideo?: string;
  titlePlaceholder: string;
  subheadPlaceholder: string;
  ctaPrimaryPlaceholder: string;
  ctaSecondaryPlaceholder: string;
  ctaTertiaryPlaceholder?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onTertiaryClick?: () => void;
}

const HeroLayout: React.FC<HeroLayoutProps> = ({
  heroImage,
  heroVideo,
  titlePlaceholder,
  subheadPlaceholder,
  ctaPrimaryPlaceholder,
  ctaSecondaryPlaceholder,
  ctaTertiaryPlaceholder,
  onPrimaryClick,
  onSecondaryClick,
  onTertiaryClick,
}) => {
  return (
    <section className="hero-luxury" role="banner">
      {/* Skip Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Full-Screen Hero Video Background */}
      {heroVideo ? (
        <div className="relative w-full h-screen overflow-hidden">
          <iframe 
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.youtube-nocookie.com/embed/HfusuzIQwig?si=IYra_rB-kdItKwqq&controls=0&start=4&autoplay=1&mute=1&loop=1&playlist=HfusuzIQwig"
            title="Villa Du Cacique Aerial Property Footage" 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      ) : (
        <picture>
          <source
            media="(min-width: 1600px)"
            srcSet={`${heroImage}?w=1600 1600w, ${heroImage}?w=1920 1920w`}
          />
          <source
            media="(min-width: 1024px)"
            srcSet={`${heroImage}?w=1024 1024w, ${heroImage}?w=1600 1600w`}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`${heroImage}?w=768 768w, ${heroImage}?w=1024 1024w`}
          />
          <img
            src={heroImage}
            alt="Luxury villa exterior with pool and elegant architecture"
            className="hero-luxury__media"
            loading="eager"
            srcSet={`${heroImage}?w=480 480w, ${heroImage}?w=768 768w, ${heroImage}?w=1024 1024w, ${heroImage}?w=1600 1600w`}
            sizes="100vw"
          />
        </picture>
      )}

      {/* Hero Overlay */}
      <div className="hero-luxury__overlay" aria-hidden="true" />

      {/* Centered Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6 leading-tight">
            Are you looking for your own piece of paradise?<br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-gold-400">
              Let's turn your dream into reality, for free!
            </span>
          </h1>

          {/* Two Prominent CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <button
              onClick={onPrimaryClick}
              className="px-8 py-4 text-lg font-bold text-white rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 min-w-[280px]"
              style={{ background: 'linear-gradient(135deg, #b19762, #a08856)' }}
              aria-label="Request Your Private Tour"
            >
              Request Your Private Tour
            </button>
            
            <button
              onClick={onSecondaryClick}
              className="px-8 py-4 text-lg font-bold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 min-w-[280px]"
              aria-label="Explore Financing"
            >
              Explore Financing
            </button>
          </div>

          {/* Microtrust Line */}
          <p className="text-white/70 text-sm mt-6">
            Exclusive listing • Verified ownership • Private showings only
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroLayout;