// src/components/SamContactSection.tsx
import React from "react";

interface SamContactSectionProps {
  agentName?: string;
  title?: string;
  phone?: string; // readable format (will be sanitized for tel:)
  email?: string;
  imageSrc?: string;
  bookingUrl?: string;
  className?: string;
}

const sanitizeTel = (phone?: string) => {
  if (!phone) return "";
  // keep plus and digits only
  return phone.replace(/[^\d+]/g, "");
};

const SamContactSection: React.FC<SamContactSectionProps> = ({
  agentName = "Sam Vekemans",
  title = "Lead Agent — Exell Dream Estate",
  phone = "+1 809-xxx-xxxx",
  email = "sam@example.com",
  imageSrc = "./SamVekemans.webp",
  bookingUrl = "./contact",
  className = "",
}) => {
  const telHref = `tel:${sanitizeTel(phone)}`;
  const mailHref = `mailto:${email}`;

  return (
    <section
      className={`py-12 bg-transparent ${className}`}
      aria-labelledby="sam-contact-heading"
    >
      <div className="container-luxury flex flex-col sm:flex-row items-center gap-6">
        <figure className="flex-shrink-0">
          <img
            src={imageSrc}
            alt={`${agentName} — ${title}`}
            className="w-28 h-28 rounded-full object-cover shadow-lg"
            loading="lazy"
            width={112}
            height={112}
          />
        </figure>

        <div className="flex-1">
          <h3 id="sam-contact-heading" className="text-2xl font-semibold">
            {agentName}
          </h3>
          <p className="text-sm text-background/70 mb-4">{title}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={telHref}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-gray-200 bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`Call ${agentName}`}
            >
              <span className="font-medium">Call</span>
              <span className="sr-only"> {agentName}</span>
              <span className="text-sm text-muted">{phone}</span>
            </a>

            <a
              href={mailHref}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 border border-gray-200 bg-white text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`Email ${agentName}`}
            >
              <span className="font-medium">Email</span>
              <span className="sr-only"> {agentName}</span>
            </a>

            <a
              href={bookingUrl}
              className="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-accent text-white text-sm hover:bg-accent/95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              aria-label={`Schedule a viewing with ${agentName}`}
            >
              Schedule viewing
            </a>
          </div>

          <p className="mt-4 text-sm text-background/60 max-w-xl">
            For private viewings, financing options, and investment queries,
            reach out to {agentName} directly — expert guidance for high-net-worth
            buyers and off-market opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SamContactSection;
