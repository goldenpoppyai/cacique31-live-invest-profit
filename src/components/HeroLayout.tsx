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

      {/* Hero Media */}
      {heroVideo ? (
        <div className="relative w-full h-screen overflow-hidden">
          <iframe 
            className="absolute inset-0 w-full h-full object-cover"
            src="https://www.youtube-nocookie.com/embed/HfusuzIQwig?si=IYra_rB-kdItKwqq&controls=0&start=4&autoplay=1&mute=1&loop=1&playlist=HfusuzIQwig"
            title="Villa Du Cacique" 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
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

      {/* Hero Content */}
      <div className="hero-luxury__content">
        <h1 className="text-white drop-shadow-lg">
          {titlePlaceholder}
        </h1>
        
        <p className="text-white/90 text-lg mb-6 drop-shadow-md max-w-lg">
          {subheadPlaceholder}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <button
            onClick={onPrimaryClick}
            className="btn-luxury btn-luxury--primary focus-luxury"
            style={{ background: 'linear-gradient(180deg, #b19762, #a08856)' }}
            aria-label={ctaPrimaryPlaceholder}
          >
            {ctaPrimaryPlaceholder}
          </button>
          
          <button
            onClick={onSecondaryClick}
            className="btn-luxury btn-luxury--ghost text-white border-white/20 hover:bg-white/10 focus-luxury"
            aria-label={ctaSecondaryPlaceholder}
          >
            {ctaSecondaryPlaceholder}
          </button>

          {ctaTertiaryPlaceholder && (
            <button
              onClick={onTertiaryClick}
              className="btn-luxury btn-luxury--ghost text-white border-white/20 hover:bg-white/10 focus-luxury"
              aria-label={ctaTertiaryPlaceholder}
            >
              {ctaTertiaryPlaceholder}
            </button>
          )}
        </div>

        {/* Microtrust Line */}
        <p className="text-white/70 text-sm">
          Exclusive listing • Verified ownership • Private showings only
        </p>
      </div>
    </section>
  );
};

export default HeroLayout;