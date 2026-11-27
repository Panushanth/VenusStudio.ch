import React from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, h, A } from '../context/StudioContext.jsx';
import { el, picture, icon, btn, link } from '../utils/ui.jsx';
import { PageHero } from '../components/SectionHeading.jsx';
import { initial } from '../data/demoData.js';
import { RegistrationBanner } from '../components/RegistrationBanner.jsx';
export function ServicePage() {
  const { db, requireAccount } = use(); return el(
    'div',
    'services-page',
    h(
      PageHero,
      { eyebrow: 'THE ART OF STORYTELLING', title: 'Every story deserves its own lens.', sub: 'Discover photography, cinematography and creative production tailored to your occasion.', image: A('about-camera') }
    ),
    band('services', el(
      'section',
      'wrap section service-intro',
      el('span', 'eyebrow', 'OUR EXPERTISE'),
      el('h2', '', 'Made for moments that matter.'),
      el('p', 'muted', 'Explore each service below, then tell us about your event. We’ll help you choose a suitable approach.')
    )),
    el(
      'div',
      'service-editorial',
      db.services.map((item, i) => band(['story', 'values', 'film', 'services', 'packages', 'gallery'][i % 6], h(
        'section',
        { className: 'service-detail ' + (i % 2 ? 'reverse' : ''), key: item.id },
        el(
          'div',
          'wrap service-detail-inner',
          el('div', 'service-detail-photo', picture(item.image, item.title), el('span', 'image-index', String(i + 1).padStart(2, '0'))),
          el(
            'div',
            'service-detail-copy',
            el('span', 'eyebrow', 'SERVICE / ' + String(i + 1).padStart(2, '0')),
            icon(item.icon, 28),
            el('h2', '', item.title),
            el('p', '', item.description),
            el(
              'ul',
              'checks',
              String(item.features || initial.services.find(s => s.id === item.id)?.features || 'Personalized consultation\nCreative planning\nProfessionally prepared deliverables').split('\n').filter(Boolean).map(f => el('li', '', icon('Check', 17), f))
            ),
            btn('Enquire / Book Service', () => requireAccount('/booking/' + item.id), 'gold', 'CalendarDays'),
            link('View Packages', '/packages', 'editorial-link')
          )
        )
      ), item.id))
    ),
    band('invitation', h(RegistrationBanner))
  );
}
