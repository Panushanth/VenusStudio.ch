import React from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, h, A } from '../context/StudioContext.jsx';
import { el, picture, icon } from '../utils/ui.jsx';
import { PageHero, Heading } from '../components/SectionHeading.jsx';
export function About() {
  const { db, setModal } = use(); return el(
    'div',
    '',
    h(
      PageHero,
      { eyebrow: 'ABOUT US', title: 'The Story Behind Venus Creation', sub: 'A team of storytellers, visual artists, and memory makers.', image: A('about-camera') }
    ),
    band('story', el(
      'section',
      'wrap section split',
      picture(A('studio'), 'Studio lighting', 'rounded wide'),
      el('div', '', el('h2', '', 'Our Journey'), el('p', '', db.settings.story))
    )),
    band('values', el(
      'section',
      'wrap values',
      [['Target', 'Our Vision', 'vision'], ['Infinity', 'Our Mission', 'mission'], ['Heart', 'Our Values', 'values']].map(([i, t, k]) => el('article', 'value', icon(i, 34), el('h3', '', t), el('p', '', db.settings[k])))
    )),
    band('film', h(
      'button',
      { className: 'wrap showreel', onClick: () => setModal({ type: 'video', src: '/assets/showreel.mp4' }), 'aria-label': 'Play studio showreel' },
      picture(A('showreel'), 'Filmmaker at sunset'),
      el('span', 'play', icon('Play', 30))
    )),
    band('team', el(
      'section',
      'wrap section',
      h(Heading, { title: 'Meet Our Team', sub: 'Explore our creative roles. Illustrative studio imagery.' }),
      el(
        'div',
        'team-grid',
        db.team.map(t => el('article', 'team', picture(t.image, t.title), el('h3', '', t.title), el('p', '', t.description)))
      )
    ))
  );
}
