// src/components/MergedContactSection.tsx
/**
 * Combined contact section used in multiple places.
 * Uses relative asset paths (./SamVekemans.webp) so it works when deployed under a subfolder.
 * TypeScript-friendly, accessible and responsive.
 */

import React from "react";

interface MergedContactSectionProps {
  name?: string;
  title?: string;
  imageSrc?: string;
  phone?: string;
  email?: string;
  bookingUrl?: string;
  className?: string;
}

const sanitizeTel = (v?: string) => (v ? v.replace(/[^\d+]/g, "") : "");

const MergedContactSection: React.FC<MergedContactSectionProps> = ({
  name = "Sam Vekemans",
  title = "Luxury Real Estate Specialist",
  imageSrc = "./SamVekemans.webp",
  phone = "+1 809-xxx-xxxx",
  email = "sam@example.com",
  bookingUrl = "./contact",
  className = "",
}) => {
  const telHref = `tel:${sanitizeTel(phone)}`;
  const mailHref = `mailto:${email}`;

  return (
    <section className={`py-12 ${className}`} aria-labelledby="merged-contact-heading">
      <div className="container-luxury flex flex-col sm:flex-row items-center gap-8">
        <figure className="flex-shrink-0">
          <img
            src={imageSrc}
            alt={`${name} — ${title}`}
            className="w-28 h-28 rounded-full object-cover shadow-md"
            loading="lazy"
            width={112}
            height={112}
          />
        </figure>

        <div className="flex-1">
          <h3 id="merged-contact-heading" className="text-2xl font-semibold">
            {name}
          </h3>
          <p className="text-sm text-background/70 mb-4">{title}</p>

          <div className="flex flex-wrap gap-3">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-gray-200 bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`Call ${name}`}
            >
              <span className="font-medium">Call</span>
              <span className="sr-only"> {name}</span>
              <span className="text-sm text-muted">{phone}</span>
            </a>

            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-gray-200 bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`Email ${name}`}
            >
              <span className="font-medium">Email</span>
              <span className="sr-only"> {name}</span>
            </a>

            <a
              href={bookingUrl}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-accent text-white text-sm hover:bg-accent/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              aria-label={`Schedule a viewing with ${name}`}
            >
              Schedule viewing
            </a>
          </div>

          <p className="mt-4 text-sm text-background/60 max-w-xl">
            For private viewings and investment advice, contact {name} directly. We handle confidential
            enquiries and bespoke viewings for qualified buyers.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MergedContactSection;
