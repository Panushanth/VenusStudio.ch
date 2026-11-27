import React from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, h, A } from '../context/StudioContext.jsx';
import { el, picture, btn } from '../utils/ui.jsx';
import { PageHero } from '../components/SectionHeading.jsx';
import { PackageCards } from '../components/PackageCards.jsx';
export function Packages() {
  const { go } = use(); return el(
    'div',
    '',
    h(
      PageHero,
      { eyebrow: 'OUR PACKAGES', title: 'Event Packages', sub: 'Cinematically crafted packages for your most important moments.', image: A('about-camera') }
    ),
    band('packages', el('section', 'wrap section', h(PackageCards))),
    band('invitation', el(
      'section',
      'wrap soft-cta',
      picture(A('showreel'), 'Filmmaker'),
      el(
        'div',
        '',
        el('h2', '', 'Not Sure Which Package Suits Your Event?'),
        el('p', '', 'Get in touch with us — we’ll help you choose the right package for your special day.'),
        btn('Contact Us →', () => go('/contact'))
      )
    ))
  );
}
