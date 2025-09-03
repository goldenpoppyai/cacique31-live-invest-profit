/**
 * CinematicGallery Component
 * 
 * Large, cinematic property gallery with grid layout and hover effects
 * Designed to be the most visually striking section
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface CinematicGalleryProps {
  images: GalleryImage[];
}

const CinematicGallery: React.FC<CinematicGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-20 bg-background" role="region" aria-label="Property gallery">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#121212' }}>
            Villa Du Cacique Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore every exquisite detail of this architectural masterpiece through our curated collection of luxury imagery
          </p>
          
          {/* Virtual Tour Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openVirtualTour'))}
            className="px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 mb-8"
            style={{ background: 'linear-gradient(135deg, #b19762, #a08856)' }}
          >
            📍 Experience Virtual Tour
          </button>
        </div>

        {/* Cinematic Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {images.slice(0, 6).map((image, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Hover Content */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <Maximize2 size={32} className="text-white" />
                </div>
              </div>
              
              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-sm font-medium drop-shadow-lg">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Featured Image */}
        <div className="relative mb-12">
          <div 
            className="relative aspect-[21/9] overflow-hidden rounded-3xl cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 group"
            onClick={() => openLightbox(6)}
          >
            <img
              src={images[6]?.src || images[0]?.src}
              alt="Villa Du Cacique featured view"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                <Maximize2 size={48} className="text-white" />
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <h3 className="text-3xl font-bold mb-2 drop-shadow-lg">
                Architectural Excellence in Paradise
              </h3>
              <p className="text-lg drop-shadow-lg opacity-90">
                Experience luxury redefined at Casa de Campo's crown jewel
              </p>
            </div>
          </div>
        </div>

        {/* Additional Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {images.slice(7, 15).map((image, index) => (
            <div
              key={index + 7}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(index + 7)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <Maximize2 size={24} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Images CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => openLightbox(0)}
            className="px-8 py-4 text-lg font-semibold text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #b19762, #a08856)' }}
          >
            View All {images.length} Images
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close gallery"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight size={48} />
          </button>

          {/* Image */}
          <div className="max-w-7xl max-h-[90vh] px-6">
            <img
              src={images[selectedImage]?.src}
              alt={images[selectedImage]?.alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Caption */}
            <div className="text-center mt-6">
              <p className="text-white text-lg">
                {images[selectedImage]?.caption}
              </p>
              <p className="text-gray-300 text-sm mt-2">
                Image {selectedImage + 1} of {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CinematicGallery;