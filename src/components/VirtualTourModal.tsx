// src/components/VirtualTourModal.tsx
import React, { useEffect, useRef } from "react";
import { X, Download } from "lucide-react";

export interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  /**
   * URL (relative or absolute) to the MP4 virtual tour file.
   * Default expects a file in public/ named "Virtual_Tour.mp4"
   */
  videoUrl?: string;
  /**
   * Optional brochure/pdf link for download (used by the "Download Brochure" button).
   */
  brochureUrl?: string;
  /**
   * Optional callback invoked when the brochure download button is clicked.
   */
  onBrochureDownload?: () => void;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  videoUrl = "./Virtual_Tour.mp4",
  brochureUrl = "./Exell_Financing.pdf",
  onBrochureDownload,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      lastFocusedElement.current = (document.activeElement as HTMLElement) ?? null;
      document.body.style.overflow = "hidden";
      // focus the close button for keyboard users
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      // restore focus
      setTimeout(() => lastFocusedElement.current?.focus(), 0);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "Tab") {
        // basic focus trap
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Pause the video when modal closes
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleBrochureClick = () => {
    try {
      if (onBrochureDownload) onBrochureDownload();
      // let the anchor download attribute handle download if provided in markup
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="virtual-tour-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="flex justify-end p-3">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close virtual tour"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <X />
          </button>
        </div>

        <div className="px-6 pb-6">
          <h2 id="virtual-tour-title" className="sr-only">
            Villa Du Cacique Virtual Tour
          </h2>

          <div className="w-full aspect-video bg-black rounded-md overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls
              playsInline
              // do not autoplay by default; allow user to start it.
            >
              <source src={videoUrl} type="video/mp4" />
              {/* Fallback text */}
              <p className="p-4 text-center text-sm text-white">
                Your browser does not support embedded videos.{" "}
                <a
                  href={videoUrl}
                  className="underline"
                  download
                >
                  Download the video
                </a>
                .
              </p>
            </video>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              <p>
                Enjoy the full virtual tour of Villa Du Cacique. For more information or a private
                viewing please contact our agent.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {brochureUrl && (
                <a
                  href={brochureUrl}
                  download
                  onClick={handleBrochureClick}
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-accent text-white text-sm font-medium hover:bg-accent/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  aria-label="Download brochure"
                >
                  <Download size={16} />
                  Download brochure
                </a>
              )}

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-200 rounded-md bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
