import React from 'react';

/** Full-width decorative contours. The translucent surfaces blend into the page. */
export function SectionBand({ variant = 'plain', children }) {
  const hasWave = ['story', 'services', 'gallery', 'reviews', 'invitation', 'film', 'contact', 'location'].includes(variant);
  return (
    <div className={`section-band section-band--${variant}`}>
      {hasWave && <svg className="section-wave" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="wave-line" d="M-40 120C270 -40 460 20 720 80S1190 180 1480 10" />
        <path className="wave-line wave-line-secondary" d="M-40 135C270 -22 460 35 720 95S1190 195 1480 25" />
        <path className="wave-line wave-line-secondary" d="M-40 150C270 -4 460 50 720 110S1190 210 1480 40" />
      </svg>}
      {children}
    </div>
  );
}
export const band = (variant, content, key) => <SectionBand variant={variant} key={key}>{content}</SectionBand>;
