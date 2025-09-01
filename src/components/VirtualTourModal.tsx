/**
 * VirtualTourModal Component
 * 
 * Modal for displaying virtual tour video with brochure download CTA
 */

import React from 'react';
import { X, Download } from 'lucide-react';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrochureDownload: () => void;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  onBrochureDownload
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop-luxury"
      role="dialog"
      aria-modal="true"
      aria-labelledby="virtual-tour-title"
      onClick={onClose}
    >
      <div 
        className="relative bg-black rounded-lg max-w-6xl w-full mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          aria-label="Close virtual tour"
        >
          <X size={24} />
        </button>

        {/* Video Player */}
        <div className="relative aspect-video">
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            muted
            aria-label="Villa Du Cacique virtual tour"
          >
            <source src="/Virtual Tour_IG_01 (compressed).mp4" type="video/mp4" />
            <p className="text-center p-8 text-white">
              Your browser does not support the video tag. 
              <a href="/Virtual Tour_IG_01 (compressed).mp4" className="underline">
                Download the video here
              </a>.
            </p>
          </video>
        </div>

        {/* Modal Footer with CTA */}
        <div className="p-6 bg-white">
          <div className="text-center space-y-4">
            <h3 id="virtual-tour-title" className="text-xl font-semibold" style={{ color: '#121212' }}>
              Experience Villa Du Cacique
            </h3>
            
            <p className="text-sm" style={{ color: '#6b6b6b' }}>
              Discover every detail of this exceptional property with our comprehensive brochure
            </p>
            
            <button
              onClick={onBrochureDownload}
              className="btn-luxury btn-luxury--primary focus-luxury flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(180deg, #b19762, #a08856)', margin: '0 auto' }}
            >
              <Download size={18} />
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;