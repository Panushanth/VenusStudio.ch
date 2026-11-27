import React, { useState, useEffect } from 'react';
import { use, h } from '../context/StudioContext.jsx';
import { el, picture, icon, link, btn } from '../utils/ui.jsx';
export function Services({ compact = false }) {
  const { db } = use(); return el(
    'div',
    compact ? 'service-strip' : 'service-grid',
    db.services.map(s => h(
      'a',
      { className: 'service-card', href: '#/services', key: s.id },
      !compact && picture(s.image, s.title),
      icon(s.icon, 32),
      el('strong', '', s.title),
      !compact && el('p', 'muted', s.description)
    ))
  );
}
export function ServiceCarousel() {
  const { db } = use(); const [index, setIndex] = useState(0), [pause, setPause] = useState(false), [hover, setHover] = useState(false); const n = db.services.length; const active = n ? index % n : 0; const service = db.services[active]; useEffect(
    () => {
      if (n < 2 || pause || hover || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
        return; const t = setInterval(() => {
          if (!document.hidden)
            setIndex(i => (i + 1) % n);
        }, 4600); return () => clearInterval(t);
    },
    [n, pause, hover]
  ); if (!service)
    return el('p', 'muted', 'Service details will be available soon.'); const move = d => setIndex((active + d + n) % n); return h(
      'div',
      {
        className: 'service-carousel', onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), onFocus: () => setHover(true), onBlur: e => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setHover(false);
        }, onKeyDown: e => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            move(e.key === 'ArrowLeft' ? -1 : 1);
          }
        }
      },
      h(
        'div',
        { className: 'service-feature', key: service.id },
        el(
          'div',
          'service-image',
          picture(service.image, service.title),
          el('span', 'image-index', String(active + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0'))
        ),
        el(
          'div',
          'service-feature-copy',
          el('span', 'eyebrow', 'WHAT WE DO / ' + String(active + 1).padStart(2, '0')),
          el('div', 'service-icon', icon(service.icon, 25)),
          el('h3', '', service.title),
          el('p', '', service.description),
          link('Explore our services →', '/services', 'editorial-link')
        )
      ),
      el(
        'div',
        'service-selector',
        db.services.map((item, i) => h(
          'button',
          { key: item.id, className: i === active ? 'service-tab selected' : 'service-tab', 'aria-pressed': i === active, onClick: () => setIndex(i) },
          icon(item.icon, 19),
          el('span', '', item.title)
        ))
      ),
      el(
        'div',
        'service-controls',
        el('div', 'service-progress', h('span', { style: { width: (active + 1) / n * 100 + '%' } })),
        btn('Previous service', () => move(-1), 'round slider-control', 'ChevronLeft'),
        btn(pause ? 'Play services' : 'Pause services', () => setPause(v => !v), 'round slider-control', pause ? 'Play' : 'Pause'),
        btn('Next service', () => move(1), 'round slider-control', 'ChevronRight')
      )
    );
}
