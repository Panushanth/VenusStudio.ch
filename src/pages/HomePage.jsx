import React, { useState } from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, A, h } from '../context/StudioContext.jsx';
import { el, btn, picture, icon, link } from '../utils/ui.jsx';
import { Services, ServiceCarousel } from '../components/ServiceCarousel.jsx';
import { Heading } from '../components/SectionHeading.jsx';
import { PackageCards } from '../components/PackageCards.jsx';
import { ProductCards } from '../components/ProductCards.jsx';
import { RegistrationBanner } from '../components/RegistrationBanner.jsx';
import { HeroSlideshow } from '../components/HeroSlideshow.jsx';
export function Home() {
  const { db, setModal } = use();
  const [review, setReview] = useState(0);
  const r = db.reviews[review % Math.max(1, db.reviews.length)];
  return el(
    'div',
    'home',
    h(HeroSlideshow),
    band('intro', el('div', 'wrap overlap', h(Services, { compact: true }))),
    band('story', el(
      'section',
      'wrap section split',
      el(
        'div',
        'photo-stack',
        picture(A('collage-wedding'), 'Wedding photography', 'stack-a'),
        picture(A('collage-camera'), 'Camera', 'stack-b'),
        picture(A('collage-drone'), 'Aerial film', 'stack-c')
      ),
      el(
        'div',
        '',
        el('h2', '', 'Why Choose', h('br'), 'Venus Creation?'),
        el('p', '', db.settings.story),
        el(
          'ul',
          'checks',
          ['Professional & Creative Team', 'High-Quality Cinematic Output', 'Personalized Event Coverage', 'Reliable & Friendly Support'].map(t => el('li', '', icon('CheckCircle2', 18), t))
        ),
        link('Learn More →', '/about', 'btn gold')
      )
    )),
    band('metrics', el(
      'section',
      'wrap stats',
      [['Camera', 'Events Covered', db.settings.eventsCovered || '—'], ['Users', 'Happy Clients', db.settings.happyClients || '—'], ['Gem', 'Years of Experience', db.settings.yearsExperience || '—'], ['Award', 'Client Satisfaction', db.settings.clientSatisfaction || '—']].map(([i, t, n]) => el('div', 'stat', icon(i, 29), el('strong', '', n), el('small', '', t))),
      !db.settings.eventsCovered && el('span', 'sample-note', 'Studio statistics to be verified')
    )),
    band('services', el(
      'section',
      'wrap section',
      h(
        Heading,
        { eyebrow: 'OUR SERVICES', title: 'What We Do', sub: 'Complete photography and videography solutions for every occasion.' }
      ),
      h(ServiceCarousel)
    )),
    band('packages', el(
      'section',
      'wrap section home-packages',
      h(Heading, { eyebrow: 'OUR PACKAGES', title: 'Event Packages for Every Occasion' }),
      h(PackageCards, { limit: 3, compact: true }),
      el('div', 'center', link('View All Packages →', '/packages', 'btn outline'))
    )),
    band('store', el(
      'section',
      'wrap section',
      h(
        Heading,
        { eyebrow: 'VENUS CREATION STORE', title: 'Creative Assets for Creators', sub: 'Premium digital products for your photo and video projects.' }
      ),
      h(ProductCards, { items: db.products.slice(0, 4) }),
      el('div', 'center', link('Explore Shop →', '/shop', 'btn gold'))
    )),
    band('gallery', el(
      'section',
      'wrap section',
      h(Heading, { eyebrow: 'OUR MOMENTS', title: 'Recent Works', sub: 'Showreel stills and illustrative portfolio imagery.' }),
      el(
        'div',
        'recent-grid',
        db.moments.slice(0, 4).map(m => h('button', { className: 'gallery-tile', onClick: () => setModal({ type: 'image', ...m }) }, picture(m.image, m.title)))
      ),
      el('div', 'center', link('View Full Gallery →', '/moments', 'btn outline'))
    )),
    band('reviews', el(
      'section',
      'section review-section',
      h(
        Heading,
        { title: 'What Our Clients Say', sub: 'Sample testimonials for design preview — replace with approved client reviews.' }
      ),
      r && el(
        'div',
        'review-wrap',
        btn('', () => setReview((review + db.reviews.length - 1) % db.reviews.length), 'round', 'ChevronLeft'),
        h(
          'article',
          { className: 'review-card', key: r.id },
          picture(r.image, r.name),
          el(
            'div',
            '',
            el('div', 'stars', '★'.repeat(Math.min(5, Math.max(0, Number(r.rating) || 0)))),
            el('p', '', `“${r.description}”`),
            el('strong', '', '— ' + r.name)
          )
        ),
        btn('', () => setReview((review + 1) % db.reviews.length), 'round', 'ChevronRight')
      ),
      el(
        'div',
        'dots',
        db.reviews.map((_, i) => h(
          'button',
          { className: i === review % db.reviews.length ? 'selected' : '', 'aria-label': 'Review ' + (i + 1), onClick: () => setReview(i) }
        ))
      )
    )),
    band('invitation', h(RegistrationBanner))
  );
}
