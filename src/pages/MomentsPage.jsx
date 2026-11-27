import React, { useState } from 'react';
import { band } from '../components/SectionBand.jsx';
import { use, h, A } from '../context/StudioContext.jsx';
import { el, picture, icon, btn } from '../utils/ui.jsx';
import { PageHero } from '../components/SectionHeading.jsx';
import { Filters } from '../components/Filters.jsx';
export function Moments() {
  const { db, setModal } = use(); const [filter, setFilter] = useState('All'), [limit, setLimit] = useState(9); const list = db.moments.filter(m => filter === 'All' || m.category === filter); return el(
    'div',
    '',
    h(
      PageHero,
      { eyebrow: 'OUR MOMENTS', title: 'A Collection of Timeless Stories', sub: 'Explore the visual style of Venus Creation, with showreel stills and illustrative portfolio imagery.', image: A('moment5') }
    ),
    band('gallery', el(
      'section',
      'wrap section',
      h(
        Filters,
        { options: ['All', ...new Set(db.moments.map(m => m.category))], value: filter, set: x => { setFilter(x); setLimit(9); } }
      ),
      el(
        'div',
        'gallery-grid',
        list.slice(0, limit).map(m => h(
          'button',
          { className: 'gallery-tile', onClick: () => setModal(m.video ? { type: 'video', src: m.video } : { type: 'image', ...m }) },
          picture(m.image, m.title),
          el('span', 'gallery-caption', m.title, m.video && icon('Play'))
        ))
      ),
      list.length > limit && el('div', 'center', btn('Load More', () => setLimit(limit + 9), 'outline', 'RefreshCw'))
    ))
  );
}
