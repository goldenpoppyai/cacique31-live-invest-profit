/**
 * GalleryFilmStrip Component
 * 
 * Memory-efficient, fast gallery with thumbnail filmstrip + focused lightbox view 
 * with captions placeholder.
 * 
 * Required Props:
 * - images: Array<{src: string, alt: string, captionPlaceholder: string}>
 * 
 * Optional Props:
 * - initialIndex: number (default: 0)
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  captionPlaceholder: string;
}

interface GalleryFilmStripProps {
  images: GalleryImage[];
  initialIndex?: number;
}

const GalleryFilmStrip: React.FC<GalleryFilmStripProps> = ({
  images,
  initialIndex = 0,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [preloadedImages] = useState(new Set<string>());

  // Preload next image
  const preloadImage = useCallback((src: string) => {
    if (!preloadedImages.has(src)) {
      const img = new Image();
      img.src = src;
      preloadedImages.add(src);
    }
  }, [preloadedImages]);

  // Navigation functions
  const goToNext = useCallback(() => {
    const nextIndex = (selectedIndex + 1) % images.length;
    setSelectedIndex(nextIndex);
    
    // Preload next image
    const preloadIndex = (nextIndex + 1) % images.length;
    preloadImage(images[preloadIndex].src);
  }, [selectedIndex, images, preloadImage]);

  const goToPrevious = useCallback(() => {
    const prevIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedIndex(prevIndex);
    
    // Preload previous image
    const preloadIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
    preloadImage(images[preloadIndex].src);
  }, [selectedIndex, images, preloadImage]);

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          event.preventDefault();
          goToNext();
          break;
        case 'Escape':
          event.preventDefault();
          setIsLightboxOpen(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrevious]);

  // Focus management for lightbox
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen]);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setIsLightboxOpen(true);
    // Preload adjacent images
    preloadImage(images[(index + 1) % images.length].src);
    if (index > 0) preloadImage(images[index - 1].src);
  };

  const generateSrcSet = (src: string) => {
    return `${src}?w=480 480w, ${src}?w=768 768w, ${src}?w=1024 1024w, ${src}?w=1600 1600w`;
  };

  return (
    <section className="section-luxury" role="region" aria-label="Property gallery">
      <div className="container-luxury">
        <h2 className="mb-6">Property Gallery</h2>
        
        {/* Film Strip */}
        <div 
          className="gallery-luxury overflow-x-auto pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="thumb-luxury cursor-pointer transition-all duration-200 hover:opacity-75"
              style={{ scrollSnapAlign: 'start' }}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${image.alt} in lightbox`}
            >
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet={`${image.src}?w=240 240w, ${image.src}?w=480 480w`}
                />
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  srcSet={generateSrcSet(image.src)}
                  sizes="120px"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div
            className="modal-backdrop-luxury"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false);
              }
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus-luxury"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus-luxury"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Main Image */}
              <div className="max-w-4xl max-h-full">
                <picture>
                  <source
                    media="(min-width: 1600px)"
                    srcSet={`${images[selectedIndex].src}?w=1600 1600w`}
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet={`${images[selectedIndex].src}?w=1024 1024w`}
                  />
                  <img
                    src={images[selectedIndex].src}
                    alt={images[selectedIndex].alt}
                    className="max-w-full max-h-full object-contain"
                    srcSet={generateSrcSet(images[selectedIndex].src)}
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 80vw, 70vw"
                  />
                </picture>
                
                {/* Caption */}
                <div className="mt-4 text-center">
                  <p className="text-white bg-black/50 px-4 py-2 rounded-lg inline-block">
                    {images[selectedIndex].captionPlaceholder}
                  </p>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors focus-luxury"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {selectedIndex + 1} of {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryFilmStrip;